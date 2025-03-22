
import { TestingPanel } from "@/components/testing/TestingPanel";

const Testing = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Test Transactions</h1>
        <p className="text-muted-foreground mt-1">
          Evaluate sample transactions against your rule engine
        </p>
      </div>
      
      <TestingPanel />
    </div>
  );
};

export default Testing;
