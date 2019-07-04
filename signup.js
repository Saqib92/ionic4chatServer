module.exports = {

  signup: (req, res, con) =>{
  	if(req.body.username == undefined || req.body.username == '' || req.body.username == null){
  		res.json({status: false, message: 'Name Required'});
  		return false;
  	}
  	if(req.body.phone == undefined || req.body.phone == null || req.body.phone == ''){
  		res.json({status: false, message: 'Correct Email Required'});
  		return false;
  	}
  	if(req.body.password == undefined || req.body.password == '' || req.body.password == null){
  		res.json({status: false, message: 'Password Required'});
  		return false;
  	}

	let sql = "SELECT * FROM  users where (phone = '"+req.body.phone+"')";
	con.query(sql, (err, result)=> {
		if (err) throw err;

		if(result.length > 0){
			res.json({status: false, message: 'Phone Already Exists'})
		}else{
			
			let sql = "INSERT INTO users (user_name, phone, password) VALUES ('"+req.body.username+"', '"+req.body.phone+"', '"+req.body.password+"');";
			con.query(sql, (err, result)=>{
				if (err) throw err;
				console.log(result)
				res.json({status: true, message:'User Signup Successfull'});
			})			
		}
	});
  	}
  };

  function validateEmail(mail){
	console.log('validate called');
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
		return (true)
	}
	return (false)
}