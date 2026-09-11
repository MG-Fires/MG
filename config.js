/*
  M.G.FIRES gallery configuration
  --------------------------------
  Cloudinary:
    cloudName: yvudsaeu
    uploadPreset: mgfires_gallery

  IMPORTANT:
  The public website does NOT use your Cloudinary API secret.
  Upload photos through Cloudinary Media Library, then add the public IDs
  below. This keeps the public site static and GitHub Pages friendly.

  Example public ID:
    mgfires/2026/ganesh/IMG_1234

  The gallery automatically builds optimized delivery URLs.
*/

const MGFiresConfig = {
  cloudName: "yvudsaeu",
  uploadPreset: "mgfires_gallery",

  googlePhotosArchive: "https://photos.app.goo.gl/5b56P3Ai7L6ievxy6",

  // Add Cloudinary assets here as you upload them.
  // publicId = the asset's Cloudinary Public ID, without extension.
  photos: [
    // Existing local photos can remain while you migrate to Cloudinary.
    {
      year: "2026",
      title: "Ganesh Chaturthi",
      source: "local",
      src: "ganesh1.jpg",
      alt: "M.G.FIRES Ganesh Chaturthi celebration"
    },
    {
      year: "2026",
      title: "Celebration",
      source: "local",
      src: "ganesh2.jpg",
      alt: "M.G.FIRES celebration"
    },

    // Example — uncomment and replace with real Cloudinary public IDs:
    // {
    //   year: "2026",
    //   title: "Ganesh Chaturthi",
    //   source: "cloudinary",
    //   publicId: "mgfires/2026/ganesh/IMG_001",
    //   alt: "M.G.FIRES Ganesh Chaturthi"
    // },
  ]
};
