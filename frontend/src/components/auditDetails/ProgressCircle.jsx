import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function ProgressCircle({ progress }) {
    return (
        <div className='size-30 px-4 font-bold'>
            <CircularProgressbar styles={buildStyles({
                pathTransitionDuration: 0.5,
                pathColor: '#174d38',
                textColor: 'black'
            })} value={progress} text={`${progress}%`} />

        </div>
    )
}