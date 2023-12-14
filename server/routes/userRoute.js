const express = require('express');
const router = express.Router();
const { dbConnection, dbConnection2 } = require('../db_connection/dbConnection');
const {verifyToken} = require('../middlewares/verifyToken');
const jwt = require('jsonwebtoken');
const { createComment, getComments, createRequest } = require('../controllers/userController');

// comment
router.get('/get-comment', getComments);
router.post('/create-comment', createComment);
router.post('/create-request', createRequest);

router.get('/cart', async (req, res) => {
	const token = req.cookies.token;

	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  	res.header('Pragma', 'no-cache');
	if (!token) {
        return res.status(401).redirect('/login');
    }
	try{
		const decoded = jwt.verify(token, process.env.SECRET);
		const user = decoded.user.username;
		const db = dbConnection2;
		var dataArrPending = [];
		var dataArrCanceled = [];
		var dataArrProcessed = [];
		var dataArrForPickUp = [];
		var dataArrFinished = [];

		const [rows] = await db.execute(`SELECT purpose, created_at, doctype, status, requestor FROM requests WHERE requestor = '${user}'`)
		// resulst
		// 0- cancel 1 - pending 2-process 3-for pick up 4-finish
		rows.map(items => {
			// if status is pending
			if(items.status == 0){
				var tempArr = {
					status: 'Canceled',
					purpose: items.purpose,
					date: items.created_at,
					docType: items.doctype,
					requestor: items.requestor
				}
				dataArrCanceled.push(tempArr);
			}
			else if(items.status == 1){
				var tempArr = {
					status: 'Pending',
					purpose: items.purpose,
					date: items.created_at,
					docType: items.doctype,
					requestor: items.requestor
				}
				dataArrPending.push(tempArr);
			}
			else if(items.status == 2){
				var tempArr = {
					status: 'Processed',
					purpose: items.purpose,
					date: items.created_at,
					docType: items.doctype,
					requestor: items.requestor
				}
				dataArrProcessed.push(tempArr);
			}
			else if(items.status == 3){
				var tempArr = {
					status: 'For Pick Up',
					purpose: items.purpose,
					date: items.created_at,
					docType: items.doctype,
					requestor: items.requestor
				}
				dataArrForPickUp.push(tempArr);
			}
			else if(items.status == 4){
				var tempArr = {
					status: 'Finished',
					purpose: items.purpose,
					date: items.created_at,
					docType: items.doctype,
					requestor: items.requestor
				}
				dataArrFinished.push(tempArr);
			}
		})
		console.log('Canceled: ',dataArrCanceled);
		console.log('Pending: ', dataArrPending);
		console.log('Processing: ', dataArrProcessed);
		console.log('For Pick Up: ',dataArrForPickUp);
		console.log('Finished: ', dataArrFinished);
		res.render("cart", {
			canceled: dataArrCanceled, 
			pending: dataArrPending, 
			process: dataArrProcessed, 
			forPickup: dataArrForPickUp,
			finished: dataArrFinished
		});
	}
	catch(err){
		console.error(err);
	}
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