import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import YearlyCallender from "./yearlyCallender"
import { fetchInvoiceData } from '@/features/moneyManagement';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function MoneyCallender() {


    const mydispatch = useDispatch();
    const { moneyData, invoiceLoading, error } = useSelector(
        (state) => state.money
    );
    useEffect(() => {
        mydispatch(fetchInvoiceData());
    }, [mydispatch]);

    return (<>
        <section className="md:mt-11 sm: mt-9 w-full relative">


            <Tabs defaultValue="yearly" className="w-full">
                <TabsList className="bg-zinc-200/70">
                    <TabsTrigger value="weekly" className="transition-all duration-100 active:scale-75 !ring-0">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly" className="transition-all duration-100 active:scale-75 !ring-0">Monthly</TabsTrigger>
                    <TabsTrigger value="yearly" className="transition-all duration-100 active:scale-75 !ring-0">Yearly</TabsTrigger>
                </TabsList>
                <TabsContent value="weekly" className="mt-5 !ring-0">
                    {/* <YearlyCallender /> */}
                </TabsContent>
                <TabsContent value="monthly" className="mt-5 !ring-0">
                    {/* <YearlyCallender /> */}
                </TabsContent>
                <TabsContent value="yearly" className="mt-5 !ring-0">
                    <YearlyCallender moneyData={moneyData} />
                </TabsContent>
            </Tabs>



        </section>
    </>)
}