const Game = require('./server/api/games/gameModel');
const Category = require('./server/api/categories/categoryModel');

const _ = require('lodash');
var { mongoose } = require('./server/db/mongoose');



async function testGroup() {

  const games = await Game.find().populate('category');
  const filter =
    _.chain(games)
      .groupBy('category.name')
      .map((value, key) => {
        return { category: key, count: value.length }
      }).value()

  console.log(filter);
}
testGroup();


//getFreePlaces();