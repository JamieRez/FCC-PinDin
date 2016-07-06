'use strict';
var path = process.cwd();
var userjs = require('../models/user.js');


module.exports = {init};
function init(app,passport){



	app.route('/').get(function(req,res){
		//	userjs.deleter();
			res.render(path + '/views/index.pug' , {user : req.user});
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
