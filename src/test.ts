import * as path from "path";
import * as fs from "fs";
import {Post} from "./post";
import {
    AverageCharLengthOfPostsPerMonth, AverageCharLengthOfPostsPerMonthImpl
} from "./statistics/averageCharactersLengthOfPostsPerMonth";
import {Print, PrintConsole} from "./print";
import {
    LongestPostByCharacterLengthPerMonth,
    LongestPostByCharacterLengthPerMonthImpl
} from "./statistics/longestPostByCharacterLengthPerMonth";
import {TotalPostsSplitByWeekNumber, TotalPostsSplitByWeekNumberImpl} from "./statistics/totalPostsSplitByWeekNumber";
import {
    AverageNumberOfPostsPerUserPerMonth,
    AverageNumberOfPostsPerUserPerMonthImpl
} from "./statistics/averageNumberOfPostsPerUserPerMonth";

function readFile(): Array<Post>
{
    const filePath = path.join(__dirname, '/') + 'supermetrics.json';
    const obj = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const posts:Array<Post> = obj as Array<Post>;
    return posts;
}

async function test()
{
    const posts:Array<Post> = readFile();

    // TASK
    // Show stats on the following:

    // a. - Average character length of posts per month
    console.log('#########################################################################');
    console.log( 'Average character length of posts per month' );
    const averageCharLengthOfPostsPerMonth: Array<AverageCharLengthOfPostsPerMonth>  = new AverageCharLengthOfPostsPerMonthImpl(posts).group();
    const printAverageCharLengthOfPostsPerMonth:Print = new PrintConsole( averageCharLengthOfPostsPerMonth );
    printAverageCharLengthOfPostsPerMonth.print();

    // b. - Longest post by character length per month
    console.log('#########################################################################');
    console.log( 'Longest post by character length per month' );
    const longestPostByCharLenPerMonth : Array<LongestPostByCharacterLengthPerMonth> = new LongestPostByCharacterLengthPerMonthImpl(posts).group();
    const printLongestPostByCharacterLengthPerMonth:Print = new PrintConsole( longestPostByCharLenPerMonth );
    printLongestPostByCharacterLengthPerMonth.print();

    // c. - Total posts split by week number
    console.log('#########################################################################');
    console.log( 'Total posts split by week number' );
    const totalPostsSplitByWeekNr : Array<TotalPostsSplitByWeekNumber> = new TotalPostsSplitByWeekNumberImpl( posts ).group();
    const printTotalPostsSplitByWeekNumber:Print = new PrintConsole( totalPostsSplitByWeekNr );
    printTotalPostsSplitByWeekNumber.print();

    // d. - Average number of posts per user per month
    console.log('#########################################################################');
    console.log( 'Average number of posts per user per month' );
    const averageNrOfPostsPerUserPerMonth: Array<AverageNumberOfPostsPerUserPerMonth> = new AverageNumberOfPostsPerUserPerMonthImpl( posts ).group();
    const printAverageNumberOfPostsPerUserPerMonth:Print = new PrintConsole( averageNrOfPostsPerUserPerMonth );
    printAverageNumberOfPostsPerUserPerMonth.print();

}
test();