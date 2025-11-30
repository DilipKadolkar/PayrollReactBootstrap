// import React, { useState } from "react";
// import icon from "../img/icon.png";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//     const [login , setLogin] = useState(false);
    
//     const handleClick = () =>{
//         setLogin(true)
//         navigate('/dashboard/payroll')
//     }
//     console.log(login)
//     const navigate = useNavigate()
//     return (
//         <>
          
//             <div className="container-fluid px-3 py-5">
//                 <div className="row justify-content-center">
//                     <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
//                         <div className="card shadow p-4 mt-4 " style={{ minHeight: "500px" }}>
//                             <div className="text-center">
//                                 <img src={icon} alt="Logo" className="img-fluid mb-3" style={{ maxHeight: "80px" }} />
//                                 <h3 className="mb-4">Login</h3>
//                             </div>
//                             <form>
//                                 <div className="mb-3">
//                                     <label htmlFor="email" className="form-label">Email address</label>
//                                     <input type="email" className="form-control" id="email" placeholder="Enter your email" />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="password" className="form-label">Password</label>
//                                     <input type="password" className="form-control" id="password" placeholder="Enter your password" />
//                                 </div>
//                                 <div className="d-grid">
//                                 <button type="button" className="btn btn-primary" onClick={() => handleClick()}>Login</button>

//                                 </div>
//                                 <div className="text-center mt-3">
//                                     <small>Don't have an account? <a href="#">Register</a></small>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }


import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../img/icon.png";
import { AuthContext } from "./AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);
  
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          await login(email, password);
          navigate("/dashboard/payroll"); // redirect after login
        } catch (err) {
          setError(err.message);
        }
      };
  
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
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter your email"   value={email}
                  onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className="d-grid">
                                 <h6 className="text-danger text-center">{error}</h6>   
                                <button type="submit" className="btn btn-primary"  >Login</button>

                                </div>
                                <div className="text-center mt-3">
                                    <small>Forgot Password? <a href="#">Forgot Password</a></small>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

