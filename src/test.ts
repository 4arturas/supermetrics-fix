import * as path from "path";
import * as fs from "fs";
import {Post} from "./post";
import {
    averageCharactersLengthOfPostsPerMonth,
    AverageCharLengthOfPostsPerMonth
} from "./statistics/averageCharactersLengthOfPostsPerMonth";

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
    const averageCharLengthOfPostsPerMonth: Array<AverageCharLengthOfPostsPerMonth>  = averageCharactersLengthOfPostsPerMonth( posts );
    averageCharLengthOfPostsPerMonth.forEach( a => console.log( a.toString() ) );
}
test();