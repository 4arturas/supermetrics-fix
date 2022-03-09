import moment from "moment";
import {Post} from "../post";
import {GroupByObj, Statistics} from "./statistics";
import {ToString} from "../print";


export class AverageCharLengthOfPostsPerMonth extends ToString implements GroupByObj {

    categorical: string;
    numerical: number;

    constructor(month: string, averageCharacterLength: number) {
        super();
        this.categorical = month;
        this.numerical = averageCharacterLength;
    }

    toString() {
        return `{ month: "${this.categorical}", averageCharacterLength: ${this.numerical} }`;
    }
}

export class AverageCharLengthOfPostsPerMonthImpl extends Statistics {
    group(): Array<GroupByObj> {
        const totalCharactersLengthPerMonth = this.posts.reduce((acc: Record<string, Array<number>>, post: Post) => {
            const month: string = moment(post.created_time).format('YYYY-MM');
            if (!acc[month])
                acc[month] = [];
            acc[month].push(post.message.length);
            return acc;
        }, {});

        return Object.keys(totalCharactersLengthPerMonth)
            .map((month) => {
                const averageCharacterLength = totalCharactersLengthPerMonth[month].length === 0 ? 0 : totalCharactersLengthPerMonth[month].reduce((previous: number, current: number) => previous + current, 0) / totalCharactersLengthPerMonth[month].length;
                return new AverageCharLengthOfPostsPerMonth(month, averageCharacterLength);
            });
    }
}