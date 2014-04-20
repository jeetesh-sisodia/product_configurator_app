exports.index = function(req, res){
   res.render('login', {title:'CG Login Page'});
   //console.log(moment("04/13/2014", "MM/DD/YYYY").format('YYYY-MM-DD hh:mm:ss'));
};

exports.loginverify = function(req, res){

	var name = req.body.name;
	var password = req.body.password;
	var password_enc = crypto.createHash('md5').update(password).digest('hex');
	var dataGet = {
		"email":name,
		"password":password_enc
	};
	
	var dGet = querystring.stringify(dataGet);
	var optionsPost = {
			host : config.host,
			port : config.port,
			path : '/login',
			method : 'POST',
			headers: {
		          'Content-Type': 'application/x-www-form-urlencoded'
		    }
		};

	var reqPost = http.request(optionsPost, function(response) {
		response.on('data', function(data) {
			//console.log(response.statusCode);
			var data=JSON.parse(data);
			if(response.statusCode == 200){
				req.session.member_id = data.data[0].id;
				req.session.member_username = data.data[0].user_name;
				req.session.member_email = data.data[0].email;
				req.session.priv = data.priv;	
				req.session.token = data.authentication_token;
				req.session.sales_hubs_id = data.data[0].sales_hubs_id;
				req.session.tendering_teams_id = data.data[0].tendering_teams_id;
				
				console.log(data);

				if(data.priv == 4){
					res.send("Admin");
				} else {
					res.send("Users");
				}
			} else {
				res.send(data.success);
			}
		});

	});

	reqPost.write(dGet);
	reqPost.end();
};