class AppConfig {

    constructor(){

    }

    public database() {

        return {
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "",
            database: "nxs0_likidon",
            entities: ["models/*.js"],
            logging: true,
            synchronize: true,
        }

    }

    public mail(){

        return {

            

        }

    }

}

export default new AppConfig()