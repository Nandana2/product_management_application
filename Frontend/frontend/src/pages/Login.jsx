import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI } from '../services/allAPI'
import { toast } from 'react-toastify'

function Login() {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const handleLogin = async (e) => {

        e.preventDefault()

        const { email, password } = userData

        if (!email || !password) {
           toast.warning("Please fill all fields")
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.warning("Please enter a valid email address");
            return;
        }

        try {

            const result = await loginAPI(userData)

            if (result.status === 200) {

                sessionStorage.setItem(
                    "token",
                    result.data.token
                )

                sessionStorage.setItem(
                    "existingUser",
                    JSON.stringify(result.data.user)
                )

               toast.success("Login Successful")

setTimeout(() => {
    navigate('/home')
}, 1500)

            }

        } catch (err) {
            toast.error("Invalid Email or Password")
        }
    }

    return (

        <div className="auth-wrapper">

            <div className="auth-container-custom">

                {/* Left Form Section */}

                <div className="form-section">

                    <div className="form-content">

                        <h1>
                            Sign In to
                            <br />
                            Your Account
                        </h1>

                        <form>

                            <input
                                type="email"
                                placeholder="Email"
                                value={userData.email}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        email: e.target.value
                                    })
                                }
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={userData.password}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        password: e.target.value
                                    })
                                }
                            />

                            <p className="forgot">
                                forgot password?
                            </p>

                            <button
                                type="button"
                                className="auth-btn"
                                onClick={handleLogin}
                            >
                                SIGN IN
                            </button>

                        </form>

                    </div>

                </div>

                {/* Right Section */}

                <div className="welcome-section">

                   <div className="shape diamond"></div>
<div className="shape triangle"></div>
<div className="shape rect"></div>
<div className="shape circle"></div>

<h1>Hello Friend</h1>

<p>
  Enter your personal details and start your journey with us
</p>

<Link to="/register" className="outline-btn">
  SIGN UP
</Link>

                </div>

            </div>

        </div>

    )
}

export default Login