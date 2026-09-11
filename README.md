# M.G.FIRES website redesign

## Files

- `index.html` — website structure
- `style.css` — premium responsive design
- `script.js` — gallery, filters, fullscreen viewer, mobile swipe
- `config.js` — Cloudinary + gallery configuration

## Cloudinary setup

Cloud name:
`yvudsaeu`

Upload preset:
`mgfires_gallery`

The preset is unsigned and should be protected with allowed file types/size limits in Cloudinary.

## Adding photos

1. Open Cloudinary Media Library.
2. Upload an image into the `mgfires` folder.
3. Organize by folders such as:
   - `mgfires/2026/ganesh`
   - `mgfires/2026/events`
   - `mgfires/2025/ganesh`
4. Open the asset and copy its **Public ID**.
5. Add it to `config.js`:

```js
{
  year: "2026",
  title: "Ganesh Chaturthi",
  source: "cloudinary",
  publicId: "mgfires/2026/ganesh/IMG_001",
  alt: "M.G.FIRES Ganesh Chaturthi"
}
```

Do NOT put a Cloudinary API secret in GitHub.

## Google Photos

The Google Photos album is kept as the original full archive. The website's gallery is powered by Cloudinary so the public visitor stays on the M.G.FIRES website.

## Important

The current public site does not dynamically list every Cloudinary asset because that would require exposing privileged Cloudinary API credentials. The safe static approach is to maintain the small `photos` list in `config.js`.

For a large gallery, the next upgrade should be a tiny server/API that securely queries Cloudinary and automatically builds the gallery manifest.
