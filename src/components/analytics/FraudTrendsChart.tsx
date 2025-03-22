
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Mock data
const dailyData = [
  { date: "09/10", predicted: 18, reported: 12 },
  { date: "09/11", predicted: 15, reported: 10 },
  { date: "09/12", predicted: 22, reported: 16 },
  { date: "09/13", predicted: 17, reported: 12 },
  { date: "09/14", predicted: 24, reported: 19 },
  { date: "09/15", predicted: 21, reported: 15 },
  { date: "09/16", predicted: 19, reported: 14 },
];

const weeklyData = [
  { date: "Week 36", predicted: 98, reported: 78 },
  { date: "Week 37", predicted: 112, reported: 92 },
  { date: "Week 38", predicted: 103, reported: 85 },
  { date: "Week 39", predicted: 118, reported: 97 },
  { date: "Week 40", predicted: 124, reported: 104 },
  { date: "Week 41", predicted: 115, reported: 92 },
  { date: "Week 42", predicted: 128, reported: 109 },
];

const monthlyData = [
  { date: "May", predicted: 387, reported: 312 },
  { date: "Jun", predicted: 412, reported: 346 },
  { date: "Jul", predicted: 398, reported: 325 },
  { date: "Aug", predicted: 427, reported: 352 },
  { date: "Sep", predicted: 456, reported: 379 },
  { date: "Oct", predicted: 429, reported: 361 },
];

export function FraudTrendsChart() {
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">("daily");

  const getData = () => {
    switch (timeRange) {
      case "daily":
        return dailyData;
      case "weekly":
        return weeklyData;
      case "monthly":
        return monthlyData;
    }
  };

  const chartConfig = {
    predicted: {
      label: "Predicted Frauds",
      theme: {
        light: "#1A49A5",
        dark: "#3A69C5",
      },
    },
    reported: {
      label: "Reported Frauds",
      theme: {
        light: "#F38C26",
        dark: "#F5A54F",
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2">
        <Button
          variant={timeRange === "daily" ? "default" : "outline"}
          size="sm"
          onClick={() => setTimeRange("daily")}
          className={timeRange === "daily" ? "bg-brand-blue hover:bg-brand-blue-light" : ""}
        >
          Daily
        </Button>
        <Button
          variant={timeRange === "weekly" ? "default" : "outline"}
          size="sm"
          onClick={() => setTimeRange("weekly")}
          className={timeRange === "weekly" ? "bg-brand-blue hover:bg-brand-blue-light" : ""}
        >
          Weekly
        </Button>
        <Button
          variant={timeRange === "monthly" ? "default" : "outline"}
          size="sm"
          onClick={() => setTimeRange("monthly")}
          className={timeRange === "monthly" ? "bg-brand-blue hover:bg-brand-blue-light" : ""}
        >
          Monthly
        </Button>
      </div>
      
      <div className="h-[350px] w-full">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={getData()}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend wrapperStyle={{ paddingTop: 15 }} />
              <Line
                type="monotone"
                dataKey="predicted"
                name="predicted"
                stroke="var(--color-predicted)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="reported"
                name="reported"
                stroke="var(--color-reported)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}
