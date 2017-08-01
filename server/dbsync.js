var db = require('./model.js');

var database ={

    sync: function (req, res) {

        db.sequelize.sync({force: true}).then(function () {
            console.log("Database successfully synced");
            res.json({status: 200, title: "DB Synced Successfully", msg: "DB Synced Successfully"});

        }, function (err) {

            console.log("Database failed to sync",err)
        })

    }
}

module.exports = database
