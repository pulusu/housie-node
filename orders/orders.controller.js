const express = require('express');
const router = express.Router();
const orderService = require('./orders.service');

// routes
router.post('/create', create);
router.post('/mytickets', tiketsByuserTourney);
router.post('/tourneyHistoryByTourneyId', tourneyHistoryByTourneyId);
router.post('/tourneysHistoryByUser', tourneysHistoryByUser);
router.get('/all', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;



function create(req, res, next) {
    orderService.create(req.body)
        .then(company => res.json(company))
        .catch(err => next(err));
}
function tiketsByuserTourney(req, res, next) {
    orderService.tiketsByuserTourney(req.body)
        .then(company => res.json(company))
        .catch(err => next(err));
}
function tourneyHistoryByTourneyId(req, res, next) {
    orderService.tourneyHistoryByTourneyId(req.body)
        .then(company => res.json(company))
        .catch(err => next(err));
}

function tourneysHistoryByUser(req, res, next) {
    orderService.tourneysHistoryByUser(req.body)
        .then(company => res.json(company))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    orderService.getAll()
        .then(company => res.json(company))
        .catch(err => next(err));
}


function getById(req, res, next) {
    orderService.getById(req.params.id)
        .then(otp_history => otp_history ? res.json(otp_history) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    orderService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    orderService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}