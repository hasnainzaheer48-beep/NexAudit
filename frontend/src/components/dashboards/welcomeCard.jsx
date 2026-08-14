export default function WelcomeCard({ name }) {
    return (
        <div >
            <div className='text-4xl font-bold'>

                Welcome Back, <span className='font-bold text-[#174d38]' >{name}</span>
            </div>
            <span className='text-lg text-gray-700'>Here's what's happening</span>
        </div>
    )
} 