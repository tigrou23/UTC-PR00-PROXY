const { Op } = require("sequelize");
const { table } = require('../database/sequelize');
const controller = {};

controller.create = async function (data) {
    let route = 0;
    for (let i = 0; i < data.routes[route].legs[route].steps.length; i++) {
        if (data.routes[route].legs[route].steps[i].transitDetails) {
            nomLigne = data.routes[route].legs[route].steps[i].transitDetails.transitLine.name
            mode = data.routes[route].legs[route].steps[i].transitDetails.transitLine.vehicle.name.text
            if(mode == "Train" && data.routes[route].legs[route].steps[i].transitDetails.transitLine.agencies[0].name == "RER") mode = "RER"
            try {
                const userData = await table.create({
                    nomLigne: nomLigne,
                    mode: mode,
                    date: new Date(),
                    latitude_depart: data.routes[route].legs[route].steps[i].transitDetails.stopDetails.departureStop.location.latLng.latitude,
                    longitude_depart: data.routes[route].legs[route].steps[i].transitDetails.stopDetails.departureStop.location.latLng.longitude,
                    latitude_arrivee: data.routes[route].legs[route].steps[i].transitDetails.stopDetails.arrivalStop.location.latLng.latitude,
                    longitude_arrivee: data.routes[route].legs[route].steps[i].transitDetails.stopDetails.arrivalStop.location.latLng.longitude
                });
            } catch (error) {
                console.log(error);
            }
        }
    }
};

controller.findAll = async function () {
    try {
        const userData = await table.findAll();
        return userData;
    } catch (error) {
        console.log(error);
    }
};

module.exports = controller;