
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export type RuleParameter = {
  id: string;
  name: string;
  type: "amount" | "frequency" | "device" | "drift" | "location" | "time" | "other";
  value: string | number | boolean;
  condition: "equals" | "greater_than" | "less_than" | "contains" | "not_contains" | "is_true" | "is_false" | "in_range";
  threshold?: number;
};

export type Rule = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  severity: "low" | "medium" | "high" | "critical";
  parameters: RuleParameter[];
  createdAt: Date;
  modifiedAt: Date;
};

export type TestTransaction = {
  id: string;
  amount: number;
  timestamp: Date;
  deviceId: string;
  paymentMethod: string;
  ipAddress: string;
  location: string;
  userId: string;
  merchantId: string;
};

export type TestResult = {
  transactionId: string;
  riskScore: number;
  flagged: boolean;
  triggeredRules: Rule[];
  timestamp: Date;
};

type RulesContextType = {
  rules: Rule[];
  filteredRules: Rule[];
  testResults: TestResult[];
  addRule: (rule: Omit<Rule, "id" | "createdAt" | "modifiedAt">) => void;
  updateRule: (id: string, updatedRule: Partial<Omit<Rule, "id">>) => void;
  deleteRule: (id: string) => void;
  toggleRuleStatus: (id: string) => void;
  filterRules: (term: string, severity?: Rule["severity"]) => void;
  testRule: (rule: Rule, transaction: TestTransaction) => TestResult;
  testAllRules: (transaction: TestTransaction) => TestResult;
};

const initialRules: Rule[] = [
  {
    id: "rule-1",
    name: "High Value Transaction",
    description: "Flag transactions with unusually high amounts",
    enabled: true,
    severity: "high",
    parameters: [
      {
        id: "param-1",
        name: "Transaction Amount",
        type: "amount",
        value: 5000,
        condition: "greater_than",
      },
    ],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    modifiedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "rule-2",
    name: "Rapid Succession Transactions",
    description: "Detect multiple transactions from the same device within minutes",
    enabled: true,
    severity: "medium",
    parameters: [
      {
        id: "param-2",
        name: "Time Window",
        type: "frequency",
        value: 5,
        condition: "less_than",
      },
      {
        id: "param-3",
        name: "Transaction Count",
        type: "frequency",
        value: 3,
        condition: "greater_than",
      },
    ],
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    modifiedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
  },
  {
    id: "rule-3",
    name: "Multiple Accounts per Device",
    description: "Flag when the same device is used across multiple accounts",
    enabled: false,
    severity: "critical",
    parameters: [
      {
        id: "param-4",
        name: "Account Count",
        type: "device",
        value: 2,
        condition: "greater_than",
      },
    ],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    modifiedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
];

const RulesContext = createContext<RulesContextType | undefined>(undefined);

export const RulesProvider = ({ children }: { children: React.ReactNode }) => {
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [filteredRules, setFilteredRules] = useState<Rule[]>(initialRules);
  const [testResults, setTestResults] = useState<TestResult[]>([]);

  const addRule = (rule: Omit<Rule, "id" | "createdAt" | "modifiedAt">) => {
    const newRule: Rule = {
      ...rule,
      id: `rule-${Date.now()}`,
      createdAt: new Date(),
      modifiedAt: new Date(),
    };
    
    setRules((prevRules) => [...prevRules, newRule]);
    toast.success("Rule created successfully");
  };

  const updateRule = (id: string, updatedRule: Partial<Omit<Rule, "id">>) => {
    setRules((prevRules) =>
      prevRules.map((rule) =>
        rule.id === id
          ? { ...rule, ...updatedRule, modifiedAt: new Date() }
          : rule
      )
    );
    toast.success("Rule updated successfully");
  };

  const deleteRule = (id: string) => {
    setRules((prevRules) => prevRules.filter((rule) => rule.id !== id));
    toast.success("Rule deleted successfully");
  };

  const toggleRuleStatus = (id: string) => {
    setRules((prevRules) =>
      prevRules.map((rule) =>
        rule.id === id
          ? { ...rule, enabled: !rule.enabled, modifiedAt: new Date() }
          : rule
      )
    );
    
    const rule = rules.find(r => r.id === id);
    if (rule) {
      toast.success(`Rule ${rule.enabled ? 'disabled' : 'enabled'} successfully`);
    }
  };

  const filterRules = (term: string, severity?: Rule["severity"]) => {
    let filtered = rules;
    
    if (term) {
      filtered = filtered.filter(
        (rule) =>
          rule.name.toLowerCase().includes(term.toLowerCase()) ||
          rule.description.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    if (severity) {
      filtered = filtered.filter((rule) => rule.severity === severity);
    }
    
    setFilteredRules(filtered);
  };

  const testRule = (rule: Rule, transaction: TestTransaction): TestResult => {
    // This is a simplified test logic - in a real app, this would be more complex
    let riskScore = 0;
    let flagged = false;
    
    if (!rule.enabled) {
      return {
        transactionId: transaction.id,
        riskScore: 0,
        flagged: false,
        triggeredRules: [],
        timestamp: new Date(),
      };
    }
    
    // Evaluate each parameter
    for (const param of rule.parameters) {
      if (param.type === "amount" && typeof param.value === "number") {
        if (
          (param.condition === "greater_than" && transaction.amount > param.value) ||
          (param.condition === "less_than" && transaction.amount < param.value) ||
          (param.condition === "equals" && transaction.amount === param.value)
        ) {
          riskScore += rule.severity === "low" ? 20 : rule.severity === "medium" ? 40 : rule.severity === "high" ? 70 : 90;
          flagged = true;
        }
      }
      
      // Add more parameter evaluations for a real app
    }
    
    const result: TestResult = {
      transactionId: transaction.id,
      riskScore,
      flagged,
      triggeredRules: flagged ? [rule] : [],
      timestamp: new Date(),
    };
    
    setTestResults((prev) => [...prev, result]);
    
    return result;
  };

  const testAllRules = (transaction: TestTransaction): TestResult => {
    let totalRiskScore = 0;
    let flagged = false;
    const triggeredRules: Rule[] = [];
    
    // Test each active rule
    for (const rule of rules.filter((r) => r.enabled)) {
      const result = testRule(rule, transaction);
      if (result.flagged) {
        totalRiskScore += result.riskScore;
        flagged = true;
        triggeredRules.push(rule);
      }
    }
    
    // Cap the risk score at 100
    totalRiskScore = Math.min(totalRiskScore, 100);
    
    const finalResult: TestResult = {
      transactionId: transaction.id,
      riskScore: totalRiskScore,
      flagged,
      triggeredRules,
      timestamp: new Date(),
    };
    
    return finalResult;
  };

  // When rules change, update filtered rules
  useEffect(() => {
    setFilteredRules(rules);
  }, [rules]);

  return (
    <RulesContext.Provider
      value={{
        rules,
        filteredRules,
        testResults,
        addRule,
        updateRule,
        deleteRule,
        toggleRuleStatus,
        filterRules,
        testRule,
        testAllRules,
      }}
    >
      {children}
    </RulesContext.Provider>
  );
};

export const useRules = () => {
  const context = useContext(RulesContext);
  if (context === undefined) {
    throw new Error("useRules must be used within a RulesProvider");
  }
  return context;
};
