import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import PageTitle from './pageTitle'

export default function Modal({ children, onClose, size = "md", title = "", subtitle = "" }) {

    const sizes = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl"
    }

    return (

        createPortal(

            <div className='flex z-30 justify-center items-center fixed inset-0 bg-black/40 p-4'>

                <div className={`
                    w-full ${sizes[size]}
                    max-h-[90vh]
                    overflow-hidden
                    rounded-xl
                    bg-white
                    border border-[#cbcbcb]
                    shadow-2xl
                    flex flex-col
                    px-4 py-2
                `}>
                    <div className="flex items-center justify-between border-b border-[#e5e5e5] shrink-0 ">

                        <div>
                            <PageTitle title={title} variant='Dashboard' subtitle={subtitle} />
                        </div>

                        <button
                            onClick={onClose}
                            className="rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <div className='flex-1 overflow-auto'>
                        {children}
                    </div>
                </div>

            </div>

            , document.getElementById("modal-root")
        )
    )

}