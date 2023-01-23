import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "../logger/logger";

class User {

    public express: express.Application;
    public logger: Logger;

    public users: any[];

    public sudoAdmin: any[];

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.users = [];
        this.sudoAdmin = [{
            "firstName": "Dennis",
            "lastName": "Dennis",
            "email": "dennisgermishuys20@gmail.com"
        }]
        this.logger = new Logger();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        this.express.get("/users", (req, res, next) => {
            this.logger.info("url:" + req.url);
            res.json(this.users);
        });

        this.express.get("/users/:userName", (req, res, next) => {
            this.logger.info("url:::::" + req.url);
            const user = this.users.filter(function(user) {
                if (req.params.userName === user.userName) {
                    return user;
                }
            });
            res.json(user);
        });

        this.express.post("/user", (req, res, next) => {
            this.logger.info("url:::::::" + req.url);
            this.users.push(req.body.user);
            res.json(this.users);
        });

        this.express.post("/admin", (req, res, next) => {
            this.logger.info("url:::::::" + req.url);
            if(req.body.user.email === 'admin') {
                res.json(req.body);
            } else {
                null
            }

        })

        this.express.post("/login", (req, res, next) => {
            this.logger.info("url:::::::" + req.url);
            this.users.filter((user) => {
                if(user.email === req.body.user.email) {
                    res.json(req.body.user)
                } else {
                    res.json({error: 'error'})
                }
                }
            );

        })
    }
}

export default new User().express;