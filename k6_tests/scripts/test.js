import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // 10 virtual users
  duration: '30s', // run for 30 seconds
};

export default function () {
  // Test a simple GET request
  const response = http.get('https://httpbin.org/get');
  
  // Check if the response is successful
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  
  sleep(1); // wait 1 second between iterations
}