import { useState,useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
function Signup() {
    useEffect(() => {
        getToken()
    });
    const navigate = useNavigate();

    const getToken = async () => {
        try {
            const res = await fetch("/getUserData", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
                credentials: 'include',
            });
           
            if(res.status===200){
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }
    const [hidePWd, setHidePWd] = useState(true);
    const tooglePWd = () => {
        setHidePWd(!hidePWd)
    }
    const initialValues = {
        name: "", email: "", mobile: "", password: "", acceptTerms: false
    }
    let name, email, mobile, password;
    const submitForm = async (values) => {
        // console.log(values)
        name = values.name;
        email = values.email;
        mobile = values.mobile;
        password = values.password;
        const res = await fetch("/signUp", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ name, email, mobile, password })
        });
        if (res.status === 200) {
            toast("Check Otp & verify Account")
           setTimeout(() => {
            navigate("/verify", {
                state: {
                    email: email
                }
            }) 
           }, 1500);
        } else {
            toast("Date not saved")
        }
    }
    const validationShema = Yup.object({
        name: Yup.string().min(3).max(15).required(),
        email: Yup.string().email().required(),
        mobile: Yup.number().required(),
        password: Yup.string().min(6).max(10).required(),
        acceptTerms: Yup.bool().oneOf([true])
    })
    return (<section className="w-screen h-screen flex justify-center bg-slate-300 items-center">
        <div className="main-box w-[300px] min-h-[500px] rounded shadow-md bg-slate-100 p-4">
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
                    initialValues={initialValues}
                    onSubmit={submitForm}
                    validationSchema={validationShema}
                >
                    <Form>
                        <div className="frmClm font-main mt-2">
                            <label>Name</label>
                            <Field type="text" className="w-full border border-slate-500 outline-none px-2 py-1 focus:border-blue-500" name="name" id="" />
                            <div className="errorMsg text-red-500">
                                <ErrorMessage name="name" />
                            </div>
                        </div>
                        <div className="frmClm font-main mt-2">
                            <label>Email</label>
                            <Field type="text" className="w-full border border-slate-500 outline-none px-2 py-1 focus:border-blue-500" name="email" id="" />
                            <div className="errorMsg text-red-500">
                                <ErrorMessage name="email" />
                            </div>
                        </div>
                        <div className="frmClm font-main mt-2">
                            <label>Mobile</label>
                            <Field type="text" className="w-full border border-slate-500 outline-none px-2 py-1 focus:border-blue-500" name="mobile" id="" />
                            <div className="errorMsg text-red-500">
                                <ErrorMessage name="mobile" />
                            </div>
                        </div>
                        <div className="frmClm font-main mt-2">
                            <label>Password</label>
                            <Field type={hidePWd ? "password" : "text"} className="w-full border border-slate-500 outline-none px-2 py-1 focus:border-blue-500" name="password" />
                            <div className="tooglepWd text-right cursor-pointer my-1" onClick={tooglePWd}>
                                {hidePWd ? "Show" : "Hide"}
                            </div>
                            <div className="errorMsg text-red-500">
                                <ErrorMessage name="password" />
                            </div>
                        </div>
                        <button type="submit" className="w-full text-clip bg-blue-600 font-main text-white py-2">Sign Up</button>
                        <div className="chekBx font-main flex items-center mt-2">
                            <Field type="checkbox" name="acceptTerms" id="" />
                            <p className="ml-2">I agreed all types of Terms</p>
                        </div>
                        <div className="errorMsg text-red-500">
                            <ErrorMessage name="acceptTerms" />
                        </div>
                    </Form>
                </Formik>
            </div>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="bootom-part font-main my-4">
                <p>
                    Alreay you have a account <Link to="/signin"><span className="text-blue-600 cursor-pointer">Sign in</span></Link>
                </p>
            </div>
        </div>
    </section>);
}

export default Signup;