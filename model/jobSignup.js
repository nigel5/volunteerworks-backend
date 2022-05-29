const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    const JobSignup = sequelize.define("JobSignup", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        }
    });

    return JobSignup;
}