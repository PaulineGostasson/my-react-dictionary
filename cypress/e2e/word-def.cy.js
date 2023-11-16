describe("WordDef Component", () => {

  it("Loads and displays definition data for a valid word", () => {
    // Simulate searching for a valid word
    cy.visit('http://localhost:3000');
    cy.get('input[placeholder="Try it out! :3"]').type("example");
    cy.get('[data-testid="search-form"]').submit();

      });
     
      it('should display the word', () => {
        cy.visit('http://localhost:3000/search/example');
         cy.get('h5').should('contain', 'example');
      });
     
      it('should display the bookmark button', () => {
        cy.visit('http://localhost:3000/search/example');
         cy.get('button[data-testid="bookmark-button"]').should('be.visible');
      });
     
      it('should display the phonetic audio button if available', () => {
        cy.visit('http://localhost:3000/search/example');
         cy.get('button[data-testid="audio-button"]').should('be.visible');
      });
     
      it('should add a bookmark when the bookmark button is clicked', () => {
        cy.visit('http://localhost:3000/search/example');
         cy.get('button[data-testid="bookmark-button"]').click();
         cy.get('button[data-testid="bookmark-button"] svg').should('have.attr', 'data-testid', 'BookmarkIcon');
      });
     
      it('should remove a bookmark when the bookmark button is clicked again', () => {
        cy.visit('http://localhost:3000/search/example');
         cy.get('button[data-testid="bookmark-button"]').click();
         cy.get('button[data-testid="bookmark-button"]').click();
         cy.get('button[data-testid="bookmark-button"] svg').should('have.attr', 'data-testid', 'BookmarkBorderIcon');
      });
    
    
     });
     
     describe('API Interception', () => {
      it('should fetch the definition data for a given word', () => {
         cy.intercept("GET", "**/api/v2/entries/en/example").as('fetchDefinition');
     
         cy.visit('http://localhost:3000/search/example');
     
         cy.wait('@fetchDefinition').its('response.statusCode').should('eq', 200);
      });
     });