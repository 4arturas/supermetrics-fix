import moment from "moment";
import {ToString} from "../print";
import {GroupByObj, Statistics} from "./statistics";
import {Post} from "../post";

export class AverageNumberOfPostsPerUserPerMonth extends ToString implements GroupByObj {

    categorical: string;
    numerical: number;

    constructor(from_id: string, averagePerMonth: number) {
        super();
        this.categorical = from_id;
        this.numerical = averagePerMonth;
    }

    toString() {
        return `{ from_id: "${this.categorical}", averagePerMonth: ${this.numerical} }`;
    }
}

export class AverageNumberOfPostsPerUserPerMonthImpl extends Statistics {
    group(): Array<GroupByObj> {

        const postsPerUser = this.posts.reduce((acc: Record<string, Array<string>>, post: Post) => {
            const key = post.from_id;
            if (!acc[key])
                acc[key] = [];

            acc[key].push(post.created_time);

            return acc;
        }, {});

        const postsPerUserPerMonth = Object.keys(postsPerUser).map(from_id => {
            return {
                from_id: from_id,
                postsPerMonth: postsPerUser[from_id].reduce((acc: Record<string, number>, created_time: string) => {
                    const month = moment(created_time).format('YYYY-MM');
                    if (!acc[month])
                        acc[month] = 0;
                    acc[month]++;
                    return acc;
                }, {})
            };
        });

        function avg(posts: Array<number>) {
            if (posts.length === 0)
                return 0;
            return posts.reduce((previous: number, current: number) => previous + current, 0) / posts.length;
        }

        return postsPerUserPerMonth.map((e) => {
            return new AverageNumberOfPostsPerUserPerMonth(e.from_id, avg(Object.keys(e.postsPerMonth).map(month => {
                return e.postsPerMonth[month]
            })));
        });
    }
}