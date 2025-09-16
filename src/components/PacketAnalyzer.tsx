import { useState, useMemo, useRef } from "react";
import { Packet, FilterRule, PacketLayer } from "@/types/packet";
import { mockPackets } from "@/data/mockPackets";
import { FilterBar } from "./FilterBar";
import { PacketList } from "./PacketList";
import { PacketDetails } from "./PacketDetails";
import { HexDump } from "./HexDump";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, Square, RotateCcw, Upload, FileText, X } from "lucide-react";
import { toast } from "sonner";

export const PacketAnalyzer = () => {
  const [packets, setPackets] = useState<Packet[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedPacket, setSelectedPacket] = useState<Packet | null>(null);
  const [selectedField, setSelectedField] = useState<any>(null);
  const [filterRules, setFilterRules] = useState<FilterRule[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // For demo purposes, use mock data
      // In a real implementation, you would parse the PCAP file here
      setPackets(mockPackets);
      toast.success(`PCAP file "${file.name}" loaded successfully`);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setPackets([]);
    setSelectedPacket(null);
    setFilterRules([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success("PCAP file removed");
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Parse and apply display filters
  const parseFilter = (filterString: string): FilterRule | null => {
    // Simple filter parsing - in real implementation would be more sophisticated
    const operators = ['==', '!=', '>', '<', 'contains', 'matches'];
    
    for (const op of operators) {
      if (filterString.includes(op)) {
        const [field, value] = filterString.split(op).map(s => s.trim());
        const operatorMap: Record<string, FilterRule['operator']> = {
          '==': 'eq',
          '!=': 'ne', 
          '>': 'gt',
          '<': 'lt',
          'contains': 'contains',
          'matches': 'matches'
        };
        
        return {
          field: field.toLowerCase(),
          operator: operatorMap[op] || 'eq',
          value: value.replace(/['"]/g, '')
        };
      }
    }

    // Simple protocol filter
    const protocolMatch = filterString.match(/^(tcp|udp|http|https|dns|icmp|arp)$/i);
    if (protocolMatch) {
      return {
        field: 'protocol',
        operator: 'eq',
        value: protocolMatch[1].toUpperCase()
      };
    }

    return null;
  };

  const filteredPackets = useMemo(() => {
    if (filterRules.length === 0) return packets;

    return packets.filter(packet => {
      return filterRules.every(rule => {
        let fieldValue = '';
        
        switch (rule.field) {
          case 'protocol':
            fieldValue = packet.protocol.toLowerCase();
            break;
          case 'ip.addr':
          case 'ip.src':
          case 'ip.dst':
            fieldValue = `${packet.source} ${packet.destination}`.toLowerCase();
            break;
          case 'tcp.port':
          case 'udp.port':
            fieldValue = packet.info.toLowerCase();
            break;
          default:
            fieldValue = `${packet.source} ${packet.destination} ${packet.protocol} ${packet.info}`.toLowerCase();
        }

        const ruleValue = rule.value.toLowerCase();

        switch (rule.operator) {
          case 'eq':
            return fieldValue.includes(ruleValue);
          case 'ne':
            return !fieldValue.includes(ruleValue);
          case 'contains':
            return fieldValue.includes(ruleValue);
          case 'matches':
            try {
              return new RegExp(ruleValue).test(fieldValue);
            } catch {
              return false;
            }
          default:
            return fieldValue.includes(ruleValue);
        }
      });
    });
  }, [packets, filterRules]);

  const handleFilterChange = (filterString: string) => {
    const rule = parseFilter(filterString);
    if (rule) {
      setFilterRules(prev => [...prev, rule]);
      toast.success(`Filter applied: ${filterString}`);
    } else {
      toast.error("Invalid filter syntax");
    }
  };

  const handleRemoveFilter = (index: number) => {
    setFilterRules(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearFilters = () => {
    setFilterRules([]);
    toast.success("All filters cleared");
  };

  const handleFieldSelect = (field: any, layer: PacketLayer) => {
    setSelectedField(field);
  };

  const toggleCapture = () => {
    setIsCapturing(!isCapturing);
    toast.success(isCapturing ? "Capture stopped" : "Capture started");
  };

  const stopCapture = () => {
    setIsCapturing(false);
    toast.success("Capture stopped");
  };

  const restartCapture = () => {
    setIsCapturing(false);
    setTimeout(() => setIsCapturing(true), 100);
    toast.success("Capture restarted");
  };

  return (
    <div className="min-h-screen bg-background">
      {!uploadedFile ? (
        // File Upload Interface
        <div className="min-h-screen flex items-center justify-center p-8">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Packet Analyzer
              </CardTitle>
              <CardDescription className="text-lg">
                Upload a PCAP file to start analyzing network packets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div 
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
                onClick={triggerFileUpload}
              >
                <Upload className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Choose PCAP File</h3>
                <p className="text-muted-foreground mb-4">
                  Click here or drag and drop your .pcap, .pcapng, or .cap file
                </p>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Select File
                </Button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".pcap,.pcapng,.cap"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <div className="text-center text-sm text-muted-foreground">
                <p>Supported formats: PCAP, PCAPNG, CAP</p>
                <p>Maximum file size: 100MB</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        // Main Analyzer Interface
        <>
          {/* Header */}
          <div className="bg-card border-b border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Packet Analyzer
                </h1>
                <Badge variant="outline" className="text-xs">
                  <FileText className="h-3 w-3 mr-1" />
                  {uploadedFile.name}
                </Badge>
                <Button variant="ghost" size="sm" onClick={handleRemoveFile}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={isCapturing ? "destructive" : "default"}
                  size="sm"
                  onClick={toggleCapture}
                >
                  {isCapturing ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={stopCapture}>
                  <Square className="h-4 w-4 mr-2" />
                  Stop
                </Button>
                <Button variant="outline" size="sm" onClick={restartCapture}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Restart
                </Button>
                <Badge variant={isCapturing ? "default" : "secondary"} className="ml-2">
                  {isCapturing ? "Capturing" : "Stopped"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <FilterBar
            onFilterChange={handleFilterChange}
            activeFilters={filterRules}
            onRemoveFilter={handleRemoveFilter}
            onClearFilters={handleClearFilters}
          />

          {/* Main Content - Three Panel Layout */}
          <div className="flex-1 p-4 grid grid-rows-2 grid-cols-2 gap-4 h-[calc(100vh-200px)]">
            {/* Packet List - Top spanning both columns */}
            <div className="col-span-2">
              <PacketList
                packets={filteredPackets}
                selectedPacket={selectedPacket}
                onPacketSelect={setSelectedPacket}
              />
            </div>

            {/* Packet Details - Bottom Left */}
            <div>
              <PacketDetails
                packet={selectedPacket}
                onFieldSelect={handleFieldSelect}
              />
            </div>

            {/* Hex Dump - Bottom Right */}
            <div>
              <HexDump
                packet={selectedPacket}
                selectedField={selectedField}
              />
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-muted border-t border-border px-4 py-2 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>
                Showing {filteredPackets.length} of {packets.length} packets
                {filterRules.length > 0 && ` (${filterRules.length} filter${filterRules.length > 1 ? 's' : ''} active)`}
              </span>
              <span>
                {selectedPacket ? `Selected: Packet #${selectedPacket.id}` : 'No packet selected'}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};