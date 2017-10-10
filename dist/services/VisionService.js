"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require("request-promise");
class VisionService {
    getAssetForPictures(pictures) {
        console.log(pictures.length);
        console.log("Getting assets for pictures (" + pictures.length + " pictures).");
        var promises = [];
        for (let picture of pictures) {
            // Build body for Request
            var reqBody = {
                "requests": [
                    {
                        "image": {
                            "source": {
                                "imageUri": `${picture.url}`
                            }
                        },
                        "features": [
                            {
                                "type": "LABEL_DETECTION"
                            }
                        ]
                    }
                ]
            };
            var url = "https://vision.googleapis.com/v1/images:annotate?key=" + process.env.GOOGLE_VISION_API_KEY;
            var options = ({
                "method": "POST",
                "uri": url,
                "body": reqBody,
                "json": true
            });
            promises.push(rp(options));
        }
        return Promise.all(promises);
    }
}
exports.VisionService = VisionService;
