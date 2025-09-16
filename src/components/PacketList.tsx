import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Packet, PROTOCOL_COLORS, ProtocolType } from "@/types/packet";
import { cn } from "@/lib/utils";

interface PacketListProps {
  packets: Packet[];
  selectedPacket: Packet | null;
  onPacketSelect: (packet: Packet) => void;
}

export const PacketList = ({ packets, selectedPacket, onPacketSelect }: PacketListProps) => {
  const getProtocolColor = (protocol: string): string => {
    const protocolType = protocol.toUpperCase() as ProtocolType;
    return PROTOCOL_COLORS[protocolType] || PROTOCOL_COLORS.UNKNOWN;
  };

  return (
    <div className="h-full bg-card rounded-lg border border-border overflow-hidden">
      <div className="bg-muted px-4 py-2 border-b border-border">
        <h3 className="text-sm font-medium">Packet List ({packets.length} packets)</h3>
      </div>
      <div className="overflow-auto h-full">
        <Table>
          <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur">
            <TableRow>
              <TableHead className="w-16 text-xs">#</TableHead>
              <TableHead className="w-32 text-xs">Time</TableHead>
              <TableHead className="w-32 text-xs">Source</TableHead>
              <TableHead className="w-32 text-xs">Destination</TableHead>
              <TableHead className="w-20 text-xs">Protocol</TableHead>
              <TableHead className="w-20 text-xs">Length</TableHead>
              <TableHead className="text-xs">Info</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packets.map((packet) => (
              <TableRow
                key={packet.id}
                className={cn(
                  "cursor-pointer hover:bg-accent/50 transition-colors text-xs font-mono",
                  selectedPacket?.id === packet.id && "bg-accent"
                )}
                onClick={() => onPacketSelect(packet)}
              >
                <TableCell className="text-muted-foreground">{packet.id}</TableCell>
                <TableCell className="text-accent">{packet.timestamp}</TableCell>
                <TableCell>{packet.source}</TableCell>
                <TableCell>{packet.destination}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-xs px-2 py-0.5 border-0",
                      `text-${getProtocolColor(packet.protocol)} bg-${getProtocolColor(packet.protocol)}/10`
                    )}
                  >
                    {packet.protocol}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{packet.length}</TableCell>
                <TableCell className="truncate max-w-xs" title={packet.info}>
                  {packet.info}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};