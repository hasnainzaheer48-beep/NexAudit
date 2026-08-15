export default function WelcomeCard({ name }) {
    return (
        <div className="px-3" >
            <div className='text-3xl font-bold '>

                Welcome Back, <span className='font-bold text-[#174d38]' >{name}</span>
            </div>
            <span className='text-lg font-medium text-gray-600 tracking-wider'>Here's what's happening</span>
        </div>
    )
} 