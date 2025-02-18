import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';


function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    // 이메일 칸에 칠 수 있게 만듦.
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    
    const onPasswordHandler = (event) => {
      setPassword(event.currentTarget.value)
  }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); // 로그인 버튼을 누를때마다 새로고침 되는것을 막음.

        if(Password !== ConfirmPassword) {
          return alert('비밀번호와 비밀번호 확인은 같아야합니다.')
        }

        console.log('Email', Email);
        console.log('Password', Password);
        
        let body = {
            email : Email,
            name : Name,
            password : Password,
            confirmPassword : ConfirmPassword
        }

        dispatch(registerUser(body))
            .then(response => {
              if(response.payload.success){
                navigate('/'); 
              }else {
                alert("Failed to sign up")
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

          <label>Name</label>
          <input type="text" value={Name} onChange={onNameHandler} />

          <label>Password</label>
          <input type="password" value={Password} onChange={onPasswordHandler} />

          <label>Confirm Password</label>
          <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

          
          <br />
          <button type="submit">
              register
          </button>
  </form>
  </div>
)
}

export default RegisterPage
