import { Response } from "express"

interface ErrorServer {
    message: string;
}

class ClientError {

    constructor() {

    }



     /**
     * Data not delete to database
     */
      public canNotExecute(res: Response, error: ErrorServer = { message: "Aucune donnée ne correspond" }) {
        return res.status(400).send({
            message: error.message,
            error: true
        })
    }

      /**
     * Data already been executed
     */
      public alreadyBeenExecuted(res: Response, error: ErrorServer = { message: "Cette request à dèja été executer..." }) {
        return res.status(400).send({
            message: error.message,
            error: true
        })
    }



}

export default new ClientError()