
import { useRules } from "@/context/RulesContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function RuleSummary() {
  const { rules } = useRules();
  
  const enabledRules = rules.filter((rule) => rule.enabled);
  const disabledRules = rules.filter((rule) => !rule.enabled);
  
  const rulesBySeverity = rules.reduce(
    (acc, rule) => {
      acc[rule.severity] += 1;
      return acc;
    },
    { low: 0, medium: 0, high: 0, critical: 0 }
  );

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
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Rule Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[120px]">
              <p className="text-sm text-muted-foreground">Total Rules</p>
              <p className="text-2xl font-bold mt-1">{rules.length}</p>
            </div>
            <div className="flex-1 min-w-[120px]">
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-2xl font-bold mt-1 text-brand-blue">{enabledRules.length}</p>
            </div>
            <div className="flex-1 min-w-[120px]">
              <p className="text-sm text-muted-foreground">Disabled</p>
              <p className="text-2xl font-bold mt-1 text-muted-foreground">{disabledRules.length}</p>
            </div>
          </div>
          
          <div className="pt-3 border-t">
            <p className="text-sm font-medium mb-3">Rules by Severity</p>
            <div className="space-y-2">
              {(["critical", "high", "medium", "low"] as const).map((severity) => (
                <div key={severity} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Badge className={cn("mr-2", getSeverityColor(severity))}>
                      {severity.charAt(0).toUpperCase() + severity.slice(1)}
                    </Badge>
                    <span className="text-sm">
                      {rulesBySeverity[severity]} rule{rulesBySeverity[severity] !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        severity === "low" 
                          ? "bg-emerald-500" 
                          : severity === "medium" 
                            ? "bg-amber-500" 
                            : severity === "high" 
                              ? "bg-orange-500" 
                              : "bg-red-500"
                      )}
                      style={{
                        width: `${
                          rules.length
                            ? (rulesBySeverity[severity] / rules.length) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
