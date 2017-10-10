import {Router, Request, Response, NextFunction} from 'express';
import * as JSON_ from 'JSON_';

import { Picture } from './../models/Picture';
import { UnsplashService } from './../services/UnsplashService';
import { VisionService } from './../services/VisionService'
import { PictureCollectionHelper } from './../services/PictureCollectionHelper'

export class CollectionRouter {
  router: Router;
/*
* Initialize the CollectionRouter
*/
constructor() {
  this.router = Router();
  this.init();
}

/*
* seek route
*/
public seekAll(req: Request, res: Response, next: NextFunction) {
   // todo: check that it's not empty or undefined
  var filters = req.query.filter.split(",");
  var theme = req.query.theme;

  var pictureCollection:Picture[] = [];
  
  var unsplashService: UnsplashService = new UnsplashService();
  var visionService: VisionService = new VisionService();
  var pictureCollectionHelper = new PictureCollectionHelper();

  unsplashService.getPictures(theme)
                 .then(function(responses) {
                    return pictureCollectionHelper.fillPictureCollectionFromGetPictures(responses, pictureCollection)
                 })
                 .then(visionService.getAssetForPictures)
                 .then(function(responses) {
                    return pictureCollectionHelper.fillPictureCollectionWithAssets(responses, pictureCollection, filters)
                 })
                 .then(function(pictureCollection) {
                   return pictureCollectionHelper.buildJsonReponseFromPictureCollection(pictureCollection)
                 })
                 .then(function(jsonResponse) {
                  res.status(200).send(JSON_.stringify(jsonResponse));
                 })
}

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/seek', this.seekAll);
  }
  
}

// Create the CollectionRouter, and export its configured Express.Router
const collectionRoutes = new CollectionRouter();
collectionRoutes.init();

export default collectionRoutes.router;
