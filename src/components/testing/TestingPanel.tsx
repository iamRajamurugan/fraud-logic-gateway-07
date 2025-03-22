
import { useState } from "react";
import { Activity, AlertCircle, ArrowRight, CheckCircle, Clock, RefreshCw, Shield } from "lucide-react";
import { TestTransaction, TestResult, useRules } from "@/context/RulesContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function TestingPanel() {
  const { rules, testAllRules } = useRules();
  const [transaction, setTransaction] = useState<TestTransaction>({
    id: `tx-${Date.now()}`,
    amount: 1000,
    timestamp: new Date(),
    deviceId: "device-123",
    paymentMethod: "credit_card",
    ipAddress: "192.168.1.1",
    location: "US",
    userId: "user-123",
    merchantId: "merchant-123",
  });
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof TestTransaction, value: string | number) => {
    setTransaction((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTest = () => {
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      const result = testAllRules({
        ...transaction,
        id: `tx-${Date.now()}`,
        timestamp: new Date(),
      });
      setTestResult(result);
      setIsLoading(false);
    }, 1200);
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return "text-green-500";
    if (score < 70) return "text-amber-500";
    return "text-red-500";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-emerald-500/10 text-emerald-500";
      case "medium":
        return "bg-amber-500/10 text-amber-500";
      case "high":
        return "bg-orange-500/10 text-orange-500";
      case "critical":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <Tabs defaultValue="transaction">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="transaction">Transaction Data</TabsTrigger>
                <TabsTrigger value="device">Device & User Data</TabsTrigger>
              </TabsList>
              <TabsContent value="transaction" className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Transaction Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={transaction.amount}
                      onChange={(e) =>
                        handleInputChange("amount", parseFloat(e.target.value))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Input
                      id="paymentMethod"
                      value={transaction.paymentMethod}
                      onChange={(e) =>
                        handleInputChange("paymentMethod", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={transaction.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="merchantId">Merchant ID</Label>
                    <Input
                      id="merchantId"
                      value={transaction.merchantId}
                      onChange={(e) =>
                        handleInputChange("merchantId", e.target.value)
                      }
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="device" className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="deviceId">Device ID</Label>
                    <Input
                      id="deviceId"
                      value={transaction.deviceId}
                      onChange={(e) =>
                        handleInputChange("deviceId", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ipAddress">IP Address</Label>
                    <Input
                      id="ipAddress"
                      value={transaction.ipAddress}
                      onChange={(e) =>
                        handleInputChange("ipAddress", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userId">User ID</Label>
                    <Input
                      id="userId"
                      value={transaction.userId}
                      onChange={(e) =>
                        handleInputChange("userId", e.target.value)
                      }
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end mt-6">
              <Button 
                onClick={handleTest} 
                disabled={isLoading || rules.filter(r => r.enabled).length === 0}
                className="bg-brand-blue hover:bg-brand-blue-light space-x-2"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4 mr-2" />
                )}
                <span>Run Fraud Detection</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className={cn(
          "overflow-hidden transition-all h-full flex flex-col",
          testResult ? "opacity-100" : "opacity-60"
        )}>
          <CardContent className="p-6 flex flex-col h-full">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Shield className="mr-2 h-5 w-5 text-brand-blue" />
              Risk Assessment Results
            </h3>

            {testResult ? (
              <div className="space-y-6 flex-1 flex flex-col">
                <div className="text-center py-6">
                  <div className="inline-flex items-center justify-center p-1 rounded-full bg-muted mb-4">
                    <div 
                      className={cn(
                        "rounded-full p-3",
                        testResult.riskScore < 30 
                          ? "bg-green-100" 
                          : testResult.riskScore < 70 
                            ? "bg-amber-100" 
                            : "bg-red-100"
                      )}
                    >
                      <Shield 
                        className={cn(
                          "h-8 w-8",
                          testResult.riskScore < 30 
                            ? "text-green-500" 
                            : testResult.riskScore < 70 
                              ? "text-amber-500" 
                              : "text-red-500"
                        )} 
                      />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold mb-2 flex items-center justify-center">
                    <span className={getRiskColor(testResult.riskScore)}>
                      {testResult.riskScore}
                    </span>
                    <span className="text-lg font-normal text-muted-foreground ml-1">/ 100</span>
                  </h2>
                  <Progress
                    value={testResult.riskScore}
                    className="h-2 mb-2"
                    indicatorClassName={cn(
                      testResult.riskScore < 30 
                        ? "bg-green-500" 
                        : testResult.riskScore < 70 
                          ? "bg-amber-500" 
                          : "bg-red-500"
                    )}
                  />
                  <p className="text-muted-foreground">
                    {testResult.riskScore < 30
                      ? "Low Risk - Transaction likely legitimate"
                      : testResult.riskScore < 70
                      ? "Medium Risk - Some anomalies detected"
                      : "High Risk - Suspicious transaction"}
                  </p>
                </div>

                <div className="flex items-center justify-between px-4 py-3 bg-muted rounded-md mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Processed at:</span>
                  </div>
                  <span className="text-sm font-medium">
                    {testResult.timestamp.toLocaleTimeString()}
                  </span>
                </div>

                <div className="flex-1">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>Triggered Rules: {testResult.triggeredRules.length}</span>
                  </h4>
                  
                  {testResult.triggeredRules.length > 0 ? (
                    <div className="space-y-2 overflow-y-auto max-h-[150px] pr-1">
                      {testResult.triggeredRules.map((rule) => (
                        <div
                          key={rule.id}
                          className="flex items-center justify-between p-2 bg-background rounded border text-sm"
                        >
                          <span>{rule.name}</span>
                          <Badge className={getSeverityColor(rule.severity)}>
                            {rule.severity}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[150px] bg-background rounded border p-4">
                      <div className="text-center">
                        <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">No rules triggered</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 p-6 text-center">
                <Activity className="h-12 w-12 text-muted-foreground mb-4" />
                <h4 className="text-lg font-medium mb-1">No Results Yet</h4>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Configure your transaction parameters and click "Run Fraud Detection" to see results.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
