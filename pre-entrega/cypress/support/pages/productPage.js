const constantes = require("../pages/constants");
export class ProductPage {
  constructor() {
    this.buttonCart = '.css-1ktw94t > [data-cy="goShoppingCart"]';
    this.closeModal = "#closeModal";
    this.addButton = "add-to-cart-";
    this.goToCartButton = '.css-1ktw94t > [data-cy="goShoppingCart"]';
  }
  obtenerTextoButtonCart() {
    return cy.get(this.buttonCart);
  }

  clickAddButton(product) {
    return cy.contains("p", product).siblings("div");
  }
  clickCloseModal() {
    cy.get(this.closeModal).should("be.visible").click();
  }
  clickGoToCart() {
    cy.get(this.goToCartButton, { timeout: constantes.TIMEOUT }).click();
  }
}
