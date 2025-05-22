import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["fieldList", "fields"]

  connect() {
    this.fields = [
      { id: 1, label: "Nom", visible: true },
      { id: 2, label: "Prénom", visible: true },
      { id: 3, label: "Adresse mail", visible: true },
    ];
    this.nextId = 7;
    this.renderFields();
  }

  addField() {
    this.fields.push({ id: this.nextId++, label: `Champ texte ${this.nextId - 1}`, visible: true });
    this.renderFields();
  }

  updateLabel(event) {
    const id = parseInt(event.target.dataset.id);
    const field = this.fields.find(f => f.id === id);
    if (field) {
      field.label = event.target.value;
      this.renderMobilePreview();
    }
  }

  renderMobilePreview() {
    this.fieldsTarget.innerHTML = this.fields.filter(field => field.visible).map(field => `
      <div class="mobile-form-field mb-2">
        <label class="mobile-form-label">${field.label}</label>
        <input type="text" class="mobile-form-input" disabled />
      </div>
    `).join("");
  }

  toggleVisible(event) {
    const id = parseInt(event.currentTarget.dataset.id);
    const field = this.fields.find(f => f.id === id);
    if (field) {
      field.visible = !field.visible;
      this.renderFields();
    }
  }

  renderFields() {
    // Render controls
    this.fieldListTarget.innerHTML = this.fields.map(field => `
      <li class="form-field-item mb-2 d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
          <input type="text" class="form-field-label" value="${field.label}" data-id="${field.id}" data-action="input->form-builder#updateLabel" />
        </div>
        <button type="button" class="field-switch-btn ms-3" data-id="${field.id}" data-action="form-builder#toggleVisible" style="background:none;border:none;outline:none;cursor:pointer;">
          ${field.visible ? `
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="36" height="20" rx="10" fill="#1976D2"/>
              <circle cx="30" cy="12" r="8" fill="white"/>
            </svg>
          ` : `
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="36" height="20" rx="10" fill="#B0BEC5"/>
              <circle cx="10" cy="12" r="8" fill="white"/>
            </svg>
          `}
        </button>
      </li>
    `).join("");
    // Render mobile preview (only visible fields)
    this.renderMobilePreview();
  }
} 