"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require("request-promise");
class UnsplashService {
    constructor() {
        this.appId = "c9923370c21dc55cb9db11c54c64d9a33e12cf594f0c8430bc09836b4fe46e26";
        this.urlSearch = 'https://api.unsplash.com/search/photos';
        this.perPage = 2;
        this.appIdGoogleVision = "AIzaSyCzd5_h3rX-5zjwt4JFOU3vpoG9Zfp-QMs";
        this.urlGoogleVision = `https://vision.googleapis.com/v1/images:annotate?key=${this.appIdGoogleVision}`;
    }
    logHello() {
        console.log('Hello');
    }
    getPictures(theme) {
        var url = this.urlSearch + "?client_id=" + this.appId + "&query=" + theme + "&per_page=" + this.perPage;
        console.log(url);
        var options = ({
            "method": "GET",
            "uri": url,
            "json": true
        });
        rp(options).then(function (parsedBody) {
            var pictures = [];
            for (let result of parsedBody['results']) {
                var data = JSON.stringify({
                    "requests": [
                        {
                            "image": {
                                "source": {
                                    "imageUri": `${result["urls"]["regular"]}`
                                }
                            },
                            "features": [
                                {
                                    "type": "LABEL_DETECTION"
                                }
                            ]
                        }
                    ]
                });
                console.log(data);
                console.log(this.urlGoogleVision);
                var options = ({
                    "method": "POST",
                    "uri": this.urlGoogleVision,
                    "body": data,
                    "json": true
                });
                rp(options).then(function (parsedBody) {
                    console.log(parsedBody);
                }).return;
                pictures.push(result["id"], result["width"], result["height"], result["urls"]["regular"], result["likes"]);
            }
            return pictures;
        }).catch(function (err) {
            console.log(err);
        });
    }
}
exports.UnsplashService = UnsplashService;
