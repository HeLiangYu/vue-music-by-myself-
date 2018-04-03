// axios来处理数据响应
// 获取推荐歌单数据
import axios from 'axios';

export default {
    before(app) {
        app.get('/api/getVedio', function(req, res) {
            var url = 'http://www.yinyuetai.com/mv/get-first-video'
            axios.get(url, {
                header: {
                    referer: 'http://m.yinyuetai.com/',
                    host: 'www.yinyuetai.com',
                    'Access-Control-Allow-Origin': '*'
                },
                params: req.query
            }).then((response) => {
                res.json(response.data)
            }).catch((e) => {
                console.log(e)
            })
        })

        app.get('/api/getSinger', function(req, res) {
            var url = 'http://baifen.qianqian.com//api/v2/unstandard'
            axios.get(url, {
                header: {
                    referer: 'http://music.hao123.com/',
                    host: 'baifen.qianqian.com',
                    'Access-Control-Allow-Origin': '*'
                },
                params: req.query
            }).then((response) => {
                res.json(response.data)
            }).catch((e) => {
                console.log(e)
            })
        })
    }
}