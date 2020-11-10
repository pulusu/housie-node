const express = require('express');
const router = express.Router();
const tournamentsService = require('./tournaments.service');
const db = require('_helpers/db');
const Order = db.orders;

// routes
router.post('/create', create);
router.post('/getAllbyId', getAllbyId);
router.get('/all', getAll);
router.get('/getAllAdmin', getAllAdmin);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    tournamentsService.create(req.body)
        .then(company => res.json(company))
        .catch(err => next(err));
}
function getAllbyId(req, res, next) {
    tournamentsService.getAllbyId(req.body)
        .then(company => res.json(company))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    tournamentsService.getAll()
        .then(company => res.json(company))
        .catch(err => next(err));
}
function getAllAdmin(req, res, next) {
    tournamentsService.getAllAdmin()
        .then(company => res.json(company))
        .catch(err => next(err));
}


function getById(req, res, next) {
    tournamentsService.getById(req.params.id)
        .then(otp_history => otp_history ? res.json(otp_history) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    tournamentsService.update(req.params.id, req.body)
         .then(company => res.json(company))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    tournamentsService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}