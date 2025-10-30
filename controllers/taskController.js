const Task = require('../models/taskModel')

async function getAllTasks(req, res){
    
    try {
        const tasks = await Task.find()
        res.status(200).json({tasks: tasks})
       
    } catch (error) {
         console.error(" getAllTasks error", error);
    res.status(500).json({ message: "Server error" });
    }

}

async function getTaskById(req, res){
    const id = req.params.id
    try {
        const task = await Task.findOne({_id:id})
        if(!task) return res.status(404).json({msg: "Task not found" , success:false})
        
        res.status(200).json({task:task , success: true})    
        
    } catch (error) {
         console.error("getTaskById error", error);
         res.status(500).json({ message: "Server error" });
    }

}

async function createTask (req, res){
    const {title,description, startDate, endDate, addedBy,projectId, assignTo } = req.body;
    try {
        const newTask = await Task.create({title,description, startDate, endDate, addedBy,projectId, assignTo });
        await newTask.save()
        res.status(200).json({ message: "Task added  successfully", success: true })
                                                    
    } catch (error) {
         console.error("createTask error", error);
    res.status(500).json({ message: "Server error" });
    }

}

async function updateTask(req, res) {
  const {title,description, startDate, endDate, addedBy,projectId, assignTo }  = req.body;
  const id = req.params.id;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      {_id:id},
      {title,description, startDate, endDate, addedBy,projectId, assignTo },
      { new: true }
    );
    updatedTask.save()

    if (!updatedTask) return res.status(404).json({ message: "Task not found" });
 
    res.status(200).json({msg: "Task updated successfully", success: true,
    });
  } catch (error) {
    console.error("updateTask error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
}



 async function deleteTask (req, res){
    
    try {
        const id = req.params.id;
        const deleteTask = await Task.findByIdAndDelete({_id:id})
        res.status(200).json({msg:"Task deleted successfully"})
        
    } catch (error) {
         console.error("deleteTask error", error);
    res.status(500).json({ message: "Server error" });
    }

}

module.exports = {
   createTask,getAllTasks, getTaskById, updateTask,deleteTask
}