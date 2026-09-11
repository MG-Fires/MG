const cfg = window.MGFiresConfig;
const gallery = document.getElementById("gallery");
const filters = document.getElementById("filters");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCounter = document.getElementById("lightboxCounter");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

let currentPhotos = [];
let currentIndex = 0;

function cloudinaryUrl(publicId, width = 1400) {
  const encoded = publicId.split("/").map(encodeURIComponent).join("/");
  return `https://res.cloudinary.com/${cfg.cloudName}/image/upload/f_auto,q_auto,c_limit,w_${width}/${encoded}`;
}

function photoUrl(photo) {
  return photo.source === "cloudinary" ? cloudinaryUrl(photo.publicId) : photo.src;
}

function renderGallery(year = "all") {
  currentPhotos = cfg.photos.filter(photo => year === "all" || photo.year === year);
  gallery.innerHTML = "";

  if (!currentPhotos.length) {
    gallery.innerHTML = `<div class="gallery-empty">No photos added for this year yet.<br>Upload the photos to Cloudinary and add their public IDs to <strong>config.js</strong>.</div>`;
    return;
  }

  currentPhotos.forEach((photo, index) => {
    const item = document.createElement("button");
    item.className = "gallery-item";
    item.type = "button";
    item.dataset.index = index;
    item.innerHTML = `
      <img src="${photoUrl(photo)}" alt="${escapeHtml(photo.alt || photo.title || "M.G.FIRES memory")}" loading="lazy">
      <span class="gallery-overlay">
        <strong>${escapeHtml(photo.title || "M.G.FIRES Memory")}</strong>
        <small>${escapeHtml(photo.year)}</small>
      </span>
    `;

    const img = item.querySelector("img");
    img.addEventListener("load", () => img.classList.add("loaded"));
    img.addEventListener("error", () => {
      item.style.display = "none";
    });

    item.addEventListener("click", () => openLightbox(index));
    gallery.appendChild(item);
  });
}

function openLightbox(index) {
  if (!currentPhotos.length) return;
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lock");
}

function updateLightbox() {
  const photo = currentPhotos[currentIndex];
  lightboxImage.src = photoUrl(photo);
  lightboxImage.alt = photo.alt || photo.title || "M.G.FIRES memory";
  lightboxTitle.textContent = `${photo.title || "M.G.FIRES Memory"} · ${photo.year}`;
  lightboxCounter.textContent = `${currentIndex + 1} / ${currentPhotos.length}`;
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lock");
  lightboxImage.src = "";
}

function nextPhoto() {
  if (!currentPhotos.length) return;
  currentIndex = (currentIndex + 1) % currentPhotos.length;
  updateLightbox();
}

function prevPhoto() {
  if (!currentPhotos.length) return;
  currentIndex = (currentIndex - 1 + currentPhotos.length) % currentPhotos.length;
  updateLightbox();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

filters.addEventListener("click", event => {
  const button = event.target.closest(".filter");
  if (!button) return;
  document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
  button.classList.add("active");
  renderGallery(button.dataset.year);
});

document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
document.getElementById("nextPhoto").addEventListener("click", nextPhoto);
document.getElementById("prevPhoto").addEventListener("click", prevPhoto);

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") nextPhoto();
  if (event.key === "ArrowLeft") prevPhoto();
});

let touchStartX = 0;
lightbox.addEventListener("touchstart", event => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener("touchend", event => {
  const delta = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(delta) < 45) return;
  delta < 0 ? nextPhoto() : prevPhoto();
}, { passive: true });

menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

mainNav.addEventListener("click", event => {
  if (event.target.closest("a")) {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
renderGallery();
