import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";
import { FilterRule } from "@/types/packet";

interface FilterBarProps {
  onFilterChange: (filter: string) => void;
  activeFilters: FilterRule[];
  onRemoveFilter: (index: number) => void;
  onClearFilters: () => void;
}

export const FilterBar = ({ onFilterChange, activeFilters, onRemoveFilter, onClearFilters }: FilterBarProps) => {
  const [filterValue, setFilterValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filterValue.trim()) {
      onFilterChange(filterValue.trim());
      setFilterValue("");
    }
  };

  const commonFilters = [
    "tcp",
    "udp", 
    "http",
    "dns",
    "icmp",
    "arp",
    "ip.addr == 192.168.1.100",
    "tcp.port == 80",
    "udp.port == 53"
  ];

  return (
    <div className="bg-card border-b border-border p-4 space-y-3">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            placeholder="Enter display filter (e.g., tcp.port == 80, ip.addr == 192.168.1.1)"
            className="pl-10 font-mono"
          />
        </div>
        <Button type="submit" size="sm" disabled={!filterValue.trim()}>
          <Filter className="h-4 w-4 mr-2" />
          Apply
        </Button>
        {activeFilters.length > 0 && (
          <Button type="button" variant="outline" size="sm" onClick={onClearFilters}>
            Clear All
          </Button>
        )}
      </form>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="gap-1">
              <span className="font-mono text-xs">{filter.field} {filter.operator} {filter.value}</span>
              <X 
                className="h-3 w-3 cursor-pointer hover:text-destructive" 
                onClick={() => onRemoveFilter(index)}
              />
            </Badge>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">Quick filters:</span>
        {commonFilters.map((filter) => (
          <Badge 
            key={filter}
            variant="outline"
            className="cursor-pointer hover:bg-accent text-xs font-mono"
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </Badge>
        ))}
      </div>
    </div>
  );
};