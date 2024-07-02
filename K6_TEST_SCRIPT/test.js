import http from "k6/http";
import { check } from "k6";

export let options = {
  stages: [
    { duration: '60s', target: 10 },
    { duration: '60s', target: 25 },
    { duration: '60s', target: 10 },
    { duration: '60s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // Monitor failed requests
    http_req_duration: ['p(90)<2000'], // Monitor 90th percentile response time < 2s
    // Add your custom metric thresholds here (optional)
  },
};

export default function () {
  let response = http.get("https://reqres.in/api/users?page=2");

  // Check response time using thresholds (no in-function check)

  let data;
  try {
    data = JSON.parse(response.body);

    // Additional checks on parsed JSON data if needed
    check(data, {
      "response is a JSON object": (obj) => obj !== null && typeof obj === "object",
    });
    console.log("Data object:", data);
  } catch (e) {
    console.error("Failed to parse JSON:", e);
    return; // Exit the function if parsing fails
  }
}
