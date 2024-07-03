// Creator: WebInspector 537.36
import { sleep, group, check } from 'k6'
import http from 'k6/http'
import { auth } from '/Users/salduong/Desktop/kdm/v3-playwright/tests/K6/Nham24Web/cookie_and_token/Nham24WebCookies_and_tokens.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  vus: 3, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
  duration: "1m", // This can be shorter or just a few iterations
}

export default function main() {
  let response

  group(
    'page_4 - https://nham24-com-git-dev-go24.vercel.app/food?s_type=item&search=coffee',
    function () {
      response = http.get(
        'https://godev.nham24.com/api/v1/store/item/1?page=4&filter[name]=coffee&latitude=11.569577&longitude=104.9206905',
        {
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'en',
            Authorization: auth,
            Connection: 'keep-alive',
            Host: 'godev.nham24.com',
            Origin: 'https://nham24-com-git-dev-go24.vercel.app',
            Referer: 'https://nham24-com-git-dev-go24.vercel.app/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-GPC': '1',
            'User-Agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
            channel: 'web',
            'sec-ch-ua': '"Brave";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'x-client-id': 'nham24web',
          },
        }
      )
    }
  )
  let data = null;
  try {
    data = JSON.parse(response.body);
  } catch (e) {
    console.error("Failed to parse JSON:", e);
    return;
  }
  
  check(data, {
    "response is a JSON object": (obj) =>
      obj !== null && typeof obj === "object",
  });
  
  // Pretty-print the JSON object
  console.log("Data object:", JSON.stringify(data, null, 2));
  check(response, {
    "is status 200": (r) => r.status === 200,
    "Request response time < 2s": (r) => r.timings.duration < 2000,
    "Server response time should be < 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1)
}
export function handleSummary(data) {
    return {
      "./tests/k6/Report/smoke/Nham24WebSearchStoreSmokeTesting.html":
        htmlReport(data),
    };
}