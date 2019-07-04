


module.exports = { 
  search: (req, res, con) =>{
  	if(req.body.user_name == undefined || req.body.user_name == '' || req.body.user_name == ''){
  		res.json({status: false, message: 'User Name Required'});
  		return false;
  	}


setTimeout(()=>{
		let sql = "SELECT * FROM  users where (user_name = '"+req.body.user_name+"')";
	con.query(sql, (err, result)=>{	
		if (err) throw err;
		if(result.length > 0){
			res.json({"status": true, "message": "User Found!", "data" : result});
		}else{
			res.json({"status": false, "message": "User Not Found Please Try Again."});
		}
	});
}, 2000)
	
  }

};