import assert from "assert";
import {Post} from "../../../src/post";
import {
    AverageCharLengthOfPostsPerMonth,
    AverageCharLengthOfPostsPerMonthImpl
} from "../../../src/statistics/averageCharactersLengthOfPostsPerMonth";

const {Given, When, Then} = require("@cucumber/cucumber");

function createPost(id:string, from_name:string, from_id:string, message:string, type:string, created_time:string): Post {
    return {"id":`${id}`,"from_name":`${from_name}`,"from_id":`${from_id}`,"message":`${message}`,"type":`${type}`,"created_time":`${created_time}`};
}

Given(/^Average character length of posts per month$/, async function () {

    const posts:Array<Post> = [
        createPost( "id", "from_name", "from_id", "m", "type", "2022-01-01T00:00:00+00:00"),
        createPost( "id", "from_name", "from_id", "mm", "type", "2022-02-01T00:00:00+00:00"),
        createPost( "id", "from_name", "from_id", "mm", "type", "2022-02-02T00:00:00+00:00"),
        createPost( "id", "from_name", "from_id", "mm", "type", "2022-02-03T00:00:00+00:00"),
        createPost( "id", "from_name", "from_id", "mm", "type", "2022-02-04T00:00:00+00:00"),
        createPost( "id", "from_name", "from_id", "mm", "type", "2022-02-05T00:00:00+00:00"),
        createPost( "id", "from_name", "from_id", "mmm", "type", "2022-03-01T00:00:00+00:00")
    ];

    const averageCharLengthOfPostsPerMonth: Array<AverageCharLengthOfPostsPerMonth>  = new AverageCharLengthOfPostsPerMonthImpl(posts).group();

    assert( averageCharLengthOfPostsPerMonth.length === 3, "This test must return three records" );
    assert( averageCharLengthOfPostsPerMonth[0].numerical === 1 );
    assert( averageCharLengthOfPostsPerMonth[0].categorical === '2022-01' );
    assert( averageCharLengthOfPostsPerMonth[1].numerical === 2 );
    assert( averageCharLengthOfPostsPerMonth[1].categorical === '2022-02' );
    assert( averageCharLengthOfPostsPerMonth[2].numerical === 3 );
    assert( averageCharLengthOfPostsPerMonth[2].categorical === '2022-03' );
});