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
        const project = await Project.findById(id)
        if(!project) return res.status(400).json({msg: "project not found" , success:false})
        
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
        res.status(200).json({newProject: newProject, success: true })
                                                    
    } catch (error) {
         console.error("createProject error", error);
    res.status(500).json({ message: "Server error" });
    }

}

async function updateProject(req, res) {
  const { name, description, startDate, endDate, status, addedBy } = req.body;
  const id = req.params.id;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name, description, startDate, endDate, status, addedBy },
      { new: true } // return updated document
    );

    if (!updatedProject) {
      return res.status(404).json({ msg: "Project not found" });
    }

    return res.status(200).json({
      msg: "Project updated successfully",
      updatedProject,
      success: true,
    });
  } catch (error) {
    console.error("updateProject error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

//  async function updateProject (req, res){
//      const { name, description, startDate, endDate, status,  addedBy } = req.body;
//      const id = req.params.id
//    try{

//     const updateProject = await Project.findByIdAndUpdate(id, {name, description, startDate, endDate, status,  addedBy}, { new: true })
//     console.log(updateProject, "+++++++++++++++")
//     if(!updateProject){
//      res.status(200).json({msg:"Project not found"})
//     }
//      return res.status(200).json({
//       msg: "Project updated successfully",
//       updateProject,
//       success: true
//     });

//     } catch (error) {
//          console.error("updateProject error", error);
//     res.status(500).json({ message: "Server error" });
//     }

// }

 async function deleteProject (req, res){
    const id = req.params.id;
    try {
        const deleteProject = await Project.findByIdAndDelete({id:id})
        if(deleteProject){
            res.status(200).json({msg:"Project deleted successfully"})
        }else{
            res.status(404).json({msg:"Project not found"})
        }
        
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