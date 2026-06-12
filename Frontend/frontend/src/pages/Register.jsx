import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerAPI } from '../services/allAPI'
import { toast } from 'react-toastify'

function Register() {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleRegister = async (e) => {

        e.preventDefault()

        const { username, email, password } = userData

        if (!username || !email || !password) {
            toast.warning("Please fill all fields")
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.warning("Please enter a valid email address");
            return;
        }

        if (password.length < 6) {
            toast.warning("Password must be at least 6 characters long");
            return;
        }

        try {

            const result = await registerAPI(userData)

            if (result.status === 200) {

                toast.success("Registration Successful")

                setUserData({  username: "", email: "",  password: ""   })

                navigate('/')

            } else {
                toast.error(result.response.data)
            }

        } catch (err) {
            console.log(err)
            toast.error("Registration Failed")
        }
    }

    return (

        <div className="auth-wrapper">

            <div className="auth-container-custom">

             

                <div className="welcome-section">

                   <div className="shape diamond"></div>
<div className="shape triangle"></div>
<div className="shape rect"></div>
<div className="shape circle"></div>

<h1>Welcome Back!</h1>

<p>
  To keep connected with us please
  login with your personal info
</p>

<Link to="/" className="outline-btn">
  SIGN IN
</Link>

                </div>

                <div className="form-section">

                    <div className="form-content">

                        <h1>
                            Create Account
                        </h1>

                        <form>

                            <input type="text"  placeholder="Name" value={userData.username} onChange={(e) => setUserData({  ...userData,  username: e.target.value  }) }   />

                            <input
                                type="email" placeholder="Email" value={userData.email}
                                onChange={(e) => setUserData({  ...userData,  email: e.target.value    }) } />

                            <input type="password"  placeholder="Password" value={userData.password} onChange={(e) => setUserData({...userData, password: e.target.value  })
                                }
                            />

                            <button
                                type="button"
                                className="auth-btn mt-3"
                                onClick={handleRegister}
                            >
                                SIGN UP
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    )
}

export default Register