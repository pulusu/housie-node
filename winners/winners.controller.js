const express = require('express');
const router = express.Router();
const winnersService = require('./winners.service');

// routes
router.post('/create', create);
router.post('/winnerslistbyTournament', winnerslistbyTournament);
router.post('/winnersbyTournament', winnersbyTournament);
router.get('/', getAll);
router.get('/prizetype', prizetype);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;



function create(req, res, next) {
    winnersService.create(req.body)
        .then(company => res.json(company))
        .catch(err => next(err));
}
function winnerslistbyTournament(req, res, next) {
    winnersService.winnerslistbyTournament(req.body)
        .then(company => res.json(company))
        .catch(err => next(err));
}
function winnersbyTournament(req, res, next) {
    winnersService.winnersbyTournament(req.body)
        .then(company => res.json(company))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    winnersService.getAll()
        .then(company => res.json(company))
        .catch(err => next(err));
}

function prizetype(req, res, next) {
    winnersService.prizetype()
        .then(company => res.json(company))
        .catch(err => next(err));
}


function getById(req, res, next) {
    winnersService.getById(req.params.id)
        .then(otp_history => otp_history ? res.json(otp_history) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    winnersService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    winnersService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
