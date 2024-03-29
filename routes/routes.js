var Connection = require('../connection');
require('dotenv').config();

//Initialize new API Connection:
var api = new Connection({
    hash: 'mf2ue9h',
    token: 'mbeiekzvdq33s4e04ivl6cmvrq5jope',
    cid: 'jl0li1hlcb4lpgcg0k2nvrs45tu1nxc',
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

    // get all orders from BC API
        function getAllOrders() {

            //filter the orders based on date created (the newest ones)
            api.get("/orders?limit=250&sort=date_created:desc")
                .then((response) => {
                    let responseData = { response };   
                    
                    var today = new Date();
                    today.setUTCMinutes(today.getMinutes() - 1);

                    // console.log(today)
                    
                    //loops through all orders
                    Object.keys(responseData.response).forEach(function () {
    
                        for (var i = 0; i < responseData.response.length; i++) {
                            
                            //creating the right date format, the callback is a string otherwise
                            var orderDate = new Date(responseData.response[i].date_created);
    
                            // if the digital order is not the right status and is from the last 5 minutes, update the order status
                            if (responseData.response[i].status_id == 10 && orderDate > today) {
                                api.put('/orders/' + responseData.response[i].id, {
                                    status_id: 11
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
        }

        getAllOrders();

        ///run the function every 30 seconds
        setInterval(function() {
            getAllOrders();
            console.log('the app is running');
        }, 5000);


    // });


};

module.exports = appRouter;