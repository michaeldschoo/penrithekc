# Project Blueprint: Writing Practice App & Excel Student Data Comparator

## 1. Writing Practice App (Web Component & GAS Web App)

### Overview
A web-based writing practice application designed for students in Sydney, Australia. It allows students to input their details and write a long-form essay (up to 2 A4 pages). The app ensures data persistence to prevent loss during network failures or accidental navigation and submits the final work via email to `penrithekc@gmail.com` using Formspree.

### Project Details & Features
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

---

## 2. Excel Student Data Comparator (Python GUI Application)

### Overview
A standalone desktop application written in Python (Tkinter GUI) designed to compare old and new student roster Excel files. It automatically identifies added and removed students, styles changes visually (Red/Blue), sorts the combined student list in descending order by name, and saves the output to a clean, professionally formatted Excel workbook.

### Key Features
- **Modern Desktop GUI:** Elegant flat-themed interface powered by Python's `tkinter` and `ttk` library.
- **Robust Key-based Comparison:** Utilizes `Student ID` as a reliable unique key to detect additions and removals (instead of fragile name-only matches).
- **Graceful Deletion Handling:** Does not delete removed students. Instead, preserves them in the final roster but marks them visibly to track drops.
- **Visual Color Styling:**
  - **Removed Students (Red):** Pattern fill in pastel Red (`#FADBD8`) with dark red text (`#9C0006`) for high readability.
  - **Added Students (Blue):** Pattern fill in pastel Blue (`#D6EAF8`) with dark blue text (`#002060`) to highlight newcomers.
- **Name Sorting:** Automatically sorts the entire unified list (maintained, added, and removed) by student name in **descending order** (`이름` 내림차순).
- **Auto-fit Columns:** Automatically resizes Excel columns based on content length, with full support for Korean (Hangul) characters to prevent cell clipping.
- **Interactive Execution Log:** Real-time log screen inside the GUI showing the comparative metrics (added/removed count) and warning flags.

### Architecture & Components
1. **`excel_comparator.py`**: The core application module containing:
   - `compare_excel_files()`: Domain business logic function separated from the UI for testability.
   - `ExcelComparatorApp`: Tkinter application class organizing the graphical interface, file pickers, configurations, and progress logger.
   - **CLI & Interactive Mode (`run_cli_mode`)**: Support for non-GUI execution using arguments or step-by-step interactive inputs (`input()`) for automated workflows.
2. **`requirements.txt`**: Declares required third-party libraries (`pandas` and `openpyxl`).
3. **`test_comparator.py`**: Integration testing and CLI runner harness, allowing both automated validation and quick user-interactive file comparison.

