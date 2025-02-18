const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 
const { JsonWebTokenError } = require('jsonwebtoken');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const util = require('util');

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



userSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')){
            //비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) {return next(err)}

        bcrypt.hash(user.password, salt, function(err, hash) {
            // Store hash in your password DB.
            if(err) return next(err);
            user.password = hash;
            next();
    });
});
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
    // plainPassword 1234567    암호화된 비밀번호 "$2b$10$kQ.KHs/YGB7OKf3yE/2EDuzO8FetKVD9muJvkITLZpBBAqRTYbFE2"
    bcrypt.compare(plainPassword, this.password, function(err, isMatch)  {
        if(err) return cb(err)
        cb(null, isMatch)
    })
}



userSchema.methods.generateToken = function(cb) {
    var user = this
    // jsonwebtoken을 이용해서 token 생성하기 
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    
    user.token = token;
    user.save().then(() => {
        return cb(null, user)
    }).catch((err)=> {
        return cb(err)
    })
    }

userSchema.statics.findByToken = function(token){
    const user = this

    // 토큰을 decode 한다.
    return util.promisify(jwt.verify)(token, 'secretToken')
    .then((decoded) => {
        console.log(decoded);
        return user.findOne({
            "_id": decoded,
            "token": token
        })
    })
    .catch((err) => {
        console.log(err);
        throw new Error("유효하지 않은 토큰입니다.")
    });
}

const User = mongoose.model('User', userSchema)

module.exports = { User }