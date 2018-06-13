import Vue from 'vue'
import Vant from 'vant'
import { Lazyload } from 'vant';

export default () => {
    Vue.use(Vant)
    Vue.use(Lazyload)
}