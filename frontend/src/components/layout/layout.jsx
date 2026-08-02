import Navbar from './components/layout/navbar'
import Sidebar from './components/layout/sidebar'

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <Sidebar />
            <main>
                {children}
            </main>

        </>
    )

}