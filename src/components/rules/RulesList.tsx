
import { useState } from "react";
import { Plus, Filter } from "lucide-react";
import { Rule, useRules } from "@/context/RulesContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RuleCard } from "@/components/rules/RuleCard";
import RuleForm from "@/components/rules/RuleForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function RulesList() {
  const { filteredRules, filterRules } = useRules();
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState<Rule["severity"] | "all">("all");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentRule, setCurrentRule] = useState<Rule | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterRules(term, severityFilter === "all" ? undefined : severityFilter);
  };

  const handleSeverityFilter = (value: string) => {
    setSeverityFilter(value as Rule["severity"] | "all");
    filterRules(searchTerm, value === "all" ? undefined : (value as Rule["severity"]));
  };

  const handleEditRule = (rule: Rule) => {
    setCurrentRule(rule);
    setEditDialogOpen(true);
  };

  const handleCreateRule = () => {
    setCurrentRule(null);
    setCreateDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-2 flex-1 max-w-md">
          <Input
            placeholder="Search rules..."
            value={searchTerm}
            onChange={handleSearch}
            className="max-w-sm"
          />
          <div className="flex items-center space-x-2">
            <Select value={severityFilter} onValueChange={handleSeverityFilter}>
              <SelectTrigger className="w-[130px]">
                <div className="flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Severity" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button className="bg-brand-blue hover:bg-brand-blue-light" onClick={handleCreateRule}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Rule
        </Button>
      </div>

      {filteredRules.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-background">
          <div className="p-3 mb-4 rounded-full bg-muted">
            <Filter className="w-6 h-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No rules found</h3>
          <p className="max-w-md mt-2 text-sm text-muted-foreground">
            {searchTerm || severityFilter !== "all"
              ? "No rules match your current filters. Try adjusting your search criteria."
              : "You haven't created any rules yet. Click the 'Create New Rule' button to get started."}
          </p>
          {(searchTerm || severityFilter !== "all") && (
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setSeverityFilter("all");
                filterRules("", undefined);
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRules.map((rule) => (
            <RuleCard key={rule.id} rule={rule} onEdit={handleEditRule} />
          ))}
        </div>
      )}

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Rule</DialogTitle>
            <DialogDescription>
              Configure a new fraud detection rule to identify suspicious transactions.
            </DialogDescription>
          </DialogHeader>
          <RuleForm
            onClose={() => setCreateDialogOpen(false)}
            initialRule={null}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Rule</DialogTitle>
            <DialogDescription>
              Modify the configuration of this fraud detection rule.
            </DialogDescription>
          </DialogHeader>
          <RuleForm
            onClose={() => setEditDialogOpen(false)}
            initialRule={currentRule}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
