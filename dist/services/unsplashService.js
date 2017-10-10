"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require("request-promise");
class UnsplashService {
    constructor() {
        this.appId = process.env.UNSPLASH_API_KEY;
        this.urlSearch = 'https://api.unsplash.com/search/photos';
        this.perPage = 5;
    }
    getPictures(theme) {
        var url = this.urlSearch + "?client_id=" + this.appId + "&query=" + theme + "&per_page=" + this.perPage;
        console.log("Fetching pictures details from unsplash");
        var options = ({
            "method": "GET",
            "uri": url,
            "json": true
        });
        return rp(options);
    }
}
exports.UnsplashService = UnsplashService;
