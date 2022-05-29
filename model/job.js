const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    const Job = sequelize.define("Job", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        lat: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        long: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hours: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        numberOfPositions: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hidden: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    });

    Job.hasMany(sequelize.models.JobSignup, {
        foreignKey: 'jobId',
    });

    return Job;
}