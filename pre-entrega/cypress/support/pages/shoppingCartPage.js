export class ShoppingCartPage {
  constructor() {
    this.productQuantity = ":nth-child(2) > .css-1bhbsny > #productAmount";
    this.productName = "#productName";
    this.price = ":nth-child(2) > .css-1bhbsny > #unitPrice";

    this.productQuantity2 = ":nth-child(3) > .css-1bhbsny > #productAmount";
    this.productName2 = ":nth-child(3) > .css-1bhbsny > #productName";
    this.price2 = ":nth-child(3) > .css-1bhbsny > #unitPrice";
    this.showTotalPrice = "div.css-n1d5pa";
    this.precioTotalProduct = "#price > b";
  
  }

  obtenerShowTotalPrice() {
    cy.get(this.showTotalPrice).children(".css-1i1ynt3").click();
  }

  obtenerCantProducto1() {
    return cy.get(this.productQuantity);
  }
  obtenerProductos1() {
    return cy.get(this.productName);
  }
  obtenerNombreProduct1() {
    return cy.get(this.price);
  }
  getTotalPrice1(parcial1) {
    this.PriceParcial1 =`#totalPrice[name^='${parcial1}']`
    return cy.get(this.PriceParcial1);
  }

  /////////////////verificando el 2do producto//////////////////////////

  obtenerCantProducto2() {
    return cy.get(this.productQuantity2);
  }
  obtenerProductos2() {
    return cy.get(this.productName2);
  }
  obtenerNombreProduct2() {
    return cy.get(this.price2);
  }
 
  getTotalPrice2(parcial2) {
    this.PriceParcial2 =`:nth-child(3) > .css-1bhbsny > #totalPrice[name^='${parcial2}']`
    return cy.get(this.PriceParcial2);
  }
  obtenerPrecioTotalProduct(){
    return cy.get(this.precioTotalProduct);
  }
}
