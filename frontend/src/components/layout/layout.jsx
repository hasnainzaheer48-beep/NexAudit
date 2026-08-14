import { Outlet } from 'react-router-dom'
import Navbar from './navbar'
import Sidebar from './sidebar'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function Layout() {
    // const { loading } = useContext(AuthContext);
    // if (loading) {
    //     return null
    // }


    return (
        <>
            <div className=' h-screen flex p-2 gap-2  bg-white'>

                <Sidebar />




                <main className='flex-1 bg-white border border-[#cbcbcb] rounded-2xl shadow-2xl p-4 overflow-y-auto ' >
                    <Outlet />
                </main>

            </div>

        </>
    )

}