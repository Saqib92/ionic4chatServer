


module.exports = { 
  login: (req, res, con) =>{
  	if(req.body.phone == undefined || req.body.phone == '' || req.body.phone == ''){
  		res.json({status: false, message: 'Phone Number Required'});
  		return false;
  	}
  	if(req.body.password == undefined || req.body.password == '' || req.body.password == null){
  		res.json({status: false, message: 'Password Required'});
  		return false;
  	}


setTimeout(()=>{
		let sql = "SELECT * FROM  users where (phone = '"+req.body.phone+"' AND password = '"+req.body.password+"')";
	con.query(sql, (err, result)=>{	
		if (err) throw err;
		if(result.length > 0){
			res.json({"status": true, "message": "Login Successfull!", "data" : result[0]});
		}else{
			res.json({"status": false, "message": "Phone or Password is Wrong"});
		}
	});
}, 2000)
	
  }

};
function validateEmail(mail){
	console.log('validate called');
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
		return (true)
	}
	return (false)
}