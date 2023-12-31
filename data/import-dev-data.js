const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Todo = require('./../models/todoModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const todoList = JSON.parse(
  fs.readFileSync(`${__dirname}/cabins-data.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Todo.create(todoList);
    // console.log('Data successfully loaded!');
  } catch (err) {
    // console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Todo.deleteMany();
    // console.log('Data successfully deleted!');
  } catch (err) {
    // console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
