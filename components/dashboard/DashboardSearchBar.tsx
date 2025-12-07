"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface DashboardSearchBarProps {
  placeholder?: string;
  buttonLabel?: string;
  onSearch?: (value: string) => void;
}

export function DashboardSearchBar({
  placeholder = "ابحث...",
  buttonLabel = "بحث",
  onSearch,
}: DashboardSearchBarProps) {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    onSearch?.(value);
  };


  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          className="pr-10"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={()=>  handleSearch()}
        />
      </div>
      <Button variant="outline" type="button" onClick={handleSearch}>
        {buttonLabel}
      </Button>
    </div>
  );
}
