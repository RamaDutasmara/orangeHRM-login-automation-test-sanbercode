// Abaikan error internal dari OrangeHRM agar test tetap jalan
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('OrangeHRM Login Automation with Intercept - Rama Dutasmara', () => {
  const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
  const apiUrl = '**/auth/validate';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  // ==============================
  // ✅ POSITIVE TEST CASES
  // ==============================

  it('TC_POS_001 - Login dengan kredensial valid', () => {
    cy.intercept('POST', apiUrl).as('loginReq');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginReq').then((intercept) => {
      expect([200, 302]).to.include(intercept.response.statusCode);
  });
    cy.url().should('include', '/dashboard');
    cy.get('.oxd-topbar-header-breadcrumb > h6').should('contain', 'Dashboard');
  });

  it('TC_POS_002 - Tombol Login aktif saat field terisi', () => {
    cy.intercept('POST', apiUrl).as('loginBtn');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('TC_POS_003 - Link Forgot your password tampil', () => {
    cy.intercept('GET', '**/requestPasswordResetCode').as('forgotLink');

    cy.get('.orangehrm-login-forgot-header').should('be.visible');
  });

  it('TC_POS_004 - Logout berhasil kembali ke halaman login', () => {
    cy.intercept('POST', apiUrl).as('loginSuccess');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginSuccess').then((intercept) => {
      expect([200, 302]).to.include(intercept.response.statusCode);
  });
    cy.get('.oxd-userdropdown-tab', { timeout: 10000 }).click();
    cy.contains('Logout').click({ force: true });

    cy.url().should('include', '/auth/login');
    cy.get('button[type="submit"]').should('be.visible');
  });

  // ==============================
  // ❌ NEGATIVE TEST CASES
  // ==============================

  it('TC_NEG_001 - Login gagal dengan username salah', () => {
    cy.intercept('POST', apiUrl).as('invalidUser');

    cy.get('input[name="username"]').type('Adminn');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@invalidUser').then((intercept) => {
      expect([200, 302]).to.include(intercept.response.statusCode);
  });
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  it('TC_NEG_002 - Login gagal dengan password salah', () => {
    cy.intercept('POST', apiUrl).as('invalidPass');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('salah123');
    cy.get('button[type="submit"]').click();

    cy.wait('@invalidPass').then((intercept) => {
      expect([200, 302]).to.include(intercept.response.statusCode);
  });
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  it('TC_NEG_003 - Login gagal dengan field kosong', () => {
    cy.intercept('POST', apiUrl).as('emptyField');

    cy.get('button[type="submit"]').click();
    cy.wait(1000);

    cy.get('form').within(() => {
      cy.contains('Required').should('exist');
    });
  });

  it('TC_NEG_004 - Login gagal dengan username berisi simbol', () => {
    cy.intercept('POST', apiUrl).as('symbolUser');

    cy.get('input[name="username"]').type('@@@');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@symbolUser').then((intercept) => {
      expect([200, 302]).to.include(intercept.response.statusCode);
  });
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  it('TC_NEG_005 - Login gagal dengan hanya mengisi username saja', () => {
    cy.intercept('POST', apiUrl).as('missingPass');

    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();

    cy.wait(1000);
    cy.get('form').within(() => {
      cy.contains('Required').should('exist');
    });
  });
});
