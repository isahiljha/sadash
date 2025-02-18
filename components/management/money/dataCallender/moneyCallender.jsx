import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import YearlyCallender from "./yearlyCallender"

export default function MoneyCallender() {
    return (<>
        <section className="md:mt-11 sm: mt-9 w-full relative">


            <Tabs defaultValue="yearly" className="w-full">
                <TabsList className="bg-zinc-200">
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="yearly">Yearly</TabsTrigger>
                </TabsList>
                <TabsContent value="weekly">Change your password here.</TabsContent>
                <TabsContent value="monthly">Change your password here.</TabsContent>
                <TabsContent value="yearly" className="mt-5">
                    <YearlyCallender />
                </TabsContent>
            </Tabs>



        </section>
    </>)
}