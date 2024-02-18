export class CheckOutPage {
    constructor() {
      this.checkOut = "#goCheckout";
      this.firstName = "#FirstName";
      this.lastName = "#lastName";
      this.cardNumber = "#cardNumber";
      this.purchase = '[data-cy="purchase"]';
      this.modalPurchase = "#name";
      this.creditCard = "#creditCard";
      this.totalPrice = "#totalPrice";
      this.buttonThank = '[data-cy="thankYou"]';
    }
  
    clickCheckOut() {
      cy.get(this.checkOut).click();
    }
    escribirFirstName(firstName) {
      return cy.get(this.firstName).type(firstName);
    }
    escribirLastName(lastName) {
      return cy.get(this.lastName).type(lastName);
    }
    escribirCardNumber(cardNumber) {
      return cy.get(this.cardNumber).type(cardNumber);
    }
    clickPurchase() {
      cy.get(this.purchase).click();
    }
    obtenerNameLast(nombre, apellido, mensaje) {
      return cy
        .get(this.modalPurchase)
        .invoke("text")
        .then((text) => {
          expect(text).to.be.equal(`${nombre} ${apellido} ${mensaje}`);
        });
    }
    obtenerProducto(cantidad, productName) {
      return cy
        .get(`[id="${productName}"]`)
        .invoke("text")
        .then((text) => {
          expect(text).to.be.equal(`${cantidad} x ${productName}`);
        });
    }
    obtenerCardNumber(cardNumber) {
      return cy
        .get(this.creditCard)
        .invoke("text")
        .then((text) => {
          expect(text).to.be.equal(`${cardNumber}`);
        });
    }
    obtenerPrecioTotal(mensaje, productPrice) {
      return cy
        .get(this.totalPrice)
        .invoke("text")
        .then((text) => {
          expect(text).to.be.equal(`${mensaje}${productPrice}`);
        });
    }
    clickButtonThankYou(){
      cy.get(this.buttonThank).click()
    }
  }
  