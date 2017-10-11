import * as rp from 'request-promise'
import { Picture } from './../models/Picture';

export class VisionService {

    /**
     *
     * Collect all assets for a Picture[]
     *
     * @param {Picture[]} pictureCollection
     * @returns {Promise<any[]>}
     */
    getAssetForPictures(pictureCollection: Picture[]): Promise<any> {
        console.log(pictureCollection)
        //console.log("Getting assets for pictures (" + pictures.length + " pictures).")
        var promises = []
        for (let picture of pictureCollection) {
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

            let url = "https://vision.googleapis.com/v1/images:annotate?key=" + process.env.GOOGLE_VISION_API_KEY;
            
            let options : rp.Options = ({
                method:"POST",
                uri: url,
                body: reqBody,
                json: true
                });
            promises.push(rp(options))
        }
        return Promise.all(promises)
    }

}