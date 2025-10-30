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

async function updateProject(req, res) {
  const { name, description, startDate, endDate } = req.body;
  const id = req.params.id;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      {_id:id},
      { name, description, startDate, endDate },
      { new: true }
    );
    updatedProject.save()

    if (!updatedProject) return res.status(404).json({ message: "Project not found" });
    
    res.status(200).json({msg: "Project updated successfully", success: true,
    });
  } catch (error) {
    console.error("updateProject error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
}



 async function deleteProject (req, res){
    const id = req.params.id;
    try {
        const deleteProject = await Project.findByIdAndDelete({_id:id})
        res.status(200).json({msg:"Project deleted successfully"})
        
    } catch (error) {
         console.error("deleteProject error", error);
    res.status(500).json({ message: "Server error" });
    }

}

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject, 
    deleteProject
}