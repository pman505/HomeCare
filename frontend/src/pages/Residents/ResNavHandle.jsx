import { useNavigate } from 'react-router-dom'

const ResNavHandle = () => {
    const navigate = useNavigate();
    return (
        <div>

            <nav className='res-navbar flex w-full myb-2'>
                <div className='flex items-center w-full gap-0'>

                    <div className='flex justify-center flex-row items-center'>
                        <div className='flex mx-2.5'>
                            <div className='flex flex-1 flex-auto px-1.5'>
                                <button className='res-nav-item'
                                onClick={() =>{
                                    navigate('chart');
                                }}>
                                    Weight Chart
                                </button>
                            </div>
                            <div className='flex flex-1 flex-auto px-1.5'>
                                <button className='res-nav-item'
                                onClick={() =>{
                                    navigate();
                                }}>
                                    Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        
    )
}
export default ResNavHandle