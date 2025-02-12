const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://jaehyun516:6XcnnurqrSTiY2M7@boilerplate.kk1cq.mongodb.net/?retryWrites=true&w=majority&appName=boilerplate', {
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))



app.get('/', (req, res) => res.send('Hello World! 반갑습니다.'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))