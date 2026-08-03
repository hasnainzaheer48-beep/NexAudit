import { Outlet } from 'react-router-dom'
import Navbar from './navbar'
import Sidebar from './sidebar'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function Layout() {
    const { loading } = useContext(AuthContext);
    if (loading) {
        return null
    }


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