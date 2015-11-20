var express =  require('express');
var app = express();
var bodyParser = require('body-parser')

// Stripe with test key
var stripe = require('stripe')('sk_test_0mjJ0swv4dBKsPdxEN1rfWBg');

// Serving static .html pages
app.use(express.static('public'));

// Parsing JSON bodies
app.use(bodyParser.json());

app.post('/charge', function(req, res) {
  console.log(req.body);
  stripe.charges.create({
    amount: req.body.amount,
    currency: 'USD',
    source: req.body.id,
    description: 'test'
  }, function(err, charge) {
    if (err) {
      console.log(err);
      res.sendStatus(500);  
    } else {
      console.log(charge);
      res.sendStatus(200);
    }
  })
});

var server = app.listen(3000, function() {
  console.log('listening on 3000');
});