#include <iostream>
#include <pcap.h>

void packetHandler(unsigned char* user, const struct pcap_pkthdr* pkthdr, const unsigned char* packet) {
    // Process each packet here
    std::cout << "Packet captured. Length: " << pkthdr->len << std::endl;
}

int main(int argc, char* argv[]) {
    if (argc != 2) {
        std::cerr << "Usage: " << argv[0] << " <pcap_file>" << std::endl;
        return 1;
    }

    const char* pcapFile = argv[1];
    char errbuf[PCAP_ERRBUF_SIZE];

    pcap_t* handle = pcap_open_offline(pcapFile, errbuf);

    if (handle == nullptr) {
        std::cerr << "Error opening pcap file: " << errbuf << std::endl;
        return 1;
    }

    // Set a callback function to handle each packet
    pcap_loop(handle, 0, packetHandler, nullptr);

    // Close the pcap handle
    pcap_close(handle);

    return 0;
}
