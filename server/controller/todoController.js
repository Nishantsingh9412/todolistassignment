import Todo from '../models/TodoModel.js'
import mongoose from 'mongoose'

export const createTodo = async (req, res) => {
    const { title, description } = req.body;
    try {
        const newTodo = await Todo.create({
            title,
            description
        })
        if (!newTodo)
            return res.status(400).json({ success: false, message: 'not able to createTodo' })
        else {
            return res.status(200).json({ success: true, message: 'createTodo', result: newTodo })
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' , error: err.message })
    }
}

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({})
        if (!todos)
            return res.status(400).json({ success: false, message: 'not able to getTodos' })
        else {
            return res.status(200).json({ success: true, message: 'getTodos', result: todos })
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' , error: err.message })
    }
}

export const getTodoSingle = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ success: false, message: 'not a valid id' })
    }
    try {
        const singleTodo = await Todo.findById(_id)
        if (!singleTodo)
            return res.status(400).json({ success: false, message: 'not able to getTodoSingle' })
        else {
            return res.status(200).json({ success: true, message: 'getTodoSingle', result: singleTodo })
        }
    }catch (err) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' , error: err.message })
    }
}

export const updateTodo = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ success: false, message: 'not a valid id' })
    }
    const { title, description } = req.body;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(_id,
            {
               $set: { title, description }
            },{new: true})
        if (!updatedTodo)
            return res.status(400).json({ success: false, message: 'not able to updateTodo' })
        else {
            return res.status(200).json({ success: true, message: 'updateTodo', result: updatedTodo })
        }
    }catch (err) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' , error: err.message })
    }
}

export const updateTodoStatus = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ success: false, message: 'not a valid id' })
    }
    try {
        const singleTodoItem = await Todo.findById(_id)
        const updateTodoStatus = await Todo.findByIdAndUpdate(_id,
            {
               $set: { status: !singleTodoItem.status }
            },{new: true})
        
        if (!updateTodoStatus)
            return res.status(400).json({ success: false, message: 'not able to updateTodo' })
        else {
            return res.status(200).json({ success: true, message: 'updateTodo', result: updateTodoStatus })
        }
    }catch (err) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' , error: err.message })
    }
}

export const deleteTodo = async (req, res) => {
    const {id:_id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ success: false, message: 'not a valid id' })
    }
    try {
        const deletedTodo = await Todo.findByIdAndDelete(_id);
        if (!deletedTodo)
            return res.status(400).json({ success: false, message: 'not able to deleteTodo' })
        else {
            return res.status(200).json({ success: true, message: 'deleteTodo', result: deletedTodo })
        }
    }catch(err){
        return res.status(500).json({ success: false, message: 'Internal Server Error' , error: err.message })
    }
}
