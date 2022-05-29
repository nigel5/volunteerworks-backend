require('dotenv').config();
const { Sequelize } = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT ? process.env.PORT : 3000;

const sequelize = require('./model');
const helmet = require("helmet");
const cors = require('cors');

// Init db
async function initDb() {
    console.log('Init db...');
    try {
        await sequelize.authenticate();
        console.log("Database connection success");
        sequelize.sync({ force: 0 });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

// Init serve r
async function initServer() {
    await initDb();

    // app.use(helmet());
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/', require('./routes/indexRouter'))
    app.use('/job', require('./routes/jobRouter'));
    app.use('/interests', require('./routes/jobSignupRouter'));

    app.listen(port, () => {
        console.log(`App started on port ${port}`);
    });

    process.on('exit', () => {
        sequelize.close();
    });
}

initServer();