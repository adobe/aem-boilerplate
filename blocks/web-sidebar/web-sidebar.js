class WebSidebar extends HTMLElement {
    constructor() {
      super();
      this.handleClick = this.handleClick.bind(this);
    }
  
    connectedCallback() {
      this.addEventListener('click', this.handleClick);
    }
  
    disconnectedCallback() {
      this.removeEventListener('click', this.handleClick);
    }
  
    handleClick(event) {
      const row = event.target.closest('.web-sidebar > div');
      if (!row || row === this.firstElementChild) return; // Ignore title row
      
      const link = row.querySelector('a');
      if (link) {
        event.preventDefault();
        const targetId = link.getAttribute('href')?.substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }
  
  customElements.define('web-sidebar', WebSidebar);