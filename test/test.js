const request = require('supertest');
const express = require('express');
const customerRouter = require('../src/router/customers.router');

const app = express();
app.use(express.json());
app.use('/customers', customerRouter);

let token;

describe('Customer API', () => {
  it('should signup a new customer', async () => {
    const response = await request(app)
      .post('/customers/signup')
      .send({
        name: 'rut',
        email: 'rut@example.com',
        password: 'password123',
        isAdmin: true
      });
    expect(response.statusCode).toBe(201);
  }, 1000000);

  it('should signin an existing customer', async () => {
    const response = await request(app)
      .post('/customers/signin')
      .send({
        email: 'rut@example.com',
        password: 'password123'
      });
    expect(response.statusCode).toBe(200);
    token = response.body.token;
  });

  it('should get all customers', async () => {
    const response = await request(app)
      .get('/customers')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });

  it('should get a customer by ID', async () => {
    const response = await request(app)
      .get('/customers/your_customer_id_here')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

  it('should add a new customer', async () => {
    const response = await request(app)
      .post('/customers/addCustomer')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'leah',
        email: 'leah@example.com',
        password: 'password456',
        isAdmin: false
      });
    expect(response.statusCode).toBe(201);
  });
});
