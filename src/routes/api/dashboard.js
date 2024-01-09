const axios = require('axios');
const express = require('express');
const Product = require("../model/product");
const router = express.Router();


router.get('/',async (req,res)=>
{
    if (!req.isAuthenticated()) return res.status(400).render
    res.status(200).json(req.user)
})