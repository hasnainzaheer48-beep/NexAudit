import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar'


export default function Layout() {


    return (
        <>
            <div className=' h-screen flex p-2 gap-2  bg-white'>
                <Sidebar />
                <main className='flex-1 bg-[#ffffff] border border-[#cbcbcb] rounded-2xl shadow-md p-4 overflow-y-auto ' >
                    <Outlet />
                </main>

            </div>

        </>
    )

}