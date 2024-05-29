import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { IoTrashBin } from "react-icons/io5";
import { HiPencilAlt } from "react-icons/hi";
import EditTodo from './EditTodo';

const Home = () => {

    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [modalEditId, setModalEditId] = useState(null)

    const serverURL = "http://localhost:5000"

    const validate = () => {
        if (!title) {
            toast.error('Title is required')
            return false
        }
        // if (!description) {
        //     toast.error('Description is required')
        //     return false
        // }
        return true
    }


    const handleAddTodo = () => {
        if (!validate())
            return
        axios.post(`${serverURL}/todos/create-todo`, {
            title: title,
            description: description
        }).then(res => {
            setTodos([...todos, res?.data?.result])
            toast.success('Task Added Successfully')
        }).catch(err => {
            console.log(err)
        })
    }

    const handleDeleteTodo = (id) => {
        axios.delete(`${serverURL}/todos/delete-todo/${id}`)
            .then(res => {
                setTodos(todos.filter(todo => todo._id !== id))
                toast.success('Task Deleted Successfully')
            }).catch(err => {
                console.log(err)
            })
    }


    useEffect(() => {
        axios.get(`${serverURL}/todos/`)
            .then(res => {
                setTodos(res?.data?.result)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                <ToastContainer />
                <div className="flex flex-col items-center justify-center w-full md:w-1/2">
                    <h2 className="mb-5 text-2xl font-bold text-gray-700">Create Todo</h2>
                    <div className="w-full max-w-xs">
                        <label htmlFor='title' className="block mb-2 text-sm font-bold text-gray-700">Title</label>
                        <input type="text" onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
                        <label htmlFor='description' className="block mb-2 text-sm font-bold text-gray-700">Description</label>
                        <textarea type="text" onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 mb-6 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
                        <button
                            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                            onClick={handleAddTodo}
                        >
                            Add Todo
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full md:w-1/2 bg-gray-100">

                    <div className="w-full max-w-md mt-4">
                        {
                            todos.length === 0 ? (
                                <div className="flex items-center justify-center h-screen">
                                    <h2 className="text-2xl font-bold text-gray-700">No Todos</h2>
                                </div>
                            ) : (
                                todos.map((todo, index) => (
                                    <div key={index} className="flex flex-col p-5 mb-4 bg-white rounded shadow-lg">
                                        <div className='flex justify-between'>
                                            <h3 className="mb-2 text-xl font-bold text-gray-800">{todo.title}</h3>
                                            <div className="flex items-center mt-4">
                                                <button
                                                    onClick={() => {
                                                        setModalEditId(todo._id)
                                                        setIsOpen(true)
                                                    }}
                                                    className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                                >
                                                    <HiPencilAlt />
                                                </button>
                                                <button onClick={() => handleDeleteTodo(todo._id)} className="px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline">
                                                    <IoTrashBin />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 w-72">
                                            {todo.description}
                                        </p>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
            </div>

            <EditTodo
                modalEditId={modalEditId}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </>
    )
}

export default Home