
import { useState } from "react";
import { Edit2, Trash2, Calendar, MoreHorizontal, Power } from "lucide-react";
import { format } from "date-fns";
import { Rule, useRules } from "@/context/RulesContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface RuleCardProps {
  rule: Rule;
  onEdit: (rule: Rule) => void;
}

export function RuleCard({ rule, onEdit }: RuleCardProps) {
  const { toggleRuleStatus, deleteRule } = useRules();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const getSeverityColor = (severity: Rule["severity"]) => {
    switch (severity) {
      case "low":
        return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20";
      case "medium":
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20";
      case "high":
        return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20";
      case "critical":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };

  const handleDeleteRule = () => {
    deleteRule(rule.id);
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Card className={cn(
        "overflow-hidden transition-all duration-300 h-full flex flex-col",
        "hover:shadow-md hover:border-primary/20",
        !rule.enabled && "opacity-75"
      )}>
        <CardHeader className="pb-3 relative">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-md">{rule.name}</h3>
                <Badge variant="outline" className={getSeverityColor(rule.severity)}>
                  {rule.severity.charAt(0).toUpperCase() + rule.severity.slice(1)}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={rule.enabled}
                onCheckedChange={() => toggleRuleStatus(rule.id)}
                aria-label={rule.enabled ? "Disable rule" : "Enable rule"}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(rule)}>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Rule
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleRuleStatus(rule.id)}>
                    <Power className="mr-2 h-4 w-4" />
                    {rule.enabled ? "Disable" : "Enable"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-3 flex-1">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {rule.description}
          </p>
          <div className="mt-4 space-y-2">
            {rule.parameters.length > 0 && (
              <div className="grid gap-1">
                <h4 className="text-xs font-medium text-muted-foreground mb-1">Parameters:</h4>
                <div className="space-y-1.5">
                  {rule.parameters.map((param) => (
                    <div 
                      key={param.id} 
                      className="text-xs px-2 py-1 rounded-md bg-muted flex justify-between"
                    >
                      <span>{param.name}</span>
                      <span className="font-medium">
                        {param.condition.replace('_', ' ')} {param.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-0 border-t flex items-center text-xs text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Modified: {format(new Date(rule.modifiedAt), "MMM dd, yyyy")}</span>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Rule</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the rule "{rule.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteRule}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
