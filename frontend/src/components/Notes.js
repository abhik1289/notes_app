import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import PushPinIcon from '@mui/icons-material/PushPin';
import ReactTooltip from 'react-tooltip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useNavigate} from 'react-router-dom';
function Notes() {
    const navigator =useNavigate();
    const [data, setData] = useState([]);
    useEffect(() => {
        getNotes()
    }
    );
    const openDialogue = (data) => {
      //  alert("ok")
        navigator("/notesView",{
            state:{
data:data
            }
        })
    }
    const getNotes = async () => {
        try {
            const res = await fetch("/fetchNotes", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                credentials: 'include',
            });
            const notes = await res.json();
            if (res.status !== 200) {
            } else {
                setData(notes)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const higlightNote = async (getID) => {
        try {
            console.log(getID)
            let id = getID;
            fetch("/higlightNote", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ id })

            })

        } catch (error) {
            console.log(error);
        }
    }
    const pinNote = async (getID) => {
        try {
          
            let id = getID;
            fetch("/pinNote", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ id })

            })

        } catch (error) {
            console.log(error);
        }
    }
    const editNote = async (getData) => {
        try {
       
            let data = getData;
            navigator("/addNote",{
                state:{
                    data:data,
                    editMode:true
                }
            })

        } catch (error) {
            console.log(error);
        }
    }
    const trshNote = async (getID) => {
        try {
            let id = getID;
            fetch("/trashNote", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ id })

            })

        } catch (error) {
            console.log(error);
        }
    }
    const ArchiveNote = async (getID) => {
        try {
            let id = getID;
            fetch("/archiveNote", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ id })

            })

        } catch (error) {
            console.log(error);
        }
    }
    return (<section className="pt-28">
        <div className="main w-5/6 mx-auto flex relative flex-wrap">
            
            {
                data.map((element) => {
                    return (

                        <div key={element._id}  className="note md:w-4/12 w-full p-1 flex  flex-col justify-between  border-sky-500">
                            <div className={element.higlight?"colorBx bg-[#f5f6fa] shadow-md rounded-md cursor-pointer h-[150px] p-2 flex flex-col justify-between border border-blue-300":"colorBx bg-[#f5f6fa] shadow-md rounded-md cursor-pointer h-[150px] p-2 flex flex-col justify-between"}>
                           <div className="viewPart" onClick={() => { openDialogue(element) }}>
                               
                            <div className="title font-main text-2xl">
                                {element.title}
                            </div>
                            <div className="text font-secondary text-slate-500">
                                {element.notes.slice(0, 90) + ".."}
                            </div>
                           </div>
                            <div className="bootompart flex justify-end relative z-20">
                                <button data-tip="Delete Note" data-effect="solid" data-place="bottom" className='w-[30px] h-[30px] bg-slate-300 rounded-full mr-3 hover:bg-red-600'>
                                    <DeleteIcon className='text-slate-600 hover:text-white' onClick={() => { trshNote(element._id) }} />
                                </button>
                                <button data-tip={element.pin?"Unpin":"Pin"} data-effect="solid" data-place="bottom" className={element.pin ? 'w-[30px] h-[30px] rounded-full mr-3 bg-green-300' : "w-[30px] h-[30px] bg-slate-300 rounded-full mr-3"} onClick={() => { pinNote(element._id) }} >
                                    <PushPinIcon className='text-slate-600' />
                                    <ReactTooltip />
                                </button>
                                <Popup trigger={<button className='w-[30px] h-[30px] bg-slate-300 rounded-full mr-3' >
                                    <MoreVertIcon className='text-slate-600' />
                                </button>} position="bottom center">
                                    <ul>
                                        <li onClick={() => { editNote(element) }} className='font-main hover:bg-sky-200 cursor-pointer'>Edit Note</li>
                                        <li onClick={() => { higlightNote(element._id) }} className='font-main hover:bg-sky-200 cursor-pointer'>
                                            {element.higlight ? "Unhiglight Note" : "Higlight Note"}
                                        </li>
                                        <li onClick={() => { ArchiveNote(element._id) }} className='font-main hover:bg-sky-200 cursor-pointer'>Archive</li>
                                    </ul>
                                </Popup>
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
                            </div>
                            </div>
                        </div>
                        
                    )
                })
            }




        </div>
    </section>);
}

export default Notes;