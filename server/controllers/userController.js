const { dbConnection } = require('../db_connection/dbConnection');
const jwt = require('jsonwebtoken');

// comments
const createComment = async (req, res) =>{
    const token = req.cookies.token;
    const {comment, postid} = req.body;
    try{

        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        if (!token) {
            return res.status(401).redirect('/login');
        }

        const decoded = jwt.verify(token, process.env.SECRET);
		const user = decoded.user.username;
        
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        const db = dbConnection;
        if (!token) {
            return res.status(401).redirect('/login');
        }
        const [result] = await db.promise().query(`INSERT INTO comments(content, created_by, postid) VALUES (?, ?, ?)`,
            [comment, user, postid]
        );
        if (result.affectedRows > 0) {
            res.status(201).json({ message: 'Record created successfully' });
        } else {
            res.status(500).json({ message: 'Failed to create record' });
          }

    }catch(err){
        res.status(500).json({error: `Failed to create comment ${err}`});
    }
}

module.exports = {
    createComment
}