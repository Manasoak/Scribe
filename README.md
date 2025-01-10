# Scribe


Scribe is a Progressive Web App (PWA) designed to streamline note-taking and enhance productivity. Combining the convenience of a web app with the functionality of native apps, Scribe allows users to create, edit, and save notes effortlessly. With the ability to export notes as PDFs and offline accessibility, Scribe ensures your ideas are always within reach, whether you’re online or offline.
---

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [How to Set Up the Project Locally](#how-to-set-up-the-project-locally)
- [How to Install the App Using Chrome](#how-to-install-the-app-using-chrome)
- [Project Structure](#project-structure)

---

## Features
- Create and edit notes effortlessly.
- Export notes as PDF files.
- Fully offline functionality as a PWA.
- Simple and clean user interface.

---

## Installation of PWA using chrome 
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/scribe.git
   cd scribe
   ```

2. **Open in Your Preferred Code Editor:**
   Open the project folder in any code editor (e.g., VS Code).

3. **Run the Application Locally:**
   Install `serve` using NPX and start a local server:
   ```bash
   npx serve
   ```
   This will serve the app locally. Open the provided URL in your browser.

 **Note:**
   Ensure you are running the app locally via `npx serve` to avoid errors related to offline service worker registration (OSPRS).

---

## How to Set Up the Project Locally

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/scribe.git
   cd scribe
   ```

2. **Open the Project in Your Code Editor:**
   Open the project folder in VS Code or your preferred editor.

3. **Run the App Locally:**
   Use `npx serve` to serve the app:
   ```bash
   npx serve
   ```

4. **Open in Browser:**
   Copy the link provided by `serve` (e.g., `http://localhost:5000`) and paste it into your browser.

---

## How to Install the App Using Chrome

1. **Open the PWA in Chrome:**
   - Run the PWA locally using `npx serve`.
   - Open the provided URL (e.g., `http://localhost:5000`) in Google Chrome.

2. **Look for the Install Icon:**
   - In the Chrome address bar, you’ll see a small **Install** icon (a computer with a download arrow) on the right side.
   - If the icon isn’t visible, click the three-dot menu (⁝) in the top-right corner, and look for the option **Install Scribe**.

3. **Click on the Install Button:**
   - Click the **Install** button to initiate the installation process.

4. **Launch the App:**
   - Once installed, the PWA will open in a standalone window like a native desktop app.
   - A shortcut will be added to your desktop or start menu.

---

---

## Project Structure
```
Scribe/
├── main/
│   ├── icon-192x192.png       # App icon for PWA
│   ├── icon-512x512.png       # App icon for PWA
│   ├── index.html             # Main HTML file
│   ├── manifest.json          # PWA manifest
│   ├── script.js              # Main JavaScript file
│   ├── service-worker.js      # Service worker for PWA
│   └── style.css              # Styling file
├── src/
│   ├── input.css              # Input CSS for Tailwind
│   └── tailwind.config.js     # Tailwind CSS configuration
```
