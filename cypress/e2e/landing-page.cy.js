// cypress/integration/landing-page.spec.js
describe("LandingPage Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/"); // Visit the landing page before each test
  });

  it("Test so the Header is displayed", () => {
    cy.contains("Welcome to Dictionary").should("be.visible");
  });

  it("Test the valid word submit", () => {
    cy.get('input[placeholder="Try it out! :3"]').type("example");
    cy.get('[data-testid="search-form"]').submit();

    // Check if the error message is not displayed
    cy.contains("Please enter a word before searching.").should("not.exist");
  });

  it("Test error message so it works", () => {
    const form = cy.get('input[placeholder="Try it out! :3"]').closest("form");

    // Submit the form without entering a word
    form.submit();

    // Check if the error message is displayed
    cy.contains("Please enter a word before searching.").should("be.visible");
  });
});
