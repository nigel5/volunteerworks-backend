const express = require('express');
const router = express.Router();
const { models } = require('../model');
const standardRes = require('../common/responses');
const { v4: uuid } = require('uuid');
const JobProps = [
    "jobId",
    "userId"
];

router.post('/', async function(req, res) {
    const userId = req.body.userId;
    const jobId = req.body.jobId;

    if (!userId || !jobId) {
        return res.json({
            status: "bad request",
            msg: "jobId and userId required",
        });
    }

    try {
        const newJob = await models.JobSignup.create({
            userId,
            jobId,
        });
    } catch (e) {
        console.log(`Job Signup Router - POST / - ${e.toString()}`);
        return res.send(standardRes.INTERNAL_ERROR);
    }

    res.send({
        status: "success",
    });
});

router.get('/', async function(req, res) {
     // Get signups by jobId
    const jobId = typeof req.query.jobId != 'undefined' ? req.query.jobId : null;
    let signups = {};

    if (jobId === null) {
        res.json({
            status: "success",
            count: 0,
            signups
        })
    }

    try {
        signups = await models.JobSignup.findAll({
            where: {
                jobId,
            },
        });
    } catch (e) {
        console.log(`Job Signup Router - GET / - ${e.toString()}`);
        return res.send(standardRes.INTERNAL_ERROR);
    }

    res.json({
       status: "success",
       count: signups.length,
       signups,
    });
});

module.exports = router;