import { useState, useEffect } from "react";
import { Packet } from "@/types/packet";
import { cn } from "@/lib/utils";

interface HexDumpProps {
  packet: Packet | null;
  selectedField?: any;
}

export const HexDump = ({ packet, selectedField }: HexDumpProps) => {
  const [selectedBytes, setSelectedBytes] = useState<Set<number>>(new Set());

  // Convert hex string to formatted display
  const formatHexData = (hexString: string) => {
    const bytes = [];
    for (let i = 0; i < hexString.length; i += 2) {
      bytes.push(hexString.substr(i, 2));
    }
    return bytes;
  };

  // Convert hex to ASCII
  const hexToAscii = (hex: string) => {
    let result = '';
    for (let i = 0; i < hex.length; i += 2) {
      const hexByte = hex.substr(i, 2);
      const charCode = parseInt(hexByte, 16);
      if (charCode >= 32 && charCode <= 126) {
        result += String.fromCharCode(charCode);
      } else {
        result += '.';
      }
    }
    return result;
  };

  useEffect(() => {
    if (selectedField && selectedField.pos !== undefined && selectedField.size !== undefined) {
      const newSelected = new Set<number>();
      for (let i = selectedField.pos; i < selectedField.pos + selectedField.size; i++) {
        newSelected.add(i);
      }
      setSelectedBytes(newSelected);
    } else {
      setSelectedBytes(new Set());
    }
  }, [selectedField]);

  if (!packet) {
    return (
      <div className="h-full bg-card rounded-lg border border-border flex items-center justify-center">
        <p className="text-muted-foreground">Select a packet to view hex dump</p>
      </div>
    );
  }

  const hexBytes = formatHexData(packet.data);
  const rows = [];
  
  for (let i = 0; i < hexBytes.length; i += 16) {
    const rowBytes = hexBytes.slice(i, i + 16);
    const rowHex = packet.data.substr(i * 2, 32);
    rows.push({
      offset: i,
      bytes: rowBytes,
      ascii: hexToAscii(rowHex)
    });
  }

  return (
    <div className="h-full bg-card rounded-lg border border-border overflow-hidden">
      <div className="bg-muted px-4 py-2 border-b border-border">
        <h3 className="text-sm font-medium">Hex Dump - #{packet.id}</h3>
      </div>
      <div className="overflow-auto h-full p-2 font-mono text-xs">
        <div className="grid grid-cols-[auto_1fr_auto] gap-4">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="contents">
              {/* Offset column */}
              <div className="text-hex-offset font-medium">
                {row.offset.toString(16).padStart(8, '0').toUpperCase()}
              </div>
              
              {/* Hex bytes column */}
              <div className="flex gap-1 flex-wrap">
                {row.bytes.map((byte, byteIndex) => (
                  <span
                    key={byteIndex}
                    className={cn(
                      "text-hex-data hover:bg-accent/50 px-0.5 cursor-pointer",
                      selectedBytes.has(row.offset + byteIndex) && "bg-hex-selected text-background"
                    )}
                    onClick={() => {
                      const bytePos = row.offset + byteIndex;
                      const newSelected = new Set(selectedBytes);
                      if (newSelected.has(bytePos)) {
                        newSelected.delete(bytePos);
                      } else {
                        newSelected.add(bytePos);
                      }
                      setSelectedBytes(newSelected);
                    }}
                  >
                    {byte.toUpperCase()}
                  </span>
                ))}
                {/* Pad with spaces if row is incomplete */}
                {Array.from({ length: 16 - row.bytes.length }).map((_, i) => (
                  <span key={`pad-${i}`} className="text-transparent">XX</span>
                ))}
              </div>
              
              {/* ASCII column */}
              <div className="text-hex-ascii border-l border-border pl-2">
                {row.ascii.split('').map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className={cn(
                      "hover:bg-accent/50 cursor-pointer",
                      selectedBytes.has(row.offset + charIndex) && "bg-hex-selected text-background"
                    )}
                    onClick={() => {
                      const bytePos = row.offset + charIndex;
                      const newSelected = new Set(selectedBytes);
                      if (newSelected.has(bytePos)) {
                        newSelected.delete(bytePos);
                      } else {
                        newSelected.add(bytePos);
                      }
                      setSelectedBytes(newSelected);
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};