    var config = require('../config/index');
    var Sequelize = require('sequelize');

    var sequelize = new Sequelize(config.db.database,config.db.username,config.db.password,{
      host:config.db.host,
      dialect:config.db.dialect,
      pool:{
        min:config.db.min,
        max:config.db.max,
        idle:config.db.idle
      }
    });

    var users = sequelize.define('users',{
        name:{type:Sequelize.STRING(45)},
        email:{type:Sequelize.STRING(50)},
        mobile:{type:Sequelize.STRING(15)},
        password:{type:Sequelize.STRING(100)},
        is_active:{type:Sequelize.BOOLEAN,defaultValue:true},
    },{
        underscored:true
    });

    var projects = sequelize.define('projects',{
        name:{type:Sequelize.STRING},
        is_active:{type:Sequelize.BOOLEAN,defaultValue:true}
    },{
        underscored:true
    })

    var timedata = sequelize.define('timedata',{
        date:{type:Sequelize.DATEONLY},
        hours:{type:Sequelize.INTEGER},
        mins:{type:Sequelize.INTEGER},
        comments:{type:Sequelize.STRING}
    },{
        underscored:true
    })


    timedata.belongsTo(projects);
    timedata.belongsTo(users);

    // Exporting models for use in other modules

    module.exports.users = users;
    module.exports.projects = projects;
    module.exports.timedata = timedata;
    module.exports.sequelize = sequelize;
    module.exports.Sequelize = Sequelize;