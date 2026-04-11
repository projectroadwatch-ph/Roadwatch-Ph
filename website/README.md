# Website Folder

This folder contains all files for the RoadWatch PH website frontend:

- Public pages (`index.html`, `home.html`, `submit.html`, `about.html`, `contact.html`, `login.html`, `admin.html`)
- Frontend scripts (`script.js`, `admin.js`)
- Stylesheets (`style.css`, `admin.css`)
- Static assets (`assets/`)

Use this folder as the website root when deploying the frontend.

`home.html`, `submit.html`, `about.html`, and `contact.html` are lightweight entry-point aliases that redirect to `index.html?page=...` so each section can have its own URL without duplicating page logic.
