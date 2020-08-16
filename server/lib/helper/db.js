// const express = require('express');
// const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');

require('dotenv').config();

/** Connect to MongoDB using the Mongoose Client */
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true });

/** Error object for Wrong Tag name */
// const errorTagName = {"error" : "Please choose a correct tag name from the following: [health, tech, startups, history, science, design, culture, politics]. You can only choose one tag."};

/** Create a API Data Schema */
const apiData = mongoose.model('Api_Data', new mongoose.Schema({ 
  author: String,
  authorId: Number,
  id: Number,
  likes: Number,
  popularity: Number,
  reads: Number,
  tags: Array
}));

/** Fetch all the posts which has the tagArgs in the tag array  */
const getTagData = async (tagArgs) =>{
  const result = await apiData
    .find({tags: { $in: [tagArgs]}})
    .exec();
  if(result === undefined )  { console.log("error in getTagData"); return []}
  return result;
}

/** Validate correct Tag */
const validateTag = (tagArg) => {
  const validTagNames = new Set([ "health", "tech", "startups", "history", "science", "design", "culture", "politics" ]);
  if(validTagNames.has(tagArg)) {return true; }
  else { return false; }
}

const getTag = async (tagArg) => {
  const tagParam = tagArg || '';
  /** Define a desired data model */
  const model = {
    author: null,
    authorId: null,
    id: null,
    likes: null,
    popularity: null,
    reads: null,
    tags: null
 };

  /** Check if send tag argument is one of the Valid Tag Name */
  if (!validateTag(tagParam)) { return null;}
  const result = await getTagData(tagParam);
  let returnObj = [];
  for (const each of result){
    returnObj.push(_.pick(each, _.keys(model)));
  }
  returnObj = {
    posts: [].concat(returnObj)
  }

  return returnObj
}

module.exports = {
  getTag,
};
