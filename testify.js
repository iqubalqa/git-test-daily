import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {

    stages: [
        { duration: '30s', target: 100 },
        { duration: '1m', target: 100 },
        { duration: '30s', target: 0 }  
    ]
}

export default function () {
    let res = http.get('https://test.k6.io');
    check(res, {        'is status 200': (r) => r.status === 200,
    });
    sleep(1);
}   