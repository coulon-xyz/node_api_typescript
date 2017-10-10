import {Router, Request, Response, NextFunction} from 'express';

var request = require('request-promise');

export class PlaygroundRouter {
  router: Router;
    /*
    * Initialize the CollectionRouter
    */
    constructor() {
    this.router = Router();
    this.init();
    }


    /*
    * rest route route
    */
    public getTest(req: Request, res: Response, next: NextFunction) {
    
        console.log("Unsplash key " + process.env.UNSPLASH_API_KEY)
        console.log("Vision key: " + process.env.GOOGLE_VISION_API_KEY)
      
    }


    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/test', this.getTest);
    }
        
}
    
    // Create the CollectionRouter, and export its configured Express.Router
    const playgroundRoutes = new PlaygroundRouter();
    playgroundRoutes.init();
    
    export default playgroundRoutes.router;
    