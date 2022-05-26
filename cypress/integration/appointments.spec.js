describe("should book an interview", () => {

  beforeEach(() => {
    cy.request("GET", "http://localhost:8001/api/debug/reset");
  })

  it("should visit root", () => {
    cy.visit("/");
    cy.contains("Monday");
    
    cy.get("[alt=Add]")
    .first()
    .click();

    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");

    cy.get("[alt='Sylvia Palmer']")
      .click();

    cy.contains("Save")
      .click();
      cy.contains(".appointment__card--show", "Lydia Miller-Jones");
      cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

});