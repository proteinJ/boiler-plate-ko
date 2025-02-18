import React, { useState } from 'react';
// import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    // 이메일 칸에 칠 수 있게 만듦.
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); // 로그인 버튼을 누를때마다 새로고침 되는것을 막음.
        
        console.log('Email', Email);
        console.log('Password', Password);
        
        
        let body = {
            email : Email,
            password : Password
        }
    
    

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess) {
                    navigate('/'); // 로그인 성공시 메인페이지로 이동.
                } else {
                    alert('Error');
                }
            })

        }
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
        
        <form style={{ display:'flex', flexDirection: 'column'}}
            onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type="submit">
                    Login
                </button>
        </form>
        </div>
    )
}


export default LoginPage