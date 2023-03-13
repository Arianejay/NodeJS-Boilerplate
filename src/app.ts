import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import mongoose, { ConnectOptions } from "mongoose";

import logger from "./globals/logger";
import cfg from "./globals/config";

import AuthRoute from "./routes/auth.route";
import UserRoute from "./routes/user.route";

const PORT = cfg.port;

class App extends http.Server {
    public app: express.Application;

    constructor() {
        const app: express.Application = express();
        super(app);
        this.app = app;
    }

    /**
     * @description
     * This sets our mongoose database
     */
    private async setDatabase() {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions;

        try {
            await mongoose.connect(cfg.dbURL, options);
            logger.info("Connected to DB!");
        } catch (error) {
            logger.error(`ERROR CONNECTING TO DB: ${error}`);
        }
    }

    /**
     * @desccription
     *  Our routes for our API endpoints
     */
    private setRouter() {
        this.app.use("/auth", AuthRoute);
        this.app.use("/user", UserRoute);
    }

    /**
     * @description
     *  Middlewares for our app
     */
    private setMiddleware() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.setRouter();
    }

    /**
     * @description
     *  Initializes our app
     */
    async start() {
        this.setMiddleware();
        this.setDatabase();
        this.app.set("port", PORT);
        return this.app.listen(this.app.get("port"), () => {
            logger.info(
                `Server is running on: http://localhost:${this.app.get("port")}`
            );
        });
    }
}

export default App;
