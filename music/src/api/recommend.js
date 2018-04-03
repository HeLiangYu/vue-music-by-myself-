import jsonp from '../common/js/jsonp';
import { commonParams, options, videoParams } from './config';
import axios from 'axios';

export function getRecommend() {
    const url = 'http://www.yinyuetai.com/mv/get-bigpic';

    const data = Object.assign({}, commonParams, {
        platfrom: 'h5'
    });

    return jsonp(url, data, options);
}

export function getVideo() {
    const url = '/api/getVedio';

    const data = Object.assign({}, videoParams, {
        format: 'json'
    });

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data);
    }).catch((e) => {
        console.log(e);
    })
}