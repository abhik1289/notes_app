import { useRef, useState,useEffect } from "react";
import Header from "./Haeder";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLocation,useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';


import axios from 'axios';
 
function BasicEdit() {
    const inputElement = useRef(null);
    const [image, setImage] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [data,setData] = useState([]);
    let getData;
    
    try {
        getData = location.state.data
    } catch (error) {

    }
    useEffect(()=>{
        getToken();
    },[]);
   
   


    const getToken = async () => {
        try {
            const res = await fetch("/getUserData", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
                credentials: 'include',
            });
            const data = await res.json();
            if (res.status !== 200) {
        
            } else {
                setData(data);
           
            }
        } catch (error) {
            console.log(error)
        }
    }
  if(data.profile!=null){
    let imgSrc = document.getElementById("img-prview");
    imgSrc.setAttribute('src', `${process.env.REACT_APP_PATH+data.profile}`)
  }
    const initialValues = {
        name: getData.name, mobile:getData.mobile, file: null
    }
    let id = getData._id;
    const submitForm = async (values) => {
        console.log(values)
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("mobile", values.mobile);
        formData.append("file", values.file);
        formData.append("id", id);
console.log(formData)
        try {
            axios.post("/basicEdit", formData).then((res)=>{
                if(res.status===200){
                    navigate("/profile")
                }
            });
           
        } catch (error) {
            console.log(error)
        }


    }

    const validationShema = Yup.object({
        name: Yup.string().min(3).max(20).required(),
        mobile: Yup.number().required(),
        file: Yup.mixed().required()
    });
    return (<section>
        <Header />
        <section className="w-screen flex justify-center h-screen pt-28 items-center">
            <div className="mainBx w-[450px] h-[450px] bg-white rounded-md py-2 px-3">
                <div className="top-part p-4">
                    <div className="title font-main text-3xl">
                        Basic edit
                    </div>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationShema}
                    onSubmit={submitForm}
                >
                    {({ setFieldValue }) => {
                        return (<Form>
                            <div className="mainInputBxes flex justify-center items-center flex-col">
                                {
                                   <div className="displayImg w-[130px] h-[130px] rounded-full overflow-hidden">
                                        <img alt="" className="h-[100%]" id="img-prview" />
                                    </div> 
                                }
                                <div className="fromClm font-main my-1">
                                    <label>Name</label>
                                    <Field name="name" className="w-full outline-none border focus:border-blue-400 py-1 px-2 border-slate-500" />
                                    <div className="errorMsg text-red-500">
                                        <ErrorMessage name="name" />
                                    </div>
                                </div>
                                <div className="fromClm font-main my-1">
                                    <label>Mobile</label>
                                    <Field name="mobile" className="w-full outline-none border focus:border-blue-400 py-1 px-2 border-slate-500" />
                                    <div className="errorMsg text-red-500">
                                        <ErrorMessage name="mobile" />
                                    </div>
                                </div>
                                <input onChange={(event) => {
                                    let reader = new FileReader();
                                    setFieldValue("file", event.currentTarget.files[0]);
                                    let file = event.currentTarget.files[0];
                                    reader.readAsDataURL(file);
                                    reader.onload = () => {
                                        setImage(true)
                                        let imgUrl = reader.result;
                                        let imgSrc = document.getElementById("img-prview");
                                        imgSrc.setAttribute('src', imgUrl)
                                    }
                                }} ref={inputElement} type="file" name="file" hidden id="" />
                                <div
                                    onClick={() => {
                                        inputElement.current.click()
                                    }}
                                    className="w-full py-2 my-1 bg-yellow-800 rounded-2xl text-white font-main text-center">Upload File</div>
                                <div className="errorMsg text-red-500">
                                    <ErrorMessage name="file" />
                                </div>
                                <button type="submit" className="font-main bg-blue-600 py-1 text-white my-1  px-4 ">Update</button>
                            </div>
                        </Form>)
                    }}
                </Formik>
            </div>
        </section>
    </section>);
}

export default BasicEdit;