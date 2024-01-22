const constantes = require("../pages/constants");
export class ProductPage {
  constructor() {
    this.buttonCart = '.css-1ktw94t > [data-cy="goShoppingCart"]';
    this.addToCartButton1 = "#add-to-cart-1000";
    this.closeModal = "#closeModal";
    this.addToCartButton2 = "#add-to-cart-1001";
    this.goToCartButton = '.css-1ktw94t > [data-cy="goShoppingCart"]';
  }
  obtenerTextoButtonCart() {
    return cy.get(this.buttonCart);
  }
  clickAddToCartProduct1() {
    cy.get(this.addToCartButton1).should("be.visible").click();
  }
  clickCloseModal() {
    cy.get(this.closeModal).should("be.visible").click();
  }
  clickAddCartProduct2() {
    cy.get(this.addToCartButton2).should("be.visible").click();
  }

  clickGoToCart() {
    cy.get(this.goToCartButton, { timeout: constantes.TIMEOUT }).click();
  }
  
}
