import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/loginuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            });
            const json = await response.json();
            console.log(json);

            if (!json.success) {
                alert('Enter valid Credentials');
            }
            if (json.success) {
                localStorage.setItem('userEmail', credentials.email);
                localStorage.setItem('authToken', json.authToken);
                navigate('/');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to connect to the server.');
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div
            className="d-flex align-items-center justify-content-center vh-100"
            style={{
                backgroundColor: '#282c34', // Optional background color
            }}
        >
            <div className="container p-4" style={{ maxWidth: '400px', backgroundColor: '#444', borderRadius: '10px' }}>
                <h3 className="text-center text-white mb-4">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label text-white">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            name="email"
                            value={credentials.email}
                            onChange={onChange}
                        />
                        <div id="emailHelp" className="form-text text-light">
                            We'll never share your email with anyone else.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            name="password"
                            value={credentials.password}
                            onChange={onChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-3">
                        Submit
                    </button>
                    <Link to={'/signup'}>
                        <button type="button" className="btn btn-danger w-100">
                            New User
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
}
