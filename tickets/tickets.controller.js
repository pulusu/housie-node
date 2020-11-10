const express = require('express');
const router = express.Router();
const ticketsService = require('./tickets.service');

// routes
router.post('/create', create);
router.get('/all', getAll);
router.get('/:id', getById);
//router.put('/:id', update);
router.put('/updateTicket', updateTicket);
router.delete('/:id', _delete);

module.exports = router;



function create(req, res, next) {
    ticketsService.create(req.body)
        .then(company => res.json(company))
        .catch(err => next(err));
}

function updateTicket(req, res, next) {
    ticketsService.updateTicket(req.body)
        .then(company => res.json(company))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    ticketsService.getAll()
        .then(company => res.json(company))
        .catch(err => next(err));
}


function getById(req, res, next) {
    ticketsService.getById(req.params.id)
        .then(otp_history => otp_history ? res.json(otp_history) : res.sendStatus(404))
        .catch(err => next(err));
}



function _delete(req, res, next) {
    ticketsService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}