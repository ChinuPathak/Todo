import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("authToken")
        navigate("/login")
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark bg-body-tertiary d-flex">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="#">To-Do</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link class="nav-link active" aria-current="page" to="#">Home</Link>
                            </li>
                            {(localStorage.getItem("authToken")) ?
                                <>
                                    <li className="nav-item">
                                        <Link class="nav-link" to="/">History</Link>
                                    </li>
                                    <li className="nav-item">
                                        <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>LogOut</div>
                                        {/* <Link class="nav-link" to="/login">Log Out</Link> */}
                                    </li>
                                </>
                                :
                                <li class="nav-item">
                                    <Link class="nav-link" to="/login">Login</Link>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
