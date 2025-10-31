const Project = require('../models/projectModel')

async function getAllProjects(req, res){
    
    try {
        const projects = await Project.find()
        res.status(200).json({projects: projects})
       
    } catch (error) {
         console.error(" getAllProjects error", error);
    res.status(500).json({ message: "Server error" });
    }

}

async function getProjectById(req, res){
    const id = req.params.id
    try {
        const project = await Project.findOne({_id:id})
        if(!project) return res.status(404).json({msg: "project not found" , success:false})
        
        res.status(200).json({project:project , success: true})    
        
    } catch (error) {
         console.error("getProjectById error", error);
    res.status(500).json({ message: "Server error" });
    }

}

async function createProject (req, res){
    const { name, description, startDate, endDate, addedBy } = req.body;
    try {
        const newProject = await Project.create({ name, description, startDate, endDate, addedBy });
        await newProject.save()
        res.status(200).json({ message: "Project added  successfully", success: true })
                                                    
    } catch (error) {
         console.error("createProject error", error);
    res.status(500).json({ message: "Server error" });
    }

}

async function updatedProject(req, res) {
  console.log("Update request:", req.body, "ID:", req.params.id);
  const { name, description, startDate, endDate, status } = req.body;
  const id = req.params.id;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name, description, startDate, endDate, status },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      msg: "Project updated successfully",
      project: updatedProject,
      success: true,
    });
  } catch (error) {
    console.error("updateProject error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

 async function deleteProject (req, res){
    const id = req.params.id;
    try {
        const deleteProject = await Project.findByIdAndDelete(id)
        res.status(200).json({msg:"Project deleted successfully"})
        
    } catch (error) {
         console.error("deleteProject error", error);
    res.status(500).json({ message: "Server error" });
    }

}

async function updateProjectStatusById(req, res){
    const id = req.params.id
    const {status} = req.body
    try {
        const ProjectForUpdateStatus = await Project.findById(id)
        if(!ProjectForUpdateStatus) return res.status(404).json({message:"Project not found"})

        const updateStatus = await Project.findByIdAndUpdate(id, {status}, {new: true})
        res.status(200).json({message:"Project status updated successfully "})
        
    } catch (error) {
         console.error("statusUpdating error", error);
    res.status(500).json({ message: "Server error" });
    }
}



module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updatedProject, 
    deleteProject,
    updateProjectStatusById
}