export class ShoppingCartPage {
  constructor() {
    this.productQuantity = "#productAmount";
    this.productName = "#productName";
    this.price = "#unitPrice";
    this.totalPrice = "#totalPrice";
    this.buttonShow = "div.css-n1d5pa";
    this.precioTotalProduct = "#price > b";
  }

  obtenerCantProducto(nombre, cantidad) {
    //return cy.get(this.productQuantity);
    return cy
      .contains(this.productName, nombre)
      .prev(this.productQuantity)
      .invoke("text")
      .then((text) => {
        expect(text).to.be.equal(`${cantidad}`);
      });
  }

  obtenerNombreProduct(cantidad, nombre) {
    return cy
      .contains(this.productQuantity, cantidad)
      .siblings(this.productName)
      .invoke("text")
      .then((text) => {
        expect(text).to.be.equal(`${nombre}`);
      });
  }
  obtenerShowPrice(nombre, precio) {
    //return cy.get(this.showTotalPrice).children(".css-1i1ynt3").click();
    return cy
      .contains(this.productName, nombre)
      .siblings(this.price)
      .invoke("text")
      .then((text) => {
        expect(text).to.be.equal(`$ ${precio}`);
      });
  }

  /*obtenerSumaProducto(nombre, precio) {
    return cy
      .contains("p", data.producto.name)
      .siblings("#totalPrice")
      .find(`[name="$ ${data.producto.}"]`);

    cy.contains("p", data.producto.name)
      .siblings("div")
      .find(`[id="add-to-cart-${data.producto.id}"]`)
      .click();
  }*/
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
