import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Logout() {
    const navigate = useNavigate();
    const getToken = async () => {
        const res = await fetch("/logout", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
            credentials: 'include',
        });
        if (res.status === 200) {
            navigate("/signin")
            localStorage.removeItem("name")
            localStorage.removeItem("fname")

        } else {
            toast("Problem Something")
        }
    }
    useEffect(() => {
        getToken()
    });
    return (<section>   <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    /></section>);
}

export default Logout;