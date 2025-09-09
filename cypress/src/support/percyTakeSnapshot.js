const percyTakeSnapshot = (nameOfSnapshot) => {
        cy.percySnapshot(nameOfSnapshot, {
            widths: [1280, 375],
            percyCSS: `
                    /* Override styles for Percy snapshots */
                    @media (max-width: 768px) {
                        [style*="overflow-y: hidden"] {
                            overflow-y: unset !important;
                        }   
                        #nav[aria-expanded="true"] {
                            display: none !important;
                        }
                        .nav-wrapper.active {
                            display: none !important;
                        }
                        .overlay.show {
                            display: none !important;
                        }
                    }
                `
        });
};

// Register the unified command
Cypress.Commands.add('percyTakeSnapshot', percyTakeSnapshot);