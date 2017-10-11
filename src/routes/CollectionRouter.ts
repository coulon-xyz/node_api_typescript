import {Router, Request, Response} from 'express';
import * as JSON_ from 'JSON_';

import { Picture } from './../models/Picture';
import { UnsplashService } from './../services/UnsplashService';
import { VisionService } from './../services/VisionService';
import { PictureCollectionHandler } from './../handlers/PictureCollectionHandler';

export class CollectionRouter {
    router: Router;

    /**
    * Initialize the CollectionRouter
    */
    constructor() {
        this.router = Router();
        this.init();


    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/seek', this.seekAll);
    }

    /**
     *
     * /seek route for the Collection router.
     *
     * @param {Request} req
     * @param {Response} res
     */
    public seekAll(req: Request, res: Response) {
        if (req.query.theme) {
            // query string for filter and theme are set. we can process.

            // init vars & placeholders
            let theme: String = req.query.theme;
            let pictureCollection: Picture[] = [];
            let filters: String[] = [];
            if (req.query.filter) {
                filters = req.query.filter.split(",");
            }

            // init services (todo: find a way to inject them in the class instead ?)
            let unsplashService: UnsplashService = new UnsplashService();
            let visionService: VisionService = new VisionService();
            let pictureCollectionHelper = new PictureCollectionHandler();

            unsplashService.getPictures(theme)
                .then(function (response: Object) {
                    return pictureCollectionHelper.buildPictureCollectionFromGetPictures(pictureCollection, response)
                })
                .then(function (pictureCollection: Picture[]) {
                    if (filters.length > 0)
                        return visionService.getAssetForPictures(pictureCollection)
                })
                .then(function (responses: [Object]) {
                    if (filters.length > 0)
                        return pictureCollectionHelper.fillPictureCollectionWithAssets(pictureCollection, responses, filters)
                })
                .then(function () {
                    return pictureCollectionHelper.buildJsonResponseFromPictureCollection(pictureCollection)
                })
                .then(function (jsonResponse: Object) {
                    res.status(200).send(JSON_.stringify(jsonResponse));
                })
                .catch((error: Error) => {
                    console.log(error);
                    if (error.name == 'StatusCodeError') {
                        res.status(error['statusCode']).send(error['error']);
                    } else {
                        console.log("system error")
                        res.status(500).send(error)
                    }
                });
        } else {
            res.status(403).send({"error": "missing querystring (theme & filter are mandatory)"})
        }
    }
}

// Create the CollectionRouter, and export its configured Express.Router
const collectionRoutes = new CollectionRouter();
collectionRoutes.init();

export default collectionRoutes.router;
