import mongoose from "mongoose";

export interface Todo {
  todo: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const TodoSchema = new mongoose.Schema<Todo>({
  todo: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("assignment_yash", TodoSchema);
