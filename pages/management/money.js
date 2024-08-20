import ChartsData from "@/components/management/money/ChartsData";
import TableMoney from "@/components/management/money/TableMoney";

export default function Money() {
    return (<>
        <div className="px-7 flex flex-col justify-end py-2">
            <ChartsData/>
            <TableMoney/>
        </div>
    </>)
}