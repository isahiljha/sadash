import MoneyCallender from "@/components/management/money/dataCallender/moneyCallender";
import ChartsData from "@/components/management/money/MoneyCharts";
import TableMoney from "@/components/management/money/TableMoney";



export default function Money() {


    return (<>
        <div className="px-2 md:px-7 flex flex-col justify-end pt-2 md:pb-7 pb-5">
            <ChartsData />
            <TableMoney />
            <MoneyCallender />
        </div>
    </>)
}