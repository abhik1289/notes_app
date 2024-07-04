import { useState } from "react";
import {Formik,Field,Form} from 'formik';
import * as Yup from 'yup';
import { useLocation,useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ChangePassword() {
    const [hidePWd,setHidePWd] = useState(true);
    const [chidePWd,cscetHidePWd] = useState(true);
    let location = useLocation();
    let navigate = useNavigate();
    let email;
    try {
     email = location.state.email;
     if(email==null){
        window.location="/signup";
     }
    } catch (error) {
     window.location="/signup"; 
    }
    const tooglePWd =() =>{
        setHidePWd(!hidePWd)
    }
    const ctooglePWd =() =>{
        cscetHidePWd(!chidePWd)
    }
    const initialvalues ={
        password:"",cpassword:""
    }
    let password;
    const submitForm=async(values)=>{
        password = values.password;
        const res = await fetch("/changePassword", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({email, password })
        });
       if(res.status===200){
        navigate("/signin")
       }else{
        toast("Wrong Otp")
       }
    }
    const validationshema = Yup.object({
        password:Yup.string().min(6).max(10).required(),
        acceptTerms: Yup.bool().oneOf([true])
    })
    return (<section className="w-screen h-screen flex justify-center bg-slate-300 items-center">
        <div className="main-box w-[300px] h-[400px] rounded shadow-md bg-slate-100 p-4">
            <div className="top-bar">
                <div className="title font-main text-3xl font-semibold">
                    Sign up Now
                </div>
                <div className="subTitle font-secondary text-slate-400">
                    Sign up with your Information
                </div>
            </div>
            <div className="formBx mt-4">
                <Formik
                initialValues={initialvalues}
onSubmit={submitForm}
                validationSchema={validationshema}
                >

            
                <Form>
                <div className="frmClm font-main mt-2">
                        <label>Password</label>
                        <Field type={hidePWd?"password":"text"} className="w-full border border-slate-500 outline-none px-2 py-1 focus:border-blue-500" name="password" id="" />
                        <div className="tooglepWd text-right cursor-pointer my-1" onClick={tooglePWd}>
                            {hidePWd?"Show":"Hide"}
                        </div>
                      
                    </div>
                    <div className="frmClm font-main my-2">
                        <label>Confirm Password</label>
                        <Field type={chidePWd?"password":"text"} className="w-full border border-slate-500 outline-none px-2 py-1 focus:border-blue-500" name="cpassword" id="" />
                        <div className="tooglepWd text-right cursor-pointer my-1" onClick={ctooglePWd}>
                            {chidePWd?"Show":"Hide"}
                        </div>
                     
                    </div>
                
                    <button className="w-full text-clip bg-blue-600 font-main text-white py-2">Sign Up</button>
                    <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                </Form>
                </Formik>
            </div>
        </div>
    </section>);
}

export default ChangePassword;