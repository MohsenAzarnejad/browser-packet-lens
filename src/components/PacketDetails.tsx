import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Packet, PacketLayer } from "@/types/packet";
import { cn } from "@/lib/utils";

interface PacketDetailsProps {
  packet: Packet | null;
  onFieldSelect?: (field: any, layer: PacketLayer) => void;
}

export const PacketDetails = ({ packet, onFieldSelect }: PacketDetailsProps) => {
  const [expandedLayers, setExpandedLayers] = useState<Set<string>>(new Set());

  if (!packet) {
    return (
      <div className="h-full bg-card rounded-lg border border-border flex items-center justify-center">
        <p className="text-muted-foreground">Select a packet to view details</p>
      </div>
    );
  }

  const toggleLayer = (layerName: string) => {
    const newExpanded = new Set(expandedLayers);
    if (newExpanded.has(layerName)) {
      newExpanded.delete(layerName);
    } else {
      newExpanded.add(layerName);
    }
    setExpandedLayers(newExpanded);
  };

  return (
    <div className="h-full bg-card rounded-lg border border-border overflow-hidden">
      <div className="bg-muted px-4 py-2 border-b border-border">
        <h3 className="text-sm font-medium">Packet Details - #{packet.id}</h3>
      </div>
      <div className="overflow-auto h-full p-2">
        {packet.layers.map((layer, layerIndex) => {
          const isExpanded = expandedLayers.has(layer.name);
          
          return (
            <div key={layerIndex} className="mb-2">
              <div
                className="flex items-center gap-2 px-2 py-1 hover:bg-accent/50 cursor-pointer rounded text-sm"
                onClick={() => toggleLayer(layer.name)}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-accent" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-accent" />
                )}
                <span className="font-medium text-primary">{layer.name}</span>
                <span className="text-muted-foreground text-xs">({layer.summary})</span>
              </div>
              
              {isExpanded && (
                <div className="ml-6 mt-1 space-y-1">
                  {layer.fields.map((field, fieldIndex) => (
                    <div
                      key={fieldIndex}
                      className={cn(
                        "flex items-start gap-3 px-2 py-1 text-xs hover:bg-accent/30 cursor-pointer rounded",
                        "font-mono"
                      )}
                      onClick={() => onFieldSelect?.(field, layer)}
                    >
                      <span className="text-accent font-medium min-w-0 flex-1">
                        {field.showName}:
                      </span>
                      <span className="text-foreground break-all">
                        {field.value}
                      </span>
                      {field.size && (
                        <span className="text-muted-foreground">
                          ({field.size} bytes)
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};