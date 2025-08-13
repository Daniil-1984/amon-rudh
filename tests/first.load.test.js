import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,          // количество виртуальных пользователей
  duration: '30s',  // время теста
};

export default function () {
  const url = 'https://api.stage-winpot.mx/YOUR_ENDPOINT'; // <-- тут твой реальный путь

  const params = {
    headers: {
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7',
      'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....', // токен сюда
      'cache-control': 'no-cache',
      'origin': 'https://stage-winpot.mx',
      'pragma': 'no-cache',
      'priority': 'u=1, i',
      'referer': 'https://stage-winpot.mx/',
      'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
      'x-site-id': 'f15c56e2-baf1-4a31-ba50-4f95eaff2c18',
    },
    cookies: {
      // куки из твоего curl (лучше убрать лишние, если они не нужны)
      'host': 'api.stage-winpot.mx',
      '_fbp': 'fb.1.1751533532620.875172822535104773',
      '_ga': 'GA1.1.595417052.1751536079',
      '_gcl_au': '1.1.1108295030.1751536079',
      '_hjSessionUser_2977749': 'eyJpZCI6ImJkOTJhNjE4LWE1OTQtNTRiYi04NzQ0LWQ1NjExMDc1YzAyYiIsImNyZWF0ZWQiOjE3NTE1MzYwODM4MDgsImV4aXN0aW5nIjp0cnVlfQ==',
      '_hjSession_2977749': 'eyJpZCI6ImI2Y2VjZjZlLWRmMTUtNDk0MC05Y2I1LWM4OGMwZjUwNGM4OCIsImMiOjE3NTUwMjQ5MzM3MzAsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MX0=',
      'NEXT_LOCALE': 'es',
      'tokenExpirationDate': '1757616953663',
      'AuthorizationToken': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....',
      'RefreshToken': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....',
      'product': '1',
      'userHasAccount': 'true',
      'fullUrl': 'https://stage-winpot.mx/sport',
      'sb': '7531e708-9660-46ea-bcf0-e0563250092a',
      '_ga_7J191KN4G1': 'GS2.1.s1755024932$o31$g1$t1755025188$j60$l0$h0',
    },
  };

  const res = http.get(url, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
