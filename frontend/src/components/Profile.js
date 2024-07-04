import { useEffect, useState } from "react";
import Header from "./Haeder";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';

function Profile() {
    //  console.log(process.env.REACT_APP_PATH)
    useEffect(() => {
        getToken()
    });
    const navigate = useNavigate();
    const [data, setData] = useState("")
    const [dialogue, Setdialogue] = useState(false);
    const setEdit = async (getData) => {
        navigate("/basicEdit", {
            state: {
                data: getData
            }
        })
    }
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
                setData(data)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const handlePasswordD = () => {
        Setdialogue(!dialogue);

    }
    const constactEdit = () => {
        Setdialogue(true);
        console.log(dialogue)

    }
 
    const intialvaluse = {
        password: ""
    }
    const validationShema = Yup.object({
        password: Yup.string().min(6).max(10).required(),
    })
    const onsubmit = async (values) => {

        let password = values.password;
        const res = await fetch("/checkPwd", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ password })
        });
        if (res.status === 200) {
            navigate("/emailPwd", {
                state: { data: data }
            })
        } else {
            console.log("ok n")

        }
    }
    let getname = localStorage.getItem("name");
    let splitename = getname.split(" ");
    let getFname = splitename[0];
    let fCharacter = getFname[0];
  
    return (<>
        <Header />
        <section className="pt-28 flex justify-center">
            <div className="profilebOX">

                <div className="main w-[400px] min-h-[350px] py-2 bg-white rounded">
                    <div className="top-part p-4">
                        <div className="title font-main text-3xl">
                            Basic info
                        </div>
                        <div className="subtitle font-secondary text-gray-500">
                            Some info may be visible to other people using Note services
                        </div>
                    </div>
                    <div className="main-box pl-4">
                        <div className="coloum flex justify-between border-b border-b-gray-300 items-center mr-2">
                            <div className="title uppercase font-main">
                                Photo
                            </div>
                            <div className={data.profile?"image w-[50px] h-[50px] bg-slate-400 rounded-full mb-2 relative flex justify-center items-center":"image w-[50px] h-[50px] bg-blue-500 rounded-full mb-2 relative flex justify-center items-center"}>
                                {
                                    data.profile?  <img className="object-cover w-full rounded-full absolute h-[100%]" src={data.profile ? process.env.REACT_APP_PATH + data.profile : null} alt="" srcset="" />: <div className="title text-white font-bold uppercase font-main">
                                 {fCharacter}
                                </div>
                                }
                              

                            </div>
                        </div>
                        <div className="coloum flex justify-between border-b border-b-gray-300 items-center h-[50px] pr-2">
                            <div className="title uppercase font-main">
                                Name
                            </div>
                            <div className="text font-secondary">
                                {data.name}
                            </div>
                        </div>
                        <div className="coloum flex justify-between border-b border-b-gray-300 items-center h-[50px] pr-2">
                            <div className="title uppercase font-main">
                                Mobile
                            </div>
                            <div className="text font-secondary">
                                {data.mobile}

                            </div>
                        </div>
                        <div className="coloum flex justify-between border-b border-b-gray-300 items-center h-[50px] pr-2">
                            <div className="title uppercase font-main">
                                Opening Date
                            </div>
                            <div className="text font-secondary">
                                {data.accountOpenDate}

                            </div>
                        </div>
                        <div className="coloum flex justify-between border-b border-b-gray-300 items-center h-[50px] pr-2">
                            <div className="title uppercase font-main">
                                Last Modify
                            </div>
                            <div className="text font-secondary">
                                {data.lastModify}

                            </div>
                        </div>
                    </div>
                    <div className="bottom-part flex justify-end mt-4 mr-4">
                        <button className="w-[40px] h-[40px] rounded-full bg-slate-300" onClick={() => { setEdit(data) }} >
                            <EditIcon className="text-slate-600" />
                        </button>
                    </div>
                </div>
                <div className={dialogue ? "passwordBx fixed top-0 left-0 z-40 bg-[#34495e2f] flex justify-center items-center w-screen h-screen" : "passwordBx fixed top-0 left-0 z-40 bg-[#34495e2f] hidden justify-center items-center w-screen h-screen"}>
                    <div className="dialugeBX px-2 w-[400px] z-50 h-[200px] py-4 bg-white rounded flex flex-col justify-center">
                        <Formik
                            initialValues={intialvaluse}
                            onSubmit={onsubmit}
                            validationSchema={validationShema}
                        >
                            <Form>
                                <div className="frmColom font-main">
                                    <label className="block">Password</label>
                                    <Field name="password" className="w-full py-1 px-2 border border-slate-500 focus:border-blue-400 outline-none" />
                                    <button type="submit" className="w-full my-2 py-2 bg-blue-500 text-white">Cheeck</button>
                                </div>
                            </Form>
                        </Formik>
                        <div className="closeBX flex justify-center">
                            <button onClick={handlePasswordD} className="w-[50px] h-[50px] bg-red-500 rounded-full">
                                <CloseIcon className="text-white" />
                            </button>
                        </div>
                    </div>

                </div>
                <div className="bottomPart w-[400px] h-[180px] bg-white rounded p-5 mt-2">
                    <div className="TOPprt flex justify-between">
                        <div className="title title font-main text-3xl">
                            Contact info
                        </div>
                        <button onClick={() => { constactEdit(data) }} className="w-[40px] h-[40px] rounded-full bg-slate-300">
                            <EditIcon className="text-slate-600" />
                        </button>
                    </div>
                    <div className="coloum flex justify-between border-b border-b-gray-300 items-center h-[50px] pr-2">
                        <div className="title uppercase font-main">
                            EMAIL
                        </div>
                        <div className="text font-secondary">
                            {data.email}
                        </div>
                    </div>  <div className="coloum flex justify-between border-b border-b-gray-300 items-center h-[50px] pr-2">
                        <div className="title uppercase font-main">
                            PASSWORD
                        </div>
                        <div className="text font-secondary">
                            ******
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>);
}

export default Profile;