///<reference types="Cypress"/>
import { HomePage } from "../support/pages/homePage";
import { ProductPage } from "../support/pages/productPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";
import { CheckOutPage } from "../support/pages/checkOutPage";
describe("template spec", () => {
  let data = {};
  let datosTarjetas = {};
  const homePage = new HomePage();
  const productPage = new ProductPage();
  const shoppingCartPage = new ShoppingCartPage();
  const checkOutPage = new CheckOutPage();

  before(() => {
    cy.fixture("datos-productos").then((datosFixture) => {
      data = datosFixture;
    });
    cy.fixture("checkOut").then((datosFixture) => {
      datosTarjetas = datosFixture;
    });
  });

  beforeEach(() => {
    cy.registerWithAPI();
    cy.loginWithAPI("pruebasIT1", "123456!");
    cy.visit("");
    homePage.clickOnlineShopLink();
  });

  /////////////////////////////Empieza el IT/////////////////////////////////////////////////////////

  it("Entrega Final - Test Requisitos", () => {
    //Se agrega el primer producto
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

    //Verificamos la suma total del producto

    shoppingCartPage.visualizarTotal();
    data.precioTotal =
      data.productos.producto1.price + data.productos.producto2.price;

    shoppingCartPage.getTotalPrice(data.precioTotal);

    checkOutPage.clickCheckOut();
    checkOutPage.escribirFirstName(datosTarjetas.datos.firstName);
    checkOutPage.escribirLastName(datosTarjetas.datos.lastName);
    checkOutPage.escribirCardNumber(datosTarjetas.datos.cardNumber);
    checkOutPage.clickPurchase();
    checkOutPage.obtenerNameLast(
      datosTarjetas.datos.firstName,
      datosTarjetas.datos.lastName,
      datosTarjetas.MensajeSucces.textoUno
    );
    checkOutPage.obtenerProducto(
      data.productos.producto1.name
    );
    checkOutPage.obtenerProducto(
      data.productos.producto2.name
    );
    checkOutPage.obtenerCardNumber(datosTarjetas.datos.cardNumber);
    checkOutPage.obtenerPrecioTotal(
      datosTarjetas.MensajeSucces.textoPrecio,
      data.precioTotal
    );
    checkOutPage.clickButtonThankYou()
  });

  afterEach(() => {
    cy.request({
      method: "DELETE",
      url: `https://pushing-it.onrender.com/api/deleteuser/pruebasIT1`,
    }).then((respuesta) => {
      expect(respuesta.status).to.be.equal(202);
    });
  });
});
