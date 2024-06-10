module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Itineraire', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nomLigne: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: false
        },
        mode: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
            unique: false
        },
        latitude_depart: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: false
        },
        longitude_depart: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: false
        },
        latitude_arrivee: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: false
        },
        longitude_arrivee: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: false
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    })
}