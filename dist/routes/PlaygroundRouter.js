"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
var request = require('request-promise');
class PlaygroundRouter {
    /*
    * Initialize the CollectionRouter
    */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /*
    * rest route route
    */
    getTest(req, res, next) {
        console.log("Unsplash key " + process.env.UNSPLASH_API_KEY);
        console.log("Vision key: " + process.env.GOOGLE_VISION_API_KEY);
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/test', this.getTest);
    }
}
exports.PlaygroundRouter = PlaygroundRouter;
// Create the CollectionRouter, and export its configured Express.Router
const playgroundRoutes = new PlaygroundRouter();
playgroundRoutes.init();
exports.default = playgroundRoutes.router;
