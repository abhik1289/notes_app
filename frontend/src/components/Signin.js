import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';

function Signin() {
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

            if (res.status === 200) {
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
    const initialvalues = {
        email: "", password: ""
    }
    let email, password;
    const submitForm = async (values) => {
        email = values.email;
        password = values.password;
        const res = await fetch("/signin", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ email, password })
        });
        if (res.status === 200) {
            navigate("/");
        } else {
            toast("Wrong Password")
        }
    }
    const validationshema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().min(6).max(10).required()
    })

    return (<section className="w-screen h-screen flex justify-center bg-slate-300 items-center">
        <div className="main-box w-[300px] h-[400px] rounded shadow-md bg-slate-100 p-4">
            <div className="top-bar">
                <div className="title font-main text-3xl font-semibold">
                    Sign in Now
                </div>
                <div className="subTitle font-secondary text-slate-400">
                    Sign in with your Information
                </div>
            </div>
            <div className="formBx mt-4">
                <Formik
                    initialValues={initialvalues}
                    onSubmit={submitForm}
                    validateOnMount
                    validationSchema={validationshema}
                >
                    {(formik) => {
                        console.log(formik.isValid)
                        return (
                            <Form>

                                <div className="frmClm font-main mt-2">
                                    <label>Email</label>
                                    <Field type="text" className="w-full border border-slate-500 outline-none px-2 py-1 focus:border-blue-500" name="email" id="" />


                                </div>

                                <div className="frmClm font-main mt-2">
                                    <label>Password</label>
                                    <Field name="password" type={hidePWd ? "password" : "text"} className="w-full border border-slate-500 outline-none px-2 py-1 focus:border-blue-500" id="" />
                                    <div className="tooglepWd text-right cursor-pointer my-1" onClick={tooglePWd}>
                                        {hidePWd ? "Show" : "Hide"}
                                    </div>

                                </div>
                                <button type="submit" disabled={!formik.isValid} className="w-full text-clip bg-blue-600 font-main text-white py-2 disabled:bg-blue-400">Sign Up</button>
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
                            </Form>
                        );
                    }}

                </Formik>

            </div>
            <div className="bootom-part font-main my-4">
                <p>
                    If you have no Account <Link to="/signup"><span className="text-blue-600 cursor-pointer">Sign up</span></Link>
                </p>
                <p>
                    <Link to="/forgot"><span className="text-blue-600 cursor-pointer">Forgot Password</span></Link>
                </p>
            </div>
        </div>
    </section>);
}

export default Signin;