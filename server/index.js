const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require("./middleware/auth");
const { User } = require("./models/User");
// const cors = require('cors')

// CORS_ALLOWED_ORIGINS에 허용할 도메인을 추가
// 출처: https://skylarcoding.tistory.com/128 [코딩 공부하는 블로그:티스토리]
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/hello', async (req, res) => {
  res.send("Hello World~! ")
});







app.post('/api/users/register', async (req, res) => {
  //회원가입시 필요 정보를 client에서 가져오면
  //데이터베이스에 삽입한다

  //body parser를 통해 body에 담긴 정보를 가져온다
  const user = new User(req.body)

  //mongoDB 메서드, user모델에 저장
  const result = await user.save().then(()=>{
    res.status(200).json({
      success: true
    })
  }).catch((err)=>{
    res.json({ success: false, err })
  })  
})

app.post('/api/users/login', (req,res) => {
  
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email })
  .then(user=>{
      if(!user) {
        return res.json({
          loginSuccess: false,
          message: "제공된 이메일에 해당하는 유저가 없습니다."
        })
      }
    // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는지 확인.
    user.comparePassword(req.body.password,(err,isMatch)=>{
      if(!isMatch)
      return res.json({loginSuccess:false, message:"비밀번호가 틀렸습니다"})
  
      user.generateToken((err,user)=>{
        if(err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 등에 저장가능.
        res.cookie("x_auth", user.token)
          .status(200) // 성공했다는 뜻
          .json({ loginSuccess: true, userId: user._id })
      }
      )
    })
  })
  .catch((err) => {
    return res.status(400).send(err);
  })
})


app.get('/api/users/auth', auth, (req, res) => {

  // 여기 까지 미들웨어를 통과해 왔다는 얘기는 Authentication 이 True라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, // User.js에 우리가 0은 일반유저 1은 어드민이라 설정함.
    isAtuh: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id},
    { token: ""})
    
    .then(() => {
      return res.status(200).json({
        logoutSuccess: true
      });
    })
    .catch((err) => {
      return res.status(400).json({
        logoutSuccess: false,
        message: err.message
      });
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })