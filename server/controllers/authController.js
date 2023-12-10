const { dbConnection } = require('../db_connection/dbConnection');
const jwt = require('jsonwebtoken');

// login page
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
		const db = dbConnection;
		db.promise().query(`SELECT u.username, u.id, u.password, r.firstname, r.lastname FROM users u LEFT JOIN residents r ON u.username = r.username WHERE u.username = '${formData.username}' AND r.deathdate IS NULL AND r.account_status = 1;`)
		.then( async ([results, fields]) => {

			// this is from a php api data 
			var hash = results[0].password;
			var bcrypt = require('bcrypt');
			hash = hash.replace(/^\$2y(.+)$/i, '$2a$1');

			// checks if the password is good
			const match = await bcrypt.compare(formData.password, hash);
			if(match){
				const userData = {
					id: results[0].id,
					username: results[0].username,
					firstName: results[0].firstname,
					lastName: results[0].lastname,
					password: results[0].password
				}
				// generate some jwt
				var jwt = require('jsonwebtoken');
				var token = jwt.sign({ user: userData }, process.env.SECRET);
				res.cookie('token', token, { httpOnly: true });
				res.redirect('/home');
			}
			else{
				const dataToSend = `User ${results[0].username} password is incorrect!`;
				res.redirect(`/login?data=${encodeURIComponent(dataToSend)}`);
			}
			
		})
		.catch(error => {
			const dataToSend = `User does not exist`;
			res.redirect(`/login?data=${encodeURIComponent(dataToSend)}`);
		});
	}
	 catch(err){
		console.log(`Error: ${err}`);
	 }
}

const password = async (req, res) =>{
	var bcrypt = require('bcrypt');
	const saltRounds = 10;
	const password = '123';
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	res.json({hashPass: hashedPassword});
}

//  change password
const changePassword = async (req, res) => {

	const token = req.cookies.token;
	try{
		// this is from a php api data 
		const decoded = jwt.verify(token, process.env.SECRET);
		const pass = req.body.currentPassword;
		var hashPass = decoded.user.password
		var bcrypt = require('bcrypt');
		hashPass = hashPass.replace(/^\$2y(.+)$/i, '$2a$1');
		const match = await bcrypt.compare(pass, hashPass);

		if(match){
			if(req.body.newPassword === req.body.confirmNewPassword){
				const newPass = req.body.confirmNewPassword;
				const hashedNewPass = await bcrypt.hash(newPass, 10);
				console.log('Password matched and updated!');
				console.log(hashedNewPass);
				// const db = dbConnection;
				// db.promise().query(`UPDATE users SET password = (${hashedNewPass}) WHERE username = ${decoded.user.username}`);
			}
			return res.json({res: 200});
		}else{
			return res.json({res: 500});
		}
	}
	catch(err){
		console.log(err);
	}
}

// logout 
const logout = (req, res) =>{
	res.clearCookie('token');
	res.redirect('/login');
}

// exports
module.exports = {
	loginPage,
	loginUser,
	logout,
	password,
	changePassword
}