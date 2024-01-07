const Feedback = require('../../model/feedback');
const router = require("express").Router();
const dotenv = require('dotenv');
const axios = require("axios");
dotenv.config();

//CREATE
router.post("/add", async (req, res) => {
    const newFeedback = new Feedback(req.body);
    try {
        const savedFeedback = await newFeedback.save();
        res.status(200).json(savedFeedback);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/update/:id", async (req, res) => {
    try {
        const updatedFeedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updatedFeedback);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/delete/:id", async (req, res) => {
    try {
        await Feedback.findOneAndDelete({id: req.body.id});
        res.status(200).json("Feedback has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});


//GET ALL FEEDBACKS
router.get("/", async (req, res) => {
    const qFilter = req.query.filter || {};
    const qSort = req.query.sort || {date: -1};
    const qLimit = req.query.limit || 2**32;
    try {
        // Truy van theo yeu cau
        let feedbacks = await Feedback.find(qFilter).sort(qSort).limit(qLimit);
        return res.status(200).json(feedbacks);
    } catch
        (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;