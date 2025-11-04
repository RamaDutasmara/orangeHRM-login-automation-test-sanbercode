// Abaikan error internal dari OrangeHRM agar test tetap jalan
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

import LoginPage from '../../pages/LoginPage';

describe('OrangeHRM Login Automation with POM and Intercept - Rama Dutasmara', () => {
  const apiUrl = '**/auth/validate';

  beforeEach(() => {
    LoginPage.visit();
  });

  // ==============================
  // ✅ POSITIVE TEST CASES
  // ==============================

  it('TC_POS_001 - Login dengan kredensial valid', () => {
    cy.intercept('POST', apiUrl).as('loginReq');

    LoginPage.login('Admin', 'admin123');
    cy.wait('@loginReq').then((intercept) => {
      expect([200, 302]).to.include(intercept.response.statusCode);
    });

    LoginPage.validateDashboard();
  });

  it('TC_POS_002 - Tombol Login aktif saat field terisi', () => {
    cy.intercept('POST', apiUrl).as('loginBtn');

    LoginPage.elements.usernameInput().type('Admin');
    LoginPage.elements.passwordInput().type('admin123');
    LoginPage.elements.loginButton().should('not.be.disabled');
  });

  it('TC_POS_003 - Link Forgot your password tampil', () => {
    cy.intercept('GET', '**/requestPasswordResetCode').as('forgotLink');
    LoginPage.elements.forgotPasswordLink().should('be.visible');
  });

  it('TC_POS_004 - Logout berhasil kembali ke halaman login', () => {
    cy.intercept('POST', apiUrl).as('loginSuccess');

    LoginPage.login('Admin', 'admin123');
    cy.wait('@loginSuccess').then((intercept) => {
      expect([200, 302]).to.include(intercept.response.statusCode);
    });

    LoginPage.logout();
    cy.url().should('include', '/auth/login');
    LoginPage.elements.loginButton().should('be.visible');
  });

  // ==============================
  // ❌ NEGATIVE TEST CASES
  // ==============================

  it('TC_NEG_001 - Login gagal dengan username salah', () => {
    cy.intercept('POST', apiUrl).as('invalidUser');

    LoginPage.login('Adminn', 'admin123');
    cy.wait('@invalidUser').then((intercept) => {
      expect([200, 302]).to.include(intercept.response.statusCode);
    });

    LoginPage.validateLoginError('Invalid credentials');
  });

  it('TC_NEG_002 - Login gagal dengan password salah', () => {
    cy.intercept('POST', apiUrl).as('invalidPass');

    LoginPage.login('Admin', 'salah123');
    cy.wait('@invalidPass').then((intercept) => {
      expect([200, 302]).to.include(intercept.response.statusCode);
    });

    LoginPage.validateLoginError('Invalid credentials');
  });

  it('TC_NEG_003 - Login gagal dengan field kosong', () => {
    cy.intercept('POST', apiUrl).as('emptyField');

    LoginPage.elements.loginButton().click();
    cy.wait(1000);

    cy.get('form').within(() => {
      cy.contains('Required').should('exist');
    });
  });

  it('TC_NEG_004 - Login gagal dengan username berisi simbol', () => {
    cy.intercept('POST', apiUrl).as('symbolUser');

    LoginPage.login('@@@', 'admin123');
    cy.wait('@symbolUser').then((intercept) => {
      expect([200, 302]).to.include(intercept.response.statusCode);
    });

    LoginPage.validateLoginError('Invalid credentials');
  });

  it('TC_NEG_005 - Login gagal dengan hanya mengisi username saja', () => {
    cy.intercept('POST', apiUrl).as('missingPass');

    LoginPage.elements.usernameInput().type('Admin');
    LoginPage.elements.loginButton().click();

    cy.wait(1000);
    cy.get('form').within(() => {
      cy.contains('Required').should('exist');
    });
  });
});

