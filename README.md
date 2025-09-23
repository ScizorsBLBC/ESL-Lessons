# ✂️ ESL Lessons Hub

Welcome to Scizors' ESL Lessons Hub, a modern, interactive web application designed to host a collection of dynamic and engaging lessons for ESL students. This project was bootstrapped with Vite and is built on a robust, mobile-first React foundation, utilizing Material-UI for a beautiful, responsive user interface.

### 🏛️ Project Architecture & Vision

This repository is structured to grow into a multi-lesson platform. The goal is to create a hub where various educational modules, such as converted PDF lessons, can be easily added and accessed as new, interactive pages. The core architecture is designed to be modular:

* **Main App Shell (`App.jsx`)**: Provides the consistent header, navigation, and theme-switching logic for the entire platform.
* **Lesson Components**: Each new lesson will be built as its own self-contained set of React components.
* **Data Modules (`/src/data`)**: Lesson-specific content (text, chart data, etc.) will be kept in separate files to keep the component logic clean and maintainable.

---

### 🎨 Aesthetic & Theming

The visual identity of this platform is a core feature, designed to be both elegant and engaging. The aesthetic is inspired by Scizors' figurative fashion concept art. Inspired by iconic artwork from vintage fashion editorials, these themes blend vibrant colors with a sense of motion and texture.

Key visual elements include:

* **Glassmorphism**: A "liquid glass" effect is applied to all card and paper surfaces, creating a sense of depth and modernity.
* **Animated Film Grain**: A subtle, animated texture is layered over the entire interface to emulate the organic feel of vintage film and eliminate digital color banding.
* **Five Curated Themes**: The application features a palette of five distinct themes, allowing users to customize their experience:
    * Dark & Light: Sophisticated, high-contrast full color themes for classic readability.
    * VaporWave Mode: An expressive theme that directly mirrors the colors of the inspirational artwork of the '80s & 90's.
    * Monochrome Dark & Light: Chic, Bauhaus-inspired themes that focus on form and structure.

---

### 📈 Backend & Leaderboard System

The application now includes a backend Express server and a leaderboard system to track student theme preferences.

* The server logs theme usage to `leaderboard.json` using a simple API. It is designed to be non-intrusive and respects student study time by waiting 30 seconds before tallying a score.
* The leaderboard icon is only visible on the main landing page and the leaderboard page to avoid distracting students during lessons.
* The system is configured for seamless deployment, with the `vite.config.js` file automatically setting the correct base path for both local development and live deployment.

---

### 👩🏼‍💻 Getting Started & Development

1.  **Initial Setup**
    Clone the repository and install the necessary dependencies from your terminal.

    `npm install`

2.  **Running the Development Servers**
    This project requires two separate terminals to run both the frontend and backend simultaneously.

    * **Terminal 1 (Backend)**: Starts the Express server that handles the theme leaderboard data.

        `npm run start-server`

    * **Terminal 2 (Frontend)**: Starts the Vite development server, which will automatically reload in your browser as you make changes to the code.

        `npm run dev`

---

### 🌐 Deployment Workflow

This site is deployed to `GitHub Pages` and served from the custom domain:

`https://esl-lessons.scizors.wtf`.

To update the live site, follow this complete feature-branch workflow. This process keeps the `main` branch clean and ensures all changes are reviewed before deployment.

1.  **Create a New Branch**
    First, ensure your local `main` branch is up-to-date, then create your new feature branch.

    `git checkout main`
    `git pull`
    `git checkout -b new-lesson-feature`

2.  **Make Your Code Changes**
    Add new lessons, fix bugs, or update styles. Test your work locally using

    `npm run dev`.

3.  **Commit Your Changes**
    Stage and commit your work with a clear, descriptive message.

    `git add .`
    `git commit -m "feat: Add new lesson on verb tenses"`

4.  **Push Your Branch to GitHub**
    The first time you push a new branch, you need to set its `upstream` remote.

    `git push --set-upstream origin new-lesson-feature`

5.  **Open a Pull Request on GitHub**
    Go to your repository on GitHub. You'll see a prompt to `Compare & pull request` for your new branch. In the description, briefly explain your changes.

6.  **Merge the Pull Request**
    After reviewing, click the `Merge pull request` button. This adds your work to the `main` branch.

7.  **Clean Up on GitHub**
    Immediately after merging, click the `Delete branch` button that appears. This removes the now-merged branch from GitHub, keeping your project tidy.

8.  **Sync and Deploy from Your Computer**
    Switch back to your local `main` branch, pull the newly merged code from GitHub, and then run the deploy script.

    `git checkout main`
    `git pull`
    `npm run deploy`

9.  **Clean Up Locally**
    Finally, keep your local machine tidy by deleting the old feature branch.

    `git branch -d new-lesson-feature`

**Note:** Changes may take 1-5 minutes to appear on the live site. Always perform a hard refresh (`Cmd+Shift+R` or `Ctrl+Shift+R`) to bypass your browser's cache.