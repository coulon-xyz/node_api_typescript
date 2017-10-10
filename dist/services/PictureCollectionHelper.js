"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Picture_1 = require("./../models/Picture");
class PictureCollectionHelper {
    constructor() {
        this.fillPictureCollectionFromGetPictures = function (response, pictureCollection) {
            console.log("Building a Picture Collection");
            for (let result of response['results']) {
                pictureCollection.push(new Picture_1.Picture(result["id"], result["width"], result["height"], result["urls"]["regular"], result["likes"]));
            }
            return new Promise(function (resolve, reject) {
                console.log(pictureCollection);
                resolve(pictureCollection);
            });
        };
        this.fillPictureCollectionWithAssets = function (responses, pictureCollection, filters) {
            console.log("Filling picture collection with assets");
            console.log(pictureCollection);
            for (let i in responses) {
                (responses[i]["responses"][0]["labelAnnotations"]).forEach(element => {
                    if (element["score"] > 0.8) {
                        console.log(element);
                        pictureCollection[i].addAvailableAsset(element["description"]);
                        if (this.inArray(element["description"], filters)) {
                            pictureCollection[i].addFilteredAsset(element["description"]);
                        }
                    }
                });
            }
            return new Promise(function (resolve, reject) {
                resolve(pictureCollection);
            });
        };
        this.buildJsonReponseFromPictureCollection = function (pictureCollection) {
            // init placeholders
            var filteredCollectionPictures = [];
            var collectionPictures = [];
            pictureCollection.forEach(picture => {
                if (picture.filteredAssets.length > 0) {
                    filteredCollectionPictures.push(picture);
                }
                else if (picture.availableAssets.length > 0) {
                    collectionPictures.push(picture);
                }
            });
            return new Promise(function (resolve, reject) {
                resolve({ filteredCollectionPictures, collectionPictures });
            });
        };
    }
    inArray(needle, haystack) {
        var length = haystack.length;
        for (var i = 0; i < length; i++) {
            if (haystack[i] == needle) {
                return true;
            }
        }
        return false;
    }
}
exports.PictureCollectionHelper = PictureCollectionHelper;
