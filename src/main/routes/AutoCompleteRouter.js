const express = require("express");
const { getStatesAutoCompleteEndpoint, getCitiesAutoCompleteEndpoint, getLocationsAutoCompleteEndpoint, getCarTypesAutoCompleteEndpoint } = require("../Controllers/AutoCompleteController");

let autoCompleteRouter=express.Router();

autoCompleteRouter.get('/states',getStatesAutoCompleteEndpoint);
autoCompleteRouter.get('/cities/:state?',getCitiesAutoCompleteEndpoint);
autoCompleteRouter.get('/locations/',getLocationsAutoCompleteEndpoint);
autoCompleteRouter.get('/cars/',getCarTypesAutoCompleteEndpoint);
module.exports={autoCompleteRouter};
