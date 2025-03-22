
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h4 className="text-2xl font-bold mt-1">{value}</h4>
            {trend && (
              <p
                className={cn(
                  "text-xs font-medium mt-1 flex items-center",
                  trend.positive ? "text-emerald-600" : "text-red-600"
                )}
              >
                <span
                  className={cn(
                    "mr-1 text-xs",
                    trend.positive ? "text-emerald-600" : "text-red-600"
                  )}
                >
                  {trend.positive ? "▲" : "▼"}
                </span>
                {Math.abs(trend.value)}%{" "}
                <span className="ml-1 text-muted-foreground">vs. last week</span>
              </p>
            )}
            {description && (
              <p className="text-xs text-muted-foreground mt-2">{description}</p>
            )}
          </div>
          <div className="h-12 w-12 rounded-full flex items-center justify-center bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
