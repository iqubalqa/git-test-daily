import { htmlReport } from "./lib/k6-reporter.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import http from 'k6/http';
import { check, sleep } from 'k6';

const users = new SharedArray('users', function () {
  return papaparse.parse(open('./csvdata.csv'), {
    header: true,
    skipEmptyLines: true,
  }).data;
});

export const options = {
  vus: 10,
  duration: '30s',
  // ✅ Fixed: was options.ext.loadimpact
  cloud: {
    projectID: 6543118,   // ✅ Verify this matches app.k6.io
    name: 'Login Test',   // Optional: label shown in cloud dashboard
  },
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed:   ['rate<0.01'],
  },
};

export default function () {
  const user = users[__VU % users.length];

  const res = http.post('https://practicetestautomation.com/practice-test-login/', {
    username: user.username,
    password: user.password,
  });

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response correct for user type': (r) => {
      if (user.expected === 'success') return r.body.includes('Logged In Successfully');
      if (user.expected === 'fail')    return r.body.includes('Your username is invalid');
      return false;
    },
  });

  sleep(1);
}

export function handleSummary(data) {
  return {
    "report.html": htmlReport(data),                          // ✅ Local HTML report
    stdout: textSummary(data, { indent: " ", enableColors: true }), // ✅ Terminal output
  };
}