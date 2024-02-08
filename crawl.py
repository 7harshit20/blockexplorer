import socket
import time
import random
import struct
import hashlib
import binascii

curr_node = ["154.21.184.201:8333"]
visited_node = set()

def conv(arr):
    res = ""
    for i in range(0, len(arr), 2):
        res = arr[i]+arr[i+1]+res
    return res

def extract_add(payload):
    time = payload[:8]
    service = payload[8:24]
    address = payload[24:56]
    port = int(payload[56:60], 16)
    res = ""
    if(address[:24]=="00000000000000000000ffff"):
        for i in range(24,32,2):
            res = res + str(int(address[i:i+2], 16)) + "."
        res = res[:-1]
        res = res + ":" + str(port)
        return res
    return None

def decode_addr(payload):
    payload = payload[48:]
    count = int(conv(payload[:2]), 16)
    start = 2
    if(payload[:2]=="fd"):
        count = int(conv(payload[2:6]), 16)
        start = 6
    # addr_lst= []
    for i in range(start, len(payload), 60):
        curr = extract_add(payload[i:i+60])
        if(curr!=None):
            if(curr not in visited_node):
                curr_node.append(curr)
                visited_node.add(curr)
            # addr_lst.append(curr)
    
    # fl = open('list.txt', 'a')
    # for add in addr_lst:
    #     fl.write(add + '\n')
    # fl.close()
    return

def create_sub_version():
    sub_version = "/Satoshi:0.7.2/"
    return b'\x0F' + sub_version.encode()

# Binary encode the network addresses
def create_network_address(ip_address, port):
    network_address = struct.pack('>8s16sH', b'\x01', 
        bytearray.fromhex("00000000000000000000ffff") + socket.inet_aton(ip_address), port)
    return(network_address)

# Create the TCP request object
def create_message(magic, command, payload):
    checksum = hashlib.sha256(hashlib.sha256(payload).digest()).digest()[0:4]
    return(struct.pack('L12sL4s', magic, command.encode(), len(payload), checksum) + payload)

# Create the "version" request payload
def create_payload_version(peer_ip_address):
    version = 60002
    services = 1
    timestamp = int(time.time())
    addr_local = create_network_address("127.0.0.1", 8333)
    addr_peer = create_network_address(peer_ip_address, 8333)
    nonce = random.getrandbits(64)
    start_height = 0
    payload = struct.pack('<LQQ26s26sQ16sL', version, services, timestamp, addr_peer,
                          addr_local, nonce, create_sub_version(), start_height)
    # print('version payload', payload)
    return(payload)

# Create the "verack" request message
def create_message_verack():
    return bytearray.fromhex("f9beb4d976657261636b000000000000000000005df6e0e2")

# Create the "getaddr" request message
def create_message_getaddr(magic, command, payload):
    checksum = hashlib.sha256(hashlib.sha256(payload).digest()).digest()[0:4]
    return(struct.pack('L12sL4s', magic, command.encode(), len(payload), checksum) + payload)

def create_payload_getdata(tx_id):
    count = 1
    type = 1
    hash = bytearray.fromhex(tx_id)
    payload = struct.pack('<bb32s', count, type, hash)
    return(payload)

# Print request/response data
def print_response(command, request_data, response_data):
    print("")
    print("Command: " + command)
    print("Request:")
    print(binascii.hexlify(request_data))
    print("Response:")
    print(binascii.hexlify(response_data))

if __name__ == '__main__':
    # Set constants
    magic_value = 0xd9b4bef9
    buffer_size = 1024
    f = open('list.txt', 'w')
   

    while(len(curr_node)>0):
        data = curr_node[-1]
        curr_node.pop()
        visited_node.add(data)
        pos = data.find(':')
        peer_ip_address = data[:pos]
        peer_tcp_port = int(data[pos+1:])
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        timeout_in_seconds = 1
        # Create Request Objects
        version_payload = create_payload_version(peer_ip_address)
        version_message = create_message(magic_value, 'version', version_payload)
        verack_message = create_message_verack()
        getaddr_message = create_message_getaddr(magic_value, 'getaddr', b'')

        # Establish TCP Connection
        try:
            s.settimeout(timeout_in_seconds)
            s.connect((peer_ip_address, peer_tcp_port))
            s.send(version_message)
            response_data = s.recv(buffer_size)
            s.send(verack_message)
            s.send(getaddr_message)
            # print(data)
            fin_res = ""
            addrFound = 0
            req_length = -1
            while(addrFound == 0 or req_length>len(fin_res)):
                response_data = s.recv(buffer_size)
                response_data = binascii.hexlify(response_data).decode()
                if(addrFound == 1):
                    fin_res += response_data
                else:
                    found = response_data.find("f9beb4d9616464720000000000000000")
                    if(found != -1):
                        payload_length = int(conv(response_data[found+32:found+40]), 16)
                        req_length = payload_length*2 + 48
                        addrFound = 1
                        fin_res += response_data[found:]
            
            fin_res = fin_res[:req_length]
            decode_addr(fin_res)
            f.write(data+','+str(int(time.time()))+ '\n')

        except socket.timeout:
            # Handle the case where the connection attempt times out
            pass
            # print("Connection attempt timed out. Terminate the request.")

        except Exception as e:
            # Handle other exceptions
            print(f"Error: {e}")

        # finally:
            # Close the socket
            # s.close()
        s.close()
    f.close()