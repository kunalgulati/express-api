"use strict";

const _ = require('lodash');
const faker = require('faker');
const mongoose = require('mongoose');
const { Decimal128 } = require('mongodb');

require('dotenv').config();

/** Connect to MongoDB using the Mongoose Client */
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

/** Create a API Data Schema */
const apiData = mongoose.model('Api_Data', new mongoose.Schema({ 
  author: String,
  authorId: Number,
  id: Number,
  likes: Number,
  popularity: Decimal128,
  reads: Number,
  tags: Array
}));

/** Decared Global variables for generating fake data */
let idCounter = 1;
let authorIdCounter = faker.random.number({min: 100, max: 200});
const tagsArray = [ "health", "tech", "startups", "history", "science", "design", "culture", "politics" ];

/** Generate a random array of tags by, Shuffling the tagsArray and then Slice using a random Number */
const generateRandomTags = () => {
  const shuffleNumber = faker.random.number({min:1, max:4})
  const result = faker.helpers.shuffle(tagsArray);
  return result.slice(0,shuffleNumber);
};

/** Generate a Random Post Object */
const generateRandomObject = () => {
  const obj = {
    author: faker.name.findName(),
    authorId: authorIdCounter,
    id: idCounter,
    likes: faker.random.number({min:0, max: 10000}),
    popularity: parseFloat((faker.random.number({min: 0, max: 0.99, precision: 0.01})).toFixed(2)),
    reads: faker.random.number({min:0, max: 100000}),
    tags: generateRandomTags()
  }
  /** Increment to the next id */
  idCounter++;
  authorIdCounter++;
  return obj;
}

/** 
 *  Main Execution Function
 *  Insert Fake Data to MongoDb document 
 * */

const addFakeDataToMongo = async () => {
  /** Get a connection Object for mongoDB */
  
  const test = new apiData({
    author: "Trevon Rodriguez",
    authorId: 5,
    id: 3,
    likes: 425,
    popularity: 0.68,
    reads: 11381,
    tags: [
    "startups",
    "health"
    ]
    });
  await test.save();
  
  /** Randomly Generated Data using Faker, which will be inserted in MongoDB document for future API use */
  const fakeDataResult = _.times(1000, generateRandomObject);
  console.log(fakeDataResult.length);
    
  apiData.insertMany(fakeDataResult, function(err) {
    if(err){console.log(err)}
  });

}

addFakeDataToMongo();