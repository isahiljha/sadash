import { Button } from '@/components/ui/button'
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from 'react-icons/io5'

const TbMoneyPaginate = ({fullData , searchQuery}) => {
    return (<>
        {searchQuery ?
        <div className='text-xs text-zinc-500 tracking-wide ps-2'>Search results: <span className='font-bold'>{searchQuery}</span> </div>
         :
        <div className='text-xs text-zinc-500 tracking-wide ps-2'>Showing <span className='font-extrabold'>1-20</span> of <span className='font-extrabold'>{fullData.length}</span> entries</div>
        }
        <div className='flex items-center gap-3'>
            <Button size="sm" variant="outline" className="hover:shadow-md transition-all duration-100 active:scale-90 active:bg-zinc-200 active:shadow-red-50 flex gap-1 font-bold"><IoArrowBackCircleOutline className='h-4 w-4' /> Prev</Button>
            <Button size="sm" variant="outline" className="hover:shadow-md transition-all duration-100 active:scale-90 active:bg-zinc-200 active:shadow-red-50 flex gap-1 font-bold">Next <IoArrowForwardCircleOutline className='h-4 w-4' /></Button>
        </div>
    </>
    )
}

export default TbMoneyPaginate