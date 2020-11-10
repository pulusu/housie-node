const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const multer = require('multer');

// File upload settings  
const PATH = './uploads/users';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
	let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
	
  }
});

let upload = multer({
  storage: storage
});


// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.post('/resendotp', resendotp);
router.post('/forgot-password', forgotPassword);
router.post('/sendOTPregister', sendOTPregister);
router.post('/checkOtp', checkOtp);
router.post('/verifyOtp', verifyOtp);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/change-password', update);
router.put('/update-profile',  upload.single('profileimage') ,updateProfile);
router.post('/create-user',  upload.single('profileimage') ,createUser);
router.delete('/:id', _delete);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}
function resendotp(req, res, next) {
    userService.resendotp(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}
function sendOTPregister(req, res, next) {
    userService.sendOTPregister(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}
function checkOtp(req, res, next) {
    userService.checkOtp(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}
function verifyOtp(req, res, next) {
    userService.verifyOtp(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}
function forgotPassword(req, res, next) {
    userService.forgotPassword(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}
function updateProfile(req, res, next) {
	userService.updateProfile(req.body,req.file)
        .then(users => res.json(users))
        .catch(err => next(err));
}
function createUser(req, res, next) {
	userService.createUser(req.body,req.file)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(users => res.json(users))
        .catch(err => next(err));
}