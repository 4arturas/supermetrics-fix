import {GroupByObj} from "./statistics/statistics";

export class ToString {
    toString() {
        throw new Error("Not implemented exception!!!");
    }
}

export class Print {
    print() {
        throw new Error("Not implemented exception!!!");
    }
}

export class PrintConsole extends Print {

    groupByArr: Array<GroupByObj>;

    constructor(groupByArr: Array<GroupByObj>) {
        super();
        this.groupByArr = groupByArr;
    }

    print() {
        this.groupByArr.forEach(g => console.log(g.toString()));
    }
}