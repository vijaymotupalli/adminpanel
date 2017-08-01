var database = require('./../server/dbsync')
var user = require('./../server/user');
module.exports = function(app){

    app.post('/forcesync/', database.sync);
    app.get('/test',function (req,res) {
        res.send("hello from test");

    })
   app.post('/createuser',user.createUser)
   app.post('/adddata',user.addTime)
   app.get('/getdata',user.getTime)

}