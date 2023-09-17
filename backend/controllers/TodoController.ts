import ErrorHandler from "../utils/errorHandler";
import TodoModel, { Todo } from "../model/TodoModel";
import { Request, Response, NextFunction } from "express";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Server } from "socket.io";
import { redisClient } from "../config/dbConnection";
import { parseArray } from "../utils/parsedArray";
import { Query } from "../interface";

//**********************************all Todos*********************************/

export const fetchAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try { 
  
    //**********************************whole commented part is for if we want to take benifit of caching*********************************/

    //like we provide page no if that page page no lie in redis cache data, then we return otherwise we return data from mongodb also if according to page
    // data is combine of redis and mongodb we return it combined data but we only return 5 data per page according to page as of now frontend have
    // no functionality demand according to assignment like pagination .That's why i only write code and comment it simply.

    // const pageSize = 5;
    // const { pageNumber } = req.query as unknown as Query;
    // const startIdx = (pageNumber - 1) * pageSize;
    // const endIdx = startIdx + pageSize - 1;

    // const elementsSize = await redisClient.lrange("FULLSTACK_TASK_YASH", 0, -1);

    // const elements = await redisClient.lrange(
    //   "FULLSTACK_TASK_YASH",
    //   startIdx,
    //   endIdx
    // );
     
    // if (elements.length === pageSize) {
    //   const allTodos=parseArray(elements)
    //   res.status(200).json({
    //     allTodos,
    //   });
    //   return;
    // }

    // if (elements.length === 0) {
    //   let skipIndex = (startIdx)-elementsSize.length;
    //   if (skipIndex === -1)
    //   {
    //     skipIndex=0
    //    }
      
    //   const allTodos= await TodoModel.find({}).skip(skipIndex).limit(pageSize);
    //   res.status(200).json({
    //     allTodos,
    //   });
    //   return;
    // } else {
    //   const combineTaskLength = Math.abs(elements.length - pageSize);
    //   const allTasks = await TodoModel.find({}).limit(combineTaskLength);
    //   const parsedElements=parseArray(elements)
    //   const allTodos = [...parsedElements, allTasks];
    //   res.status(200).json({
    //     allTodos,
    //   });
    //   return;
    // }

    const elements = await redisClient.lrange("FULLSTACK_TASK_YASH", 0, -1);
    const parsedElements = parseArray(elements)
   
    const allTasks = await TodoModel.find({}).sort({createdAt:-1 });

    const allTodos=[...parsedElements,...allTasks]
    res.status(200).json({
      message: "successfully fetched",
      allTodos,
    });
  } catch (error: any) {
    next(new ErrorHandler(error, 401));
  }
};

