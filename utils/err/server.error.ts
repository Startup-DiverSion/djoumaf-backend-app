import { Response } from "express"

interface ErrorServer {
    message: string;
}

class ServerError {

    constructor() {

    }


    public catchError(res: Response, error: any) {
        return res.status(500).send({
            error
        })
    }


    /**
     * Data not insert to database
     */
    public notInsertToDatabase(res: Response, error: ErrorServer = { message: "Impossible d'effectuez cette action" }) {
        return res.status(500).send({
            message: error.message,
            error: true
        })
    }

     /**
     * Data not delete to database
     */
      public noDataMatches(res: Response, error: ErrorServer = { message: "Aucune donnée ne correspond" }) {
        return res.status(404).send({
            message: error.message,
            error: true
        })
    }

}

export default new ServerError()