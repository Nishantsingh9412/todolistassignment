import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const EditTodo = (props) => {


    const serverURL = "http://localhost:5000"
    const [updatedTitle, setUpdatedTitle] = useState('')
    const [updatedDescription, setUpdatedDescription] = useState('')
    const modalEditId = props.modalEditId;
    // const [isOpen, setIsOpen] = useState(false);
    const isOpen = props.isOpen;
    const setIsOpen = props.setIsOpen;
    console.log(modalEditId)


    const validate = () => {
        if (!updatedTitle) {
            toast.error('Title is required')    
            return false
        }
        if (!updatedDescription) {
            toast.error('Description is required')
            return false
        }
        return true
    }

    useEffect(() => {
        axios.get(`${serverURL}/todos/todo/${modalEditId}`)
            .then(res => {
                setUpdatedTitle(res?.data?.result?.title)
                setUpdatedDescription(res?.data?.result?.description)
            }).catch(err => {
                console.log(err)
            })
    }, [modalEditId])


    const UpdateTodoListItem = (id) => {
        // console.log(id)
        if (!validate())
            return
        axios.patch(`${serverURL}/todos/update-todo/${id}`, {
            title: updatedTitle,
            description: updatedDescription
        }).then(res => {
            console.log(res)
            toast.success('Task Updated Successfully')
            setIsOpen(false)
            window.location.reload();
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            {/*
            <button 
                onClick={() => setIsOpen(true)}
                data-ripple-light="true" 
                data-dialog-target="dialog"
                className="select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
                Open Dialog  
            </button> 
            */}
            {isOpen && (
                <div
                    data-dialog-backdrop="dialog"
                    data-dialog-backdrop-close="true"
                    className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
                >
                    <div
                        data-dialog="dialog"
                        className="relative m-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
                    >
                        <form className="w-full max-w-sm">
                            <div className="md:flex md:items-center mb-6 mt-8">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-800 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                        Title
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                        type="text"
                                        value={updatedTitle}
                                        onChange={(e) => setUpdatedTitle(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-800 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                                        Description
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <textarea className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                        type="text"
                                        value={updatedDescription}
                                        onChange={(e) => setUpdatedDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="md:flex md:items-center">
                                <div className="md:w-1/3"></div>
                                <div className="md:w-2/3">
                                    <button
                                        className="shadow  bg-green-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                        type="button"
                                        onClick={() => UpdateTodoListItem(modalEditId)}
                                    >
                                        Update Todo
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500">
                            <button
                                onClick={() => setIsOpen(false)}
                                data-ripple-dark="true"
                                data-dialog-close="true"
                                className="px-6 py-3 mr-1 font-sans text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditTodo