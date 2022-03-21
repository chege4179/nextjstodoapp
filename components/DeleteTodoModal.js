import React, {useState} from "react";
import {useRouter} from "next/router";
import {toast, ToastContainer} from "react-toastify";
import BaseURL from "../util/BaseURL";

const DeleteTodoModal = ({ onCloseDeleteModal,activeDeleteTodo }) => {
	const router = useRouter()
	const AddTodo =async () => {
		try {
			const response = await fetch(`${BaseURL}/api/todo`,{
				method:'DELETE',
				headers:{
					'Content-Type':'application/json'
				},
				body:JSON.stringify({ id:activeDeleteTodo._id })
			})
			const res = await response.json()
			console.log(res)
			if (res.success){
				toast.success(res.msg)
				onCloseDeleteModal()
				router.replace(router.asPath)
			}else {
				toast.error(res.msg)

			}
		}catch (e){
			console.log(e)

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
								Edit Todo
							</h3>
							<button
								onClick={onCloseDeleteModal}
								className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"

							>
                                        <span
									className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                          ×
                                        </span>
							</button>
						</div>
						<div className='relative p-6 flex-auto'>
							<h1>Are you sure you want to delete this tod ?</h1>
						</div>
						<div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
							<button
								className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
								type="button"
								onClick={onCloseDeleteModal}
							>
								Close
							</button>
							<button
								className="bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
								type="button"
								onClick={AddTodo}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
		</>
	);
};

export default DeleteTodoModal;
