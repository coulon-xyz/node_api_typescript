import * as rp from 'request-promise'

export class UnsplashService {
    urlSearch: string = 'https://api.unsplash.com/search/photos';
    appId: string = process.env.UNSPLASH_API_KEY
    //perPage: number = 5;

    /**
     *
     * Get Pictures from Unsplash based on a given theme.
     *
     * @param {string} theme
     * @param {number} perPage
     * @returns {requestPromise.RequestPromise}
     */
    public getPictures(theme: string, perPage: number) {

        // todo: Make this configurable
        let url: string = this.urlSearch + "?client_id=" + this.appId + "&query=" + theme + "&per_page=" + perPage;
        console.log("## Fetching pictures details from unsplash");
        let options = {
                method:"GET",
                json: true,
                url: url,
                };
        return rp(options)
    }

}