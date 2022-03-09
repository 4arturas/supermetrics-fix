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

}
test();