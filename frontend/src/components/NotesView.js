import {useLocation,useNavigate} from 'react-router-dom';
import Header from './Haeder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function NotesView() {
   let data;
   let location = useLocation();
   let navigate =useNavigate();
    try {
        data = location.state.data;
        if(data==null){
            window.location ="/"
        }
    } catch (error) {
        console.log(error)
        window.location ="/"

    }
 

   
  
    return (<section>
        <Header/>
        <section className='main-note pt-36 w-5/6 mx-auto'>
            <div className="mainBx bg-white p-5">
            <div className="title font-main text-3xl">
{
    data.title
}
            </div>
            <div className="note font-secondary mt-6">
{
    data.notes
}
            </div>
           <div className="dt flex ">
           <div className="date mr-3 bg-sky-500 text-center py-1 mt-3 rounded text-white font-main w-[150px]">
                {
                   "Date: "+ data.date
                }
            </div>
            <div className="date bg-sky-500 text-center py-1 mt-3 rounded text-white font-main w-[150px]">
                {
                   "Time: "+ data.time
                }
            </div>
           </div>
            </div>
           <div className="bottomBar flex justify-center">
           <div onClick={()=>{
navigate("/")
           }} className="backBtn cursor-pointer w-[50px] h-[50px] flex justify-center items-center bg-blue-400 rounded-full mt-5">
               <ArrowBackIcon className='text-white'/>
           </div>
           </div>
        </section>
    </section>);
}

export default NotesView;