// cypress/pages/LoginPage.js
class LoginPage {
  elements = {
    usernameInput: () => cy.get('input[name="username"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    loginButton: () => cy.get('button[type="submit"]'),
    forgotPasswordLink: () => cy.get('.orangehrm-login-forgot-header'),
    alertMessage: () => cy.get('.oxd-alert-content-text'),
    logoutMenu: () => cy.get('.oxd-userdropdown-tab'),
    dashboardHeader: () => cy.get('.oxd-topbar-header-breadcrumb > h6')
  };

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  login(username, password) {
    if (username) this.elements.usernameInput().type(username);
    if (password) this.elements.passwordInput().type(password);
    this.elements.loginButton().click();
  }

  logout() {
    this.elements.logoutMenu().click({ force: true });
    cy.contains('Logout').click({ force: true });
  }

  validateDashboard() {
    cy.url().should('include', '/dashboard');
    this.elements.dashboardHeader().should('contain', 'Dashboard');
  }

  validateLoginError(message) {
    this.elements.alertMessage().should('contain', message);
  }
}

export default new LoginPage();

