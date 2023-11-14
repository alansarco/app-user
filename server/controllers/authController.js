const { dbConnection } = require('../db_connection/dbConnection');

const getAnnouncement = (req, res) => {
    try{
		const db = dbConnection;
		db.promise().query('SELECT * FROM announcements;')
		.then(([results, fields]) => {
			res.status(200).json({data: results});
		})
		.catch(error => res.status(500).json({errorMsg: `Shit happens ${error}`}));
	} 
	catch{
		return res.status(500).json({message: 'Something went wrong'}); 
	}
}

module.exports = {
	getAnnouncement
}