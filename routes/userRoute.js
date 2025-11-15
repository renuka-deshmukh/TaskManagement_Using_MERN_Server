const express = require('express')
const userController = require('../controllers/userController')
const { protect } = require('../middleware/auth')
const { uploadSingle } = require('../middleware/multer')
const router = express.Router()

router.post('/register' , uploadSingle('avatar'), userController.register)
router.post('/login' , userController.login)
router.get('/getUserInfo', protect, userController.getUserInfo)
router.get('/getAllUsers', userController.getAllUsers)
router.put('/update-avatar', protect, uploadSingle('avatar'), userController.updateAvatar);


module.exports = router