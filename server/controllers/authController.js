const { dbConnection } = require('../db_connection/dbConnection');

const loginPage = (req, res) => {
    try{
		const msg = req.query.data;
		res.status(200).render('login', {msg: msg});
	}
	 catch(err){
		console.log(`Error: ${err}`)
	 }
}
// login submit
const loginUser = async (req, res) => {
    try{
		const formData = req.body;
		console.log(`Username: ${formData.username}, Password: ${formData.password}`);
		const db = dbConnection;
		db.promise().query(`SELECT * FROM users WHERE username = '${formData.username}';`)
		.then( async ([results, fields]) => {

			// this is from a php api data 
			console.log('OLD hash:', results[0].password);
			var hash = results[0].password;
			var bcrypt = require('bcrypt');
			hash = hash.replace(/^\$2y(.+)$/i, '$2a$1');

			// checks if the password is good
			const match = await bcrypt.compare(formData.password, hash);
			console.log('NEW hash:', hash);
			console.log('Password match: ', match);
			if(match){
				res.redirect('/home');
			}
			else{
				const dataToSend = `Username and Password doesn't match!`;
				res.redirect(`/login?data=${encodeURIComponent(dataToSend)}`);
			}
			
		})
		.catch(error => {
			const dataToSend = `Username does not exist`;
			res.redirect(`/login?data=${encodeURIComponent(dataToSend)}`);
		});
	}
	 catch(err){
		console.log(`Error: ${err}`);
	 }
}

// exports
module.exports = {
	loginPage,
	loginUser
}