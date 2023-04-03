// @ts-ignore
const cors = require('cors');
var allowlist = ['http://localhost:4000'];
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    }
    else {
        corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
};
module.exports = corsOptionsDelegate;
//# sourceMappingURL=origin.js.map