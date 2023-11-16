describe("Bookmarks Component", () => {
  beforeEach(() => {
    // Visit the landing page before each test
    cy.visit("http://localhost:3000");
  });

  it("Adds and removes a bookmark", () => {
    // Simulate searching for a valid word
    cy.get('input[placeholder="Try it out! :3"]').type("example");
    cy.get('[data-testid="search-form"]').submit();

    // Intercept the request and mock the API response
    cy.intercept("GET", "**/api/v2/entries/en/example").as("getDefinition");

    // Click on the bookmark button
    cy.get('button[data-testid="bookmark-button"]').click();

    // Navigate back to the bookmarks page
    cy.get('button[data-testid="goBack-button"]').click();

    cy.get('[data-testid="bookmarkLib-button"]').click();

    // Ensure the bookmarked word is displayed
    cy.contains("example").should("be.visible");

    // Click on the bookmarked word to navigate back to the search page
    cy.contains("example").click();

    // Ensure the bookmark icon is in a bookmarked state
    cy.get('button[data-testid="bookmark-button"] svg').should('have.attr', 'data-testid', 'BookmarkIcon');

    // Click on the bookmark button to remove the bookmark
    cy.get('button[data-testid="bookmark-button"]').click();

    cy.go("back");

    // Assert that the URL has changed back to the landing page
    cy.url().should("eq", "http://localhost:3000/bookmarks");

    // Ensure the message "You have no bookmarks yet :c" is displayed
    cy.contains("You have no bookmarks yet :c").should("be.visible");
  });
});
