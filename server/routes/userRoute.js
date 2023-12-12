const express = require('express');
const router = express.Router();
const { dbConnection } = require('../db_connection/dbConnection');
const {verifyToken} = require('../middlewares/verifyToken');
const jwt = require('jsonwebtoken');
const { createComment, getComments, createRequest } = require('../controllers/userController');

// comment
router.get('/get-comment', getComments);
router.post('/create-comment', createComment);
router.post('/create-request', createRequest);

router.get('/cart', (req, res) => {
	const token = req.cookies.token;

	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  	res.header('Pragma', 'no-cache');
	if (!token) {
        return res.status(401).redirect('/login');
    }
	res.render("cart");
});


// some sort of pagination
let pageSize = 3;
router.post('/pagination', (req, res) =>{
	try{
		console.log(req.body.pageSize);
		pageSize += req.body.pageSize;
		console.log(pageSize);
		res.status(200).json({data: req.body});
	}
	catch(err){
		console.log('Error: ', err);
	}
	
})
// home page
router.get('/home', (req, res)=>{
    const page = 1;
	const token = req.cookies.token;

	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  	res.header('Pragma', 'no-cache');
	if (!token) {
        return res.status(401).redirect('/login');
    }
    try{
			const decoded = jwt.verify(token, process.env.SECRET);
			const user = decoded.user.username;
			const fname = decoded.user.firstName;
			const lname = decoded.user.lastName;
			const db = dbConnection;
			const offSet = (page - 1) * pageSize;

			db.promise().query('SELECT A.title, A.description, A.created_by, A.created_at, A.status, A.postid, B.firstname, B.lastname FROM announcements A LEFT JOIN residents B ON A.created_by = B.username  LIMIT ?, ?;', [offSet, pageSize])
			.then(([results, fields]) => {
				res.status(200).render('home', {data: results, pageSize: pageSize, user: user, fname: fname, lname: lname});
			})
			.catch(error => res.status(500).json({errorMsg: `Shit happens ${error}`}));
		
	} 
	catch{
		return res.status(500).json({message: 'Something went wrong'}); 
	}
});
// profile page
router.get('/profile', (req, res)=>{
	const token = req.cookies.token;
	

	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  	res.header('Pragma', 'no-cache');
	if (!token) {
        return res.status(401).redirect('/login');
    }

	try{
		const decoded = jwt.verify(token, process.env.SECRET);
		const user = decoded.user.username;
		const fname = decoded.user.firstName;
		const lname = decoded.user.lastName;
		res.status(200).render('profile', {page: 'profile', user: user, fname: fname, lname: lname});
	}
	catch(err){
		res.status(500).json({msg: "something went wrong!"})
	}
});
module.exports = router;