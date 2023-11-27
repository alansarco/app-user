const { dbConnection } = require('../db_connection/dbConnection');

const loginPage = (req, res) => {
    try{
		res.status(200).render('login');
	}
	 catch(err){

	 }
}

module.exports = {
	loginPage
}