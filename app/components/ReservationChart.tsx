
//@ts-nocheck
"use client"

import { Bar, BarChart,XAxis, } from "recharts"
import { parseISO, format } from 'date-fns';

import { ChartConfig, ChartContainer,ChartTooltip ,ChartTooltipContent} from "@/app/ui/chart"





function processReservations(reservations) {
    // Create an empty object to store the monthly totals
    const monthlyTotals = {};
  
    reservations.forEach(reservation => {
      const startDate = parseISO( new Date(reservation.startdate).toISOString());
      const month = format(startDate, 'MMMM'); // Get the month name
  
      if (!monthlyTotals[month]) {
        monthlyTotals[month] = 0;
      }
      monthlyTotals[month] += reservation.totalprice;
    });
  
    // Convert the monthly totals object into the desired array format
    return Object.entries(monthlyTotals).map(([month, totalprice]) => ({
      month,
     desktop:totalprice
    }));
  }
  

  
  const chartConfig = {
      desktop: {
          label: "Revenue",
          color: "#2563eb",
        },
        
    } satisfies ChartConfig
    
    export function Component({reservations}) {
    const chartData = processReservations(reservations)
console.log(chartData)

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px]  w-full">
      <BarChart accessibilityLayer data={chartData}>
      <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
       <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" maxBarSize={60} radius={4} />

      </BarChart>
    </ChartContainer>
  )
}
