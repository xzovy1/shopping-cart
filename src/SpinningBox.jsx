import './SpinningBox.css';


const SpinningBox = () => {
    return(
        <div id='box'>
            <div id='top' className='face'></div>
            <div id='bottom' className='face'></div>
            <div id='front' className='face'></div>
            <div id='back' className='face'></div>
            <div id='left' className='face'></div>
            <div id='right' className='face'></div>
        </div>
    )
}
export default SpinningBox