import http from 'k6/http';
import { check } from 'k6';

const username = 'andrii';
const password = 'password';

export let options = {
	insecureSkipTLSVerify: true,
	noConnectionReuse: false,
	vus: 10,
	duration: '10s',
};

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
  const res = http.post('https://webapp-gomongo.azurewebsites.net/auth/sign-in', JSON.stringify(body), options);

  return { token: res.json().token };
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
	
	const res = http.get('https://webapp-gomongo.azurewebsites.net/api/bookmarks', options);
	check(res, {
		'is status 200': (r) => r.status === 200,
		'verify response body text': (r) => r.body.includes('bookmarks'),
		});
	//console.log('RESULT', JSON.stringify(res.json().bookmarks));
};
