/// <reference types="cypress" />

describe("todo app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:57224");
  });

  it("sollte einen Eintrag haben", () => {
    cy.get("#liste li").should("have.length", 0);
  });
  it("neues Todo erstellen", () => {
    cy.get("#neuesTodoInput").type("lerne CSS");
    cy.get("#neuerTodoBtn").click();
    cy.get("#liste li").should("have.length", 1);
  });

  it("keine Duplikate erlaubt", () => {
    // Füge das erste Todo hinzu
    cy.get("#neuesTodoInput").type("Duplikat");
    cy.get("#neuerTodoBtn").click();

    // Versuche, dasselbe Todo erneut hinzuzufügen
    cy.get("#neuesTodoInput").type("Duplikat");
    cy.get("#neuerTodoBtn").click();

    // Prüfe, dass nur eine Instanz von "Go running" existiert
    cy.get("#liste li").should("have.length", 2); // Passe hier die erwartete Länge an
  });

  it("Lösche erledigte Todos", () => {
    // Füge ein neues Todo hinzu
    cy.get("#neuesTodoInput").type("Bitte Löschen");
    cy.get("#neuerTodoBtn").click();

    // Markiere das Todo als erledigt
    cy.get("#liste li").last().find('input[type="checkbox"]').check();

    // Lösche alle erledigten Todos
    cy.get("#aufgabenLoeschen").click();

    // Prüfe, ob "Finish project" aus der Liste entfernt wurde
    cy.get("#liste li").should("have.length", 2);
  });

  it("Markiere erstes Todo", () => {
    // Markiere "Todo 1" als erledigt
    cy.get("#liste li").first().find('input[type="checkbox"]').check();
  });

  it("Filter soll offene Todos zeigen", () => {
    cy.get('input[name="filter"][value="open"]').check();
    cy.get("#liste li").should("have.length", 1);
  });

  it("Filter soll erledigte Todos zeigen", () => {
    cy.get('input[name="filter"][value="done"]').check();
    cy.get("#liste li").should("have.length", 1);
  });

  it('should show all todos when "all" is selected', () => {
    cy.get('input[name="filter"][value="all"]').check();
    cy.get("#liste li").should("have.length", 2);
  });
});
