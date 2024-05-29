import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:false},
    status:{type:Boolean, required:true , default:false},
},{timestamps:true})

export default mongoose.model('Todo', todoSchema)