import {Post} from "../post";

export interface GroupByObj {
    numerical: number;
    categorical: string;
}

export class Statistics {
    posts: Array<Post>;
    constructor(posts: Array<Post>) {
        this.posts = posts;
    }
    group(): Array<GroupByObj> {
        throw new Error("Not implemented exception!!!");
    }
}