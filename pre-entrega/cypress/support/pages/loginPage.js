export class LoginPage {
  constructor() {
    this.session = "//span[@id='registertoggle']";
    this.userInput = "#user";
    this.passInput = "#pass";
    this.logInButton = "#submitForm";
  }

  iniciarSesion() {
    cy.xpath(this.session).dblclick();
  }
  escribirUsuario(usuario) {
    cy.get(this.userInput).type(usuario);
  }
  escribirContraseña(contraseña) {
    cy.get(this.passInput).type(contraseña);
  }
  clickLogin() {
    cy.get(this.logInButton).click();
  }
}
