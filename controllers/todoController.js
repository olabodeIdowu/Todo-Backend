const Todo = require('../models/todoModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.find();

  res.status(200).json({
    status: 'success',
    results: todo.length,
    data: {
      todo,
    },
  });
});

exports.createTodo = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const newTodo = await Todo.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTodo,
    },
  });
});

exports.getTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(new AppError('No todo list found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      todo,
    },
  });
});

exports.updateTodo = catchAsync(async (req, res, next) => {
  // console.log(req.params.id);
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!todo) {
    return next(new AppError('No todo list found with that ID', 404));
  }

  return res.status(200).json({
    status: 'success',
    data: {
      todo,
    },
  });
});

exports.putTodo = catchAsync(async (req, res, next) => {
  // console.log(req.params.id, req.body);
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!todo) {
    return next(new AppError('No todo list found with that ID', 404));
  }

  return res.status(200).json({
    status: 'success',
    data: {
      todo,
    },
  });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) {
    return next(new AppError('No todo list found with that ID', 404));
  }

  return res.status(200).json({
    status: 'success',
    data: null,
  });
});
