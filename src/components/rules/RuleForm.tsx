
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRules } from "@/context/RulesContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrashIcon, PlusCircleIcon } from "lucide-react";

type ParameterType = "amount" | "frequency" | "timeWindow" | "location" | "device" | "paymentMethod";
type ParameterCondition = "greater_than" | "less_than" | "equal_to" | "not_equal_to" | "contains" | "not_contains";

interface Parameter {
  name: string;
  type: ParameterType;
  value: string;
  condition: ParameterCondition;
  id?: string;
}

interface RuleFormProps {
  onClose: () => void;
  initialRule?: any;
}

const defaultParameter: Parameter = {
  name: "",
  type: "amount",
  value: "",
  condition: "greater_than"
};

export function RuleForm({ onClose, initialRule }: RuleFormProps) {
  const { addRule, updateRule } = useRules();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [severity, setSeverity] = useState<"low" | "medium" | "high" | "critical">("medium");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (initialRule) {
      setName(initialRule.name);
      setDescription(initialRule.description);
      setParameters(initialRule.parameters.map(({ id, ...rest }: Parameter & { id: string }) => ({
        ...rest
      })));
      setSeverity(initialRule.severity);
      setIsEditing(true);
    } else {
      setName("");
      setDescription("");
      setParameters([{ ...defaultParameter }]);
      setSeverity("medium");
      setIsEditing(false);
    }
  }, [initialRule]);

  const handleParameterChange = (index: number, field: keyof Parameter, value: string) => {
    const newParameters = [...parameters];
    newParameters[index] = {
      ...newParameters[index],
      [field]: value
    };
    setParameters(newParameters);
  };

  const addParameter = () => {
    setParameters([...parameters, { ...defaultParameter }]);
  };

  const removeParameter = (index: number) => {
    if (parameters.length === 1) {
      return;
    }
    setParameters(parameters.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parametersWithIds = parameters.map((param) => ({
      ...param,
      id: uuidv4()
    }));

    if (isEditing && initialRule) {
      updateRule({
        id: initialRule.id,
        name,
        description,
        parameters: parametersWithIds,
        severity,
        enabled: initialRule.enabled,
        dateCreated: initialRule.dateCreated,
        dateUpdated: new Date().toISOString()
      });
    } else {
      addRule({
        id: uuidv4(),
        name,
        description,
        parameters: parametersWithIds,
        severity,
        enabled: true,
        dateCreated: new Date().toISOString(),
        dateUpdated: new Date().toISOString()
      });
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Rule Name</Label>
          <Input
            id="name"
            placeholder="Enter rule name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border-brand-border"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the purpose of this rule"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px] resize-y border-brand-border"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="severity">Severity Level</Label>
          <Select
            value={severity}
            onValueChange={(value: "low" | "medium" | "high" | "critical") => setSeverity(value)}
          >
            <SelectTrigger id="severity" className="w-full border-brand-border">
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

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Parameters</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addParameter}
              className="flex items-center gap-1 border-brand-border"
            >
              <PlusCircleIcon className="h-4 w-4" />
              Add Parameter
            </Button>
          </div>

          {parameters.map((parameter, index) => (
            <div
              key={index}
              className="grid gap-4 p-4 border border-brand-border rounded-md bg-muted/20"
            >
              <div className="flex justify-between items-start">
                <div className="grid gap-2 flex-1">
                  <Label htmlFor={`param-name-${index}`}>Parameter Name</Label>
                  <Input
                    id={`param-name-${index}`}
                    placeholder="Enter parameter name"
                    value={parameter.name}
                    onChange={(e) => handleParameterChange(index, "name", e.target.value)}
                    required
                    className="border-brand-border"
                  />
                </div>
                {parameters.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeParameter(index)}
                    className="ml-2 mt-6 border-brand-border"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`param-type-${index}`}>Parameter Type</Label>
                <Select
                  value={parameter.type}
                  onValueChange={(value) => handleParameterChange(index, "type", value)}
                >
                  <SelectTrigger id={`param-type-${index}`} className="border-brand-border">
                    <SelectValue placeholder="Select parameter type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="amount">Amount</SelectItem>
                    <SelectItem value="frequency">Frequency</SelectItem>
                    <SelectItem value="timeWindow">Time Window</SelectItem>
                    <SelectItem value="location">Location</SelectItem>
                    <SelectItem value="device">Device</SelectItem>
                    <SelectItem value="paymentMethod">Payment Method</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`param-condition-${index}`}>Condition</Label>
                <Select
                  value={parameter.condition}
                  onValueChange={(value) => handleParameterChange(index, "condition", value)}
                >
                  <SelectTrigger id={`param-condition-${index}`} className="border-brand-border">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="greater_than">Greater Than</SelectItem>
                    <SelectItem value="less_than">Less Than</SelectItem>
                    <SelectItem value="equal_to">Equal To</SelectItem>
                    <SelectItem value="not_equal_to">Not Equal To</SelectItem>
                    <SelectItem value="contains">Contains</SelectItem>
                    <SelectItem value="not_contains">Not Contains</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`param-value-${index}`}>Value</Label>
                <Input
                  id={`param-value-${index}`}
                  placeholder="Enter parameter value"
                  value={parameter.value}
                  onChange={(e) => handleParameterChange(index, "value", e.target.value)}
                  required
                  className="border-brand-border"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="border-brand-border"
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-brand-blue hover:bg-brand-blue-light">
          {isEditing ? "Update Rule" : "Create Rule"}
        </Button>
      </div>
    </form>
  );
}

export default RuleForm;
