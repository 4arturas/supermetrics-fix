import assert from "assert";
import {Post} from "../../../src/post";
import {
    AverageCharLengthOfPostsPerMonth,
    AverageCharLengthOfPostsPerMonthImpl
} from "../../../src/statistics/averageCharactersLengthOfPostsPerMonth";
import {
    LongestPostByCharacterLengthPerMonth,
    LongestPostByCharacterLengthPerMonthImpl
} from "../../../src/statistics/longestPostByCharacterLengthPerMonth";
import {Print, PrintConsole} from "../../../src/print";

const {Given, When, Then} = require("@cucumber/cucumber");

function createPost(id:string, from_name:string, from_id:string, message:string, type:string, created_time:string): Post {
    return {"id":`${id}`,"from_name":`${from_name}`,"from_id":`${from_id}`,"message":`${message}`,"type":`${type}`,"created_time":`${created_time}`};
}

Given(/^Average character length of posts per month$/, async function () {

    const posts:Array<Post> = [
        createPost( "id", "from_name", "from_id", "", "type", "2022-01-01T00:00:00+00:00"),

        createPost( "id", "from_name", "from_id", "1", "type", "2022-02-01T00:00:00+00:00"),

        createPost( "id", "from_name", "from_id", "22", "type", "2022-03-01T00:00:00+00:00"),
        createPost( "id", "from_name", "from_id", "22", "type", "2022-03-02T00:00:00+00:00"),
        createPost( "id", "from_name", "from_id", "22", "type", "2022-03-03T00:00:00+00:00"),
        createPost( "id", "from_name", "from_id", "22", "type", "2022-03-04T00:00:00+00:00"),
        createPost( "id", "from_name", "from_id", "22", "type", "2022-03-05T00:00:00+00:00"),

        createPost( "id", "from_name", "from_id", "333", "type", "2022-04-01T00:00:00+00:00")
    ];

    const averageCharLengthOfPostsPerMonth: Array<AverageCharLengthOfPostsPerMonth>  = new AverageCharLengthOfPostsPerMonthImpl(posts).group();

    assert( averageCharLengthOfPostsPerMonth.length === 4, "This test must return four records" );

    assert( averageCharLengthOfPostsPerMonth[0].numerical === 0 );
    assert( averageCharLengthOfPostsPerMonth[0].categorical === '2022-01' );

    assert( averageCharLengthOfPostsPerMonth[1].numerical === 1 );
    assert( averageCharLengthOfPostsPerMonth[1].categorical === '2022-02' );

    assert( averageCharLengthOfPostsPerMonth[2].numerical === 2 );
    assert( averageCharLengthOfPostsPerMonth[2].categorical === '2022-03' );

    assert( averageCharLengthOfPostsPerMonth[3].numerical === 3 );
    assert( averageCharLengthOfPostsPerMonth[3].categorical === '2022-04' );
});

Given(/^Longest post by character length per month$/, async function () {
    const posts:Array<Post> = [
        createPost( "id", "from_name", "from_id", "", "type", "2022-01-01T00:00:00+00:00"),
        createPost( "id", "from_name", "from_id", "", "type", "2022-01-02T00:00:00+00:00"),

        createPost( "id", "from_name", "from_id", "1", "type", "2022-02-01T00:00:00+00:00"),
        createPost( "id", "from_name", "from_id", "22", "type", "2022-02-01T00:00:00+00:00"),

        createPost( "id", "from_name", "from_id", "0", "type", "2022-03-01T00:00:00+00:00"),
        createPost( "id", "from_name", "from_id", "1", "type", "2022-03-02T00:00:00+00:00"),
        createPost( "id", "from_name", "from_id", "22", "type", "2022-03-03T00:00:00+00:00"),
        createPost( "id", "from_name", "from_id", "333", "type", "2022-03-03T00:00:00+00:00"),


        createPost( "id", "from_name", "from_id", "4444", "type", "2022-04-01T00:00:00+00:00")
    ];

    const longestPostByCharLenPerMonth : Array<LongestPostByCharacterLengthPerMonth> = new LongestPostByCharacterLengthPerMonthImpl(posts).group();

    assert( longestPostByCharLenPerMonth.length === 4, "This test must return four records" );

    assert( longestPostByCharLenPerMonth[0].numerical === 0 );
    assert( longestPostByCharLenPerMonth[0].categorical === '2022-01' );

    assert( longestPostByCharLenPerMonth[1].numerical === 2 );
    assert( longestPostByCharLenPerMonth[1].categorical === '2022-02' );

    assert( longestPostByCharLenPerMonth[2].numerical === 3 );
    assert( longestPostByCharLenPerMonth[2].categorical === '2022-03' );

    assert( longestPostByCharLenPerMonth[3].numerical === 4 );
    assert( longestPostByCharLenPerMonth[3].categorical === '2022-04' );
});