import moment from "moment";
import {Post} from "../post";

export class AverageCharLengthOfPostsPerMonth {
    month: string;
    averageCharacterLength: number;

    constructor(month: string, averageCharacterLength: number) {
        this.month = month;
        this.averageCharacterLength = averageCharacterLength;
    }

    toString() {
        return `{ month: "${this.month}", averageCharacterLength: ${this.averageCharacterLength} }`;
    }
}

export function averageCharactersLengthOfPostsPerMonth( posts : Array<Post> ) : Array<AverageCharLengthOfPostsPerMonth>
{
    const totalCharactersLengthPerMonth = posts.reduce( (acc : Record<string, Array<number>>, post : Post) => {
        const month: string = moment(post.created_time).format('YYYY-MM');
        if (!acc[month])
            acc[month] = [];
        acc[month].push(post.message.length);
        return acc;
    }, {} );

    return Object.keys( totalCharactersLengthPerMonth )
        .map( ( month ) => {
            return new AverageCharLengthOfPostsPerMonth(month, totalCharactersLengthPerMonth[month].reduce( ( previous : number, current : number ) => previous + current , 0 ) / totalCharactersLengthPerMonth[month].length );
        } );
}