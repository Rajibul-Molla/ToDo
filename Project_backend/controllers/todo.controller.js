import Todo from "../models/todo.model.js";

// create todo

export const createTodo = async (req, res) => {
    try {
        const { title } = req.body;

        // ✅ Add return here
        if (!title || title.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        const todo = await Todo.create({ title });

        return res.status(201).json({   // ✅ 201 = Created, more correct than 200
            success: true,
            message: "ToDo Created Successfully",
            todo
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};




// Get all todo
export const getalltodo = async (req,res)=>{
    try{
        const todos = await Todo.find({});


        return res.status(200).json({
            sucess: true,
            count: todos.length,
            message: "ToDos fetched successfully",
            data : todos
        });
    }
        catch(error){
        return res.status(500).json({
            sucess:false,
            message:"Internal Server Error",
            error:error.message
        })
    }

}



// Update TOdo
export const updatetodo = async (req,res)=>{
    try{
        const { id } = req.params;
        const { title } = req.body;
        const updatedTodo = await Todo.findOneAndUpdate(
            { id: id }, 
            { title: title }, 
            { new: true } 
        );



        // If no todo matched that ID
        if (!updatedTodo) {
            return res.status(404).json({
                sucess: false,
                message: "ToDo item not found"
            });
        }
        //if match found
        return res.status(200).json({
            sucess: true,
            message: "ToDo Updated Successfully",
            todo: updatedTodo
        });

    }
        catch(error){
        return res.status(500).json({
            sucess:false,
            message:"Internal Server Error",
            error:error.message
        })
    }
}





// Delete
// Delete Todo
export const deletetodo = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTodo = await Todo.findOneAndDelete({ id: id });

      
        if (!deletedTodo) {
            return res.status(404).json({
                sucess: false,
                message: "ToDo item not found"
            });
        }

        
        return res.status(200).json({
            sucess: true,
            message: "ToDo Deleted Successfully",
            todo: deletedTodo 
        });

    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};