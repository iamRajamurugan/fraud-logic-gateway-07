import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function TestingPanel() {
  const [transactionData, setTransactionData] = useState({
    amount: 1000,
    payerId: "PYR123",
    payeeId: "PYE456",
    channel: "UPI",
  });
  const [risk, setRisk] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTransactionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Simulate risk calculation based on transaction data
    let calculatedRisk = 0;
    if (transactionData.amount > 5000) calculatedRisk += 20;
    if (transactionData.channel === "Credit Card") calculatedRisk += 15;
    if (transactionData.payerId === transactionData.payeeId) calculatedRisk += 30;

    setRisk(Math.min(calculatedRisk, 100));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold">Transaction Details</h3>
        <p className="text-sm text-muted-foreground">
          Enter transaction details to assess risk.
        </p>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            type="number"
            id="amount"
            name="amount"
            value={transactionData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="payerId">Payer ID</Label>
          <Input
            type="text"
            id="payerId"
            name="payerId"
            value={transactionData.payerId}
            onChange={handleChange}
            placeholder="Enter payer ID"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="payeeId">Payee ID</Label>
          <Input
            type="text"
            id="payeeId"
            name="payeeId"
            value={transactionData.payeeId}
            onChange={handleChange}
            placeholder="Enter payee ID"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="channel">Channel</Label>
          <Input
            type="text"
            id="channel"
            name="channel"
            value={transactionData.channel}
            onChange={handleChange}
            placeholder="Enter channel"
          />
        </div>
      </div>

      <Button onClick={handleSubmit} className="bg-brand-blue hover:bg-brand-blue-light">
        Assess Risk
      </Button>

      <div>
        <h3 className="text-xl font-semibold">Risk Assessment</h3>
        <p className="text-sm text-muted-foreground">
          Calculated risk score based on the provided transaction details.
        </p>
        <div className="flex items-center justify-between mt-2">
          <span>Risk Score:</span>
          <span>{risk}%</span>
        </div>
        <Progress 
          value={risk} 
          className="h-5 bg-gray-200"
        />
      </div>
    </div>
  );
}
