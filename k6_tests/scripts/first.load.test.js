import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    vus: 1,       // amount of virtual users
    duration: '10s', // duration of the test
};

export default function () {
    const url = 'https://api.stage-winpot.mx/games/link/1934?locale=es&country_code=MX&platform=2&c=Slots&p=3';

    const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'ru,en-US;q=0.9,en;q=0.8,es;q=0.7,cs;q=0.6,el;q=0.5',
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsYW5ndWFnZSI6ImVzIiwiZW1haWwiOiJmZGRmZWRkcjZAZ21haWwuY29tIiwicGxheWVySWQiOiI0MGI3M2Y0NC0zNDdhLTRlOGUtOWQ3Zi1lZjIyN2U5NjQ5YzAiLCJwbGF5ZXJPSWQiOiI1MTYzMCIsInNpdGVJZCI6ImYxNWM1NmUyLWJhZjEtNGEzMS1iYTUwLTRmOTVlYWZmMmMxOCIsInNpdGVPSWQiOiIwIiwic2Vzc2lvbklkIjoiNzllZGQ2NDYtZDhiMS00YjNmLWJhNTMtYmZjZDg4MGU0MThhIiwiaWF0IjoxNzU1MDkwMDg4LCJleHAiOjE3NTc2ODIwODh9.i5K5AU2rhavKXZRiXEcV5etyVY03UuDUprnpk01E9uA',
        'origin': 'https://stage-winpot.mx',
        'referer': 'https://stage-winpot.mx/',
        'sec-ch-ua': '"Opera";v="120", "Not-A.Brand";v="8", "Chromium";v="135"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 OPR/120.0.0.0',
        'x-site-id': 'f15c56e2-baf1-4a31-ba50-4f95eaff2c18'
    };

    const res = http.get(url, { headers });

    check(res, {
        'status 200': (r) => r.status === 200,
        'body not empty': (r) => r.body.length > 0,
    });

    sleep(1);
}
