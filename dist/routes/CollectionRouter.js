"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const JSON_ = require("JSON_");
const UnsplashService_1 = require("./../services/UnsplashService");
const VisionService_1 = require("./../services/VisionService");
const PictureCollectionHelper_1 = require("./../services/PictureCollectionHelper");
class CollectionRouter {
    /*
    * Initialize the CollectionRouter
    */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /*
    * seek route
    */
    seekAll(req, res, next) {
        // todo: check that it's not empty or undefined
        var filters = req.query.filter.split(",");
        var theme = req.query.theme;
        var pictureCollection = [];
        var unsplashService = new UnsplashService_1.UnsplashService();
        var visionService = new VisionService_1.VisionService();
        var pictureCollectionHelper = new PictureCollectionHelper_1.PictureCollectionHelper();
        unsplashService.getPictures(theme)
            .then(function (responses) {
            return pictureCollectionHelper.fillPictureCollectionFromGetPictures(responses, pictureCollection);
        })
            .then(visionService.getAssetForPictures)
            .then(function (responses) {
            return pictureCollectionHelper.fillPictureCollectionWithAssets(responses, pictureCollection, filters);
        })
            .then(function (pictureCollection) {
            return pictureCollectionHelper.buildJsonReponseFromPictureCollection(pictureCollection);
        })
            .then(function (jsonResponse) {
            res.status(200).send(JSON_.stringify(jsonResponse));
        });
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/seek', this.seekAll);
    }
}
exports.CollectionRouter = CollectionRouter;
// Create the CollectionRouter, and export its configured Express.Router
const collectionRoutes = new CollectionRouter();
collectionRoutes.init();
exports.default = collectionRoutes.router;
