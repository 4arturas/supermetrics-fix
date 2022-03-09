import moment from "moment";
import {ToString} from "../print";
import {GroupByObj, Statistics} from "./statistics";
import {Post} from "../post";

export class LongestPostByCharacterLengthPerMonth extends ToString implements GroupByObj {
    categorical: string;
    numerical: number;

    constructor(month: string, longestMessage: number) {
        super();
        this.categorical = month;
        this.numerical = longestMessage;
    }

    toString() {
        return `{ month: "${this.categorical}", longestMessage: ${this.numerical} }`;
    }
}

export class LongestPostByCharacterLengthPerMonthImpl extends Statistics {
    group(): Array<GroupByObj> {
        const longestMessageLengthPerMonth = this.posts.reduce( (acc: Record<string, number>, post: Post) => {
            const month = moment(post.created_time).format('YYYY-MM');
            if (!acc[month])
                acc[month] = -1;

            if ( post.message.length > acc[month] )
                acc[month] = post.message.length;

            return acc;
        }, {} );
        return Object.keys(longestMessageLengthPerMonth)
            .map( month => {
                return new LongestPostByCharacterLengthPerMonth(month, longestMessageLengthPerMonth[month] );
            } );
    }
}