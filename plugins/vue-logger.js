import Vue from 'vue'
import VueLogger from 'vue-logger'

export default () => {
    Vue.use(VueLogger, {
        prefix: new Date(),
        dev: true,
        shortname: true,
        levels: ['log', 'warn', 'debug', 'error', 'dir', 'info']
    })
}