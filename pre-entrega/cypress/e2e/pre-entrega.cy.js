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
    loginPage.iniciarSesion();
    loginPage.escribirUsuario(Cypress.env().usuario);
    loginPage.escribirContraseña(Cypress.env().password);
    loginPage.clickLogin();
    homePage.clickOnlineShopLink();
  });

  it("Validar Requisitos de la Pre-Entrega", () => {
    //Se agrega el primer producto
    productPage
      .clickAddButton(data.productos.producto1.name)
      .find(`[name="${data.productos.producto1.name}"]`)
      .click();
    productPage.clickCloseModal();

    //Agregando el mismo producto
    productPage
      .clickAddButton(data.productos.producto1.name)
      .find(`[name="${data.productos.producto1.name}"]`)
      .click();
    productPage.clickCloseModal();

    //Agregamos el segundo producto
    productPage
      .clickAddButton(data.productos.producto2.name)
      .find(`[name="${data.productos.producto2.name}"]`)
      .click();

    productPage.clickCloseModal();

    //Validamos el texto del boton GO TO SHOPPING CART
    productPage
      .obtenerTextoButtonCart()
      .should("have.text", "Go to shopping cart");
    //Nos dirigimos al carrito de compra
    productPage.clickGoToCart();

    ///Verificar nombre,cantidad,precio unitario y el precio total del producto
    //Verificamos la cantidad del producto
    shoppingCartPage.obtenerCantProducto(
      data.productos.producto1.name,
      data.productos.producto1.quantity
    );
    shoppingCartPage.obtenerCantProducto(
      data.productos.producto2.name,
      data.productos.producto2.quantity
    );

    //Verificamos el nombre del producto

    shoppingCartPage.obtenerNombreProduct(
      data.productos.producto1.price,
      data.productos.producto1.name
    );

    shoppingCartPage.obtenerNombreProduct(
      data.productos.producto2.price,
      data.productos.producto2.name
    );

    //Verificamos el precio unitario del producto

    shoppingCartPage.obtenerShowPrice(
      data.productos.producto1.name,
      data.productos.producto1.price
    );

    shoppingCartPage.obtenerShowPrice(
      data.productos.producto2.name,
      data.productos.producto2.price
    );

    //Verificamos el total unitario del producto

    shoppingCartPage.obtenerPriceTotal(
      data.productos.producto1.name,
      data.productos.producto1.price * data.productos.producto1.quantity
    );
    shoppingCartPage.obtenerPriceTotal(
      data.productos.producto2.name,
      data.productos.producto2.price * data.productos.producto2.quantity
    );

  

    //Verificamos la suma total del producto

    shoppingCartPage.visualizarTotal();

    data.precioTotal =
      data.productos.producto1.price * data.productos.producto1.quantity +
      data.productos.producto2.price * data.productos.producto2.quantity;

    shoppingCartPage.getTotalPrice(data.precioTotal);
  });
});
