import {useState} from "react";
import CreateTodoModal from "../components/CreateTodoModal";
import BaseURL from "../util/BaseURL";
import EditTodoModal from "../components/EditTodoModal";
import DeleteTodoModal from "../components/DeleteTodoModal";

export default function Home({ todos }) {
	const [openAddTodoModal,setOpenAddTodoModal] = useState(false)
	const [openEditTodoModal,setOpenEditTodoModal] = useState(false)
	const [openDeleteTodoModal,setOpenDeleteTodoModal] = useState(false)

	const [activeEditTodo,setActiveEditTodo] = useState({})
	const [activeDeleteTodo,setActiveDeleteTodo] = useState({})

	const OpenAddTodoModal = () => {
		setOpenAddTodoModal(true)
	}
	const CloseAddTodoModal = () => {
		setOpenAddTodoModal(false)
	}

	const OpenEditTodoModal = (todo) => {
		setActiveEditTodo(todo)
		setOpenEditTodoModal(true)
	}
	const CloseEditTodoModal = () => {
		setOpenEditTodoModal(false)
	}

	const OpenDeleteTodoModal = (todo) => {
		setActiveDeleteTodo(todo)
		setOpenDeleteTodoModal(true)
	}
	const CloseDeleteTodoModal = () => {
		setOpenDeleteTodoModal(false)
	}




	return (
		<div className="w-screen h-screen bg-gray-200">
			<div className='w-full flex flex-col items-center justify-center sm:w-full overflow-x-hidden scrollbar-hide'>
				<div className=' max-w-screen-xl box-border w-full py-2'>
					<div className='w-full h-full p-4 flex justify-evenly'>
						<h1 className="text-2xl font-bold">Todo List App</h1>
						<button
							onClick={OpenAddTodoModal}
							className='group relative w-1/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						>
							Add Todo
						</button>
					</div>
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
						<tr>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Todo
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Description
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Is Completed
							</th>

							<th scope="col" className="relative px-6 py-3">
								<span className="sr-only">Edit</span>
							</th>
							<th scope="col" className="relative px-6 py-3">
								<span className="sr-only">Edit</span>
							</th>
						</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
						{
							todos.map((todo, index) => {

								return (
									<tr key={index}>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<div className="ml-4">
													{
														todo.isCompleted ? (
															<del className="text-sm font-medium text-gray-900">{todo.todo}</del>
														):(
															<div className="text-sm font-medium text-gray-900">{todo.todo}</div>
														)
													}

												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">{todo.description}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{todo.isCompleted ? "Yes" : "No"}</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<p className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer"
											   onClick={() =>  OpenEditTodoModal(todo)}
											>
												Edit
											</p>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<p className="text-red-600 hover:text-indigo-900 hover:cursor-pointer"
											   onClick={ () => OpenDeleteTodoModal(todo)}
											>
												Delete
											</p>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</div>
			{openAddTodoModal && <CreateTodoModal onCloseModal={CloseAddTodoModal}/>}
			{openEditTodoModal && <EditTodoModal onCloseEditModal={CloseEditTodoModal} activeEditTodo={activeEditTodo}/> }
			{openDeleteTodoModal && <DeleteTodoModal onCloseDeleteModal={CloseDeleteTodoModal} activeDeleteTodo={activeDeleteTodo}/> }
		</div>
	)
}
export async function getServerSideProps(){
	try {
		const response = await fetch(`${BaseURL}/api/todo`)
		const {todos} = await response.json()
		return {
			props: {
				todos
			}
		}
	} catch (e) {
		return {
			props: {
				todos:[]
			}
		}
	}
}
