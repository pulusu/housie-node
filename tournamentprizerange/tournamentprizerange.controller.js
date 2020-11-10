const express = require('express');
const router = express.Router();
const tournamentprizerangeService = require('./tournamentprizerange.service');

// routes
router.post('/create', create);
router.get('/all', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;



function create(req, res, next) {
    tournamentprizerangeService.create(req.body)
        .then(company => res.json(company))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    tournamentprizerangeService.getAll()
        .then(company => res.json(company))
        .catch(err => next(err));
}


function getById(req, res, next) {
    tournamentprizerangeService.getById(req.params.id)
        .then(otp_history => otp_history ? res.json(otp_history) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    tournamentprizerangeService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    tournamentprizerangeService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}