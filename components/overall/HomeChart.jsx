"use client"
import { Area, AreaChart, LabelList, PolarAngleAxis, RadialBar, RadialBarChart, YAxis } from "recharts"

import { Bar, BarChart, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Separator } from "@radix-ui/react-dropdown-menu"

const HomeChart = () => {


    return (
        <>

            <section className="flex gap-7 md:flex-nowrap flex-wrap">
                {/* =============== Chart 1 (pie) ================= */}
                <Card className="md:w-1/3 shadow-lg w-full">
                    <CardContent className="flex gap-4 p-4">
                        <div className="grid items-center">
                            <div className="grid flex-1 auto-rows-min gap-1">
                                <div className="text-sm tracking-wide text-muted-foreground">Move</div>
                                <div className="flex items-baseline gap-1 text-xl font-extrabold tabular-nums leading-none">
                                    562/600
                                    <span className="text-sm font-normal text-muted-foreground">
                                        kcal
                                    </span>
                                </div>
                            </div>
                            <div className="grid flex-1 auto-rows-min gap-1 -my-7">
                                <div className="text-sm tracking-wide text-muted-foreground">Exercise</div>
                                <div className="flex items-baseline gap-1 text-xl font-extrabold tabular-nums leading-none">
                                    73/120
                                    <span className="text-sm font-normal text-muted-foreground">
                                        min
                                    </span>
                                </div>
                            </div>
                            <div className="grid flex-1 auto-rows-min gap-1">
                                <div className="text-sm tracking-wide text-muted-foreground">Stand</div>
                                <div className="flex items-baseline gap-1 text-xl font-extrabold tabular-nums leading-none">
                                    8/12
                                    <span className="text-sm font-normal text-muted-foreground">
                                        hr
                                    </span>
                                </div>
                            </div>
                        </div>
                        <ChartContainer
                            config={{
                                move: {
                                    label: "Move",
                                    color: "#468585",
                                },
                                exercise: {
                                    label: "Exercise",
                                    color: "#E68369",
                                },
                                stand: {
                                    label: "Stand",
                                    color: "#C8A1E0",
                                },
                            }}
                            className="mx-auto aspect-square w-full max-w-[80%]"
                        >
                            <RadialBarChart
                                margin={{
                                    left: -10,
                                    right: -10,
                                    top: -10,
                                    bottom: -10,
                                }}
                                data={[
                                    {
                                        activity: "stand",
                                        value: (8 / 12) * 100,
                                        fill: "var(--color-stand)",
                                    },
                                    {
                                        activity: "exercise",
                                        value: (46 / 60) * 100,
                                        fill: "var(--color-exercise)",
                                    },
                                    {
                                        activity: "move",
                                        value: (245 / 360) * 100,
                                        fill: "var(--color-move)",
                                    },
                                ]}
                                innerRadius="20%"
                                barSize={24}
                                startAngle={90}
                                endAngle={450}
                            >
                                <PolarAngleAxis
                                    type="number"
                                    domain={[0, 100]}
                                    dataKey="value"
                                    tick={false}
                                />
                                <RadialBar dataKey="value" background cornerRadius={5} />
                            </RadialBarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                {/* =============== Chart 1 (pie) ================= */}






                {/* =============== Chart 2 (bar) ================= */}
                <Card className="md:w-1/3 overflow-hidden">
                    <CardHeader className="space-y-0 pb-0">
                        <CardDescription>Time in Bed</CardDescription>
                        <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                            8
                            <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                                hr
                            </span>
                            35
                            <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                                min
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 w-96 h-20">
                        <ChartContainer
                            config={{
                                time: {
                                    label: "Time",
                                    color: "#50B498",
                                },
                            }}
                        >
                            <AreaChart
                                accessibilityLayer
                                data={[
                                    {
                                        date: "2024-01-01",
                                        time: 8.5,
                                    },
                                    {
                                        date: "2024-01-02",
                                        time: 7.2,
                                    },
                                    {
                                        date: "2024-01-03",
                                        time: 8.1,
                                    },
                                    {
                                        date: "2024-01-04",
                                        time: 6.2,
                                    },
                                    {
                                        date: "2024-01-05",
                                        time: 5.2,
                                    },
                                    {
                                        date: "2024-01-06",
                                        time: 8.1,
                                    },
                                    {
                                        date: "2024-01-07",
                                        time: 7.0,
                                    },
                                    {
                                        date: "2024-01-07",
                                        time: 7.0,
                                    },
                                    {
                                        date: "2024-01-07",
                                        time: 7.0,
                                    },
                                    {
                                        date: "2024-01-07",
                                        time: 7.0,
                                    },
                                    {
                                        date: "2024-01-07",
                                        time: 7.0,
                                    },
                                    {
                                        date: "2024-01-07",
                                        time: 7.0,
                                    },
                                    {
                                        date: "2024-01-07",
                                        time: 7.0,
                                    },
                                    {
                                        date: "2024-01-07",
                                        time: 7.0,
                                    },
                                    {
                                        date: "2024-01-07",
                                        time: 7.0,
                                    },
                                    {
                                        date: "2024-01-07",
                                        time: 7.0,
                                    },
                                    {
                                        date: "2024-01-07",
                                        time: 7.0,
                                    },
                                ]}
                                margin={{
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                }}
                            >
                                <XAxis dataKey="date" hide />
                                <YAxis domain={["dataMin - 5", "dataMax + 2"]} hide />
                                <defs>
                                    <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-time)"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-time)"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                </defs>
                                <Area
                                    dataKey="time"
                                    type="natural"
                                    fill="url(#fillTime)"
                                    fillOpacity={0.4}
                                    stroke="var(--color-time)"
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                    formatter={(value) => (
                                        <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                                            Time in bed
                                            <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                                {value}
                                                <span className="font-normal text-muted-foreground">
                                                    hr
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                {/* =============== Chart 2 (bar) ================= */}





                {/* =============== Chart 3 (bar) ================= */}
                <Card className="w-full md:w-1/3">
                    <CardContent className="flex gap-4 p-4 pb-2">
                        <ChartContainer
                            config={{
                                move: {
                                    label: "Move",
                                    color: "#F4CE14",
                                },
                                stand: {
                                    label: "Stand",
                                    color: "#379777",
                                },
                                exercise: {
                                    label: "Exercise",
                                    color: "#45474B",
                                },
                            }}
                            className="h-[140px] w-full"
                        >
                            <BarChart
                                margin={{
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 10,
                                }}
                                data={[
                                    {
                                        activity: "stand",
                                        value: (8 / 12) * 100,
                                        label: "8/12 hr",
                                        fill: "var(--color-stand)",
                                    },
                                    {
                                        activity: "exercise",
                                        value: (46 / 60) * 100,
                                        label: "46/60 min",
                                        fill: "var(--color-exercise)",
                                    },
                                    {
                                        activity: "move",
                                        value: (245 / 360) * 100,
                                        label: "245/360 kcal",
                                        fill: "var(--color-move)",
                                    },
                                ]}
                                layout="vertical"
                                barSize={32}
                                barGap={2}
                            >
                                <XAxis type="number" dataKey="value" hide />
                                <YAxis
                                    dataKey="activity"
                                    type="category"
                                    tickLine={false}
                                    tickMargin={4}
                                    axisLine={false}
                                    className="capitalize"
                                />
                                <Bar dataKey="value" radius={5}>
                                    <LabelList
                                        position="insideLeft"
                                        dataKey="label"
                                        fill="white"
                                        offset={8}
                                        fontSize={12}
                                    />
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex flex-row border-t p-4">
                        <div className="flex w-full items-center gap-2">
                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                <div className="text-xs text-muted-foreground">Move</div>
                                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                                    562
                                    <span className="text-sm font-normal text-muted-foreground">
                                        kcal
                                    </span>
                                </div>
                            </div>
                            <Separator orientation="vertical" className="mx-2 h-10 w-px" />
                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                <div className="text-xs text-muted-foreground">Exercise</div>
                                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                                    73
                                    <span className="text-sm font-normal text-muted-foreground">
                                        min
                                    </span>
                                </div>
                            </div>
                            <Separator orientation="vertical" className="mx-2 h-10 w-px" />
                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                <div className="text-xs text-muted-foreground">Stand</div>
                                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                                    14
                                    <span className="text-sm font-normal text-muted-foreground">
                                        hr
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
                {/* =============== Chart 3 (bar) ================= */}
            </section>




        </>
    )
}

export default HomeChart

