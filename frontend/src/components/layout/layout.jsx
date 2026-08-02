import { Outlet } from 'react-router-dom'
import Navbar from './navbar'
import Sidebar from './sidebar'

export default function Layout() {
    return (
        <>
            <div className='h-screen flex flex-col'>

                <Navbar />

                <div className='flex flex-1'>

                    <Sidebar />
                    <main className='flex-1'>
                        <Outlet />
                    </main>
                </div>
            </div>

        </>
    )

}