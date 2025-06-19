import React from "react";
import icon from "../img/icon.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate()
    return (
        <>
          
            <div className="container-fluid px-3 py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
                        <div className="card shadow p-4 mt-4 " style={{ minHeight: "500px" }}>
                            <div className="text-center">
                                <img src={icon} alt="Logo" className="img-fluid mb-3" style={{ maxHeight: "80px" }} />
                                <h3 className="mb-4">Login</h3>
                            </div>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                                </div>
                                <div className="d-grid">
                                <button type="button" className="btn btn-primary" onClick={() => navigate('/dashboard/payroll')}>Login</button>

                                </div>
                                <div className="text-center mt-3">
                                    <small>Don't have an account? <a href="#">Register</a></small>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
