
import React, { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface FraudTrendsChartProps {
  data: { name: string; flagged: number; legitimate: number }[];
}

export function FraudTrendsChart({ data }: FraudTrendsChartProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  return (
    <Card className="shadow-sm border-brand-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-brand-text">Fraud Trends</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D1D5DB" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: '#333333' }}
              tickLine={{ stroke: '#D1D5DB' }}
              axisLine={{ stroke: '#D1D5DB' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#333333' }}
              tickLine={{ stroke: '#D1D5DB' }}
              axisLine={{ stroke: '#D1D5DB' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                borderColor: '#D1D5DB',
                borderRadius: '6px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
              }} 
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="flagged"
              stroke="#F7941D"
              name="Flagged Transactions"
              strokeWidth={2}
              dot={{ stroke: '#F7941D', strokeWidth: 2, r: 4 }}
              activeDot={{ stroke: '#F7941D', strokeWidth: 2, r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="legitimate"
              stroke="#2B4FC2"
              name="Legitimate Transactions"
              strokeWidth={2}
              dot={{ stroke: '#2B4FC2', strokeWidth: 2, r: 4 }}
              activeDot={{ stroke: '#2B4FC2', strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex justify-end mt-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className={cn(
                  "w-[280px] justify-start text-left font-normal border-brand-border",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-brand-blue" />
                {date?.from ? (
                  date.to ? (
                    `${format(date.from, "MMM dd, yyyy")} - ${format(
                      date.to,
                      "MMM dd, yyyy"
                    )}`
                  ) : (
                    format(date.from, "MMM dd, yyyy")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
}
