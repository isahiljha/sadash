import ChartsData from "@/components/management/money/MoneyCharts";
import TableMoney from "@/components/management/money/TableMoney";



export default function Money() {


    return (<>
        <div className="px-2 md:px-7 flex flex-col justify-end py-2">
            <ChartsData/>
            <TableMoney/>
        </div>
    </>)
}