require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
process.env.TZ = "Aisa/Tehran";
const serveIndex = require('serve-index');
app.use('/uploads', express.static('uploads'), serveIndex('uploads', {'icons': true})); 

// use JWT auth to secure the api
//app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/company', require('./company/company.controller'));
app.use('/tournaments', require('./tournaments/tournaments.controller'));
app.use('/tournamentprizerange', require('./tournamentprizerange/tournamentprizerange.controller'));
app.use('/orders', require('./orders/orders.controller'));
app.use('/tickets', require('./tickets/tickets.controller'));
app.use('/winners', require('./winners/winners.controller'));
app.use('/pages', require('./pages/pages.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4020;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
