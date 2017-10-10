import * as rp from 'request-promise'
import { Picture } from './../models/Picture';

export class UnsplashService {
    appId= process.env.UNSPLASH_API_KEY
    urlSearch: string = 'https://api.unsplash.com/search/photos';
    perPage: number = 5;

    public getPictures(theme: string) {
        var url: string = this.urlSearch + "?client_id=" + this.appId + "&query=" + theme + "&per_page=" + this.perPage;
        console.log("Fetching pictures details from unsplash");
        var options = ({
                "method":"GET",
                "uri": url,
                "json": true 
                });
        return rp(options)
    }

}