var Connection = require('../connection');
require('dotenv').config();

//Initialize new API Connection:
var api = new Connection({
    hash: 'mf2ue9h',
    token: 'lg7cdu7phvxmb8uflcq6cq3nzbkxobl',
    cid: 'ququ4agtpaoiydgvtx2d4v1rr0eb2ok',
    host: 'https://api.bigcommerce.com' //The BigCommerce API Host
});

var appRouter = function (app) {

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        next();
    });

    app.get("/", function (req, res) {
        res.status(200).send({
            message: 'Welcome to the BigCommerce Orders API'
        });
    });

    app.get("/all", function (req, res) {

        api.get("/orders")
            .then((response) => {
                let responseData = { response };
                res.status(200).json(responseData);
                                
                var today = new Date();
                today.setDate(today.getDate() - 3);
                // var oneWeekAgo = new Date(today.getTime() - (60*60*24*7*1000));
                // console.log(oneWeekAgo.toUTCString());
                // oneWeekAgo = oneWeekAgo.toUTCString().slice(0, 26) + '+0000';
                // console.log(oneWeekAgo)

                Object.keys(responseData.response).forEach(function() {
                                        
                    for(var i=0; i < responseData.response.length; i++) {

                        var orderDate = new Date(responseData.response[i].date_created);

                        console.log(orderDate + '  >  ' + today);

                        if ( responseData.response[i].status_id !== 10 && orderDate > today) {
                            api.put('/orders/'+ responseData.response[i].id, {
                                status_id: 10
                            }).then(res => {

                            }).catch((err) => {
                                console.log(err);
                            });
                        }

                    }
                });
                
            })
            .catch((err) => {
                console.log(err)
            })
    });

};

module.exports = appRouter;

