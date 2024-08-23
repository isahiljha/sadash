import { RiCloseCircleFill } from "react-icons/ri";
import { BsSearch } from 'react-icons/bs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AddEntry from "./assignFunc/AddEntry";
import ExportData from "./assignFunc/ExportData";
import FilterData from "./assignFunc/FilterData";

const TbAssignFunc = ({ searchQuery, setSearchQuery, filterData, customFilter, setCustomFilter }) => {
    return (<>
        {/* =========== Left Side Functions ============= */}
        <div className="flex items-center gap-4">
            <div className="relative ml-auto flex-1 md:grow-0">
                <BsSearch className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="search"
                    placeholder="Enter Name or Details..."
                    className="w-full h-10 rounded-lg bg-background pl-9 md:w-[200px] lg:w-[336px]"
                />
                {searchQuery && <RiCloseCircleFill className="absolute top-2 h-6 w-6  right-1.5 transition-all duration-100 active:scale-75 active:text-red-600 cursor-pointer" onClick={() => setSearchQuery('')} />}
            </div>
            {filterData.length > 0 && filterData.length < 47 && <div className="text-sm tracking-wide"> <span className={`tracking-normal mr-0.5 text-lg font-extrabold ${filterData.length == 0 ? 'text-red-500' : 'text-blue-600'}`}>{filterData.length}</span> Results Found.</div>}
            {filterData.length === 0 && <div className="text-sm tracking-wide"> <span className={`tracking-normal mr-0.5 text-lg font-extrabold ${filterData.length == 0 ? 'text-red-500' : 'text-blue-600'}`}>{filterData.length}</span> Results Found.</div>}
        </div>
        {/* =========== Left Side Functions ============= */}

        {/* =========== Right Side Functions ============= */}
        <div className='flex items-center gap-3'>
            <FilterData
                customFilter={customFilter}
                setCustomFilter={setCustomFilter}
            />
            <ExportData />
            <AddEntry />

        </div>
        {/* =========== Right Side Functions ============= */}
    </>
    )
}

export default TbAssignFunc