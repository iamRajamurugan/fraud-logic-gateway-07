
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, RefreshCw, Download, Info } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface ModelEvaluationProps {
  data: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
    auc: number;
  };
}

// Mock data for confusion matrix
const confusionMatrixData = {
  "7d": {
    truePositives: 32,
    falsePositives: 15,
    trueNegatives: 1248,
    falseNegatives: 11,
  },
  "30d": {
    truePositives: 85,
    falsePositives: 39,
    trueNegatives: 3124,
    falseNegatives: 28,
  },
  "90d": {
    truePositives: 217,
    falsePositives: 98,
    trueNegatives: 8945,
    falseNegatives: 76,
  },
};

export function ModelEvaluation({ data }: ModelEvaluationProps) {
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d">("30d");
  
  const confusionMatrix = confusionMatrixData[dateRange];
  
  // Calculate metrics
  const total = 
    confusionMatrix.truePositives + 
    confusionMatrix.falsePositives + 
    confusionMatrix.trueNegatives + 
    confusionMatrix.falseNegatives;
  
  const precision = confusionMatrix.truePositives / 
    (confusionMatrix.truePositives + confusionMatrix.falsePositives);
    
  const recall = confusionMatrix.truePositives / 
    (confusionMatrix.truePositives + confusionMatrix.falseNegatives);
    
  const f1Score = 2 * ((precision * recall) / (precision + recall));
  
  const accuracy = (confusionMatrix.truePositives + confusionMatrix.trueNegatives) / total;
  
  // Convert confusion matrix to pie chart data
  const pieChartData = [
    {
      name: "True Positives",
      value: confusionMatrix.truePositives,
      color: "#2B4FC2", // SabPaisa blue
      description: "Correctly identified fraud transactions",
    },
    {
      name: "False Positives",
      value: confusionMatrix.falsePositives,
      color: "#F7941D", // SabPaisa orange
      description: "Non-fraud transactions incorrectly flagged as fraud",
    },
    {
      name: "False Negatives",
      value: confusionMatrix.falseNegatives,
      color: "#EF4444", // Red
      description: "Fraud transactions missed by the system",
    },
    {
      name: "True Negatives",
      value: confusionMatrix.trueNegatives,
      color: "#10B981", // Green
      description: "Correctly identified non-fraud transactions",
    },
  ];
  
  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg border border-brand-border shadow-md">
          <p className="font-medium text-brand-text">{data.name}: {data.value}</p>
          <p className="text-xs text-muted-foreground">{data.description}</p>
          <p className="text-xs font-medium mt-1">
            {((data.value / total) * 100).toFixed(2)}% of total
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-1 shadow-sm border-brand-border">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-medium text-brand-text">Model Metrics</CardTitle>
              <CardDescription>
                Fraud detection model performance
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <Tabs 
            defaultValue="30d" 
            value={dateRange} 
            onValueChange={(value) => setDateRange(value as "7d" | "30d" | "90d")} 
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 bg-muted">
              <TabsTrigger value="7d" className="data-[state=active]:bg-white">Last 7 days</TabsTrigger>
              <TabsTrigger value="30d" className="data-[state=active]:bg-white">Last 30 days</TabsTrigger>
              <TabsTrigger value="90d" className="data-[state=active]:bg-white">Last 90 days</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-brand-text">Precision</div>
                <div className="font-bold text-brand-text">{(precision * 100).toFixed(1)}%</div>
              </div>
              <Progress 
                value={precision * 100} 
                className="h-2"
                indicatorClassName="bg-brand-blue"
              />
              <div className="text-xs text-muted-foreground">
                Percentage of correctly identified fraud cases out of all predicted fraud cases
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-brand-text">Recall</div>
                <div className="font-bold text-brand-text">{(recall * 100).toFixed(1)}%</div>
              </div>
              <Progress 
                value={recall * 100} 
                className="h-2"
                indicatorClassName="bg-brand-orange"
              />
              <div className="text-xs text-muted-foreground">
                Percentage of correctly identified fraud cases out of all actual fraud cases
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-brand-text">F1 Score</div>
                <div className="font-bold text-brand-text">{(f1Score * 100).toFixed(1)}%</div>
              </div>
              <Progress 
                value={f1Score * 100} 
                className="h-2"
                indicatorClassName="bg-violet-500"
              />
              <div className="text-xs text-muted-foreground">
                Harmonic mean of precision and recall
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-brand-text">Accuracy</div>
                <div className="font-bold text-brand-text">{(accuracy * 100).toFixed(1)}%</div>
              </div>
              <Progress 
                value={accuracy * 100} 
                className="h-2"
                indicatorClassName="bg-emerald-500"
              />
              <div className="text-xs text-muted-foreground">
                Percentage of correctly identified cases out of all cases
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t border-brand-border pt-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            <span>Updated: Oct 15, 2023</span>
          </div>
          <Button variant="outline" size="sm" className="border-brand-border">
            <RefreshCw className="mr-2 h-3 w-3" />
            Refresh
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="lg:col-span-2 shadow-sm border-brand-border">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-medium text-brand-text">Confusion Matrix</CardTitle>
              <CardDescription>
                Visualization of prediction outcomes vs actual values
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="border-brand-border">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-md bg-blue-50 border border-blue-200 p-4 flex flex-col items-center justify-center text-center">
                  <div className="text-3xl font-bold text-brand-blue mb-2">
                    {confusionMatrix.truePositives}
                  </div>
                  <div className="text-sm font-medium mb-1 text-brand-text">True Positives</div>
                  <div className="text-xs text-muted-foreground">
                    Correctly identified fraud transactions
                  </div>
                </div>
                
                <div className="rounded-md bg-orange-50 border border-orange-200 p-4 flex flex-col items-center justify-center text-center">
                  <div className="text-3xl font-bold text-brand-orange mb-2">
                    {confusionMatrix.falsePositives}
                  </div>
                  <div className="text-sm font-medium mb-1 text-brand-text">False Positives</div>
                  <div className="text-xs text-muted-foreground">
                    Non-fraud transactions incorrectly flagged as fraud
                  </div>
                </div>
                
                <div className="rounded-md bg-red-50 border border-red-200 p-4 flex flex-col items-center justify-center text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {confusionMatrix.falseNegatives}
                  </div>
                  <div className="text-sm font-medium mb-1 text-brand-text">False Negatives</div>
                  <div className="text-xs text-muted-foreground">
                    Fraud transactions missed by the system
                  </div>
                </div>
                
                <div className="rounded-md bg-emerald-50 border border-emerald-200 p-4 flex flex-col items-center justify-center text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">
                    {confusionMatrix.trueNegatives}
                  </div>
                  <div className="text-sm font-medium mb-1 text-brand-text">True Negatives</div>
                  <div className="text-xs text-muted-foreground">
                    Correctly identified non-fraud transactions
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between border-t border-brand-border pt-4">
                <div className="text-sm text-brand-text">
                  <span className="font-medium">Total Transactions:</span> {total}
                </div>
                <div className="text-sm text-brand-text">
                  <span className="font-medium">Fraud Rate:</span> {((confusionMatrix.truePositives + confusionMatrix.falseNegatives) / total * 100).toFixed(2)}%
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <div className="h-64 w-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => 
                        `${name}: ${(percent * 100).toFixed(1)}%`
                      }
                      labelLine={false}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      layout="vertical" 
                      verticalAlign="middle" 
                      align="right"
                      iconSize={10}
                      iconType="circle"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Model prediction outcomes for {dateRange === "7d" ? "last 7 days" : dateRange === "30d" ? "last 30 days" : "last 90 days"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
