import { useEffect, useState } from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
function Search() {
  const navigate = useNavigate();
  const [showLeftpanel, setshowLeftpanel] = useState(false);
  const location = useLocation();
  const [data, setData] = useState("")
  const toogleMenu = () => {
    setshowLeftpanel(!showLeftpanel)
  }
  useEffect(() => {
    getNotes()
  }, []);

  const searchClick = () => {
    let searchTxt = document.getElementById("serachInput").value;
    navigate(`/search?${searchTxt}`);
  }
  const getNotes = async () => {
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
  const handleClickOpen = () => {
    swal({
      title: 'Log out',
      text: 'Are you sure to logout from note app',
      buttons: true
    }).then((willDelete) => {
      if (willDelete) {

        navigate("/logout");
      }
    });
  };
  let getname = localStorage.getItem("name");
  let splitename = getname.split(" ");
  let getFname = splitename[0];



  return (<><section className="fixed top-0 z-50 left-0 bg-white shadow-lg w-screen h-[100px]">
    <div className="main w-5/6 relative h-full mx-auto flex justify-between items-center">
      <div onClick={toogleMenu} className="menuBtn cursor-pointer w-[50px] h-[50px] rounded-full bg-slate-300 flex justify-center items-center">
        <MenuIcon />
      </div>
      <div className="searchBar">
        <label class="relative block">
          <span class="sr-only">Search</span>
          <span onClick={searchClick} class="absolute inset-y-0 left-0 flex items-center pl-2 cursor-pointer">
            <SearchIcon className='text-slate-500' />
          </span>
          <input id='serachInput' class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 " placeholder="Search for anything..." type="text" name="search" />
        </label>
      </div>
      {
        showLeftpanel ? <div className="sbuttondemenuBar h-screen w-screen top-0 left-0 bg-[#34495e2f] fixed" onClick={toogleMenu}>
          <div className="sbuttonde-panel w-[300px] h-screen bg-white py-3">
            <ul className="relative w-full">

              <button className={location.pathname === "/" ? "py-3 mt-1 pl-6 text-slate-600 font-main bg-sky-200 relative w-full text-left rounded-tr-full rounded-br-full" : "py-3 mt-1 pl-6 text-slate-600 font-main hover:bg-sky-200 relative w-full text-left rounded-tr-full rounded-br-full"}><Link to="/" className='block'><ArticleIcon className='mr-3' />Note</Link></button>
              <button className={location.pathname === "/addNote" ? "py-3 mt-1 pl-6 text-slate-600 font-main bg-sky-200 relative w-full text-left rounded-tr-full rounded-br-full" : "py-3 mt-1 pl-6 text-slate-600 font-main hover:bg-sky-200 relative w-full text-left rounded-tr-full rounded-br-full"}><Link className='block' to="/addNote"><CreateIcon className='mr-3' />Add Note</Link></button>
              <button className={location.pathname === "/archive" ? "py-3 mt-1 pl-6 text-slate-600 font-main bg-sky-200 relative w-full text-left rounded-tr-full rounded-br-full" : "py-3 mt-1 pl-6 text-slate-600 font-main hover:bg-sky-200 relative w-full text-left rounded-tr-full rounded-br-full"}><Link to="/archive" className='block'><ArchiveIcon className='mr-3' />Archive</Link></button>
              <button className={location.pathname === "/trash" ? "py-3 mt-1 pl-6 text-slate-600 font-main bg-sky-200 relative w-full text-left rounded-tr-full rounded-br-full" : "py-3 mt-1 pl-6 text-slate-600 font-main hover:bg-sky-200 relative w-full text-left rounded-tr-full rounded-br-full"}><Link className='block' to="/trash"><DeleteIcon className='mr-3' />Trash</Link></button>
              <button className={location.pathname === "/profile" ? "py-3 mt-1 pl-6 text-slate-600 font-main bg-sky-200 relative w-full text-left rounded-tr-full rounded-br-full" : "py-3 mt-1 pl-6 text-slate-600 font-main hover:bg-sky-200 relative w-full text-left rounded-tr-full rounded-br-full"}><Link className='block' to="/profile"><PersonIcon className='mr-3' />Profile</Link></button>
            </ul>
          </div>
        </div> : null
      }

      <div className="describtion flex items-center">
        <div className="profileBx flex items-center mr-3">
          <div className="name font-main mr-1">Hello {getFname}</div>
          <Link to={location.pathname == "/" ? "/profile" : "/"}>
            <div className="fstLetter cursor-pointer overflow-hidden font-secondary text-white m-1 w-[40px] h-[40px] flex justify-center items-center rounded-full">
              <img alt="" src={data.profile ? process.env.REACT_APP_PATH + data.profile : null} className="h-full w-full rounded-full" id="img-prview" />
            </div>
          </Link>
        </div>
        <div className="logOutBtn w-[40px] h-[40px] rounded-full bg-slate-300 flex justify-center items-center cursor-pointer" onClick={handleClickOpen}>
          <LogoutIcon className='text-slate-600' />
        </div>
      </div>
    </div>
  </section>



  </>);
}

export default Search;