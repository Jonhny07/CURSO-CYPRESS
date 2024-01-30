export class ShoppingCartPage {
  constructor() {
    this.productQuantity = ":nth-child(2) > .css-1bhbsny > #productAmount";
    this.productName = "#productName";
    //this.price = ":nth-child(2) > .css-1bhbsny > #unitPrice";
    this.price = "#unitPrice";
    this.buttonShow = "div.css-n1d5pa";
    this.precioTotalProduct = "#price > b";
  }

  obtenerCantProducto(nombre, cantidad) {
    //return cy.get(this.productQuantity);
    return cy
      .contains("#productName", nombre)
      .prev("#productAmount")
      .invoke("text")
      .then((text) => {
        expect(text).to.be.equal(`${cantidad}`);
      });
  }

  obtenerNombreProduct(cantidad, nombre) {
    return cy
      .contains("#productAmount", cantidad)
      .siblings(this.productName)
      .invoke("text")
      .then((text) => {
        expect(text).to.be.equal(`${nombre}`);
      });
  }
  obtenerShowPrice(nombre, precio) {
    //return cy.get(this.showTotalPrice).children(".css-1i1ynt3").click();
    return cy
      .contains("#productName", nombre)
      .siblings(this.price)
      .invoke("text")
      .then((text) => {
        expect(text).to.be.equal(`$ ${precio}`);
      });
  }

  visualizarTotal() {
    cy.get(this.buttonShow)
      .children("button")
      .contains("Show total price")
      .click();
  }

  getTotalPrice(sumaTotal) {
    return cy
      .get(this.precioTotalProduct)
      .invoke("text")
      .then((text) => {
        expect(text).to.be.equal(`${sumaTotal}`);
      });
  }
}
