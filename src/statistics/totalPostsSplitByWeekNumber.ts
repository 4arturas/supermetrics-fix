import moment from 'moment';
import { ToString } from '../print';
import { GroupByObj, Statistics } from './statistics';
import { Post } from '../post';

export class TotalPostsSplitByWeekNumber
  extends ToString
  implements GroupByObj
{
  categorical: string;
  numerical: number;

  constructor(week: string, messagesCount: number) {
    super();
    this.categorical = week;
    this.numerical = messagesCount;
  }

  toString(): string {
    return `{ week: "${this.categorical}", messagesCount: ${this.numerical} }`;
  }
}

export class TotalPostsSplitByWeekNumberImpl extends Statistics {
  group(): Array<GroupByObj> {
    const totalPostsByWeek = this.posts.reduce(
      (acc: Record<string, number>, post: Post) => {
        const date = moment(post.created_time, 'YYYY-MM-DD[T]HH:mm:ss');
        const year = date.year();
        const weekNumber = date.week();
        const keyYearWeekNumber = year + '-' + weekNumber;
        if (!acc[keyYearWeekNumber]) acc[keyYearWeekNumber] = 0;

        acc[keyYearWeekNumber]++;

        return acc;
      },
      {}
    );
    return Object.keys(totalPostsByWeek).map((week) => {
      return new TotalPostsSplitByWeekNumber(week, totalPostsByWeek[week]);
    });
  }
}
