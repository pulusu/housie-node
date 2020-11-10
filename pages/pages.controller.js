const express = require('express');
const router = express.Router();
const pageService = require('./pages.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/about-us', aboutus);
router.get('/how-to-play', howToPlay);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;



function create(req, res, next) {
    pageService.create(req.body)
        .then(company => res.json(company))
        .catch(err => next(err));
}


function getAll(req, res, next) {
    pageService.getAll()
        .then(company => res.json(company))
        .catch(err => next(err));
}

function aboutus(req, res, next) {
    pageService.aboutus()
        .then(company => res.json(company))
        .catch(err => next(err));
}
function howToPlay(req, res, next) {
    pageService.howToPlay()
        .then(company => res.json(company))
        .catch(err => next(err));
}

function getById(req, res, next) {
    pageService.getById(req.params.id)
        .then(otp_history => otp_history ? res.json(otp_history) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    pageService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    pageService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}