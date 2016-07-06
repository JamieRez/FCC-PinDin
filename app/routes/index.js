'use strict';
var path = process.cwd();
var userjs = require('../models/user.js');
var pinjs = require('../models/pin.js');
var Pin = pinjs.Pin;


module.exports = {init};
function init(app,passport){



	app.route('/').get(function(req,res){
			Pin.find({} , function(err,pinsArr){
				if(err) throw err;
				res.render(path + '/views/index.pug' , {user : req.user, pinsArr : pinsArr});
			});
	});

	app.get('/profile', function(req,res){
		Pin.find({userId : req.user.id} , function(err,pinsArr){
			res.render('profile.pug', {user : req.user , pinsArr : pinsArr});
		})
	});

	app.post('/uploadDin' , function(req,res){
		var newPin = new Pin({
			title : req.body.dinTitle,
			imgUrl : req.body.dinImgLink,
			userId : req.user.id,
			userName : req.user.name
		});
		newPin.save(function(){
			res.send();
		});
	});

	app.post('/deleteDin' , function(req,res){
		Pin.findById(req.body.pinId , function(err,thePin){
			thePin.remove(function(){
				res.send();
			});
		});
	});


	app.get('/user/:id' , function(req,res){
		Pin.find({userId : req.params.id} , function(err,pinsArr){
			res.render('user.pug', {user : req.user, pinsArr : pinsArr});
		});
	});


	//User auth
	app.get('/auth/google', passport.authenticate('google', { scope
		 : ['https://www.googleapis.com/auth/plus.me' ,
		  'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile']}
		));
    // the callback after google has authenticated the user
    app.get('/auth/google/callback', passport.authenticate('google', {
				failureRedirect: '/failure'
		}), function(req,res){
				res.redirect('/');
		});

		app.get('/auth/twitter', passport.authenticate('twitter'));
		app.get('/auth/twitter/callback',
  		passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/failure' }));

		app.get('/logout', function(req, res){
		  req.logout();
		  res.redirect('/');
		});

}
