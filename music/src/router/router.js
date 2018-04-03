// 路由配置
import rank from '../components/rank/rank';
import recommend from '../components/recommend/recommend';
import search from '../components/search/search';
import singer from '../components/singer/singer';
import test2 from '../components/test/test02';
import test3 from '../components/test/test3';

export const routes = [{
    path: '/',
    redirect: '/recommend'
}, {
    path: '/recommend',
    component: recommend
}, {
    path: '/rank',
    component: rank
}, {
    path: '/search',
    component: search
}, {
    path: '/singer',
    component: singer,
}];