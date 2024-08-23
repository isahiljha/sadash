import ChartsData from "@/components/management/money/MoneyCharts";
import TableMoney from "@/components/management/money/TableMoney";
import { fetchInvoiceData } from "@/features/moneyManagement";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";



export default function Money() {

    const mydispatch = useDispatch();
    const { moneyData, invoiceLoading, error } = useSelector((state) => state.money)
    useEffect(() => {

        mydispatch(fetchInvoiceData());

    }, [mydispatch]);

    return (<>
        <div className="px-2 md:px-7 flex flex-col justify-end py-2">
            <ChartsData
                moneyData={moneyData}
                invoiceLoading={invoiceLoading}
            />
            <TableMoney
                moneyData={moneyData}
                invoiceLoading={invoiceLoading}
            />
        </div>
    </>)
}