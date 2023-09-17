import express, { Request, Response, NextFunction } from "express";
import { ErrorCustomType } from "../interface";


//**********************************Error middleware *********************************/

export const error=(err:ErrorCustomType ,req:Request,res:Response,next: NextFunction)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        success:false,
        err:err.message
      })
}