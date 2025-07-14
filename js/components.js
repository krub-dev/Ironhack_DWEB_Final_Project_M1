// Loading components dynamically
async function loadComponent(url, selector) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error loading component: " + response.statusText);
        }
        const html = await response.text();
        document.querySelector(selector).innerHTML = html;
    } catch (error) {
        console.error(error);
    }
}

// Header
async function loadHeader() {
	await loadComponent("/components/header-component.html", ".header-component");
}

// Footer
async function loadFooter() {
	await loadComponent("/components/footer-component.html", ".footer-component");
}

// Scroll Up
async function loadScrollUp() {
	await loadComponent("/components/scroll-up-component.html", ".scroll-up-component");
}

// Intiating components 
async function initComponents() {
    await loadHeader();
    await loadFooter();
    await loadScrollUp();
}

document.addEventListener('DOMContentLoaded', () => {
    initComponents().catch(error => console.error('Error:', error));
});