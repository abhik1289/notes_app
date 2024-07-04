import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect,useState } from 'react';
import ReactTooltip from 'react-tooltip';
import RestoreIcon from '@mui/icons-material/Restore';
import Header from './Haeder';
function Trash() {
   
    const [data, setData] = useState([])
    const [noItems,SetnoItems] = useState(false);

    const getNotes = async () => {
        try {
            const res = await fetch("/displayTrash", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
                credentials: 'include',
            });
            const notes = await res.json();
            if (res.status !== 200) {
            } else {
                setData(notes)
               if(notes.length===0){
                   SetnoItems(true);
               }
               
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getNotes()
    });
    const handleRestore = async (getID) => {
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
    const handleDelete = async (getID) => {
        try {
            let id = getID;
            fetch("/deleteNote", {
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
    return(<section> <Header/>
    <section className="pt-28">
        <div className="main w-5/6 mx-auto flex flex-wrap">
            {
                
                noItems ? <div className="no_notes font-main w-full h-screen flex justify-center items-center flex-col">
                    <div className="icon">
                    <DeleteIcon className='text-slate-600 scale-150 text-3xl' />
                    </div>
                    <div className="text">
                    No notes in trash
                    </div>
                </div>:
                data.map((element)=>{
                        return( <div className="note md:w-4/12 w-full m-3 flex flex-col justify-between bg-[#f5f6fa] p-4 shadow-md rounded-md cursor-pointer">
                        <div className="title font-main text-2xl" key={element._id}>
                            {element.title}
                        </div>
                        <div className="text font-secondary">
                        {element.notes.slice(0,90)+".."}
                        </div>
                        <div className="bootompart flex justify-end">
                            <button data-tip="Delete Permently" data-effect="solid" data-place="bottom" className='w-[30px] h-[30px] bg-slate-300 rounded-full mr-3 hover:bg-red-600' onClick={()=>{handleDelete(element._id)}}>
                                <DeleteIcon className='text-slate-600 hover:text-white' />
                            </button>
                            <button data-tip="Restore" data-effect="solid" data-place="bottom" className='w-[30px] h-[30px] bg-slate-300 rounded-full mr-3' onClick={()=>{handleRestore(element._id)}}>
                                <RestoreIcon className='text-slate-600' />
                                <ReactTooltip />
                            </button>
                          
        
                        </div>
                    </div>)
                    })
                }
            
            
           
        </div>
    </section>
    </section>);

  
}

export default Trash;