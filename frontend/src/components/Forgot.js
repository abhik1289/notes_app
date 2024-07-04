import {Link,useNavigate} from 'react-router-dom'
import {Formik,Field,Form,ErrorMessage} from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
function Forgot() {
    const navigate = useNavigate();
    const initialvalues ={
        email:""
    }
    let email;
    const submitForm=async(values)=>{
        email = values.email;
        const res = await fetch("/checkEmail", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ email })
        });
        if(res.status===200){
            navigate("/forgotVerify",{
                state:{
                    email:email
                }
            })
        }else{
            toast("Wrong Otp")
        }
    }
    const validationshema = Yup.object({
        email: Yup.string().email().required(),
    })
    return (<section className="w-screen h-screen flex justify-center bg-slate-300 items-center">
    <div className="main-box w-[300px] h-[300px] rounded shadow-md bg-slate-100 p-4">
        <div className="top-bar">
            <div className="title font-main text-3xl font-semibold">
                Put Your Email
            </div>
         
        </div>
        <div className="formBx mt-4">
            <Formik
            initialValues={initialvalues}
            onSubmit={submitForm}
            validationSchema={validationshema}
            >
            <Form>
             
                <div className="frmClm font-main my-2">
                    <label>Email</label>
                    <Field type="text" className="w-full border border-slate-500 outline-none px-2 py-1 focus:border-blue-500" name="email" id="" />
                    <div className="errorMsg text-red-500">
                            <ErrorMessage name="email"/>
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
        <div className="bootom-part font-main my-4">
        
            <p>
              Rember password  <Link to="/signin"><span className="text-blue-600 cursor-pointer">Sign in</span></Link>
            </p>
        </div>
    </div>
</section>);
}

export default Forgot;