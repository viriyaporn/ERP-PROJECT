import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";

export default function LoginDoc() {

  const [state, setState] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();

    if ('mind' === state.username && '1234' === state.password) {
      Swal.fire('สำเร็จ', 'success');
      navigate('/trackstatus/dashboard');

    }
    if ('office' === state.username && '1234' === state.password) {
      Swal.fire('สำเร็จ', 'success');
      navigate('/office/dashboard-office');

    }
    //   if ('office' === state.username && '1234' === state.password) {
    //     Swal.fire('สำเร็จ', 'success');
    //  return navigate('/dashboard-office');

    //  }
    // else {
    //   return Swal.fire('ไม่สำเร็จ', 'error');
    // }
  }

  return (
    <>
      {/* <Header /> */}
      <div className="flex flex-row">
        <div className="flex flex-shrink-0 mx-auto  ">
          <div className="bg-red-600 md:w-6/12 absolute h-screen left-0 md:fixed md:h-full ">
            <div className="flex items-center justify-center h-screen">
              <div className="flex item-center justify-center rounded-full bg-white h-[400px] w-[400px]">LOGO</div>
            </div>
          </div>
        </div>
        <form onSubmit={onSubmit} className=" flex w-6/12 items-center justify-center h-screen drop-shadow-xl">
          <div >
            <div className="flex flex-col border-2 border-slate-300 mt-10 w-[400px] h-[350px] mb-20">
              <div className="flex flex-col mt-10 m-6 text-center">

                <div className="font-bold text-4xl p-3">
                  <h1 className="text-left">Login</h1>
                </div>

                <input
                  onChange={(e) => setState(prev => ({ ...prev, username: e.target.value }))}
                  value={state.username}
                  placeholder="username" className="w-11/12 m-3 rounded-sm outline-none border-2 border-slate-400" type="text" />
                <input
                  onChange={(e) => setState(prev => ({ ...prev, password: e.target.value }))}
                  value={state.password}
                  placeholder="password" className="w-11/12 m-3 rounded-sm outline-none border-2 border-slate-400" type="password" />

                <div className="text-left mt-2 ml-3 w-full">
                  <button type="submit" className="bg-blue-500 text-white rounded-lg p-2 w-[150px] mr-5">Login</button>
                  <a className="ml-5 ">Forget Password ?</a>
                </div>

              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}