#!/usr/bin/env python3

import os
import socket
import json
import subprocess
import argparse
from urllib.parse import urlencode
from urllib.request import Request, urlopen

def get_cpu_temp():
    ''' Gets temp information of the CPU (currently supports only Raspberry PI) '''
    try:
        # In RaspberryPi use custom endpoint to fetch temp data
        raspTemp = subprocess.Popen(["/opt/vc/bin/vcgencmd", "measure_temp"], stdout=subprocess.PIPE)
        tempData = raspTemp.communicate()[0]
        if raspTemp.returncode == 0:
            # in RaspberryPi temp with measure_temp is returned in a format temp=46.5'C
            return float(tempData.split('=')[1].split("'")[0])
        else:
            return None
    except:
        return None

def get_mem_json():
    ''' Collect memory and swap usage info from the Unix system '''
    free = subprocess.Popen(["free"], stdout=subprocess.PIPE)
    grep = subprocess.Popen(["grep", "-E", "Mem|Swap"], stdin=free.stdout, stdout=subprocess.PIPE)
    output = grep.communicate()[0].decode("utf-8")
    lines = output.split('\n')

    memList = list(map(str.strip, lines[0].split()))

    # Default swap data
    swapTotal = 0
    swapUsed = 0

    if len(lines) > 1:
        swapList = list(map(str.strip, lines[1].split()))
        swapTotal = int(swapList[1])
        swapUsed = int(swapList[2])

    return {
        'total': int(memList[1]),
        'used': int(memList[2]),
        'swap': {
            'total': swapTotal,
            'used': swapUsed
        }
    }

def get_cpu_json():
    ''' Collect CPU load and temp information from the Unix system '''
    top = subprocess.Popen(["top", "-bn1"], stdout=subprocess.PIPE)
    grep = subprocess.Popen(["grep", "-E", "Cpu"], stdin=top.stdout, stdout=subprocess.PIPE)

    parts = grep.communicate()[0].decode("utf-8").split()
    try:
        index = parts.index("id,")
        load = float(parts[index - 1].replace(',', '.'))
        load = (100 - load) / 100
    except:
        load = None

    return {
        'temp': get_cpu_temp(),
        'load': load
    }

def get_storage_json():
    ''' Collect storage information '''
    stats = os.statvfs("/")
    total = stats.f_bsize * stats.f_blocks
    return {
        'total': total,
        'used': total - (stats.f_bsize * stats.f_bavail)
    }

def get_uptime():
    ''' Returns system uptime in ms '''
    f = open("/proc/uptime", "r")
    c = f.read()
    # First word in file is a uptime in seconds
    s = c.split(" ")[0]
    return int(float(s) * 1000)

# Arguments
parser = argparse.ArgumentParser()
parser.add_argument("-u", "--url", help="Send collected data to url", default="http://localhost/actions")
args = parser.parse_args()

url = args.url
post_data = {
    "action": "system-monitor",
    "data": {
        'name': socket.gethostname(),
        'monitor': {
            'cpu': get_cpu_json(),
            'memory': get_mem_json(),
            'storage': get_storage_json(),
            'uptime': get_uptime()
        }

    }
}

# Create post request to the url passed as argument

print("Sending HTTP request to " + url)

request = Request(url, urlencode(post_data).encode())
try:
    response = urlopen(request).read().decode()
    print("HTTP request succeed: " + response)
except:
    print("HTTP request to " + url + " failed")