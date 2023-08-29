const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A cabin must have a name'],
    unique: true,
    trim: true,
  },
  capacity: {
    type: Number,
    required: [true, 'A cabin must have capacity'],
  },
  price: {
    type: Number,
    required: [true, 'A cabin must have a price'],
  },
  discount: {
    type: Number,
    validate: {
      validator: function (val) {
        // this only points to current doc on NEW document creation
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) should be below regular price',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  description: {
    type: String,
    trim: true,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
