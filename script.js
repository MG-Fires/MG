// ======================================================
// M.G.FIRES WEBSITE — SCRIPT
// ======================================================


// ======================================================
// 1. WEBSITE CONFIGURATION
// ======================================================

const REPO = "MG-Fires/MG";

const GOOGLE_PHOTOS =
    "https://photos.app.goo.gl/5b56P3Ai7L6ievxy6";


// ======================================================
// 2. GET HTML ELEMENTS
// ======================================================

const gallery =
    document.getElementById("gallery");

const statusEl =
    document.getElementById("galleryStatus");

const countEl =
    document.getElementById("photoCount");

const tabs =
    document.getElementById("yearTabs");


// Cache loaded photos
const cache = {};


// ======================================================
// 3. CREATE IMAGE URL
// ======================================================

function imgUrl(file) {

    if (file.download_url) {
        return file.download_url;
    }

    return `https://raw.githubusercontent.com/${REPO}/main/${
        file.path
            .split("/")
            .map(encodeURIComponent)
            .join("/")
    }`;
}


// ======================================================
// 4. LOAD PHOTOS FOR A YEAR
// ======================================================

async function loadYear(year) {

    gallery.innerHTML = "";

    statusEl.textContent =
        `Loading ${year} memories…`;

    countEl.textContent = "—";


    try {

        // --------------------------------------------------
        // Load from GitHub only if not already cached
        // --------------------------------------------------

        if (!cache[year]) {

            const response = await fetch(
                `https://api.github.com/repos/${REPO}/contents/photos/${year}?ref=main`,
                {
                    headers: {
                        Accept:
                            "application/vnd.github+json"
                    }
                }
            );


            if (!response.ok) {
                throw new Error(
                    "GitHub request failed"
                );
            }


            const files =
                await response.json();


            // --------------------------------------------------
            // Keep image files only
            // --------------------------------------------------

            cache[year] = files

                .filter(file =>
                    file.type === "file" &&
                    /\.(jpe?g|png|webp|gif|avif)$/i
                        .test(file.name)
                )

                .sort((a, b) =>
                    a.name.localeCompare(
                        b.name,
                        undefined,
                        {
                            numeric: true
                        }
                    )
                );
        }


        const files = cache[year];


        // ==================================================
        // 5. PHOTO COUNT
        // ==================================================

        countEl.textContent =
            `${files.length} photo${
                files.length === 1
                    ? ""
                    : "s"
            }`;


        statusEl.textContent =
            `${year} memories`;


        // ==================================================
        // 6. NO PHOTOS
        // ==================================================

        if (!files.length) {

            gallery.innerHTML = `

                <div class="empty">

                    No photos added for ${year} yet.

                    <br><br>

                    Add images to

                    <strong>
                        photos/${year}/
                    </strong>

                    on GitHub.

                </div>

            `;

            return;
        }


        // ==================================================
        // 7. DISPLAY PHOTOS
        // ==================================================

        files.forEach((file, index) => {

            const image =
                imgUrl(file);


            const button =
                document.createElement("button");


            button.className =
                "photo";


            button.innerHTML = `

                <img
                    src="${image}"
                    alt="M.G.FIRES ${year} memory ${index + 1}"
                    loading="${
                        index < 3
                            ? "eager"
                            : "lazy"
                    }"
                >

                <span class="photo-label">
                    ${year} · ${index + 1}
                </span>

            `;


            button.onclick = () => {

                openLightbox(
                    image,
                    `${year} · ${index + 1}`
                );

            };


            gallery.appendChild(button);

        });

    }


    // ==================================================
    // 8. ERROR HANDLING
    // ==================================================

    catch (error) {

        console.error(error);


        statusEl.textContent =
            `Couldn't load ${year} right now.`;


        gallery.innerHTML = `

            <div class="empty">

                GitHub photos could not be loaded.

                <br><br>

                <small>

                    Make sure

                    <strong>
                        photos/${year}/
                    </strong>

                    exists and the repository
                    is public.

                </small>

            </div>

        `;

    }

}


// ======================================================
// 9. OPEN PHOTO LIGHTBOX
// ======================================================

function openLightbox(src, caption) {

    document.getElementById(
        "lightboxImage"
    ).src = src;


    document.getElementById(
        "lightboxCaption"
    ).textContent = caption;


    document.getElementById(
        "lightbox"
    ).classList.add("open");


    document.body.style.overflow =
        "hidden";
}


// ======================================================
// 10. CLOSE PHOTO LIGHTBOX
// ======================================================

function closeLightbox() {

    document.getElementById(
        "lightbox"
    ).classList.remove("open");


    document.getElementById(
        "lightboxImage"
    ).src = "";


    document.body.style.overflow =
        "";
}


// ======================================================
// 11. YEAR TAB BUTTONS
// ======================================================

tabs.onclick = event => {

    const button =
        event.target.closest(
            "button[data-year]"
        );


    if (!button) {
        return;
    }


    tabs
        .querySelectorAll("button")
        .forEach(item => {

            item.classList.remove(
                "active"
            );

        });


    button.classList.add(
        "active"
    );


    loadYear(
        button.dataset.year
    );

};


// ======================================================
// 12. LIGHTBOX CLOSE BUTTON
// ======================================================

document.getElementById(
    "lightboxClose"
).onclick = closeLightbox;


// ======================================================
// 13. CLOSE LIGHTBOX OUTSIDE IMAGE
// ======================================================

document.getElementById(
    "lightbox"
).onclick = event => {

    if (
        event.target.id ===
        "lightbox"
    ) {

        closeLightbox();

    }

};


// ======================================================
// 14. ESCAPE KEY
// ======================================================

document.onkeydown = event => {

    if (event.key === "Escape") {

        closeLightbox();

    }

};


// ======================================================
// 15. MOBILE MENU
// ======================================================

document.getElementById(
    "menuBtn"
).onclick = () => {

    document.getElementById(
        "nav"
    ).classList.toggle("open");

};


// ======================================================
// 16. CLOSE MOBILE MENU
// ======================================================

document
    .querySelectorAll("nav a")
    .forEach(link => {

        link.onclick = () => {

            document.getElementById(
                "nav"
            ).classList.remove(
                "open"
            );

        };

    });


// ======================================================
// 17. CURRENT YEAR
// ======================================================

document.getElementById(
    "year"
).textContent =
    new Date().getFullYear();


// ======================================================
// 18. MEMBERS
// ======================================================

const members = [

    {
        name: "Dhanush",
        role: "Editor",
        photo: "members/dhanush.jpg"
    },

    {
        name: "Chidvilas",
        role: "Technical",
        photo: "members/chidvilas.jpg"
    },

    {
        name: "Naveen",
        role: "Treasury",
        photo: "members/naveen.jpg"
    }

    // --------------------------------------------------
    // ADD FUTURE MEMBERS HERE
    // --------------------------------------------------

    // {
    //     name: "Member Name",
    //     role: "Role",
    //     photo: "members/member-name.jpg"
    // }

];


// ======================================================
// 19. CREATE MEMBER CARDS AUTOMATICALLY
// ======================================================

const memberGrid =
    document.querySelector(
        ".member-grid"
    );


function loadMembers() {

    if (!memberGrid) {
        return;
    }


    // Clear existing cards
    memberGrid.innerHTML = "";


    // Create a card for every member
    members.forEach(member => {

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "member-card";


        card.innerHTML = `

            <div class="member-photo initials">

                <span>
                    ${member.name
                        .trim()
                        .charAt(0)
                        .toUpperCase()}
                </span>

            </div>


            <div class="member-info">

                <h3>
                    ${member.name}
                </h3>

                <span>
                    ${member.role.toUpperCase()}
                </span>

            </div>

        `;


        const photoBox =
            card.querySelector(
                ".member-photo"
            );


        const image =
            new Image();


        image.onload = () => {

            photoBox.classList.remove(
                "initials"
            );


            photoBox.textContent =
                "";


            image.alt =
                `${member.name} — M.G.FIRES`;


            photoBox.appendChild(
                image
            );

        };


        image.onerror = () => {

            console.warn(
                `Member photo not found: ${member.photo}`
            );

        };


        image.src =
            member.photo;


        memberGrid.appendChild(
            card
        );

    });

}


// ======================================================
// 20. LOAD MEMBERS
// ======================================================

loadMembers();


// ======================================================
// 21. START WEBSITE
// ======================================================

// Change 2025 if you want another year
// to open automatically.

loadYear(2025);
