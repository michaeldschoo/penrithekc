class WritingApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.storageKey = 'penrithekc_writing_data';
    this.state = {
      firstName: '',
      lastName: '',
      testNumber: '',
      content: '',
      isSubmitting: false,
      message: ''
    };
  }

  connectedCallback() {
    this.loadData();
    this.render();
    this.setupEventListeners();
  }

  loadData() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        this.state = { ...this.state, ...JSON.parse(saved) };
      } catch (e) {
        console.error('Failed to load saved data', e);
      }
    }
  }

  saveData() {
    localStorage.setItem(this.storageKey, JSON.stringify({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      testNumber: this.state.testNumber,
      content: this.state.content
    }));
  }

  setupEventListeners() {
    window.addEventListener('beforeunload', (e) => {
      if (this.state.content.trim() || this.state.firstName.trim()) {
        e.preventDefault();
        e.returnValue = '';
      }
    });

    // Handle "Back" button and internal navigation safety
    window.addEventListener('popstate', () => {
        if (this.state.content.trim() && !confirm('You have unsaved changes. Are you sure you want to leave?')) {
            history.pushState(null, null, window.location.pathname);
        }
    });
    history.pushState(null, null, window.location.pathname);
  }

  updateState(key, value) {
    this.state[key] = value;
    this.saveData();
    this.render();
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (this.state.isSubmitting) return;

    if (!this.state.firstName || !this.state.lastName || !this.state.testNumber || !this.state.content) {
      this.updateState('message', 'Please fill in all fields before submitting.');
      return;
    }

    this.updateState('isSubmitting', true);
    this.updateState('message', 'Sending your work...');

    try {
      const formData = new FormData();
      formData.append('access_key', 'dbd5f171-d307-45e9-80c6-b8bfec1f6de5');
      formData.append('Student_First_Name', this.state.firstName);
      formData.append('Student_Last_Name', this.state.lastName);
      formData.append('Test_Number', this.state.testNumber);
      formData.append('Essay_Content', this.state.content);
      formData.append('subject', `Writing Submission: ${this.state.firstName} ${this.state.lastName} - #${this.state.testNumber}`);
      formData.append('from_name', 'Penrithekc Writing App');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem(this.storageKey);
        this.state = {
          firstName: '', lastName: '', testNumber: '', content: '',
          isSubmitting: false,
          message: 'Success! Your work has been submitted. The form has been reset.'
        };
        this.render();
        setTimeout(() => { window.close(); }, 3000);
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (error) {
      this.updateState('isSubmitting', false);
      this.updateState('message', `Error: ${error.message || 'Could not send email'}. Please try again.`);
    }
  }

  handleGDocSubmit() {
    if (!this.state.firstName || !this.state.lastName || !this.state.testNumber || !this.state.content) {
      this.updateState('message', 'Please fill in all fields before submitting.');
      return;
    }
    this.saveData();
    window.location.href = 'send.html';
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
          color: oklch(0.2 0.05 250);
          --primary-glow: 0 0 15px oklch(0.6 0.2 250 / 0.3);
        }
        .container {
          max-width: 900px;
          margin: 2rem auto;
          padding: 2rem;
          background: oklch(0.98 0.01 250);
          border-radius: 16px;
          box-shadow: 0 10px 40px oklch(0 0 0 / 0.1);
          container-type: inline-size;
        }
        header { text-align: center; margin-bottom: 2rem; }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, oklch(0.5 0.2 250), oklch(0.7 0.15 200));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .form-grid {
          display: grid;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        @container (min-width: 600px) {
          .form-grid { grid-template-columns: 1fr 1fr 0.5fr; }
        }
        .field-group { display: flex; flex-direction: column; gap: 0.5rem; }
        label { font-weight: 600; font-size: 0.9rem; color: oklch(0.4 0.05 250); }
        input {
          padding: 0.8rem;
          border: 2px solid oklch(0.9 0.02 250);
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s ease;
        }
        input:focus {
          outline: none;
          border-color: oklch(0.6 0.2 250);
          box-shadow: var(--primary-glow);
        }
        .writing-surface {
          position: relative;
          background: white;
          padding: 2.5rem;
          min-height: 1200px;
          border: 1px solid oklch(0.9 0.02 250);
          box-shadow: inset 0 0 10px oklch(0 0 0 / 0.02), 5px 5px 15px oklch(0 0 0 / 0.05);
          border-radius: 4px;
          margin-bottom: 2rem;
          background-image: linear-gradient(oklch(0.95 0.01 250) 1px, transparent 1px);
          background-size: 100% 2.5rem;
          line-height: 2.5rem;
        }
        textarea {
          width: 100%;
          min-height: 1100px;
          border: none;
          resize: none;
          font-family: 'Georgia', serif;
          font-size: 1.2rem;
          line-height: 2.5rem;
          background: transparent;
          color: oklch(0.15 0.02 250);
        }
        textarea:focus { outline: none; }
        .controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
        .button-group {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        button {
          background: oklch(0.6 0.2 250);
          color: white;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 700;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 15px oklch(0.6 0.2 250 / 0.4);
        }
        button.secondary {
          background: oklch(0.4 0.1 250);
          box-shadow: 0 4px 15px oklch(0.4 0.1 250 / 0.4);
        }
        button:hover:not(:disabled) { transform: translateY(-2px); filter: brightness(1.1); }
        button:disabled { background: oklch(0.8 0.02 250); cursor: not-allowed; box-shadow: none; }
        .status-message { font-weight: 600; text-align: center; padding: 1rem; border-radius: 8px; }
        .error { color: oklch(0.5 0.2 20); }
        .success { color: oklch(0.5 0.2 150); }
      </style>

      <div class="container">
        <header>
          <h1>Writing Practice</h1>
          <p>Complete your essay below. Your progress is automatically saved.</p>
        </header>

        <form id="writingForm">
          <div class="form-grid">
            <div class="field-group">
              <label for="firstName">First Name</label>
              <input type="text" id="firstName" value="${this.state.firstName}" placeholder="Enter first name">
            </div>
            <div class="field-group">
              <label for="lastName">Last Name</label>
              <input type="text" id="lastName" value="${this.state.lastName}" placeholder="Enter last name">
            </div>
            <div class="field-group">
              <label for="testNumber">Test #</label>
              <input type="text" id="testNumber" value="${this.state.testNumber}" placeholder="e.g. 01">
            </div>
          </div>

          <div class="writing-surface">
            <textarea id="content" placeholder="Start writing your essay here...">${this.state.content}</textarea>
          </div>

          <div class="controls">
            ${this.state.message ? `<div class="status-message ${this.state.message.includes('Error') ? 'error' : 'success'}">${this.state.message}</div>` : ''}
            <div class="button-group">
              <button type="submit" id="submitBtn" ${this.state.isSubmitting ? 'disabled' : ''}>
                ${this.state.isSubmitting ? 'Submitting...' : 'Quick Submit (Email)'}
              </button>
              <button type="button" id="gdocBtn" class="secondary" ${this.state.isSubmitting ? 'disabled' : ''}>
                Submit as Google Doc
              </button>
            </div>
          </div>
        </form>
      </div>
    `;

    const form = this.shadowRoot.getElementById('writingForm');
    form.addEventListener('submit', (e) => this.handleSubmit(e));

    const gdocBtn = this.shadowRoot.getElementById('gdocBtn');
    gdocBtn.addEventListener('click', () => this.handleGDocSubmit());

    ['firstName', 'lastName', 'testNumber', 'content'].forEach(id => {
      const el = this.shadowRoot.getElementById(id);
      el.addEventListener('input', (e) => {
        this.state[id] = e.target.value;
        this.saveData();
      });
    });
  }
}

customElements.define('writing-app', WritingApp);
