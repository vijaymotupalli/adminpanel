var config = {

	authSecret:"vijay",
	db:{
		host:"localhost",
		username:"root",
		password:"",
		database:"timetracker",
		dialect:"mysql",
		pool:{
			min:0,
			max:10,
			idle:1000
		}
	},
	fileUpload:{
		uploadPath : 'static/uploads',
		downloadPath:'/uploads/'
		
	}
};

module.exports = config;
