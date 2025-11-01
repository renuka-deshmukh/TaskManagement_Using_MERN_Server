const express = require('express')
const cors = require('cors')
const userRoute = require('./routes/userRoute')
const projectRoute = require('./routes/projectRoute')
const taskRoute = require('./routes/taskRoute')
const connectDB = require('./config/db')
const path = require('path')
const app = express()
const port = 3000


app.use(express.json());
app.use(cors())

connectDB()
// app.get('/', (req, res) => res.send('Hello World!'))

app.use('/user', userRoute)
app.use('/download', express.static(path.join('uploads')) )
app.use('/project', projectRoute)
app.use('/task', taskRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))