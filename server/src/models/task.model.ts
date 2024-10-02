import mongoose from "mongoose";

export const TaskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        stage: {
            type: String,
            enum: ['Backlog', 'ToDo', 'Ongoing', 'Done'],
            required: true,
        },
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High'],
            required: true,
        },
        deadline: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

export interface ITask {
    name: string;
    stage: 'Backlog' | 'ToDo' | 'Ongoing' | 'Done';
    priority: 'Low' | 'Medium' | 'High';
    deadline: Date;
    createdAt: Date | number;
    updatedAt: Date | number;
}