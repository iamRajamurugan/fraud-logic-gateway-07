
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, RefreshCw } from "lucide-react";

// Mock data for confusion matrix
const confusionMatrix = {
  truePositives: 85,
  falsePositives: 39,
  trueNegatives: 3124,
  falseNegatives: 28,
};

export function ModelEvaluation() {
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d">("30d");
  
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
  
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Model Metrics</CardTitle>
              <CardDescription>
                Fraud detection model performance
              </CardDescription>
            </div>
            <div>
              <Tabs 
                defaultValue="30d" 
                value={dateRange} 
                onValueChange={(value) => setDateRange(value as "7d" | "30d" | "90d")} 
                className="w-[300px]"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="7d">Last 7 days</TabsTrigger>
                  <TabsTrigger value="30d">Last 30 days</TabsTrigger>
                  <TabsTrigger value="90d">Last 90 days</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Precision</div>
                <div className="font-bold">{(precision * 100).toFixed(1)}%</div>
              </div>
              <Progress value={precision * 100} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Percentage of correctly identified fraud cases out of all predicted fraud cases
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Recall</div>
                <div className="font-bold">{(recall * 100).toFixed(1)}%</div>
              </div>
              <Progress value={recall * 100} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Percentage of correctly identified fraud cases out of all actual fraud cases
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">F1 Score</div>
                <div className="font-bold">{(f1Score * 100).toFixed(1)}%</div>
              </div>
              <Progress value={f1Score * 100} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Harmonic mean of precision and recall
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Accuracy</div>
                <div className="font-bold">{(accuracy * 100).toFixed(1)}%</div>
              </div>
              <Progress value={accuracy * 100} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Percentage of correctly identified cases out of all cases
              </div>
            </div>
          </div>
          
          <div className="flex justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <span>Last updated: Oct 15, 2023</span>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-3 w-3" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Confusion Matrix</CardTitle>
          <CardDescription>
            Visualization of prediction outcomes vs actual values
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 pb-8 pt-4">
            <div className="aspect-square rounded-md bg-emerald-50 border border-emerald-200 p-6 flex flex-col items-center justify-center text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {confusionMatrix.trueNegatives}
              </div>
              <div className="text-sm font-medium mb-1">True Negatives</div>
              <div className="text-xs text-muted-foreground">
                Correctly identified non-fraud transactions
              </div>
            </div>
            
            <div className="aspect-square rounded-md bg-orange-50 border border-orange-200 p-6 flex flex-col items-center justify-center text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {confusionMatrix.falsePositives}
              </div>
              <div className="text-sm font-medium mb-1">False Positives</div>
              <div className="text-xs text-muted-foreground">
                Non-fraud transactions incorrectly flagged as fraud
              </div>
            </div>
            
            <div className="aspect-square rounded-md bg-red-50 border border-red-200 p-6 flex flex-col items-center justify-center text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {confusionMatrix.falseNegatives}
              </div>
              <div className="text-sm font-medium mb-1">False Negatives</div>
              <div className="text-xs text-muted-foreground">
                Fraud transactions missed by the system
              </div>
            </div>
            
            <div className="aspect-square rounded-md bg-blue-50 border border-blue-200 p-6 flex flex-col items-center justify-center text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {confusionMatrix.truePositives}
              </div>
              <div className="text-sm font-medium mb-1">True Positives</div>
              <div className="text-xs text-muted-foreground">
                Correctly identified fraud transactions
              </div>
            </div>
          </div>
          
          <div className="flex justify-between border-t pt-4">
            <div className="text-sm">
              <span className="font-medium">Total Transactions:</span> {total}
            </div>
            <div className="text-sm">
              <span className="font-medium">Total Fraud Cases:</span> {confusionMatrix.truePositives + confusionMatrix.falseNegatives}
            </div>
            <div className="text-sm">
              <span className="font-medium">Total Non-Fraud Cases:</span> {confusionMatrix.trueNegatives + confusionMatrix.falsePositives}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
