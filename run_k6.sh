#!/bin/bash

# Set environment variables (adjust with your actual values)
export K6_INFLUXDB_ORGANIZATION="QADB"
export K6_INFLUXDB_BUCKET="k6metric"
export K6_INFLUXDB_TOKEN="XTjiXgy_mxfuhhd0adSq5qSPz03vX-pNaZgzqiqq5AqrDPjc_b1suV73MxxGL0EvLBmGBW6kzcb8x27WxTAh8Q=="

# Check if a script file is provided as an argument
if [ -z "$1" ]
then
    echo "Usage: ./run_k6.sh <k6_test_script>"
    exit 1
fi

# Run k6 with specified options and test script
./k6 run -o xk6-influxdb=http://localhost:8086 "k6_test_script/$1"
