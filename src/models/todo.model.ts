// @ts-nocheck
import { Schema, model } from 'mongoose';

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: ""
  },
  isFinished: {
    required: true,
    type: Boolean,
    default: false,
  },
  deadline: {
    required: true,
    type: Number
  }
}, {
  timestamps: true,
});

// tslint:disable-next-line:only-arrow-functions
todoSchema.methods.toJSON = function () {
  const todo = this; // This is why I have to disable TS Lint for arrow function
  const todoObj = todo.toObject();

  delete todoObj.createdAt;
  delete todoObj.__v;

  return todoObj;
}

const Todo = model('Todo', todoSchema);

export default Todo;