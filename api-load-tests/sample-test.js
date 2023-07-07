import http from 'k6/http';
import { check } from 'k6';

const username = 'andrii';
const password = 'password';

export let options = {
	insecureSkipTLSVerify: true,
	noConnectionReuse: false,
	vus: 10,
	//duration: '10s',
	stages: [
		{ duration: '5s', target: 1 },
		{ duration: '5s', target: 10 },
		{ duration: '5s', target: 10 },
		{ duration: '5s', target: 20 },
		{ duration: '5s', target: 20 },
		{ duration: '5s', target: 0 },
	],
};

// const APIBASEURL = 'https://webapp-gomongo.azurewebsites.net';
const APIBASEURL = 'http://localhost:81';

export function setup() {
  console.log('Test setup');
  const options = {
  	headers: {
			'Content-Type': 'application/json',
		},
  };
  const body = {
 	'username': username,
	'password': password
  };
  const resCrete = http.post(`${APIBASEURL}/auth/sign-up`, JSON.stringify(body), options);
  const resLogin = http.post(`${APIBASEURL}/auth/sign-in`, JSON.stringify(body), options);

  return { token: resLogin.json().token };
}


export function teardown(data) {
  //console.log('Test done', JSON.stringify(data));
}

export default (data) => {
	const options = {
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
	};
	
	const res = http.get(`${APIBASEURL}/api/bookmarks`, options);
	check(res, {
		'is status 200': (r) => r.status === 200,
		'verify response body text': (r) => r.body.includes('bookmarks'),
		});
	//console.log('RESULT', JSON.stringify(res.json().bookmarks));
};
