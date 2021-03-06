import React, {useState} from 'react';
import {toast, ToastContainer} from "react-toastify";
import BaseURL from "../util/BaseURL";
import {useRouter} from "next/router";
import 'react-toastify/dist/ReactToastify.css'



const CreateTodoModal = ({ onCloseModal }) => {
	const [todo,setTodo] = useState("")
	const [description,setDescription] = useState("")

	const router = useRouter()

	const AddTodo =async () => {
		if (todo === "" || description === ""){
			toast.error("Please fill in all fields")
		}else {
			const reqbody = { todo,description }
			const response = await fetch(`${BaseURL}/api/todo`,{
				method:'POST',
				headers:{
					'Content-Type':'application/json'
				},
				body:JSON.stringify(reqbody)
			})
			const res = await response.json()
			if (res.success){
				toast.success(res.msg)
				onCloseModal()
				router.replace(router.asPath)
			}else {
				toast.error(res.msg)

			}
		}

	}

	return (
		<>
			<ToastContainer autoClose={1500}/>
			<div
				className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
			>
				<div className="w-auto my-6 mx-auto items-center">
					{/*content*/}
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
						{/*header*/}
						<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
							<h3 className="text-3xl font-semibold">
								Add Todo
							</h3>
							<button
								onClick={onCloseModal}
								className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"

							>
                                        <span
									className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                          ×
                                        </span>
							</button>
						</div>
						<div className='relative p-6 flex-auto'>
							<div className="w-full  px-3 ">
								<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								>
									Todo
								</label>
								<input
									required={true}
									value={todo}
									onChange={(e) => setTodo(e.target.value)}
									className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									type="text" placeholder=""/>
							</div>
							<div className="w-full  px-3">
								<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
									Description
								</label>
								<input
									required={true}
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									type="text" placeholder="Doe"/>
							</div>
						</div>
						<div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
							<button
								className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
								type="button"
								onClick={onCloseModal}
							>
								Close
							</button>
							<button
								className="bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
								type="button"
								onClick={AddTodo}
							>
								Add
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
		</>
	);
};

export default CreateTodoModal;
