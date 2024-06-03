const {Sequelize, DataTypes} = require('sequelize')
const tableModel = require('../models/itineraireModel.js')
require('dotenv').config()

let sequelize

sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        looping: false
    }
)

const table = tableModel(sequelize, DataTypes)

module.exports = {
    table
}