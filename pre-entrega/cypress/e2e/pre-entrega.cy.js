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
    productPage
      .clickAddButton(data.producto1.nombre)
      .find(`[name="${data.producto1.nombre}"]`)
      .click();
    productPage.clickCloseModal();

    //Agregando el mismo producto
    productPage
      .clickAddButton(data.producto1.nombre)
      .find(`[name="${data.producto1.nombre}"]`)
      .click();
    productPage.clickCloseModal();

    //Agregamos el segundo producto
    productPage
      .clickAddButton(data.producto2.nombre)
      .find(`[name="${data.producto2.nombre}"]`)
      .click();

    productPage.clickCloseModal();

    //Validamos el texto del boton GO TO SHOPPING CART
    productPage
      .obtenerTextoButtonCart()
      .should("have.text", "Go to shopping cart");
    //Nos dirigimos al carrito de compra
    productPage.clickGoToCart();

    ///Verificar nombre,cantidad,precio unitario y el precio total del producto
    shoppingCartPage.obtenerCantProducto(
      data.producto1.nombre,
      data.producto1.cantidad
    );
    shoppingCartPage.obtenerCantProducto(
      data.producto2.nombre,
      data.producto2.cantidad
    );

    shoppingCartPage.obtenerNombreProduct(
      data.producto1.cantidad,
      data.producto1.nombre
    );

    shoppingCartPage.obtenerNombreProduct(
      data.producto2.cantidad,
      data.producto2.nombre
    );

    shoppingCartPage.obtenerShowPrice(
      data.producto1.nombre,
      data.producto1.precio
    );

    shoppingCartPage.obtenerShowPrice(
      data.producto2.nombre,
      data.producto2.precio
    );

    /*shoppingCartPage.obtenerSumaProducto(
      data.producto1.nombre,(data.producto1.preciototal = data.producto1.preciototal * 2)
      //`$ ${(data.producto1.preciototal = data.producto1.preciototal * 2)}`
    );*/
    cy.contains("p", data.producto1.nombre)
      .siblings("#totalPrice")
      .invoke("text")
      .then((text) => {
        expect(text).to.be.equal(
          `$ ${data.producto1.precio * data.producto1.cantidad}`
        );
      });

    cy.contains("p", data.producto2.nombre)
      .siblings("#totalPrice")
      .invoke("text")
      .then((text) => {
        expect(text).to.be.equal(
          `$ ${data.producto2.precio * data.producto2.cantidad}`
        );
      });

    shoppingCartPage.visualizarTotal();

    data.precioTotal =
      data.producto1.precio * data.producto1.cantidad +
      data.producto2.precio * data.producto2.cantidad;

    shoppingCartPage.getTotalPrice(data.precioTotal);
  });
});
