const sequelize = require('../dbConfig/userConfig')
const {DataTypes} = require('sequelize')
const bcrypt = require('bcryptjs')

const Users = sequelize.define('User',{
    username:{
        type : DataTypes.STRING,
        primaryKey : true,
        allowNull : false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull : false,

    },
    password:{
        type : DataTypes.STRING,
        allowNull : false,
    },
},{
    timestamps : false
})

Users.beforeSave(async (user) => {
    if (user.changed('password')) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
  }
});
  
  // Method to compare passwords
Users.prototype.comparePassword = function(candidatePassword) {
   return bcrypt.compare(candidatePassword, this.password);
};

module.exports = Users
