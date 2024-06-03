const { Op } = require("sequelize");
const { table } = require('../database/sequelize');
const controller = {};

controller.create = async function (data) {
    let route = 0;
    for (let i = 0; i < data.routes[route].legs[route].steps.length; i++) {
        if (data.routes[route].legs[route].steps[i].transitDetails) {
            nomLigne = data.routes[route].legs[route].steps[i].transitDetails.transitLine.name
            mode = data.routes[route].legs[route].steps[i].transitDetails.transitLine.vehicle.name.text
            try {
                const userData = await table.create({
                    nomLigne: nomLigne,
                    mode: mode,
                    date: new Date()
                });
            } catch (error) {
                console.log(error);
            }
        }
    }
};

module.exports = controller;