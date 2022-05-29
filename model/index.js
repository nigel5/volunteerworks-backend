const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_CONN);

const models = [
    require('./jobSignup'), // Needs to be before job as job has many job signups
    require('./job')
];

for (const model of models) {
    model(sequelize);
}

// Singleton
module.exports = sequelize;
