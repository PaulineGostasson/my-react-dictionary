Cypress.Commands.add('waitForDataAndAssert', (expectedNounDefinitions) => {
    // Wait for the elements with the data-testid to be present
    cy.get('p[data-testid="def-list"]').should('have.length', expectedNounDefinitions.length);
  
    // Loop through each expected noun definition and assert its visibility
    expectedNounDefinitions.forEach((expectedNounDef) => {
      cy.contains('p[data-testid="def-list"]', expectedNounDef).should('be.visible');
    });
  });
  