describe("Bookmarks Component", () => {
  beforeEach(() => {
    // Assuming your bookmarks data is available at this URL
    cy.visit("http://localhost:3000/bookmarks"); // Visit the bookmarks page before each test
  });

  it("Displays the bookmarks header", () => {
    // Ensure the header is visible
    cy.contains("Bookmarks").should("be.visible");
  });

  it("Displays a message when there are no bookmarks", () => {
    // If there are no bookmarks, ensure the "You have no bookmarks yet" message is displayed
    cy.contains("You have no bookmarks yet :c").should("be.visible");
  });

  it("Displays bookmarks when there are some", () => {
    // Assuming you have some test bookmarks data
    const bookmarks = {
      word1: true,
      word2: true,
      word3: true,
    };

    // Stub the bookmarks data as a fixture or use cy.route() to mock the API request
    // You can also set the bookmarks in your app before visiting the page

    // Ensure the bookmarks are displayed
    cy.wrap(Object.keys(bookmarks)).each((bookmark) => {
      cy.contains(bookmark).should("be.visible");
    });
  });

  it("Navigates to the search page when a bookmark is clicked", () => {
    // Assuming you have a test bookmark like "example"
    const bookmark = "example";

    // Stub the bookmarks data as a fixture or use cy.route() to mock the API request
    // You can also set the bookmarks in your app before visiting the page

    // Click on the bookmark
    cy.contains(bookmark).click();

    // Assert that the URL has changed to the search page for the bookmarked word
    cy.url().should("include", `/search/${bookmark}`);
  });

  it("Navigates back to the homepage when the back button is clicked", () => {
    // Click on the back button
    cy.get('button[data-testid="back-button"]').click();

    // Assert that the URL has changed back to the homepage
    cy.url().should("eq", "http://localhost:3000/");
  });
});
