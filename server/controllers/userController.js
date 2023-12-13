const { dbConnection, dbConnection2 } = require('../db_connection/dbConnection');
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
        // const dateTime = new Date().getTime();
        const db = dbConnection;
        if (!token) {
            return res.status(401).redirect('/login');
        }
        const [result] = await db.promise().query(`INSERT INTO comments(content, created_by, postid) VALUES (?, ?, ?)`,
            [comment, user, postid]
        );
        if (result.affectedRows > 0) {
            res.status(200).json({ user: user });
        } else {
            res.status(500).json({ message: 'Failed to create record' });
          }

    }catch(err){
        res.status(500).json({error: `Failed to create comment ${err}`});
    }
}

// get comments
const getComments = async (req, res) => {
    const token = req.cookies.token;
    const data = req.query.data;
    
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    if (!token) {
        return res.status(401).redirect('/login');
    }
    // get all the comments
    try{
        const db = dbConnection;
        const [result] = await db.promise().query(`SELECT A.content, CONCAT(DATE_FORMAT(A.created_at, '%M %e, %Y'),' ',DATE_FORMAT(A.created_at, '%h:%i %p')) AS formatted_created_at, A.created_by, A.postid, B.firstname, B.lastname FROM comments A LEFT JOIN residents B ON A.created_by = B.username WHERE postid = '${data}'`)
			.then(([results, fields]) => {
				res.json({results});
			})
			.catch(error => res.status(500).json({errorMsg: `Shit happens ${error}`}));
    }catch(err){
        return res.status(401).json({"error": "error getting comments"});      
    }
}

const createRequest = async (req, res) =>{
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = decoded.user.username;

    const {documentType, dateNeeded, purpose} = req.body;
    const values = {
        documentType: parseInt(documentType),
        dateNeeded: dateNeeded,
        purpose: purpose
    }

    try{
        const db = dbConnection2;
        const db2 = dbConnection;
        const currentTimestamp = new Date();
        const month = currentTimestamp.getMonth() + 1;
        const day = currentTimestamp.getDate();
        const year = currentTimestamp.getFullYear();
        const hrs = currentTimestamp.getHours();
        const min = currentTimestamp.getMinutes();
        const sec = currentTimestamp.getSeconds();

        const dates = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year} ${hrs.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`
        const newDate = new Date(dates);

        const [rows] = await db.execute(`SELECT status, doctype FROM requests WHERE requestor = '${user}'`);
        console.log(rows);
        
        if(rows.length > 0){
            for(const items of rows){
                if((items.status == 1 || items.status == 2 || items.status == 3 ) && (items.doctype == values.documentType)){
                    res.json({res: 500});
                }
                else if(items.doctype != values.documentType){
                    const [result] = await db2.promise().query(`INSERT INTO requests (status, doctype, purpose, date_needed, created_at, requestor) VALUES(?,?,?,?,?,?)`,
                        [1, values.documentType, values.purpose, values.dateNeeded, newDate, user]
                    );
                    return res.json({res: 200});
                }
            }
        }else if(rows.length <= 0){
            const [result] = await db2.promise().query(`INSERT INTO requests (status, doctype, purpose, date_needed, created_at, requestor) VALUES(?,?,?,?,?,?)`,
                    [1, values.documentType, values.purpose, values.dateNeeded, newDate, user]
                );
                return res.json({res: 200});
        }
       
        
    }
    catch(err){
        console.error(err);
    }

    
}

module.exports = {
    createComment,
    getComments,
    createRequest
}