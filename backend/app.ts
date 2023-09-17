//All imports
import express from "express";
import dotenv from "dotenv";
import { error } from "./middleware/errorMiddleWare";
import cookieParser from "cookie-parser"
import cors from "cors";
import TodoRouter from "./router/TodoRoutes"
import http from 'http';
import { Server, Socket } from "socket.io";
import { addTodo } from "./controllers/WsLogic.";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ClientEvents} from "./event";
import { Todo } from "./model/TodoModel";

//  env file import 

dotenv.config({
    path: "./config/config.env",
  });


const app = express();
const server = http.createServer(app);

//**********************************WebSocket server configuration*********************************/

export const io = new Server<ClientEvents>(server, {
  cors: {
    origin: "http://localhost:3000"  // frontend port
}
});

io.on('connection', (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>):void => {
  console.log('WebSocket connected');
 
  socket.on('add', (Todo:Todo) => {
      addTodo(io,Todo)
  });
});


 //**********************************Cross Origin*********************************/

 app.use(cors({
    credentials: true,
    origin:"http://localhost:3000",
  }))
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  }))
  
app.use(cookieParser())
  


  //**********************************REST API Routes**********************************/

app.use("/api/v1",TodoRouter)

 //**********************************error middleware**********************************/

  app.use(error)



export default server;
