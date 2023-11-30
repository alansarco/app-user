const { dbConnection } = require('../db_connection/dbConnection');

const getComments = async (req, res) => {
    const token = req.cookies.token;
    const {postid} = req.body;
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    if (!token) {
        return res.status(401).redirect('/login');
    }
    // get all the comments
    try{
        const db = dbConnection;
        db.promise().query('SELECT content, created_at, created_by, postid FROM comments;')
			.then(([results, fields]) => {
				res.json({results});
			})
			.catch(error => res.status(500).json({errorMsg: `Shit happens ${error}`}));
    }catch(err){
        return res.status(401).json({"error": "error getting comments"});      
    }
}

module.exports = {
    getComments
}