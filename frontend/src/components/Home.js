import { useEffect, useState } from "react";
import Header from "./Haeder";
import Notes from "./Notes";
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState("")
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
                navigate("/signin")
            } else {
                setData(data)
            }
            if (res.status !== 200) {
                navigate("/signin")
            }
            if(res.status===500){
                navigate("/signin")

            }
        } catch (error) {
            console.log(error)
        }
    }
    let getname = data.name;
    localStorage.setItem("name", getname)
    useEffect(() => {
        getToken()
    });
    return (<section className="w-screen h-screen">
        <Header />
        <Notes />
    </section>);
}

export default Home;