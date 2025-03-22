
import { useState, useEffect } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { Rule, RuleParameter, useRules } from "@/context/RulesContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface RuleFormProps {
  onClose: () => void;
  initialRule: Rule | null;
}

const defaultParameter: Omit<RuleParameter, "id"> = {
  name: "",
  type: "amount",
  value: "",
  condition: "greater_than",
};

export function RuleForm({ onClose, initialRule }: RuleFormProps) {
  const { addRule, updateRule } = useRules();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [severity, setSeverity] = useState<Rule["severity"]>("medium");
  const [parameters, setParameters] = useState<Omit<RuleParameter, "id">[]>([
    { ...defaultParameter },
  ]);

  useEffect(() => {
    if (initialRule) {
      setName(initialRule.name);
      setDescription(initialRule.description);
      setEnabled(initialRule.enabled);
      setSeverity(initialRule.severity);
      setParameters(
        initialRule.parameters.map(({ id, ...rest }) => rest)
      );
    }
  }, [initialRule]);

  const handleAddParameter = () => {
    setParameters([...parameters, { ...defaultParameter }]);
  };

  const handleRemoveParameter = (index: number) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  const handleParameterChange = (
    index: number,
    field: keyof Omit<RuleParameter, "id">,
    value: string | number | boolean
  ) => {
    const newParameters = [...parameters];
    newParameters[index] = {
      ...newParameters[index],
      [field]: value,
    };
    setParameters(newParameters);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parametersWithIds = parameters.map((param) => ({
      ...param,
      id: `param-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    }));

    if (initialRule) {
      updateRule(initialRule.id, {
        name,
        description,
        enabled,
        severity,
        parameters: parametersWithIds,
      });
    } else {
      addRule({
        name,
        description,
        enabled,
        severity,
        parameters: parametersWithIds,
      });
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Rule Name</Label>
            <Input
              id="name"
              placeholder="Enter rule name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="severity">Severity</Label>
            <Select value={severity} onValueChange={(value) => setSeverity(value as Rule["severity"])}>
              <SelectTrigger id="severity">
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter rule description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="min-h-[80px]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="enabled" checked={enabled} onCheckedChange={setEnabled} />
          <Label htmlFor="enabled">Rule Enabled</Label>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Rule Parameters</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddParameter}
              className="h-8"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Parameter
            </Button>
          </div>

          <div className="space-y-4">
            {parameters.map((param, index) => (
              <div
                key={index}
                className="p-4 border rounded-md bg-muted/30 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Parameter {index + 1}</h4>
                  {parameters.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveParameter(index)}
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`param-name-${index}`}>Name</Label>
                    <Input
                      id={`param-name-${index}`}
                      placeholder="Parameter name"
                      value={param.name}
                      onChange={(e) =>
                        handleParameterChange(index, "name", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`param-type-${index}`}>Type</Label>
                    <Select
                      value={param.type}
                      onValueChange={(value) =>
                        handleParameterChange(index, "type", value)
                      }
                    >
                      <SelectTrigger id={`param-type-${index}`}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="amount">Amount</SelectItem>
                        <SelectItem value="frequency">Frequency</SelectItem>
                        <SelectItem value="device">Device</SelectItem>
                        <SelectItem value="drift">Behavioral Drift</SelectItem>
                        <SelectItem value="location">Location</SelectItem>
                        <SelectItem value="time">Time</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`param-condition-${index}`}>Condition</Label>
                    <Select
                      value={param.condition}
                      onValueChange={(value) =>
                        handleParameterChange(index, "condition", value)
                      }
                    >
                      <SelectTrigger id={`param-condition-${index}`}>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equals">Equals</SelectItem>
                        <SelectItem value="greater_than">Greater Than</SelectItem>
                        <SelectItem value="less_than">Less Than</SelectItem>
                        <SelectItem value="contains">Contains</SelectItem>
                        <SelectItem value="not_contains">Not Contains</SelectItem>
                        <SelectItem value="is_true">Is True</SelectItem>
                        <SelectItem value="is_false">Is False</SelectItem>
                        <SelectItem value="in_range">In Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`param-value-${index}`}>Value</Label>
                    <Input
                      id={`param-value-${index}`}
                      placeholder="Parameter value"
                      value={param.value}
                      onChange={(e) =>
                        handleParameterChange(
                          index,
                          "value",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="bg-brand-blue hover:bg-brand-blue-light">
          {initialRule ? "Save Changes" : "Create Rule"}
        </Button>
      </div>
    </form>
  );
}
