const uuid = require("uuid");
const supertest = require("supertest");

const app = require("./dist/app");

app.use(logErrors);
function logErrors(err, req, res, next) {
	console.error(err.stack);
	next(err);
}

const request = supertest(app);

let user1, user2;

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
            user1 = parseResponse
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
            user2 = parseResponse;
			expect(Object.keys(parseResponse)).toEqual(
                expect.arrayContaining(["_id", "firstName", "lastName", "dob", "address", "phone", "email", "identification", "accounts"])
              );
              expect(Object.keys(parseResponse.accounts[0])).toEqual(
                expect.arrayContaining(["_id", "number", "name", "created_at", "updated_at", "balance", "type", "owner"])
              );
		});

    test("creates a transfer from user 1 to user 2", async () => {
			expect.assertions(2);

			const requestBody = {
        "from":user1.accounts[0].number,
        "to": user2.accounts[0].number,
        "amount": 50,
        "pin":"1234"
      }
			const response = await request
				.post("/transfer/create")
				.send(requestBody);
            const parseResponse = response.body;
            expect(parseResponse).toHaveProperty('_id', 'account', 'amount', 'type')
            expect(parseResponse).toMatchObject({
              "account": user1.accounts[0].number,
              "amount": 50,
              "type": "debitTransfer"
          }); 
		});

    test("creates a transfer from user 1 to user 2 with wrong pin", async () => {
			expect.assertions(1);

			const requestBody = {
        "from":user1.accounts[0].number,
        "to": user2.accounts[0].number,
        "amount": 50,
        "pin":"12345"
      }
			const response = await request
				.post("/transfer/create")
				.send(requestBody);
        expect(response.status).toBe(403)
		});

    test("checks user 1 account balance after transfer", async () => {
			expect.assertions(1);
			const response = await request
				.get(`/account/balance/${user1.accounts[0].number}`)
				.send({});
        console.log(response.body);
        expect(response.body).toBe(50)
		});

    test("checks user 2 account balance after transfer", async () => {
			expect.assertions(1);
			const response = await request
				.get(`/account/balance/${user2.accounts[0].number}`)
				.send({});
        console.log(response.body);
        expect(response.body).toBe(150)
		});
	});
});

