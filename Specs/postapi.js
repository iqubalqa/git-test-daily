import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';


export const options = {
    vus: 1,
    duration: '10s',
}

export default function () {

    const url = 'https://test-workflowmanager-api.azurewebsites.net/api/actors';


    // Get token from environment variable
    const token = __ENV.token;


    const params = {
        Headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,      // Bearer token added
        },
    };

    const payload = JSON.stringify({

        firstName: 'load',
        lastName: 'test',
        externalUserId: '4536hdfgshdfgs',
    })

    const res = http.post(url, payload, params, token);
    check (res, {
        'is Status 200' :  (r) => r.satus === 200,})



}
