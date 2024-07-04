import Header from "./Haeder";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLocation,useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EmailPassword() {

    const location = useLocation();
    const navigate =useNavigate();
    let getData;
    try {
        getData = location.state.data
        
    } catch (error) {

    }
    const initialValues = {
        email:getData.email?getData.email:"", password: "",
    }
    let email,password
  
    const submitForm = async (values) => {
        console.log(values)
        email = values.email;
        password = values.password;
        const res = await fetch("/constactEdit", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ email,password,id:getData._id })
        });
        if(res.status===200){
            navigate("/verify",{
                state:{
                    email:email,
                    editMode:true
                }
            })
        }else{
            toast("Date not updated")
        }
    }
    const validationShema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().min(6).max(10).required(),
    });
    return (<section>
        <Header />
        <section className="w-screen flex justify-center h-screen pt-28 items-center">
            <div className="mainBx w-[450px] h-[350px] bg-white rounded-md py-2 px-3">
                <div className="top-part p-4">
                    <div className="title font-main text-3xl">
                        Basic edit
                    </div>
                </div>
                <Formik
                    onSubmit={submitForm}
                    validationSchema={validationShema}
                    initialValues={initialValues}
                >
                    <Form>
                        <div className="frmClm font-main mt-2">
                            <label>Email</label>
                            <Field type="text" className="w-full border border-slate-500 outline-none px-2 py-1 focus:border-blue-500" name="email" id="" />
                            <div className="errorMsg text-red-500">
                                <ErrorMessage name="email" />
                            </div>
                        </div>
                        <div className="frmClm font-main mt-2">
                            <label>Password</label>
                            <Field type="text" className="w-full border border-slate-500 outline-none px-2 py-1 focus:border-blue-500" name="password" id="" />
                            <div className="errorMsg text-red-500">
                                <ErrorMessage name="password" />
                            </div>
                        </div>
                       
                        <button type="submit" className="mt-2 w-full text-clip bg-blue-600 font-main text-white py-2 capitalize">update</button>
                        <ToastContainer
                            position="bottom-left"
                            autoClose={2000}
                            hideProgressBar={true}
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
        </section>
    </section>
    );
}

export default EmailPassword;