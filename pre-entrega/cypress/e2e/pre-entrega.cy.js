///<reference types="Cypress" />

import { HomePage } from "../support/pages/homePage";
import { LoginPage } from "../support/pages/loginPage";
import { ProductPage } from "../support/pages/productPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";

describe("Primera Entrega Validaciones", () => {
  let data = {};
  const loginPage = new LoginPage();
  const homePage = new HomePage();
  const productPage = new ProductPage();
  const shoppingCartPage = new ShoppingCartPage();

  before(() => {
    cy.fixture("datos-productos").then((datosFixture) => {
      data = datosFixture;
    });
  });

  beforeEach(() => {
    cy.visit("");
    cy.xpath("//span[@id='registertoggle']").dblclick();
    loginPage.escribirUsuario(Cypress.env().usuario);
    loginPage.escribirContraseña(Cypress.env().password);
    loginPage.clickLogin();
    homePage.clickOnlineShopLink();
  });

  it("Validar Requisitos de la Pre-Entrega", () => {
    //Se agrega el primer producto
    productPage.clickAddToCartProduct1();
    productPage.clickCloseModal();

    //Agregando el mismo producto
    productPage.clickAddToCartProduct1();
    productPage.clickCloseModal();

    //Agregamos el segundo producto
    productPage.clickAddCartProduct2();
    productPage.clickCloseModal();

    //Validamos el texto del boton GO TO SHOPPING CART
    productPage
      .obtenerTextoButtonCart()
      .should("have.text", "Go to shopping cart");
    //Nos dirigimos al carrito de compra
    productPage.clickGoToCart();

    ///Verificar nombre,cantidad,precio unitario y el precio total del producto
    shoppingCartPage
      .obtenerCantProducto1()
      .should("have.text", data.producto1.cantidad);
    shoppingCartPage
      .obtenerProductos1()
      .should("have.text", data.producto1.nombre);

    shoppingCartPage
      .obtenerNombreProduct1()
      .invoke("text")
      .should("match", /23.76/);

    ///// Verificamos el total precio del producto/////

    data.precio = data.producto1.precio * data.producto1.cantidad;

    shoppingCartPage
      .getTotalPrice1(data.producto1.precio * data.producto1.cantidad)
      .invoke("text").should("equal", `$ ${data.precio}`);
      
    //`name^=${data.precio}`
    ///Verificar nombre,cantidad,precio unitario y el precio total del producto
    shoppingCartPage
      .obtenerCantProducto2()
      .should("have.text", data.producto2.cantidad);
    shoppingCartPage
      .obtenerProductos2()
      .should("have.text", data.producto2.nombre);

    data.precio2= data.producto2.precio * data.producto2.cantidad

   shoppingCartPage
      .getTotalPrice2(data.producto2.precio * data.producto2.cantidad)
      .invoke("text").should("equal", `$ ${data.precio2}`);

    ///// Verificamos el total precio del producto/////

    //Visualizamos el total de los 2 productos

    shoppingCartPage.obtenerShowTotalPrice();

    data.precioTotal =
      data.producto1.precio * data.producto1.cantidad +
      data.producto2.precio * data.producto2.cantidad;

    shoppingCartPage.obtenerPrecioTotalProduct().should("contain", data.precioTotal);
    
  });
});
