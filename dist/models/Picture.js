"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Picture {
    constructor(pictureId, width, height, url, likes) {
        this.availableAssets = [];
        this.filteredAssets = [];
        this.pictureId = pictureId;
        this.width = width;
        this.height = height;
        this.url = url;
        this.likes = likes;
    }
    addAvailableAsset(asset) {
        this.availableAssets.push(asset);
    }
    addFilteredAsset(asset) {
        this.filteredAssets.push(asset);
    }
}
exports.Picture = Picture;
