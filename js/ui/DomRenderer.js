// DomRenderer — responsable de actualizar la UI. Recibe (inyecta) una dependencia que provee datos.
export default class DomRenderer {
  constructor(yearProvider) {
    this.yearProvider = yearProvider;
  }

  renderYear(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    // Liskov: cualquier 'yearProvider' con getYear() es intercambiable
    if (typeof this.yearProvider.getYear === 'function') {
      el.textContent = this.yearProvider.getYear();
    }
  }
}
