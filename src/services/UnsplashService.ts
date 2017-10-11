import * as rp from 'request-promise'

export class UnsplashService {
    urlSearch: string = 'https://api.unsplash.com/search/photos';
    appId: string = process.env.UNSPLASH_API_KEY
    perPage: number = 5;

    /**
     *
     * Get Pictures from Unsplash based on a given theme.
     *
     * @param {String} theme
     * @returns {requestPromise.RequestPromise}
     */
    public getPictures(theme: String) {

        // todo: Make this configurable
        let url: string = this.urlSearch + "?client_id=" + this.appId + "&query=" + theme + "&per_page=" + this.perPage;
        console.log("Fetching pictures details from unsplash");
        let options = {
                method:"GET",
                json: true,
                url: url,
                };
        return rp(options)
    }

}