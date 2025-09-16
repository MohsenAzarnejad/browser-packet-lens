export interface Packet {
  id: number;
  timestamp: string;
  source: string;
  destination: string;
  protocol: string;
  length: number;
  info: string;
  data: string;
  layers: PacketLayer[];
}

export interface PacketLayer {
  name: string;
  summary: string;
  fields: PacketField[];
  rawData?: string;
}

export interface PacketField {
  name: string;
  showName: string;
  value: string;
  size?: number;
  pos?: number;
  type?: string;
  description?: string;
}

export interface FilterRule {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'lt' | 'contains' | 'matches';
  value: string;
}

export type ProtocolType = 'TCP' | 'UDP' | 'HTTP' | 'HTTPS' | 'DNS' | 'ICMP' | 'ARP' | 'UNKNOWN';

export const PROTOCOL_COLORS: Record<ProtocolType, string> = {
  TCP: 'protocol-tcp',
  UDP: 'protocol-udp', 
  HTTP: 'protocol-http',
  HTTPS: 'protocol-https',
  DNS: 'protocol-dns',
  ICMP: 'protocol-icmp',
  ARP: 'protocol-arp',
  UNKNOWN: 'protocol-unknown'
};

export const PROTOCOL_DESCRIPTIONS: Record<ProtocolType, string> = {
  TCP: 'Transmission Control Protocol',
  UDP: 'User Datagram Protocol',
  HTTP: 'Hypertext Transfer Protocol',
  HTTPS: 'HTTP Secure',
  DNS: 'Domain Name System',
  ICMP: 'Internet Control Message Protocol',
  ARP: 'Address Resolution Protocol',
  UNKNOWN: 'Unknown Protocol'
};