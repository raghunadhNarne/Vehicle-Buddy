const express=require('express');
const { getIndexPageCardsEndpoint } = require('../Controllers/IndexPageController');

let indexRouter=express.Router();

indexRouter.get('/indexcards',getIndexPageCardsEndpoint);

module.exports={indexRouter};