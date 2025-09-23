# ✂️ ESL Lessons Hub

Welcome to Scizors' ESL Lessons Hub, a modern, interactive web application designed to host a collection of dynamic and engaging lessons for ESL students. This project was bootstrapped with Vite and is built on a robust, mobile-first React foundation, utilizing Material-UI for a beautiful, responsive user interface.

# 🏛️ Project Architecture & Vision

This repository is structured to grow into a multi-lesson platform. The goal is to create a hub where various educational modules, such as converted PDF lessons, can be easily added and accessed as new, interactive pages. The core architecture is designed to be modular:

Main App Shell (App.jsx): Provides the consistent header, navigation, and theme-switching logic for the entire platform.

Lesson Components: Each new lesson will be built as its own self-contained set of React components.

Data Modules (/src/data): Lesson-specific content (text, chart data, etc.) will be kept in separate files to keep the component logic clean and maintainable.

# 🎨 Aesthetic & Theming

The visual identity of this platform is a core feature, designed to be both elegant and engaging. The aesthetic is inspired by Scizors' figurative fashion concept art. Inspired by iconic artwork from vintage fashion editorials, these themes blend vibrant colors with a sense of motion and texture.

Key visual elements include:

- Glassmorphism: A "liquid glass" effect is applied to all card and paper surfaces, creating a sense of depth and modernity.

- Animated Film Grain: A subtle, animated texture is layered over the entire interface to emulate the organic feel of vintage film and eliminate digital color banding.

- Five Curated Themes: The application features a palette of five distinct themes, allowing users to customize their experience:

    - Dark & Light: Sophisticated, high-contrast themes for classic readability.

    - Art Mode: An expressive theme that directly mirrors the colors of the inspirational artwork.

    - Monochrome Dark & Light: Chic, Bauhaus-inspired themes that focus on form and structure.

# 👩🏼‍💻 Getting Started & Development

1. Initial Setup
Clone the repository and install the necessary dependencies from your terminal.

        npm install

2. Running the Development Server
This command starts the Vite development server, which will automatically reload in your browser as you make changes to the code.

        npm run dev

# 🌐 Deployment Workflow

This site is configured for automated deployment to GitHub Pages via the custom domain: https://esl-lessons.scizors.wtf.

How to Update the Live Site
For all future work, use the following professional feature branch workflow. This keeps the main branch stable and allows for code review.

1. Create a New Branch for Your Feature

        git checkout -b new-lesson-feature

2. Make All Your Code Changes...
(e.g., add new lesson components, update data files, etc.)

3. Stage and Commit Your Changes

        git add .
        git commit -m "feat: Add new lesson on verb tenses"

4. Push Your New Branch to GitHub

        git push origin new-lesson-feature

5. Open a Pull Request on GitHub
Go to your repository on GitHub. You will see a prompt to "Compare & pull request" for the branch you just pushed. Click it.

What to add here: In the pull request description, briefly explain the changes you made. For example: "This PR adds the new interactive lesson for verb tenses, including the main component and its associated data file. All features are complete and ready for review before merging into the main production branch."

6. Merge the Pull Request
After reviewing your own changes (or having a collaborator review them), click the "Merge pull request" button on GitHub. This safely merges your new feature into the main branch.

7. Deploy to Live
Once the main branch is updated, run the deploy script from your terminal.

        npm run deploy

Note: Changes may take 1-5 minutes to appear on the live site. Always perform a hard refresh (Cmd+Shift+R or Ctrl+Shift+R) to bypass your browser's cache.