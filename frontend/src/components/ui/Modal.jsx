import { createPortal } from 'react-dom'

export default function Modal({ children }) {
    return (

        createPortal(

            <div className='flex justify-center items-center fixed inset-0 bg-black/50      '>

                <div className=' bg-white p-6 rounded-xl'>
                    {children}
                </div>

            </div>

            , document.getElementById("modal-root")
        )
    )

}