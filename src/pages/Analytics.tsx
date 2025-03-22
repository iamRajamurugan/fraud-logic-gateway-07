
import { useState } from "react";
import { 
  Calendar, 
  BarChart3, 
  PieChart, 
  Clock, 
  Search, 
  Filter, 
  RefreshCw,
  UserRound,
  Wallet,
  Building,
  AlertTriangle,
  Download
} from "lucide-react";
import { TransactionTable } from "@/components/analytics/TransactionTable";
import { FraudComparisonChart } from "@/components/analytics/FraudComparisonChart";
import { FraudTrendsChart } from "@/components/analytics/FraudTrendsChart";
import { ModelEvaluation } from "@/components/analytics/ModelEvaluation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("transactions");

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fraud Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor, analyze and visualize transaction fraud data across all payment channels
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className="whitespace-nowrap"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
          </Button>
          <Button 
            size="sm" 
            className="bg-brand-blue hover:bg-brand-blue-light whitespace-nowrap"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,287</div>
            <p className="text-xs text-muted-foreground mt-1">
              +5.2% from previous period
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Predicted Frauds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground mt-1">
              3.8% of total transactions
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Reported Frauds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground mt-1">
              2.6% of total transactions
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Transaction Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹4,892</div>
            <p className="text-xs text-muted-foreground mt-1">
              -2.1% from previous period
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions" className="text-sm">Transactions</TabsTrigger>
          <TabsTrigger value="fraud-analysis" className="text-sm">Fraud Analysis</TabsTrigger>
          <TabsTrigger value="model-evaluation" className="text-sm">Model Evaluation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions" className="space-y-6">
          <TransactionTable />
        </TabsContent>
        
        <TabsContent value="fraud-analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="lg:col-span-2 shadow-md">
              <CardHeader>
                <CardTitle>Fraud Trends Over Time</CardTitle>
                <CardDescription>
                  Visualizing predicted vs reported frauds over time
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <FraudTrendsChart />
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Fraud by Transaction Channel</CardTitle>
                <CardDescription>
                  Comparing fraud metrics across different transaction channels
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <FraudComparisonChart 
                  type="channel" 
                  icon={<Wallet className="h-4 w-4" />}
                />
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Fraud by Payment Mode</CardTitle>
                <CardDescription>
                  Comparing fraud metrics across different payment modes
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <FraudComparisonChart 
                  type="payment-mode" 
                  icon={<Wallet className="h-4 w-4" />}
                />
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Fraud by Gateway Bank</CardTitle>
                <CardDescription>
                  Comparing fraud metrics across different gateway banks
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <FraudComparisonChart 
                  type="gateway" 
                  icon={<Building className="h-4 w-4" />}
                />
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Fraud by User</CardTitle>
                <CardDescription>
                  Top users with highest fraud incidents
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <FraudComparisonChart 
                  type="user" 
                  icon={<UserRound className="h-4 w-4" />}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="model-evaluation" className="space-y-6">
          <ModelEvaluation />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
