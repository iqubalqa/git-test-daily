import http from 'k6/http';
import { check, sleep } from 'k6';



export const options = {

    vus: 10,
    duration: '1s',

}


export default function () {

    http.get('https://k6.io');
    sleep(2);
}
