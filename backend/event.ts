

import { Todo } from "./model/TodoModel";

  export interface ClientEvents {
    "add": (
      payload: Todo,
      callback: (todoData:Todo) => void
    ) => void; 
  }
  