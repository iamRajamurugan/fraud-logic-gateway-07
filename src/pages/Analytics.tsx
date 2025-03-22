
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FraudTrendsChart } from "@/components/analytics/FraudTrendsChart";
import { FraudComparisonChart } from "@/components/analytics/FraudComparisonChart";
import { ModelEvaluation } from "@/components/analytics/ModelEvaluation";
import { TransactionTable } from "@/components/analytics/TransactionTable";

// Sample data for the fraud trends chart
const trendData = [
  { name: "Jan", flagged: 65, legitimate: 240 },
  { name: "Feb", flagged: 59, legitimate: 260 },
  { name: "Mar", flagged: 80, legitimate: 290 },
  { name: "Apr", flagged: 81, legitimate: 310 },
  { name: "May", flagged: 56, legitimate: 340 },
  { name: "Jun", flagged: 55, legitimate: 380 },
  { name: "Jul", flagged: 40, legitimate: 430 }
];

// Sample data for the model performance metrics
const modelPerformance = {
  accuracy: 0.92,
  precision: 0.89,
  recall: 0.86,
  f1Score: 0.87,
  auc: 0.94
};

// Sample data for transactions
const transactions = [
  {
    id: "TX123456",
    amount: 1250,
    status: "flagged",
    risk: 85,
    timestamp: "2023-05-15T09:24:00",
    source: "web",
    userId: "user-789"
  },
  {
    id: "TX123457",
    amount: 50,
    status: "cleared",
    risk: 15,
    timestamp: "2023-05-15T10:12:00",
    source: "mobile",
    userId: "user-456"
  },
  {
    id: "TX123458",
    amount: 2430,
    status: "flagged",
    risk: 72,
    timestamp: "2023-05-15T11:05:00",
    source: "web",
    userId: "user-123"
  },
  {
    id: "TX123459",
    amount: 199,
    status: "cleared",
    risk: 28,
    timestamp: "2023-05-15T12:34:00",
    source: "mobile",
    userId: "user-789"
  },
  {
    id: "TX123460",
    amount: 4999,
    status: "flagged",
    risk: 92,
    timestamp: "2023-05-15T13:17:00",
    source: "web",
    userId: "user-456"
  }
];

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-brand-text">Risk Analytics</h1>
        <p className="text-muted-foreground">
          Monitor fraud detection performance and analyze transaction patterns.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full max-w-md bg-muted">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white">Overview</TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:bg-white">Trends</TabsTrigger>
          <TabsTrigger value="transactions" className="data-[state=active]:bg-white">Transactions</TabsTrigger>
          <TabsTrigger value="models" className="data-[state=active]:bg-white">Models</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FraudTrendsChart data={trendData} />
            <FraudComparisonChart type="channel" />
          </div>

          <Card className="shadow-sm border-brand-border">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-brand-text">Recent Flagged Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionTable data={transactions.filter(t => t.status === "flagged")} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6 pt-4">
          <div className="grid gap-6">
            <FraudTrendsChart data={trendData} />
            <FraudComparisonChart type="channel" />
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="pt-4">
          <Card className="shadow-sm border-brand-border">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-brand-text">All Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionTable data={transactions} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="pt-4">
          <ModelEvaluation data={modelPerformance} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
