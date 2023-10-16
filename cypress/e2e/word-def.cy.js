describe("WordDef Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // Visit a valid route (e.g., search page) before each test
  });

  it("Loads and displays definition data for a valid word", () => {
    // Simulate searching for a valid word
    cy.get('input[placeholder="Try it out! :3"]').type("example");
    cy.get('[data-testid="search-form"]').submit();

    cy.intercept(
      "GET",
      `https://api.dictionaryapi.dev/api/v2/entries/en/example`,
      {
        fixture: "example.json", // Mock API response for a valid word
      }
    ).as("getDefinition");

    cy.wait("@getDefinition").its("response.statusCode").should("eq", 200);

    // Add assertions for your component's UI elements here
    cy.contains("Example").should("be.visible");
    cy.contains("Part of Speech").should("be.visible");
    // Add more assertions as needed
  });

  it("Handles a non-existent word gracefully", () => {
    // Simulate searching for a non-existent word
    cy.get('input[placeholder="Try it out! :3"]').type("nonexistentword");
    cy.get('[data-testid="search-form"]').submit();

    cy.intercept("GET", "**/api/v2/entries/en/nonexistentword", {
      statusCode: 404,
      body: {},
    }).as("getDefinition");

    cy.wait("@getDefinition").its("response.statusCode").should("eq", 404);

    // Add assertions for displaying an error message or returning to the search page
    cy.contains("Sorry, the word does not exist.").should("be.visible");
    cy.contains("Return to Search").should("be.visible").click(); // Verify a button to return to the search page
  });
});
