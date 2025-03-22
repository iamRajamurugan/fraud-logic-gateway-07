
import { RulesList } from "@/components/rules/RulesList";

const Rules = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Rules Management</h1>
        <p className="text-muted-foreground mt-1">
          Create and manage fraud detection rules
        </p>
      </div>
      
      <RulesList />
    </div>
  );
};

export default Rules;
