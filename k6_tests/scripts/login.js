import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 5,
  duration: "30s",
  thresholds: {
    http_req_duration: ["p(95)<2000"],
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  const url = "https://www.winpot.mx/api/login"; // ⚠️ проверь реальный endpoint
  const payload = JSON.stringify({
    username: "wiztestAlvina_Vandervort@gmail.com",
    password: "password",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  // console.log(`STATUS: ${res.status} | BODY: ${res.body}`);

  check(res, {
    "status is 200": (r) => r.status === 200,
  });
// console.log(`STATUS: ${res.status}`);
// console.log(`BODY: ${res.body.substring(0,300)}`);

  sleep(1);
}
