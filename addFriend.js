


module.exports = { 
  addFriend: (req, res, con) =>{

setTimeout(()=>{


	
		let sql = "INSERT INTO friend_list (user_id, friend_id) VALUES ('"+req.body.user_id+"', '"+req.body.friend_id+"');";
			con.query(sql, (err, result)=>{
				if (err) throw err;
				console.log(result)
				res.json({status: true, message:'User Added Successfull'});
			})
}, 2000)
	
  }

};