/**
 * Inicialización de Librerías y Funcionalidades
 */
document.addEventListener('DOMContentLoaded', () => { // <-- Abre el listener DOMContentLoaded
    
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 1000, 
        easing: 'ease-in-out', 
        once: true, 
        mirror: false 
    });

    // Inicializar PureCounter (para estadísticas)
    try { // Añadimos try-catch por si la librería no carga
       new PureCounter();
    } catch (e) {
       console.error("Error initializing PureCounter:", e);
    }

    // --- CÓDIGO PARA INICIALIZAR ISOTOPE Y GLIGHTBOX EN MODAL EDUCACIÓN ---
    const educationModal = document.getElementById('modalEducacion');
    let isotopeInstance = null; 
    let lightboxInstance = null; 

    if (educationModal) {
        educationModal.addEventListener('shown.bs.modal', event => {
            const isoContainer = educationModal.querySelector('.isotope-container');
            
            if (isotopeInstance) {
                try { isotopeInstance.destroy(); } catch (e) { console.error("Error destroying Isotope:", e); }
                isotopeInstance = null;
            }

            if (isoContainer) {
                 setTimeout(() => {
                    try {
                        isotopeInstance = new Isotope(isoContainer, {
                            itemSelector: '.isotope-item',
                            layoutMode: 'fitRows', 
                            percentPosition: true 
                        });
                        isotopeInstance.layout(); 

                        const filters = educationModal.querySelectorAll('.isotope-filters li');
                        filters.forEach(filter => {
                            if (!filter.dataset.isotopeListenerAttached) { 
                                filter.addEventListener('click', function() {
                                    filters.forEach(el => el.classList.remove('filter-active'));
                                    this.classList.add('filter-active');
                                    if(isotopeInstance) {
                                        isotopeInstance.arrange({ filter: this.getAttribute('data-filter') });
                                        setTimeout(() => { if(isotopeInstance) isotopeInstance.layout(); }, 50); 
                                    }
                                });
                                filter.dataset.isotopeListenerAttached = 'true';
                            }
                        });
                    } catch (e) { console.error("Error initializing Isotope:", e); }
                }, 150); 
            }

            if (!lightboxInstance) { 
                try { lightboxInstance = GLightbox({ selector: '.glightbox' }); } catch (e) { console.error("Error initializing GLightbox:", e); }
            } else {
                 try { lightboxInstance.reload(); } catch(e) { console.error("Error reloading GLightbox:", e); }
            }
        });

        educationModal.addEventListener('hidden.bs.modal', event => {
             const filters = educationModal.querySelectorAll('.isotope-filters li');
             filters.forEach(filter => { delete filter.dataset.isotopeListenerAttached; });
         });
    }
    // --- FIN CÓDIGO MODAL EDUCACIÓN ---

    // === CÓDIGO MÁS DIRECTO PARA CIERRE NAVBAR MÓVIL ===
    const navbarToggler = document.querySelector('.navbar-toggler');
    const collapsibleMenu = document.querySelector('#navbarNav');

    if (navbarToggler && collapsibleMenu) {
        const navLinks = collapsibleMenu.querySelectorAll('.nav-link, .dropdown-item');
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Comprueba si el menú está desplegado ('show') ANTES de simular el clic
                const isMenuOpen = collapsibleMenu.classList.contains('show');
                
                if (isMenuOpen && window.getComputedStyle(navbarToggler).display !== 'none') {
                    // Simula un clic en el botón solo si el menú está abierto
                    navbarToggler.click(); 
                }
            });
        });
    } else {
        console.error("Navbar toggler or collapsible menu not found. Check IDs and classes.");
    }
    // === FIN CÓDIGO NAVBAR MÓVIL ===

}); // <-- Cierra el listener DOMContentLoaded