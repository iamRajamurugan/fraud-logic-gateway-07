
import { Shield, AlertTriangle, BarChart3, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { RuleSummary } from "@/components/dashboard/RuleSummary";
import { useRules } from "@/context/RulesContext";
import { Link } from "react-router-dom";

const Index = () => {
  const { rules } = useRules();
  const activeRules = rules.filter(rule => rule.enabled);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage your fraud detection system
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className="whitespace-nowrap"
          >
            <Activity className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Link to="/rules">
            <Button className="bg-brand-blue hover:bg-brand-blue-light whitespace-nowrap">
              <Shield className="h-4 w-4 mr-2" />
              Manage Rules
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Rules"
          value={activeRules.length}
          icon={Shield}
          trend={{ value: activeRules.length > 0 ? 12.5 : 0, positive: true }}
        />
        <StatCard
          title="Risk Threshold"
          value="65/100"
          icon={BarChart3}
          description="Current system threshold for flagging transactions"
        />
        <StatCard
          title="Average Risk Score"
          value="38.2"
          icon={Activity}
          trend={{ value: 3.2, positive: false }}
        />
        <StatCard
          title="Flagged Transactions"
          value="24"
          icon={AlertTriangle}
          trend={{ value: 8.1, positive: false }}
          className="text-orange-500"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <RuleSummary />
        </div>
        <div className="lg:col-span-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">System Overview</h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-card px-2 text-xs uppercase text-muted-foreground">
                      Fraud detection components
                    </span>
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col space-y-2 rounded-lg border p-4">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full p-2 bg-brand-blue/10">
                        <Shield className="h-5 w-5 text-brand-blue" />
                      </div>
                      <h4 className="font-medium">Rule Engine</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Custom rules to detect suspicious activities based on transaction patterns
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full">
                        Operational
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 rounded-lg border p-4">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full p-2 bg-brand-orange/10">
                        <Activity className="h-5 w-5 text-brand-orange" />
                      </div>
                      <h4 className="font-medium">GNN Model</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Graph Neural Network analyzing deep transaction relationships
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full">
                        Active - Learning
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 rounded-lg border p-4">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full p-2 bg-muted">
                        <BarChart3 className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <h4 className="font-medium">Behavioral Monitoring</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      System to track unusual changes in user behavior over time
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 rounded-lg border p-4">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full p-2 bg-muted">
                        <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <h4 className="font-medium">Alert System</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Real-time notification system for suspicious activities
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full">
                        Operational
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
