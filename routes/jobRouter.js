const express = require('express');
const router = express.Router();
const { models } = require('../model');
const standardRes = require('../common/responses');
const { v4: uuid } = require('uuid');
const JobProps = [
    "title",
    "date",
    "lat",
    "long",
    "desc",
    "hours",
    "numberOfPositions",
    "hidden",
    "phone",
    "email",
    "address"
];

router.post('/', async function(req, res) {
    const jobId = uuid();
    let reqData = {};
    for (const prop of JobProps) {
        if (prop in req.body) {
            reqData[prop] = req.body[prop];
        } else if (prop != 'hidden') {
            return res.send({
                "status": "bad request",
                "msg": "missing attribute in job " + prop,
            });
        }
    }

    try {
        const newJob = await models.Job.create(Object.assign({
            id: jobId
        }, reqData));
    } catch (e) {
        console.log(`Job Router - POST / - ${e.toString()}`);
        return res.send(standardRes.INTERNAL_ERROR);
    }

    res.send({
        status: "success",
        id: jobId,
    });
});

router.post('/:jobId', async function(req, res) {
    const jobId = req.params.jobId;

    if (!jobId) {
        return res.send({
            status: "bad request",
            msg: "jobId required",
        });
    }

    let reqData = {};
    for (const prop of JobProps) {
        if (prop in req.body) {
            reqData[prop] = req.body[prop];
        }
    }

    if (Object.keys(reqData).length < 1) {
        return res.send(standardRes.SUCCESS);
    }

    let job;
    try {
        job = await models.Job.update(reqData, {
            where: {
                id: jobId,
            }
        });
    } catch (e) {
        console.log(`Job Router - GET /${jobId} - ${e}`);
        return res.send({
            status: "bad request",
            msg: "job not found",
        });
    }

    res.send(standardRes.SUCCESS);
});

router.get('/:jobId', async function(req, res) {
    const jobId = req.params.jobId;

    if (!jobId) {
        return res.send({
            status: "bad request",
            msg: "jobId required",
        });
    }
    let job;
    try {
        job = await models.Job.findByPk(jobId);
    } catch (e) {
        console.log(`Job Router - GET /${jobId} - ${e}`);
        return res.send(standardRes.INTERNAL_ERROR);
    }

    if (job === null) {
        console.log(`Job Router - GET /${jobId} - Not Found`);
        return res.send({
            status: "bad request",
            msg: "job not found",
        });
    }

    return res.json(job);
});

router.get('/', async function(req, res) {
    let allJobs = {};
    try {
        allJobs = await models.Job.findAll();
    } catch (e) {
        console.log(`Job Router - GET / - ${e}`);
        return res.send(standardRes.INTERNAL_ERROR);
    }

   res.json(allJobs);
});

module.exports = router;