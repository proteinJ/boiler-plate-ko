const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // john ahn@naver.com 중간에 공백을 없애주는 역할을함.
        unique: 1 // 똑같은 이메을을 쓰지 못하게 함.       
    },
    password: {
        type: String, // 비밀번호를 넣었을때 암호화해서 들어가는데 그때 숫자가 아닌 다른 것들도 들어가기에 string으로
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    roel: {
        type: Number,
        default: 0 // 0이면 일반, 1은 관리자로 임의 지정
    },
    image: String, 
    token: { // 유효성 관리
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema)

module.exports = {User}