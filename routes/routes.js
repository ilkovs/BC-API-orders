var Connection = require('../connection');
require('dotenv').config();

//Initialize new API Connection:
var api = new Connection({
    hash: 'mf2ue9h',
    token: '9umvbiq17vyvmzmczut20uchxc4bqfk',
    cid: 'q2cj8xpan1phkt5yz8fi5qwmakspic8',
    host: 'https://api.bigcommerce.com' //The BigCommerce API Host
});

var appRouter = function (app) {

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        next();
    });

    app.get("/", function (req, res) {
        res.status(200).send({
            message: 'Welcome to the BigCommerce Orders API'
        });
    });

    app.get("/all", function(req, res) {
        // console.log(res)
       api.get("/orders")
       .then((response) => {
           console.log(response);
            let responseData = { response };
            res.status(200).json(responseData);
            // console.log(responseData);
       })
       .catch((err) => {
           console.log(err)
       })
    });

};

module.exports = appRouter;

