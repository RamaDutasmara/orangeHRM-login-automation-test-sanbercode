Cypress.on('uncaught:exception', (err, runnable) => {
  // Mengabaikan error JavaScript dari aplikasi OrangeHRM
  return false;
});

describe('OrangeHRM Login Automation Test', () => {
  const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  // ==============================
  // POSITIVE CASES
  // ==============================

  it('TC_POS_001 - Login dengan kredensial valid', () => {
    cy.get('input[name="username"]').type('Admin'); // Selector dari file
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.get('.oxd-topbar-header-breadcrumb > h6').should('contain', 'Dashboard');
  });

  it('TC_POS_002 - Pastikan halaman login tampil normal saat dibuka', () => {
    cy.get('.orangehrm-login-logo > img').should('be.visible'); // Logo
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('TC_POS_003 - Verifikasi tombol "Login" aktif saat field terisi', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('TC_POS_004 - Verifikasi link "Forgot your password?" tampil', () => {
    cy.get('.orangehrm-login-forgot-header').should('be.visible');
  });

  it('TC_POS_005 - Verifikasi logout kembali ke halaman login', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');

  // Tunggu menu user muncul
    cy.get('.oxd-userdropdown-tab', { timeout: 10000 }).should('be.visible').click();

  // Klik Logout (pastikan muncul)
    cy.contains('Logout').click({ force: true });

  // Verifikasi kembali ke login
    cy.url().should('include', '/auth/login');
    cy.get('button[type="submit"]').should('be.visible');
  });


  // ==============================
  // NEGATIVE CASES
  // ==============================

  it('TC_NEG_001 - Login gagal dengan username salah', () => {
    cy.get('input[name="username"]').type('Adminn');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  it('TC_NEG_002 - Login gagal dengan password salah', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('salah123');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  it('TC_NEG_003 - Login gagal dengan field kosong', () => {
    cy.get('button[type="submit"]').click();

    cy.get('form').within(() => {
    cy.contains('Required').should('exist');
    });
  });


  it('TC_NEG_004 - Login gagal dengan username berisi simbol', () => {
    cy.get('input[name="username"]').type('@@@');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  it('TC_NEG_005 - Login gagal dengan hanya mengisi username saja', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();

    // Pesan error "Required" harus muncul di field password
    cy.get('form').within(() => {
      cy.contains('Required').should('exist');
    });
  });

});
