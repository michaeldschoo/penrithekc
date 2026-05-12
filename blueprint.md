# Project Blueprint: Writing Practice App

## Overview
A web-based writing practice application designed for students in Sydney, Australia. It allows students to input their details and write a long-form essay (up to 2 A4 pages). The app ensures data persistence to prevent loss during network failures or accidental navigation and submits the final work via email to `penrithekc@gmail.com` using Formspree.

## Project Details & Features
- **User Information:** Captures 'First Name', 'Last Name', and 'Test #'.
- **Writing Environment:** A large, distraction-free text area styled to mimic two A4 pages.
- **Auto-Save (Local Persistence):** Automatically saves all inputs to `localStorage` on every keystroke. Restores data upon page refresh.
- **Network Resilience:** Handles offline scenarios by keeping data cached locally.
- **Navigation Safety:** 
    - Implements `window.onbeforeunload` to warn about unsaved changes.
    - Prevents accidental "Back" button navigation data loss.
- **Email Submission:** Submits data to `https://formspree.io/f/penrithekc@gmail.com` via Formspree.
- **Error Handling:** Provides clear, English-language error messages.
- **Modern Web Standards:** Built using Web Components, Shadow DOM, and Baseline CSS features (Container Queries, `:has()`, Modern Color Spaces).

## Implementation Plan
1. **Initialize `blueprint.md` (Root):** (Completed) Document the current requirements and architecture.
2. **Setup Base Structure (`index.html`):** (Completed) Add the `<writing-app>` custom element and link assets.
3. **Develop the Writing Component (`main.js`):** (Completed) Implement the `WritingApp` class with persistence and submission logic.
4. **Style the Application (`style.css`):** (Completed) Create the "Sydney Education" themed UI with virtual A4 pages.
5. **Verification & Testing:** (Completed) Validated auto-save, navigation guards, and responsive layout.
