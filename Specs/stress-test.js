import http from 'k6/http';

export const options = {
    stages: [
        {duration: '1m', target: 100}, // Ramp up to 100 users over 1 minute
        {duration: '3m', target: 100}, // Stay at 100 users for 3 minutes
        {duration: '1m', target: 0}   // Ramp down to 0 users over 1 minute
    ]}

    export default function () {
    const url = 'https://test.k6.io';

    }
    