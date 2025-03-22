
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FraudComparisonChartProps {
  type?: "channel" | "payment-mode" | "gateway" | "user";
  className?: string;
  icon?: React.ReactNode;
  data?: any[];
}

export function FraudComparisonChart({ 
  type = "channel", 
  className, 
  icon,
  data
}: FraudComparisonChartProps) {
  const [sortBy, setSortBy] = useState<"predicted" | "reported" | "name">("predicted");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Mock data
  const channelData = [
    { name: "UPI", predicted: 42, reported: 35 },
    { name: "Net Banking", predicted: 28, reported: 21 },
    { name: "Credit Card", predicted: 18, reported: 14 },
    { name: "Debit Card", predicted: 24, reported: 19 },
    { name: "Wallet", predicted: 12, reported: 8 },
  ];

  const paymentModeData = [
    { name: "Bank Account", predicted: 48, reported: 39 },
    { name: "Credit Card", predicted: 24, reported: 18 },
    { name: "Debit Card", predicted: 32, reported: 25 },
    { name: "Wallet", predicted: 20, reported: 15 },
  ];

  const gatewayData = [
    { name: "HDFC Bank", predicted: 36, reported: 29 },
    { name: "ICICI Bank", predicted: 32, reported: 24 },
    { name: "SBI", predicted: 28, reported: 21 },
    { name: "Axis Bank", predicted: 20, reported: 16 },
    { name: "Paytm", predicted: 8, reported: 5 },
  ];

  const userData = [
    { name: "PYRID4782", predicted: 15, reported: 12 },
    { name: "PYRID8246", predicted: 12, reported: 9 },
    { name: "PYRID1142", predicted: 9, reported: 7 },
    { name: "PYRID2251", predicted: 8, reported: 6 },
    { name: "PYRID7792", predicted: 6, reported: 4 },
  ];

  const getData = () => {
    let chartData;
    switch (type) {
      case "channel":
        chartData = channelData;
        break;
      case "payment-mode":
        chartData = paymentModeData;
        break;
      case "gateway":
        chartData = gatewayData;
        break;
      case "user":
        chartData = userData;
        break;
      default:
        chartData = channelData;
    }

    // Sort data based on current sortBy and sortOrder
    return [...chartData].sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc" 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else {
        return sortOrder === "asc" 
          ? a[sortBy] - b[sortBy] 
          : b[sortBy] - a[sortBy];
      }
    });
  };

  const getTitle = () => {
    switch (type) {
      case "channel":
        return "Fraud by Transaction Channel";
      case "payment-mode":
        return "Fraud by Payment Mode";
      case "gateway":
        return "Fraud by Gateway Bank";
      case "user":
        return "Fraud by User";
      default:
        return "Fraud Comparison";
    }
  };

  const getDescription = () => {
    switch (type) {
      case "channel":
        return "Comparing fraud metrics across different transaction channels";
      case "payment-mode":
        return "Comparing fraud metrics across different payment modes";
      case "gateway":
        return "Comparing fraud metrics across different gateway banks";
      case "user":
        return "Top users with highest fraud incidents";
      default:
        return "Comparison of predicted vs reported frauds";
    }
  };

  const handleSortChange = (value: string) => {
    const [newSortBy, newSortOrder] = value.split("-") as [
      "predicted" | "reported" | "name", 
      "asc" | "desc"
    ];
    
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-base font-medium text-brand-text">{getTitle()}</h3>
          <p className="text-sm text-muted-foreground">{getDescription()}</p>
        </div>
        <Select 
          value={`${sortBy}-${sortOrder}`}
          onValueChange={handleSortChange}
        >
          <SelectTrigger className="w-[180px] border-brand-border">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="predicted-desc">Highest Predicted</SelectItem>
            <SelectItem value="reported-desc">Highest Reported</SelectItem>
            <SelectItem value="predicted-asc">Lowest Predicted</SelectItem>
            <SelectItem value="reported-asc">Lowest Reported</SelectItem>
            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={getData()}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
            barGap={8}
            barCategoryGap={16}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} stroke="#D1D5DB" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: '#333333' }}
              tickMargin={10}
              axisLine={{ stroke: '#D1D5DB' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#333333' }}
              tickMargin={10}
              axisLine={{ stroke: '#D1D5DB' }}
            >
              <Label
                value="Number of Transactions"
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: 'middle', fontSize: '12px', fill: '#64748B' }}
              />
            </YAxis>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                borderColor: '#D1D5DB',
                borderRadius: '6px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
              }}
            />
            <Legend wrapperStyle={{ paddingTop: 15 }} />
            <Bar 
              dataKey="predicted" 
              name="Predicted Frauds" 
              fill="#2B4FC2" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="reported" 
              name="Reported Frauds" 
              fill="#F7941D" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
