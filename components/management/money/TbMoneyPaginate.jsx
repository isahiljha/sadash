import { Button } from '@/components/ui/button'
import { ImSpinner9 } from 'react-icons/im'
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from 'react-icons/io5'

const TbMoneyPaginate = ({ fullData, searchQuery, currentPage, setCurrentPage, isLoading }) => {

    return (<>
        {searchQuery ?
            <div className='text-xs text-zinc-500 tracking-wide ps-2'>Search results: <span className='font-bold'>{searchQuery}</span> </div>
            :
            <div className='text-xs text-zinc-500 tracking-wide ps-2 flex gap-1 items-center'>
                {fullData && fullData.data && fullData.data.length > 0 ? (
                    <>
                        Showing <span className='font-extrabold'>{fullData.data[0].id}-{fullData.data[fullData.data.length - 1].id}</span>
                        of <span className='font-extrabold'>{fullData.totalRecords}</span> entries
                    </>
                ) : (
                    <>No data available</>
                )}
            </div>

        }
        <div className='flex items-center gap-3'>
            <Button disabled={isLoading || currentPage === 1} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} size="sm" variant="outline" className={`hover:shadow-md transition-all duration-100 active:scale-90 active:bg-zinc-200 active:shadow-red-50 flex gap-1 font-bold ${isLoading && 'animate-pulse duration-1000 select-none'}`}>
                {isLoading ?
                    <>
                        <ImSpinner9 className='h-4 w-4 animate-spin duration-300' /> Wait
                    </>
                    :
                    <>
                        <IoArrowBackCircleOutline className='h-4 w-4' /> Prev
                    </>
                }
            </Button>
            <Button disabled={isLoading || currentPage === fullData.totalPages} onClick={() => setCurrentPage((prev) => prev + 1)} size="sm" variant="outline" className={`hover:shadow-md transition-all duration-100 active:scale-90 active:bg-zinc-200 active:shadow-red-50 flex gap-1 font-bold ${isLoading && 'animate-pulse duration-1000 select-none'}`}>
                {isLoading ?
                    <>
                        Wait <ImSpinner9 className='h-4 w-4 animate-spin duration-300' />
                    </>
                    :
                    <>
                        Next <IoArrowForwardCircleOutline className='h-4 w-4' />
                    </>
                }
            </Button>
        </div>
    </>
    )
}

export default TbMoneyPaginate