const request = require('supertest')
const app = require('../../app')

let accessToken
let wrongAccessToken
let tokenUserWithoutRole
beforeAll(async () => {
	const res = await request(app).post("/v1/auth/login").send({
		email: 'johnny@binar.co.id',
		password: '123456'
	})
	accessToken = res.body.accessToken
	wrongAccessToken = accessToken + 'testing'

	const res2 = await request(app).post("/v1/auth/login").send({
		email: 'kidman@binar.co.id',
		password: '123456'
	})
	tokenUserWithoutRole = res2.body.accessToken
})

describe('AUTH', () => {
	test("ME /v1/auth/whoami", async () => {
		const res = await request(app).get("/v1/auth/whoami")
			.set('Authorization', `Bearer ${accessToken}`)
		expect(res.statusCode).toBe(200)
	});
})

describe('ERROR AUTH', () => {
	test("UNAUTHORIZE 1 /v1/auth/whoami", async () => {
		const res = await request(app).get("/v1/auth/whoami")
			.set('Authorization', `Bearer ${wrongAccessToken}`)
		expect(res.statusCode).toBe(401)
		expect(res.body).toBeDefined()
	});
	test("UNAUTHORIZE 2 /v1/auth/whoami", async () => {
		const res = await request(app).get("/v1/auth/whoami")
			.set('Authorization', `Bearer ${tokenUserWithoutRole}`)
		expect(res.statusCode).toBe(401)
		expect(res.body).toBeDefined()
	});
})