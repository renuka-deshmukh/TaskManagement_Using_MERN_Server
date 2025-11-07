const express = require('express')
const taskController = require('../controllers/taskController')
const {protect, adminOnly} = require('../middleware/auth')

const router = express.Router()

router.get('/getAllTasks', taskController.getAllTasks)
router.get('/getTaskById/:id', taskController.getTaskById)
router.post('/createTask', protect, adminOnly, taskController.createTask)
router.put('/updateTask/:id',protect, adminOnly, taskController.updateTask)
router.delete('/deleteTask/:id',protect, adminOnly, taskController.deleteTask)

router.patch('/updateTaskStatus/:id', protect,taskController.updateTaskStatus)
router.get('/getTasksOfUser', protect, taskController.getTasksOfUser)

router.get('/getTasksByProject/:id', taskController.getTasksByProject)
router.get('/getTasksByAssigned/:id', taskController.getTasksByAssigned)
router.get('/getTasksByCreatedUser/:id', taskController.getTasksByCreatedUser)

module.exports = router








