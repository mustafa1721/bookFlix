const sequelize = require('../dbConfig/dbConfig')
const {DataTypes} = require('sequelize')

const Books = sequelize.define('Book',{
    id:{
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
    },
    BookName:{
        type: DataTypes.STRING,
        allowNull : false,

    },
    Author:{
        type : DataTypes.STRING,
        allowNull : false,
    },
    Category:{
        type : DataTypes.STRING,
        allowNull : false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps : false
})

module.exports = Books
