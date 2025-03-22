
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

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

interface FraudComparisonChartProps {
  type: "channel" | "payment-mode" | "gateway" | "user";
  className?: string;
  icon?: React.ReactNode;
}

export function FraudComparisonChart({ type, className, icon }: FraudComparisonChartProps) {
  const getData = () => {
    switch (type) {
      case "channel":
        return channelData;
      case "payment-mode":
        return paymentModeData;
      case "gateway":
        return gatewayData;
      case "user":
        return userData;
      default:
        return channelData;
    }
  };

  return (
    <div className={cn("w-full h-80", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={getData()}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '6px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
            }}
          />
          <Legend />
          <Bar dataKey="predicted" name="Predicted Frauds" fill="#1A49A5" radius={[4, 4, 0, 0]} />
          <Bar dataKey="reported" name="Reported Frauds" fill="#F38C26" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
