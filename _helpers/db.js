const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    companies: require('../company/company.model'),
    tournament: require('../tournaments/tournaments.model'),
    orders: require('../orders/orders.model'),
    tickets: require('../tickets/tickets.model'),
    winners: require('../winners/winners.model'),
    pages: require('../pages/pages.model'),
    otp_history: require('../otp_history/otp_history.model')
};