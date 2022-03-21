import Todo from "../../../models/Todo";
import connectDB from "../../../middleware/mongodb";


const  handler = async (req, res) => {
	if (req.method === "GET"){
		const todos = await Todo.find()
		return res.json({
			todos
		})
	}else if (req.method ==="POST"){
		const { todo, description } = req.body;
		if (todo && description) {
			try {
				const newwtodo = new Todo({
					todo,
					description,
				});
				// Create new user
				const newTodo = await newwtodo.save()
				return res.status(200).json({
					msg:'Todo added successfully',
					success:true
				});
			} catch (error) {
				return res.json({
					msg:error.message,
					success:false
				});
			}
		} else {
			return res.status(500).json({
				msg:"Bad Request",
				success:false
			});
		}

	}else if (req.method ==="PUT"){
		const { todo,description,isCompleted,id } = req.body
		Todo.findByIdAndUpdate(id,{todo,description,isCompleted},{},(err,result) => {
			if (err){
				console.log(err)
				return res.json({
					msg:"An error  occurred while updating the todo",
					success:false
				})
			}else {
				return res.json({
					msg:"Todo updated successfully",
					success:true
				})
			}
		})

	}else if (req.method ==="DELETE"){
		const { id } = req.body
		console.log(id)
		try {
			await Todo.findByIdAndDelete(id)
			return res.json({
				msg:"Todo deleted successfully",
				success:true
			})
		}catch (e){
			return res.json({
				msg:"Todo was not deleted",
				success:false
			})
		}


	}

}
export default connectDB(handler)
