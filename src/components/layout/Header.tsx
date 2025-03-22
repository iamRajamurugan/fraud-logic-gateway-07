
import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="h-16 border-b border-border bg-white/95 backdrop-blur-sm sticky top-0 z-20 flex items-center px-6 justify-between">
      <div className="flex-1">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-10 max-w-xs bg-background focus-visible:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-brand-orange text-white">
              3
            </Badge>
          </Button>
        </div>
        <div className="h-8 w-px bg-border"></div>
        <div className="flex items-center space-x-2">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium">Fraud Analyst</span>
            <span className="text-xs text-muted-foreground">Security Team</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-brand-blue flex items-center justify-center">
            <span className="text-white font-semibold text-sm">FA</span>
          </div>
        </div>
      </div>
    </header>
  );
}
