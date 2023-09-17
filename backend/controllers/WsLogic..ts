import TodoModel, { Todo } from "../model/TodoModel";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Server } from "socket.io";
import { redisClient } from "../config/dbConnection";


//**********************************add Todo*********************************/

export const addTodo = async (
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    T: Todo
  ) => {
   
    // Store the task in Redis
    await redisClient.lpush("FULLSTACK_TASK_YASH", JSON.stringify(T)).then(() => {
      io.sockets.emit("SuccessMessage", "sucessfully added"); // Send the message to all connected clients
    });
  
    // Check Redis list length and move to MongoDB if needed
    const elements = await redisClient.lrange("FULLSTACK_TASK_YASH", 0, -1);
   
    if (elements.length >= 50) {
      // Move items to MongoDB
  
      elements.forEach(async (item: any) => {
        const task = await new TodoModel({
          todo: JSON.parse(item).todo,
        });
        await task.save();
      });
  
      // Remove items from Redis
      redisClient.del("FULLSTACK_TASK_YASH");
    }
  };
  