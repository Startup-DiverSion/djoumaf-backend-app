import { Response } from "express"

interface ErrorSpecify {
    message: string;
    path: string;
}

class useValidateError {

    constructor() {

    }

    static struct() {

    }

    /**
     * validator
     */
    public input(res: Response, error: any) {
        return res.status(400).send({
            message: error.details[0].message,
            path: error.details[0].path[0]
        })
    }


    /**
     * withoutInput
     */
    public withoutInput(res: Response, error: ErrorSpecify) {
        return res.status(400).send({
            message: error.message,
            path: error.path
        })
    }

}

export default new useValidateError()