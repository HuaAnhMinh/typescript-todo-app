import express, { Router } from 'express';
import isTodo from "../types/todo.type";
import Todo from "../models/todo.model";

const todoRoute: Router = Router();

todoRoute.post('/todos',  async (req, res) => {
  try {
    if (!isTodo(req.body)) {
      return res.status(401).send({
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
    res.status(401).send({
      error: err.toString(),
    });
  }
});

todoRoute.get('/todos', (req, res) => {

});

todoRoute.get('/todos/:id', async (req, res) => {

});

todoRoute.patch('/todos/:id', async (req, res) => {

});

todoRoute.delete('/todos/:id', async (req, res) => {

});

export default todoRoute;