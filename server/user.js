var db = require('./model')

var user = {
    createUser : function (req,res) {
        var email = req.body.email;
        var password = req.body.password;
        var name = req.body.name;
        var mobile= req.body.mobile;

        var userData = {
            email:email,
            password:password,
            name:name,
            mobile:mobile
        }
        db.users.create(userData).then(function (user,err) {
            if(!err){
                return res.status(200).json(user);
            }

            res.status(400).json(err);
        })
    },
    addTime : function (req,res) {
        var date = req.body.date
        var hours = req.body.hours
        var mins = req.body.mins
        var comments = req.body.comments
        var project = req.body.project
        var username = req.body.username


        db.users.findOne({username:username}).then(function (user,err) {
            if(err){
                return res.status(400).json({title:"User Not Found",
                err:err})
            }
            var timeData = {date:date,hours:hours,mins:mins,comments:comments,project_id:project,user_id:user.id}

            db.timedata.create(timeData).then(function (data,err) {
                console.log(data,err)
                if(err){
                    return res.status(400).json({
                        title:"failed to add data",
                        msg:err
                    })
                }
                res.status(200).json(data);
            }).catch(function (err) {
                return res.status(400).json({
                    title:"failed to add data",
                    msg:err
                })
            })

        })


    },
    getTime:function (req,res) {
        console.log("---iam in get time---")
        db.timedata.findAll({
            attributes: ['date', [db.sequelize.fn('sum', db.sequelize.col('hours')), 'total_hours'],
                [db.sequelize.fn('sum', db.sequelize.col('mins')), 'total_mins']],
            group: ['timedata.date']
        }).then(function (data,err) {
            if(data){
                var finalData = (data).map(function (time) {
                    var totalmins = Number(time.dataValues.total_hours*60)+Number(time.dataValues.total_mins)
                    var hours = Math.trunc(totalmins/60);
                    var minutes = totalmins % 60;
                   return{date:time.dataValues.date,hours:hours,mins:minutes}
               })
               return res.status(200).json(finalData);
            }else{
                return res.status(400).json({
                    title:"failed to get data",
                    msg:err
                })
            }
        }).catch(function (err) {
            return res.status(400).json({
                title:"failed to get data",
                msg:err
            })
        })

    }


}

module.exports = user