import {Link} from 'react-router-dom'
function AddNoteBTn() {
    return (<Link>
        <div className="flex justify-center items-center addnote fixed right-10 cursor-pointer bottom-10 w-[50px] h-[50px] bg-white shadow-xl border border-slate-300 rounded-full">
          <AddIcon className='text-slate-600'/>
          </div></Link>
        );
}

export default AddNoteBTn;