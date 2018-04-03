import jsonp from '../common/js/jsonp';
import { commonParams, options, videoParams } from './config';
import axios from 'axios';

export function getSinger() {

    const url = '/api/getSinger';

    const data = Object.assign({}, commonParams, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        g_tk: 5381,
        // jsonpCallback: 'GetSingerListCallback',
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
    });

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data); // 使用promise对象异步回调请求响应成功之后的返回
    }).catch((e) => {
        console.log(e);
    });
}