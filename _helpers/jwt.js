const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/change-password',
            '/users',
            '/users/register',
            '/users/checkOtp',
            '/users/sendOTPregister',
            '/pages',
            '/pages/create',
            '/pages/about-us',
            '/pages/how-to-play',
            '/winners',
            '/winners/create',
            '/winners/winnerslistbyTournament',
            '/winners/winnersbyTournament',
            '/winners/prizetype',
            '/company/all',
            '/tournaments/all',
            '/tournaments/getAllAdmin',
            '/tournaments/getAllbyId',
            '/tournamentprizerange/all',
            '/tournamentprizerange/create',
            '/tournaments/create',
            '/company/create',
            '/orders/create',
            '/orders/mytickets',
            '/tickets/updateTicket',
            '/users/verifyOtp',
            '/users/update-profile',
            '/users/forgot-password'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};