import express from "express";

import {
    getTodos,
    createTodo,
    updateTodo,
    updateTodoStatus,
    deleteTodo,
    getTodoSingle
} from '../controller/todoController.js'

const router = express.Router()

router.get('/', getTodos)
router.get('/todo/:id', getTodoSingle)
router.post('/create-todo', createTodo)
router.patch('/update-todo/:id', updateTodo)
router.patch('/update-todo-status/:id', updateTodoStatus)
router.delete('/delete-todo/:id', deleteTodo)


export default router