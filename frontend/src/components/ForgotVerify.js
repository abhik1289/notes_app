import { useState } from "react";
import OTPInput from "otp-input-react";
import { ToastContainer, toast } from 'react-toastify';
import {useLocation,useNavigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
function ForgotVerify() {
    const location = useLocation();
    const navigate = useNavigate();
    let email;
    try {
     email = location.state.email;
     if(email==null){
        window.location="/signup";
     }
    } catch (error) {
     window.location="/signup"; 
    }
    const handleOtpFrm =async (event) => {
        event.preventDefault();
        console.log(email,OTP)
        const res = await fetch("/checkOTP", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ email,otp:OTP })
        });
        if(res.status===200){
            toast("Account Verify");
            setTimeout(() => {
                navigate("/changePWD",{
                    state:{
                        email:email
                    }
                })
            }, 1500);
        }else{
            toast("Wrong Otp")
        }
    }
    const [OTP, setOTP] = useState("");
    return (<section className="w-screen h-screen bg-slate-300 flex justify-center items-center">
        <div className="main-box w-[300px] h-[300px] bg-white shadow-md rounded p-5">
            <div className="upper-part  text-center">
                <div className="title font-main font-bold text-2xl">
                    Confirm Otp
                </div>
                <div className="subTitle font-secondary">
                    Enter this otp which is send in your email
                </div>
            </div>
            <div className="otp-part flex flex-col justify-center mt-4">
                {/* <form disabled> */}
               <form method="post">
               <OTPInput inputClassName="border border-blue-300 outline-none focus:border-blue-500" value={OTP} onChange={setOTP} autoFocus OTPLength={5} otpType="number" disabled={false} />
                <button onClick={handleOtpFrm} className="rounded w-full py-2 font-main text-white bg-blue-600 mt-4">Confirm Otp</button>
               </form>
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
                {/* </form> */}
            </div>
            <div className="bootom-part font-main cursor-pointer mt-2">
                <p>Resend Otp</p>
            </div>
        </div>
    </section>);
}

export default ForgotVerify;