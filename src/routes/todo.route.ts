import { Document } from 'mongoose';
import express, { Router } from 'express';
import isTodo from "../types/todo.type";
import Todo from "../models/todo.model";

const todoRoute: Router = Router();

todoRoute.post('/todos',  async (req, res) => {
  try {
    if (!isTodo(req.body)) {
      return res.status(400).send({
        error: 'Format of todo is invalid.',
      });
    }

    const todo = new Todo(req.body);
    await todo.save();

    res.status(201).send({
      todo,
    });
  }
  catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
});

todoRoute.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find().select('_id title deadline isFinished');
    res.send({
      todos: todos.reverse(),
    });
  }
  catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
});

todoRoute.get('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      res.status(404).send({
        error: `Found no todo with id ${req.params.id}`,
      });
    }

    res.send({
      todo,
    });
  }
  catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
});

todoRoute.patch('/todos/:id', async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'isFinished', 'deadline'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
      return res.status(400).send({
        error: 'Invalid update.',
      });
    }

    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send({
        error: `Found no todo with id ${req.params.id}`,
      });
    }

    updates.forEach((update: string) => (todo as any)[update] = req.body[update]);
    await todo.save();

    res.send({
      todo,
    });
  }
  catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
});

todoRoute.delete('/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).send();
  }
  catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
});

export default todoRoute;