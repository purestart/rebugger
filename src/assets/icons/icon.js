/**
 * Created by 熊超超 on 2018/4/25.
 */

import Vue from 'vue'
import SvgIcon from '../../components/base/DyIcon.vue'

Vue.component('dy-icon', SvgIcon)

const content = require.context('./svg', false, /\.svg$/)

content.keys().map(content)
export default content.keys()
