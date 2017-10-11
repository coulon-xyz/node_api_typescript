import { Picture } from './../models/Picture';

export class PictureCollectionHandler {

    /**
     *
     * Build an Array of Picture with info collected by the Unsplash service.
     *
     * @param {Picture[]} pictureCollection
     * @param response
     * @returns {Promise<any>}
     */

    buildPictureCollectionFromGetPictures = function(pictureCollection: Picture[], response: Object) {

        console.log("Raw Responses from Unspash: ");
        console.log(response)

        console.log("# Building a Picture Collection");
        for (let result of response['results']) {
          pictureCollection.push(new Picture(result["id"],result["width"],result["height"],result["urls"]["regular"],result["likes"]));
        }
      
        return new Promise(function(resolve, reject) { 
          if (pictureCollection.length > 0) {
            resolve(pictureCollection)
          } else {
              reject(Error("Not pictures were found"))
          }
        });
    };

    /**
     *
     * Fill a Array of Picture with assets collected by the Vision API Label detection service.
     *
     * @param {Picture[]} pictureCollection
     * @param responses
     * @param {string[]} filters
     * @returns {Promise<any>}
     */
    fillPictureCollectionWithAssets = function(pictureCollection: Picture[], responses: Object[],  filters: string[]): Promise<any> {
        console.log("Filling Picture Collection with assets from Google Vision");
        for (let i in responses) {
            // using a for let as we need to keep track of index (responses and pictureCollection have the same).
            if (responses[i]["responses"][0]["labelAnnotations"]) {
                (responses[i]["responses"][0]["labelAnnotations"]).forEach(labelAnnotations => {
                    console.log(labelAnnotations);
                    // todo: Set the 0.8 as a configuration variable. Not cool to have number hanging out like that.
                    if (labelAnnotations["score"] > 0.8) {
                        pictureCollection[i].addAvailableAsset(labelAnnotations["description"]);
                        if (this.inArray(labelAnnotations["description"], filters)) {
                            pictureCollection[i].addFilteredAsset(labelAnnotations["description"]);
                        }
                    }
                });
            } else {
                if (responses[i]["responses"][0]['error']['message']) {
                    console.error('Cloud Vision error with assets for picture ' + pictureCollection[i].pictureId)
                    pictureCollection[i].setErrorMessage("Cloud Vision: " +  responses[i]["responses"][0]['error']['message'])
                } else {
                    console.error('Unknown error with assets for picture ' + pictureCollection[i].pictureId)
                    pictureCollection[i].setErrorMessage("Unknown error with assets")
                }
            }
          }
          return new Promise(function(resolve, reject) { 
            resolve()
        });
    };

    /**
     *
     * Build a Formatted Json Reponse from a Picture Collection.
     *
     * @param {Picture[]} pictureCollection
     * @returns {Promise<any>}
     */
    buildJsonResponseFromPictureCollection = function(pictureCollection: Picture[]) {
        console.log("## Build answer")
        // init placeholders
        let filteredCollectionPictures : Picture[] = [];
        let collectionPictures : Picture[] = [];

        pictureCollection.forEach(picture => {
            if (picture.filteredAssets.length > 0) {
                filteredCollectionPictures.push(picture);
            } else {
                collectionPictures.push(picture);
            }
        });

        return new Promise(function(resolve, reject) {
            resolve({ filteredCollectionPictures, collectionPictures })
        });
    };

    /**
     *
     * Quick Helper to find a needle in a haystack.
     *
     * @param {string} needle
     * @param {string[]} haystack
     * @returns {Boolean}
     */
    public inArray(needle: string, haystack: string[]): Boolean {
        let length = haystack.length;
        for(let i = 0; i < length; i++) {
            if(haystack[i] == needle) {
              return true;
            }
        }
        return false;
    }

}