import { config } from './config';

export class Flickr {
    getPhotos(text, page) {
        return this.makeRequest('flickr.photos.search', {text: text, page: page, per_page: config.photoPerPage});
    }

    makeRequest(apiMethod, params) {
        let url = config.apiUrl + '?method=' + apiMethod + '&api_key=' + config.apiKey + '&format=' + config.responceFormat  + '&nojsoncallback=1';

        for (let key in params) {
            url += '&' + key + '=' + params[key];
        }

        return new Promise( (resolve, reject) => {
            $.ajax(
                {
                    type: 'GET',
                    url: url,
                }
            ).done((response) => {
                resolve(response);
            }).fail(reject);
        });
    }
}
