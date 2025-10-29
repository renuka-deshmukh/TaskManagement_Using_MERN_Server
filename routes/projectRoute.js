const express = require('express')
const projectController = require('../controllers/projectController')
const {protect, adminOnly} = require('../middleware/auth')

const router = express.Router()

router.get('/getAllProjects', projectController.getAllProjects)
router.get('/getProjectById/:id', projectController.getProjectById)
router.post('/createProject', protect, adminOnly, projectController.createProject)
router.put('/updateProject/:id',protect, adminOnly, projectController.updateProject)
router.delete('/deleteProject/:id',protect, adminOnly, projectController.deleteProject)

module.exports = router








