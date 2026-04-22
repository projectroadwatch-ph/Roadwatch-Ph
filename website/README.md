# Website Folder

This folder contains all files for the RoadWatch PH website frontend, now organized by experience:

- `public/` — citizen-facing website pages, styles, and scripts
- `admin/` — admin portal pages, styles, and scripts
- `shared/` — shared JavaScript modules used by both public and admin experiences
- `assets/` — static image and SVG assets

Use this folder as the website root when deploying the frontend.

Backward-compatible redirect entry points (`index.html`, `home.html`, `submit.html`, `about.html`, `contact.html`, `qr.html`, `admin.html`, `login.html`, and `admin-header.html`) remain at the website root and forward traffic into the new folder structure.

`public/home.html`, `public/submit.html`, `public/about.html`, `public/contact.html`, and `public/qr.html` are lightweight entry-point aliases that redirect to `public/index.html?page=...` so each section can have its own URL without duplicating page logic. `public/qr.html` is the stable landing URL used by generated QR codes, ensuring older downloaded QR images still route users to the latest homepage deployment.
