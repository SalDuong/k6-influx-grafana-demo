# Use an official Go runtime as a parent image
FROM golang:latest

# Set the current working directory inside the container
WORKDIR /app

# Install k6
RUN apt-get update && apt-get install -y ca-certificates
RUN apt-get install -y curl
RUN curl -fsSL https://k6.io/install.sh | sh

# Install xk6 and InfluxDB output extension
RUN go install github.com/grafana/xk6/cmd/xk6@latest
RUN xk6 build --with github.com/grafana/xk6-output-influxdb

# Set the PATH environment variable
ENV PATH="/app:${PATH}"

# Run a default command to test
CMD ["k6", "--version"]
