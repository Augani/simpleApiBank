import express from 'express';
const app = express();
import Database from './db';
import AccountHolder, { HolderBodyRequest } from './accountHolder';
import Account from './account';
import Transfer from './transfer';

app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
	res.send("Welcome! Please follow README.md");
});

/**
 * create account where users can create an account with their details and initial deposit
 */
app.post("/account/create", async (req: express.Request, res: express.Response) => {
	let accountInformation: HolderBodyRequest = req.body;
	if(!accountInformation.firstName){
		res.status(400).send("Please provide first name");
		return;
	}
	if(!accountInformation.lastName){
		res.status(400).send("Please provide last name");
		return;
	}
	if(!accountInformation.email){
		res.status(400).send("Please provide email");
		return;
	}
	if(!accountInformation.address){
		res.status(400).send("Please provide Address");
		return;
	}
	if(!accountInformation.phone){
		res.status(400).send("Please provide phone number");
		return;
	}
	if(!accountInformation.dob){
		res.status(400).send("Please provide Date of Birth");
		return;
	}
	if(!accountInformation.identification){
		res.status(400).send("Please provide identification");
		return;
	}
	
	let userAccount: AccountHolder = new AccountHolder(
		accountInformation.firstName, accountInformation.lastName, accountInformation.dob, accountInformation.address, accountInformation.phone, accountInformation.email, accountInformation.identification
	);
	let newAccount = new Account(userAccount.getName(), userAccount.getUserId());
	let resp = Database.add('AccountHolder', userAccount).add('Account', newAccount).getById('Account', newAccount._id);
	if (!resp) {
		res.status(500).send("Internal Server Error")
	} else {
		userAccount.addAccount(resp);
		res.json(userAccount);
	}
});

//create api route to get account balance
app.get("/account/balance/:accountId", async (req: express.Request, res: express.Response) => {
	let accountId = req.params.accountId;
	let userAccount = Database.getAccountByNumber(accountId);
	if (!userAccount) {
		res.status(404).send("Account not found");
	} else {
		res.json(userAccount.getBalance());
	}
});

//create api route to get transfers of an account
app.get("/account/transfers/:accountId", async (req: express.Request, res: express.Response) => {
	let accountId = req.params.accountId;
	let transfers  = Database.getAllBy('Transfer', 'account', "equalTo", accountId);
	if (!transfers || !transfers.length) {
		res.status(404).send("Transfers not found");
	} else {
		res.json(transfers);
	}
});


/**
 * users can transfer money from their account to another account
 */
app.post("/transfer/create", (req: express.Request, res: express.Response) => {
	//transfer money from account to account
	let transferInformation = req.body;
	let fromAccount = Database.getAccountByNumber(transferInformation.from);
	if (!fromAccount) {
		res.status(404).send("Account not found");
		return;
	}
	let toAccount = Database.getAccountByNumber(transferInformation.to);
	if (!toAccount) {
		res.status(404).send("Account not found");
		return;
	}
	if(fromAccount.pin !== transferInformation.pin) {
		res.status(403).send("Invalid pin");
		return;
	}
	let fromAccountBalance = fromAccount.getBalance();
	if (fromAccountBalance < transferInformation.amount) {
		res.status(400).send("Insufficient funds");
		return;
	}
	let debitTransfer = new Transfer(fromAccount, transferInformation.amount, "debitTransfer");
	let creditTransfer = new Transfer(toAccount, transferInformation.amount, "creditTransfer");
	let resp = Database.add('Transfer', debitTransfer.getTransferInfo()).add('Transfer', creditTransfer.getTransferInfo()).getById('Transfer', debitTransfer._id);
	if (!resp) {
		res.status(500).send("Internal Server Error");
	}
	else {
		fromAccount.debit(transferInformation.amount);
		toAccount.credit(transferInformation.amount);
		try{
			Database.Update('Account', fromAccount).Update('Account', toAccount);
			res.json(resp);
		}catch(e){
			console.log(e);
			res.status(500).json("An error occured while transferring funds");
		}
		
	}

});

const port = 3005;



app.listen(port, () => {
	console.log(`Express server listening at http://localhost:${port}`);
});


module.exports = app;