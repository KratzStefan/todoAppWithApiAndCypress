/// <reference types="cypress" />

describe("todo app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:64003");
  });

  it("sollte einen Eintrag haben", () => {
    cy.get("#liste li").should("have.length", 0);
  });
  it("neues Todo erstellen", () => {
    cy.get("#neuesTodoInput").type("lerne CSS");
    cy.get("#neuerTodoBtn").click();
    cy.get("#liste li").should("have.length", 1);
  });
});
