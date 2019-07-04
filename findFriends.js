


module.exports = { 
  findFriends: (req, res, con) =>{
	let final = [];
		let sql = "SELECT * FROM  friend_list where (user_id = '"+req.body.id+"')";
		con.query(sql, (err, result)=>{	
			if (err) throw err;
			if(result.length > 0){
				for(let r = 0; r < result.length; r++){
					let sql2 = "SELECT * FROM  users where (id = '" + result[r].friend_id+"')";
					con.query(sql2, (err2, result2)=>{
						if(err2) throw err2;
						if(result2.length > 0){
							final.push(result2[0]);
						}
					})
				}
				setTimeout(()=>{
					res.json({"status": true, "message": "Friends Found!", "data" : final});
				}, 3000)
			}else{
				res.json({"status": false, "message": "Something Went Wrong!"});
			}
		});
  }

};