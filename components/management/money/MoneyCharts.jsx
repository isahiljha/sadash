"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useMemo, useState } from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ImSpinner9 } from "react-icons/im";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoiceData } from "@/features/moneyManagement";
import { TbLoader } from "react-icons/tb";
import { Label } from "@/components/ui/label";

const chartConfig = {
    sendedMoney: { label: "Sended", color: "#b91c1c", className: "" },
    recievedMoney: { label: "Received", color: "#15803d" },
    // spentMoney: { label: "Spent", color: "gray", className: '' },
};

const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return new Date(`${year}-${month}-${day}`);
};

const transformData = (moneyData) => {
    return moneyData.map((item) => ({
        date: item.date,
        sendedMoney:
            item.status === "sended" ? parseInt(item.amount.replace(/[₹,]/g, "")) : 0,
        recievedMoney:
            item.status === "received"
                ? parseInt(item.amount.replace(/[₹,]/g, ""))
                : 0,
        // spentMoney: item.status === "spent" ? parseInt(item.amount.replace(/[₹,]/g, '')) : 0,
    }));
};

const ChartsData = () => {
    const [activeChart, setActiveChart] = useState("recievedMoney");

    const mydispatch = useDispatch();
    const { moneyData, invoiceLoading, error } = useSelector(
        (state) => state.money
    );
    useEffect(() => {
        mydispatch(fetchInvoiceData());
    }, [mydispatch]);

    console.log("MoneyData: ", moneyData);

    const chartData = useMemo(() => transformData(moneyData), [moneyData]);

    const remainingMoney = (chartData.reduce((acc, curr) => acc + curr.recievedMoney, 0)) - (chartData.reduce((acc, curr) => acc + curr.sendedMoney, 0))

    const formatAmount = (value) => {
        let isNegative = value < 0;
        let numericValue = Math.abs(value).toString().replace(/[^0-9]/g, "");
        let formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return isNegative ? `-${formattedValue}` : formattedValue;
    };


    const total = useMemo(
        () => ({
            sendedMoney: chartData.reduce((acc, curr) => acc + curr.sendedMoney, 0),
            recievedMoney: chartData.reduce(
                (acc, curr) => acc + curr.recievedMoney,
                0
            ),
            // spentMoney: chartData.reduce((acc, curr) => acc + curr.spentMoney, 0),
        }),
        [chartData]
    );

    return (
        <>
            <section className="mt-4 mb-12">
                <Card className="shadow-none">
                    <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                        <div className="flex flex-1 flex-col justify-center gap-1 px-3 md:px-6 pt-2 md:mt-0 mt-2">
                            <CardTitle className="tracking-normal gap-2 md:w-max text-lg flex items-center justify-between w-full">
                                <div className="flex flex-col gap-1 me-4 text-sm ">
                                    <Label className="text-xs -my-1 py-0">In Wallet:</Label>
                                    <div className="flex items-center justify-center gap-1">
                                        <GiTakeMyMoney className="h-5 w-5" />
                                        <span className="text-2xl font-extrabold text-green-500 drop-shadow-sm" >₹ {formatAmount(remainingMoney)}</span>
                                    </div>
                                </div>
                                <Select>
                                    <SelectTrigger className="w-[140px] md:w-[180px]">
                                        <SelectValue placeholder="Choose range" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="two-week">Last 14 days</SelectItem>
                                            <SelectItem value="last-month">Last month</SelectItem>
                                            <SelectItem value="three-months">Last 3 months</SelectItem>
                                            <SelectItem value="six-months">Last 6 months</SelectItem>
                                            <SelectItem value="last-year">Last 1 year</SelectItem>
                                            <SelectItem value="three-years">Last 3 year</SelectItem>
                                            <SelectItem value="five-years">Last 5 year</SelectItem>
                                            <SelectItem value="seven-years">Last 7 year</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </CardTitle>
                            <CardDescription className="hidden tracking-wider md:pe-12 text-xs mt-1.5 mb-1">
                                This is the total money available displayed over the current selected range
                            </CardDescription>
                        </div>
                        {/* ${activeChart === key && key === 'spentMoney' && 'from-zinc-400 to-zinc-800 text-white'}  */}
                        <div className="flex">
                            {["sendedMoney", "recievedMoney"].map((key) => {
                                return (
                                    <button
                                        key={key}
                                        data-active={activeChart === key}
                                        className={`relative flex flex-1 flex-col justify-center gap-1 border-t px-3.5 py-2.5 md:px-6 md:py-4 mt-4 md:mt-0 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 bg-gradient-to-tr transition-all duration-100 active:scale-90 
                                            ${activeChart === key &&
                                            key === "sendedMoney" &&
                                            "from-red-400 to-red-800 text-white"
                                            } 
                                            ${activeChart === key &&
                                            key === "recievedMoney" &&
                                            "from-green-400 to-green-800 text-white"
                                            } 
                                            ${key === "recievedMoney" &&
                                            "md:rounded-tr-xl"
                                            }`}
                                        onClick={() => setActiveChart(key)}
                                    >
                                        <span className="text-xs text-muted-foreground">
                                            {chartConfig[key].label}
                                        </span>
                                        {invoiceLoading ? (
                                            <div>
                                                <TbLoader className="text-3xl mx-7 md:mx-11 animate-spin" />
                                            </div>
                                        ) : (
                                            <>
                                                <span className="text-lg font-extrabold leading-none md:text-2xl flex w-max">
                                                    ₹ {total[key].toLocaleString()}
                                                </span>
                                            </>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </CardHeader>
                    <CardContent className="px-2 sm:p-6">
                        {invoiceLoading ? (
                            <div className="h-[250px] flex flex-col gap-7 items-center justify-center">
                                <TbLoader className="h-20 w-20 mx-11 animate-spin" />
                                <Badge className="scale-125 animate-pulse">Fetching...</Badge>
                            </div>
                        ) : (
                            <ChartContainer
                                config={chartConfig}
                                className="aspect-auto h-[250px] w-full"
                            >
                                <BarChart
                                    accessibilityLayer
                                    data={chartData}
                                    margin={{ left: 12, right: 12 }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="date"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={5}
                                        minTickGap={15}
                                        tickFormatter={(value) => {
                                            const date = parseDate(value);
                                            return date.toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "short",
                                            });
                                        }}
                                    />
                                    <ChartTooltip
                                        content={
                                            <ChartTooltipContent
                                                className="w-[150px]"
                                                labelFormatter={(value) => {
                                                    const dateVal = parseDate(value).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        }
                                                    );
                                                    return dateVal;
                                                }}
                                            />
                                        }
                                    />
                                    {!invoiceLoading && (
                                        <Bar
                                            dataKey={activeChart}
                                            fill={chartConfig[activeChart].color}
                                        />
                                    )}
                                </BarChart>
                            </ChartContainer>
                        )}
                    </CardContent>
                </Card>
            </section>
        </>
    );
};

export default ChartsData;
