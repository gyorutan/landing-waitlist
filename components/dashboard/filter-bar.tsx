"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface FilterBarProps {
  onSearchChange?: (search: string) => void;
  onDateRangeChange?: (startDate: string, endDate: string) => void;
}

export function FilterBar({
  onSearchChange,
  onDateRangeChange,
}: FilterBarProps) {
  const [search, setSearch] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange?.(value);
  };

  const handleDateRangeChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    onDateRangeChange?.(start, end);
  };

  const clearFilters = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    onSearchChange?.("");
    onDateRangeChange?.("", "");
  };

  const hasFilters = search || startDate || endDate;

  return (
    <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
      {/* Search */}
      <div className="relative flex-1 w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="Search by email..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-10 w-full bg-background border-border/50 focus:border-primary/50"
        />
        {search && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 size-7 sm:size-8 hover:bg-muted"
            onClick={() => handleSearchChange("")}
          >
            <X className="size-3 sm:size-4" />
          </Button>
        )}
      </div>

      {/* Date Range */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <div className="flex items-center gap-2 flex-1 sm:flex-initial">
          <Input
            type="date"
            placeholder="Start date"
            value={startDate}
            onChange={(e) => handleDateRangeChange(e.target.value, endDate)}
            className="flex-1 sm:w-auto text-sm bg-background border-border/50 focus:border-primary/50"
          />
          <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap font-medium">
            to
          </span>
          <Input
            type="date"
            placeholder="End date"
            value={endDate}
            onChange={(e) => handleDateRangeChange(startDate, e.target.value)}
            className="flex-1 sm:w-auto text-sm bg-background border-border/50 focus:border-primary/50"
          />
        </div>
        {hasFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="gap-2 w-full sm:w-auto border-border/50 hover:bg-muted"
          >
            <X className="size-3 sm:size-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
