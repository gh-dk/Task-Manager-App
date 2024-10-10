export class Task {
    constructor(public _id: string = '', public name: string = '', public stage: number = 0, public priority: number = 0, public deadline: Date=new Date()) {
        this._id = _id;
        this.name = name;
        this.stage = stage;
        this.priority = priority;
        this.deadline = deadline;
    }
}
