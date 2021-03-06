import dotenv from 'dotenv';
import path from 'path';
import {
  AverageCharLengthOfPostsPerMonth,
  AverageCharLengthOfPostsPerMonthImpl
} from './statistics/averageCharactersLengthOfPostsPerMonth';
import { Print, PrintConsole } from './print';
import {
  LongestPostByCharacterLengthPerMonth,
  LongestPostByCharacterLengthPerMonthImpl
} from './statistics/longestPostByCharacterLengthPerMonth';
import {
  TotalPostsSplitByWeekNumber,
  TotalPostsSplitByWeekNumberImpl
} from './statistics/totalPostsSplitByWeekNumber';
import {
  AverageNumberOfPostsPerUserPerMonth,
  AverageNumberOfPostsPerUserPerMonthImpl
} from './statistics/averageNumberOfPostsPerUserPerMonth';
import { SupermetricsAPI } from './supermetricsAPI';
import { Post } from './post';
import {Statistics} from "./statistics/statistics";

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const client_id = `${process.env.client_id}`;
const email = `${process.env.email}`;
const name = `${process.env.name}`;
const url = `${process.env.url}`;

class Task {
  async execute() {
    const api: SupermetricsAPI = new SupermetricsAPI(
      url,
      client_id,
      email,
      name
    );
    const status = await api.connectToSupermetricsAPI();
    if (status !== 200) {
      console.error('Can not connect to api! Please try one more time.');
      return;
    }

    console.log('Give me one second please');

    const pages = 10;
    const posts: Array<Post> = new Array<Post>();
    for (let page = 1; page <= pages; page++) {
      const postsPage: Array<Post> = await api.getDataFromSupermetricsAPI(page);
      posts.push(...postsPage);
    }

    // TASK
    // Show stats on the following:

    // a. - Average character length of posts per month
    console.log('##############################################');
    console.log('Average character length of posts per month');
    const statAvgCharLengthOfPostsPerMonth: Statistics = new AverageCharLengthOfPostsPerMonthImpl(posts);
    const avgCharLengthOfPostsPerMonth: Array<AverageCharLengthOfPostsPerMonth> = statAvgCharLengthOfPostsPerMonth.group();
    const printAvgCharLengthOfPostsPerMonth: Print = new PrintConsole(avgCharLengthOfPostsPerMonth);
    printAvgCharLengthOfPostsPerMonth.print();

    // b. - Longest post by character length per month
    console.log('##############################################');
    console.log('Longest post by character length per month');
    const statLongestPostByCharLenPerMonth: Statistics = new LongestPostByCharacterLengthPerMonthImpl(posts);
    const longestPostByCharLenPerMonth: Array<LongestPostByCharacterLengthPerMonth> = statLongestPostByCharLenPerMonth.group();
    const printLongestPostByCharacterLengthPerMonth: Print = new PrintConsole(longestPostByCharLenPerMonth);
    printLongestPostByCharacterLengthPerMonth.print();

    // c. - Total posts split by week number
    console.log('##############################################');
    console.log('Total posts split by week number');
    const statTotalPostsSplitByWeekNr: Statistics = new TotalPostsSplitByWeekNumberImpl(posts);
    const totalPostsSplitByWeekNr: Array<TotalPostsSplitByWeekNumber> = statTotalPostsSplitByWeekNr.group();
    const printTotalPostsSplitByWeekNumber: Print = new PrintConsole(totalPostsSplitByWeekNr);
    printTotalPostsSplitByWeekNumber.print();

    // d. - Average number of posts per user per month
    console.log('##############################################');
    console.log('Average number of posts per user per month');
    const statAvgNrOfPostsPerUserPerMonth: Statistics = new AverageNumberOfPostsPerUserPerMonthImpl(posts);
    const avgNrOfPostsPerUserPerMonth: Array<AverageNumberOfPostsPerUserPerMonth> = statAvgNrOfPostsPerUserPerMonth.group();
    const printAverageNumberOfPostsPerUserPerMonth: Print = new PrintConsole(avgNrOfPostsPerUserPerMonth);
    printAverageNumberOfPostsPerUserPerMonth.print();
  }
}
new Task().execute();
