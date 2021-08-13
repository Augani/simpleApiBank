const uuid = require("uuid");
const supertest = require("supertest");

const app = require("./dist/app");

app.use(logErrors);
function logErrors(err, req, res, next) {
	console.error(err.stack);
	next(err);
}

const request = supertest(app);

describe("Create user with an account", () => {
	describe("POST /account/create", () => {
		test("returns a user with an account created", async () => {
			expect.assertions(2);

			const requestBody = {
                "firstName": "Keslie",
                "lastName": "Belshaw",
                "email": "kbelshaw0@ft.com",
                "phone": "832-708-9155",
                "address": "14133 Chinook Way",
                "dob": "11/26/2020",
                "identification": "10-051-1578"
              };
			const response = await request
				.post("/account/create")
				.send(requestBody);
            const parseResponse = response.body;
			expect(Object.keys(parseResponse)).toEqual(
                expect.arrayContaining(["_id", "firstName", "lastName", "dob", "address", "phone", "email", "identification", "accounts"])
              );
              expect(Object.keys(parseResponse.accounts[0])).toEqual(
                expect.arrayContaining(["_id", "number", "name", "created_at", "updated_at", "balance", "type", "owner"])
              );
		});

        test("returns a user with an account created 2", async () => {
			expect.assertions(2);

			const requestBody = {
                "firstName": "Ama",
                "lastName": "Barsaw",
                "email": "AmaBarsaw@ft.com",
                "phone": "832-708-9155",
                "address": "14133 Chinook Way",
                "dob": "11/26/2121",
                "identification": "10-056-1578"
              };
			const response = await request
				.post("/account/create")
				.send(requestBody);
            const parseResponse = response.body;
			expect(Object.keys(parseResponse)).toEqual(
                expect.arrayContaining(["_id", "firstName", "lastName", "dob", "address", "phone", "email", "identification", "accounts"])
              );
              expect(Object.keys(parseResponse.accounts[0])).toEqual(
                expect.arrayContaining(["_id", "number", "name", "created_at", "updated_at", "balance", "type", "owner"])
              );
		});
	});
});

