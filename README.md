# Web Programming Labs — Firebase & Google Apps Script

A small collection of web programming labs demonstrating **Firebase Authentication / Firestore CRUD** and **Google Apps Script integration with the YouTube Data API**.

This repository contains two browser-based projects developed as part of a web programming lab course:

1. **Firebase Diary App** — Google sign-in, account management, and diary CRUD operations backed by Cloud Firestore.
2. **YouTube Video Retrieval Lab** — a lightweight front end that calls a Google Apps Script Web App, which queries the YouTube Data API and returns a matching video.

> The original course files are kept under `1111-wp-ta-lab-main/` to preserve the submitted project layout.

---

## Project Structure

```text
1111-wp-ta-lab/
├── README.md
├── .gitignore
└── 1111-wp-ta-lab-main/
    ├── README.md
    ├── demo-diary-app/
    │   ├── index.html
    │   ├── style.css
    │   ├── script.js
    │   ├── package.json
    │   └── package-lock.json
    └── lab-youtube-video-retrieval/
        ├── index.html
        └── code.gs
```

---

# 1. Firebase Diary App

`1111-wp-ta-lab-main/demo-diary-app/`

A simple personal diary web application built with vanilla HTML/CSS/JavaScript and Firebase.

### Features

- Sign in with a Google account
- Sign out
- Delete the current Firebase Authentication account
- Create a diary entry
- Read one diary entry by title
- Read all diary entries for the current user
- Update an existing diary entry
- Delete a diary entry
- Store diary content in Cloud Firestore

### Architecture

```text
Browser
  │
  ├── HTML / CSS
  │
  └── JavaScript
        │
        ├── Firebase Authentication
        │      └── Google Sign-In
        │
        └── Cloud Firestore
               ├── Create
               ├── Read
               ├── Update
               └── Delete
```

Each authenticated user's email is used as the Firestore collection name, while the diary title is used as the document ID.

### Tech Stack

| Area | Technology |
|---|---|
| Front end | HTML5, CSS3, JavaScript ES Modules |
| Authentication | Firebase Authentication |
| Database | Cloud Firestore |
| Identity provider | Google Sign-In |
| Firebase SDK | Firebase Web SDK 9.x |

### Run Locally

Because the app uses JavaScript ES modules, run it through a local HTTP server instead of opening `index.html` directly with `file://`.

For example, with VS Code you can use **Live Server**, or with Python:

```bash
cd 1111-wp-ta-lab-main/demo-diary-app
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

### Firebase Setup

To reproduce the project with your own Firebase project:

1. Create a Firebase project.
2. Enable **Google** under Firebase Authentication providers.
3. Create a **Cloud Firestore** database.
4. Add your local/deployment domain to Firebase Authentication authorized domains when required.
5. Replace `firebaseConfig` in `script.js` with the Web App configuration for your Firebase project.
6. Configure Firestore Security Rules so users can access only the data they are authorized to read or write.

> Firebase Web configuration identifies the Firebase project but should not be treated as an authorization mechanism. Access control belongs in Authentication and Firestore Security Rules.

---

# 2. YouTube Video Retrieval Lab

`1111-wp-ta-lab-main/lab-youtube-video-retrieval/`

A small client/server exercise that demonstrates how a static web page can call a Google Apps Script Web App and retrieve data from a Google service.

### Workflow

```text
User enters keyword
        │
        ▼
Browser / jQuery AJAX
        │
        ▼
Google Apps Script Web App
        │
        ▼
YouTube Data API
        │
        ▼
Video title + URL + thumbnail
        │
        ▼
Displayed in browser
```

### Front End

`index.html`

The page:

- accepts a search keyword
- sends the keyword to the Apps Script Web App
- displays the returned video title
- displays the YouTube thumbnail
- links the thumbnail to the matching YouTube video

### Back End

`code.gs`

The Apps Script endpoint implements:

```javascript
searchByKeyword(keyword)
doGet(e)
```

`searchByKeyword()` calls the YouTube advanced service and returns a JSON response containing the selected video's title, URL, and thumbnail.

### Google Apps Script Setup

To reproduce the lab:

1. Create a Google Apps Script project.
2. Enable the **YouTube Data API / YouTube advanced service** for the Apps Script project.
3. Copy `code.gs` into the project.
4. Deploy the Apps Script project as a Web App.
5. Copy the deployment URL.
6. Replace `gasUrl` in `lab-youtube-video-retrieval/index.html` with the new deployment URL.
7. Serve `index.html` through a local or hosted web server.

---

# What This Repository Demonstrates

This project is mainly a learning-oriented repository, but it demonstrates several practical web development concepts:

- Client-side JavaScript event handling
- ES module usage
- Third-party SDK integration
- Google OAuth authentication through Firebase
- NoSQL CRUD operations with Firestore
- REST-like HTTP communication
- AJAX requests
- Google Apps Script Web Apps
- YouTube Data API integration
- Basic client/server separation

---

# Suggested Future Improvements

Possible extensions include:

- Move Firebase settings into an environment/config layer for deployment workflows
- Add form validation and loading/error states
- Use Firebase Authentication state listeners instead of manually toggling UI state
- Add diary entry lists and timestamps to the UI
- Add Firestore Security Rules examples
- Migrate the front end to Vite or another modern build workflow
- Replace jQuery AJAX with `fetch()` in the YouTube lab
- Support multiple YouTube search results instead of only one
- Add automated tests and linting
- Deploy the demos through GitHub Pages / Firebase Hosting where appropriate

---

## Original Course Material

The original README and course presentation link are preserved under:

```text
1111-wp-ta-lab-main/README.md
```

This root README was added to make the repository easier to understand as a standalone GitHub portfolio project.
