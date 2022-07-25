import getNextFriday from "../../lib/getNextFriday";

describe("Search flights", () => {
  it("should select the cheapest flight from the list of flights from Poland to Dubai for 2 adults and 1 child for the nearest weekend", () => {
    const { day, month, year } = getNextFriday(new Date());

    // ignore errors coming from the app
    cy.on("uncaught:exception", (e) => {
      if (
        e.message.includes(
          "UIS (/api/uisprime/track)replied with HTTP status code: 404"
        ) ||
        e.message.includes("window.googletag.pubads is not a function")
      ) {
        return false;
      }
    });

    //Given
    cy.visit("/");
    //When I...
    // input origin and destination locations
    cy.get('[data-testid="location-field-leg1-origin-container"]')
      .click()
      .type("Warsaw (WAW - Frederic Chopin){enter}");
    cy.get('[data-testid="location-field-leg1-destination-container"]')
      .click()
      .type("Dubai (DXB-Dubai Intl.){enter}");
    // set number of travellers
    cy.get('[data-testid="travelers-field"]').click();
    cy.get('[data-testid="room-1"]').within(() => {
      cy.get("button").eq(1).click({ force: true });
      cy.get("button").eq(3).click({ force: true });
      cy.get("#child-age-input-0-0").select("7");
    });
    cy.get('[data-testid="guests-done-button"]').click({ force: true });
    // choose the nearest weekend date
    cy.get("#d1-btn").click();
    cy.get('[data-stid="date-picker-paging"]').eq(0).click();
    cy.get(".uitk-date-picker-menu-months-container").contains(month);
    cy.get(".uitk-date-picker-day").eq(day).click({ force: true });
    cy.get('[data-stid="apply-date-picker"]').click();
    // submit search request
    cy.get('[data-testid="submit-button"]').click({ force: true });

    // Then I
    // check if search results are visible
    cy.get('[data-test-id="search-results"]').should("be.visible");

    // When I
    // click the first flight on the list
    cy.get(`[data-stid="select-link"]`).eq(0).click({ force: true });
    // Then
    // the chepeast flight should be visible
    cy.get('[data-stid="flights-journey-available-fares"]').should(
      "be.visible"
    );
  });
});
