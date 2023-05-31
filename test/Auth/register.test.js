const request = require('supertest');
const app = require('../../app');
const {User} = require('../../app/models')

describe('AUTH', () => {
	afterAll(async () => {
		const lastUser = await User.findOne({order: [['createdAt', 'DESC']]})
		await lastUser.destroy()
	})
	test("REGISTER /v1/auth/register", async () => {
		const res = await request(app).post("/v1/auth/register").send({
			name: 'New Customer1',
			email: 'newcustomer1@binar.co.id',
			password: '123456'
		});
		expect(res.statusCode).toBe(201);
	});
});

describe('ERROR AUTH', () => {
	test("REGISTER /v1/auth/register", async () => {
		const res = await request(app).post("/v1/auth/register").send({
			name: 'Kidman Den',
			email: 'kidman@binar.co.id',
			password: '123456'
		});
		expect(res.statusCode).toBe(422);
	});
})