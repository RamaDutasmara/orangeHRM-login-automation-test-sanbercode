/// <reference types="cypress" />

describe('API Testing Reqres.in with API Key', () => {

  const baseUrl = 'https://reqres.in/api';
  const apiKey = 'reqres-free-v1'; // key sesuai instruksi
  let token; // token dari hasil login

  // Login untuk mendapatkan token
  it('POST - Login Successful', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      headers: { 'x-api-key': apiKey },
      body: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      token = res.body.token;
      cy.log('Token: ' + token);
      expect(token).to.exist;
    });
  });

  // GET list users
  it('GET - List Users', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?page=2`,
      headers: {
        'x-api-key': apiKey,
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data).to.have.length.greaterThan(0);
    });
  });

  // GET single user
  it('GET - Single User', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users/2`,
      headers: {
        'x-api-key': apiKey,
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data.id).to.eq(2);
    });
  });

  // GET single user not found
  it('GET - Single User Not Found', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users/23`,
      headers: {
        'x-api-key': apiKey,
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  });

  // POST create user
  it('POST - Create User', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      headers: {
        'x-api-key': apiKey,
        Authorization: `Bearer ${token}`
      },
      body: { name: 'Rama', job: 'Tester' }
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.name).to.eq('Rama');
    });
  });

  // PUT update user
  it('PUT - Update User', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/users/2`,
      headers: {
        'x-api-key': apiKey,
        Authorization: `Bearer ${token}`
      },
      body: { name: 'Rama', job: 'QA Engineer' }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.job).to.eq('QA Engineer');
    });
  });

  // PATCH update user
  it('PATCH - Partial Update User', () => {
    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/users/2`,
      headers: {
        'x-api-key': apiKey,
        Authorization: `Bearer ${token}`
      },
      body: { job: 'Automation Engineer' }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.job).to.eq('Automation Engineer');
    });
  });

  // DELETE user
  it('DELETE - User', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/users/2`,
      headers: {
        'x-api-key': apiKey,
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      expect(res.status).to.eq(204);
    });
  });

  // POST - Register Successful
  it('POST - Register Successful', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      headers: { 'x-api-key': apiKey },
      body: { email: 'eve.holt@reqres.in', password: 'pistol' }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('token');
    });
  });

  // POST - Register Unsuccessful
  it('POST - Register Unsuccessful', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      headers: { 'x-api-key': apiKey },
      body: { email: 'sydney@fife' },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.error).to.eq('Missing password');
    });
  });

  // GET list resource
  it('GET - List Resource', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/unknown`,
      headers: {
        'x-api-key': apiKey,
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data).to.be.an('array');
    });
  });

  // GET single resource
  it('GET - Single Resource', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/unknown/2`,
      headers: {
        'x-api-key': apiKey,
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data.id).to.eq(2);
    });
  });

  // GET single resource not found
  it('GET - Single Resource Not Found', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/unknown/23`,
      headers: {
        'x-api-key': apiKey,
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  });

  // GET delayed response
  it('GET - Delayed Response', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?delay=3`,
      headers: {
        'x-api-key': apiKey,
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data).to.be.an('array');
    });
  });

  // POST - Unauthorized (token salah)
  it('POST - Unauthorized Example', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      headers: {
        'x-api-key': apiKey,
        Authorization: 'Bearer invalidtoken123'
      },
      body: { name: 'Fake', job: 'Spy' },
      failOnStatusCode: false
    }).then((res) => {
      expect([201, 401]).to.include(res.status);
    });
  });

});
