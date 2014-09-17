var express = require('express');
var router = express.Router();

// this could be "api" or "client"
var gravatarLookup = process.env.GRAVATAR_LOOKUP;


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', gravatarLookup: gravatarLookup });
});

router.get('/twitter', function(req, res) {
  res.render('twitter');
});

var Twit = require('twit');

var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY
  , consumer_secret: process.env.CONSUMER_SECRET
  , access_token: process.env.ACCESS_TOKEN
  , access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

require('shelljs/global');



var stream = T.stream("statuses/filter", { track: '#weatherplease'});

stream.on("tweet", function(tweet){

    var data = exec("curl -s htpp://api.openweathermap.org/data/2.5/weather?q=" + twitter.text); //without the hashtag
    //JSON-ize data.output -->right now it is just a string ..needs to be an object.
    // jsonData.weather.description ---> the sky is clear.
    // I need to post that with the post
    //In the status --> @tweeter   weather    location    description. find the tweet.text tweet.who tweet.location
//    mg.sendText('nick@prmatch.com', 'doug@kosmojo.com',
//        tweet.text,
//        tweet.text,
//        function(err){
//            if(err) console.log('Oh noses: ' + err);
//            else    console.log('Success');
//        }
//    );
});


router.post('/twitter', function(req, res) {
  // req.body.tweet
  T.post('statuses/update', { status: req.body.tweet }, function(err, data, response) {
    console.log(data);
  });
  res.redirect("/twitter");
});

router.post('/twitter-search', function(req,res){
    //T.post search, using req.body.query
    T.get('search/tweets', {q: req.body.query, count:10}, function(err,data,response){
     res.json(data);
    });
});

var Mailgun = require('mailgun').Mailgun;

var mg = new Mailgun(process.env.MG_KEY);
//mg.sendText('nick@prmatch.com', 'doug@kosmojo.com',
//    'this is the subject',
//    'this is the text',
//    function(err){
//        if(err) console.log('Oh noses: ' + err);
//        else    console.log('Success');
//    }
//);







module.exports = router;
