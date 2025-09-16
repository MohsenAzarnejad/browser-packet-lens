import { Packet, PacketLayer } from "@/types/packet";

export const mockPackets: Packet[] = [
  {
    id: 1,
    timestamp: "13:24:15.123456",
    source: "192.168.1.100",
    destination: "142.250.191.14",
    protocol: "HTTP",
    length: 1432,
    info: "GET /search?q=wireshark HTTP/1.1",
    data: "474554202f7365617263683f713d77697265736861726b20485454502f312e310d0a486f73743a20676f6f676c652e636f6d0d0a557365722d4167656e743a204d6f7a696c6c612f352e3020285831313b204c696e757820783836283634293b2072763a3130392e3029204765636b6f2f32303130303130312046697265666f782f3130392e300d0a4163636570743a20746578742f68746d6c2c6170706c69636174696f6e2f7868746d6c2b786d6c2c6170706c69636174696f6e2f786d6c3b713d302e392c696d6167652f617669662c696d6167652f776562702c2a2f2a3b713d302e380d0a4163636570742d4c616e67756167653a20656e2d55532c656e3b713d302e350d0a4163636570742d456e636f64696e673a20677a69702c206465666c6174650d0a444e543a20310d0a436f6e6e656374696f6e3a206b6565702d616c6976650d0a557067726164",
    layers: [
      {
        name: "Ethernet II",
        summary: "Src: aa:bb:cc:dd:ee:ff, Dst: 11:22:33:44:55:66",
        fields: [
          { name: "dst", showName: "Destination", value: "11:22:33:44:55:66", size: 6, pos: 0 },
          { name: "src", showName: "Source", value: "aa:bb:cc:dd:ee:ff", size: 6, pos: 6 },
          { name: "type", showName: "Type", value: "IPv4 (0x0800)", size: 2, pos: 12 }
        ]
      },
      {
        name: "Internet Protocol Version 4",
        summary: "Src: 192.168.1.100, Dst: 142.250.191.14",
        fields: [
          { name: "version", showName: "Version", value: "4", size: 1, pos: 14 },
          { name: "hdr_len", showName: "Header Length", value: "20 bytes (5)", size: 1, pos: 14 },
          { name: "dsfield", showName: "Differentiated Services Field", value: "0x00", size: 1, pos: 15 },
          { name: "len", showName: "Total Length", value: "1432", size: 2, pos: 16 },
          { name: "id", showName: "Identification", value: "0x1234", size: 2, pos: 18 },
          { name: "flags", showName: "Flags", value: "0x4000", size: 2, pos: 20 },
          { name: "ttl", showName: "Time to Live", value: "64", size: 1, pos: 22 },
          { name: "proto", showName: "Protocol", value: "TCP (6)", size: 1, pos: 23 },
          { name: "checksum", showName: "Header Checksum", value: "0x5678", size: 2, pos: 24 },
          { name: "src", showName: "Source Address", value: "192.168.1.100", size: 4, pos: 26 },
          { name: "dst", showName: "Destination Address", value: "142.250.191.14", size: 4, pos: 30 }
        ]
      },
      {
        name: "Transmission Control Protocol",
        summary: "Src Port: 54321, Dst Port: 80, Seq: 1, Ack: 1, Len: 1378",
        fields: [
          { name: "srcport", showName: "Source Port", value: "54321", size: 2, pos: 34 },
          { name: "dstport", showName: "Destination Port", value: "80", size: 2, pos: 36 },
          { name: "seq", showName: "Sequence Number", value: "1", size: 4, pos: 38 },
          { name: "ack", showName: "Acknowledgment Number", value: "1", size: 4, pos: 42 },
          { name: "hdr_len", showName: "Header Length", value: "20 bytes (5)", size: 1, pos: 46 },
          { name: "flags", showName: "Flags", value: "0x018 (PSH, ACK)", size: 2, pos: 46 },
          { name: "window_size", showName: "Window Size", value: "65535", size: 2, pos: 48 },
          { name: "checksum", showName: "Checksum", value: "0x9abc", size: 2, pos: 50 },
          { name: "urgent", showName: "Urgent Pointer", value: "0", size: 2, pos: 52 }
        ]
      },
      {
        name: "Hypertext Transfer Protocol",
        summary: "GET /search?q=wireshark HTTP/1.1",
        fields: [
          { name: "request.method", showName: "Request Method", value: "GET" },
          { name: "request.uri", showName: "Request URI", value: "/search?q=wireshark" },
          { name: "request.version", showName: "Request Version", value: "HTTP/1.1" },
          { name: "host", showName: "Host", value: "google.com" },
          { name: "user_agent", showName: "User-Agent", value: "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/109.0" },
          { name: "accept", showName: "Accept", value: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8" }
        ]
      }
    ]
  },
  {
    id: 2,
    timestamp: "13:24:15.125123",
    source: "142.250.191.14",
    destination: "192.168.1.100", 
    protocol: "TCP",
    length: 1500,
    info: "[TCP segment of a reassembled PDU]",
    data: "485454502f312e3120323030204f4b0d0a446174653a204d6f6e2c203032204a616e20323032332031333a32343a31352047544d0d0a5365727665723a206777730d0a4c6173742d4d6f6469666965643a204d6f6e2c203032204a616e20323032332031333a32343a31352047544d0d0a4554616743",
    layers: [
      {
        name: "Ethernet II",
        summary: "Src: 11:22:33:44:55:66, Dst: aa:bb:cc:dd:ee:ff",
        fields: [
          { name: "dst", showName: "Destination", value: "aa:bb:cc:dd:ee:ff", size: 6, pos: 0 },
          { name: "src", showName: "Source", value: "11:22:33:44:55:66", size: 6, pos: 6 }
        ]
      }
    ]
  },
  {
    id: 3,
    timestamp: "13:24:15.200456",
    source: "192.168.1.100", 
    destination: "8.8.8.8",
    protocol: "DNS",
    length: 74,
    info: "Standard query 0x1234 A wireshark.org",
    data: "12340100000100000000000009776972657368617262036f726700000100010000291000000000000000",
    layers: [
      {
        name: "Domain Name System (query)",
        summary: "Standard query 0x1234 A wireshark.org",
        fields: [
          { name: "id", showName: "Transaction ID", value: "0x1234", size: 2 },
          { name: "flags", showName: "Flags", value: "0x0100 (Standard query)", size: 2 },
          { name: "questions", showName: "Questions", value: "1", size: 2 },
          { name: "qry_name", showName: "Name", value: "wireshark.org" },
          { name: "qry_type", showName: "Type", value: "A (Host Address) (1)" },
          { name: "qry_class", showName: "Class", value: "IN (0x0001)" }
        ]
      }
    ]
  },
  {
    id: 4,
    timestamp: "13:24:15.250789",
    source: "192.168.1.100",
    destination: "192.168.1.1", 
    protocol: "ARP",
    length: 42,
    info: "Who has 192.168.1.1? Tell 192.168.1.100",
    data: "000108000604000100112233445500c0a80164000000000000c0a80101",
    layers: [
      {
        name: "Address Resolution Protocol (request)",
        summary: "Who has 192.168.1.1? Tell 192.168.1.100",
        fields: [
          { name: "hw_type", showName: "Hardware type", value: "Ethernet (1)", size: 2 },
          { name: "proto_type", showName: "Protocol type", value: "IPv4 (0x0800)", size: 2 },
          { name: "hw_size", showName: "Hardware size", value: "6", size: 1 },
          { name: "proto_size", showName: "Protocol size", value: "4", size: 1 },
          { name: "opcode", showName: "Opcode", value: "request (1)", size: 2 },
          { name: "src_hw", showName: "Sender MAC address", value: "00:11:22:33:44:55", size: 6 },
          { name: "src_proto", showName: "Sender IP address", value: "192.168.1.100", size: 4 },
          { name: "dst_hw", showName: "Target MAC address", value: "00:00:00:00:00:00", size: 6 },
          { name: "dst_proto", showName: "Target IP address", value: "192.168.1.1", size: 4 }
        ]
      }
    ]
  },
  {
    id: 5,
    timestamp: "13:24:16.123456",
    source: "192.168.1.100",
    destination: "192.168.1.255",
    protocol: "UDP", 
    length: 342,
    info: "Source port: 68  Destination port: 67",
    data: "01010600123456780000000000000000c0a801640000000000000000001122334455660000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000638253633501013d0701001122334455663902024006040a0101010c096d79686f73746e616d653c08444843502d54657374ff",
    layers: [
      {
        name: "User Datagram Protocol",
        summary: "Src Port: 68, Dst Port: 67",
        fields: [
          { name: "srcport", showName: "Source Port", value: "68", size: 2 },
          { name: "dstport", showName: "Destination Port", value: "67", size: 2 },
          { name: "length", showName: "Length", value: "342", size: 2 },
          { name: "checksum", showName: "Checksum", value: "0x1234", size: 2 }
        ]
      }
    ]
  }
];