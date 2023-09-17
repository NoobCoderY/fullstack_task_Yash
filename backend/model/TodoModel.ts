import mongoose from "mongoose";

export interface Todo {
  todo: string;
  createdAt?: number;
  
}

const TodoSchema = new mongoose.Schema<Todo>({
  todo: {
    type: String,
    required: true,
  },
  createdAt: {
    type:Number,
  },
 
});

export default mongoose.model("assignment_yash", TodoSchema);
