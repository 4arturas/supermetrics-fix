import path from 'path';
import dotenv from 'dotenv';
import { SupermetricsAPI } from '../../../src/supermetricsAPI';
import assert from 'assert';
import { Post } from '../../../src/post';
import { Given, Then, When } from '@cucumber/cucumber';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const client_id = `${process.env.client_id}`;
const email = `${process.env.email}`;
const name = `${process.env.name}`;
const url = `${process.env.url}`;

const api: SupermetricsAPI = new SupermetricsAPI(url, client_id, email, name);

Given(/^Connect API$/, async function () {
  const status = await api.connectToSupermetricsAPI();
  assert(status === 200, 'When connected to API status must be 200');
});

const pages = 10;
const posts1000: Array<Post> = new Array<Post>();
When(/^Fetch data$/, async function () {
  for (let page = 1; page <= pages; page++) {
    const postsPage: Array<Post> = await api.getDataFromSupermetricsAPI(page);
    assert(postsPage !== null, 'API must return data');
    posts1000.push(...postsPage);
  }
});

Then(/^Check if Supermetrics API returns 1000 records$/, function () {
  const mustReturn: number = pages * 100;
  assert(
    posts1000.length === mustReturn,
    `Api must return ${mustReturn} records`
  );
});

Then(/^Data format is consistent$/, function () {
  posts1000.forEach((post)=>{
    assert(post.hasOwnProperty('id'), 'No "id" property');
    assert(post.hasOwnProperty('from_name'), 'No "from_name" property');
    assert(post.hasOwnProperty('from_id'), 'No "from_id" property');
    assert(post.hasOwnProperty('message'), 'No "message" property');
    assert(post.hasOwnProperty('type'), 'No "type" property');
    assert(post.hasOwnProperty('created_time'), 'No "created_time" property');
    assert(!post.hasOwnProperty('fake_property'), 'Has "fake_property" property?');
  });
});
