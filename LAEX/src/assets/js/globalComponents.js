import Vue from 'vue'

import {
  Pagination,
  Dialog,
  Input,
  RadioGroup,
  RadioButton,
  Checkbox,
  Switch,
  Select,
  Option,
  Button,
  Popover,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Alert,
  Slider,
  Carousel,
  CarouselItem,
  Loading,
  MessageBox,
  Upload,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from 'element-ui'
import '@a/element-ui-overide.css'
import VueClipboard from 'vue-clipboard2'
import SendVerifyCodeComp from '../../components/SendVerifyCodeComp'
import RequireLoginComp from '../../components/RequireLoginComp'
import ObviousPriceComp from '@c/ObviousPriceComp'
import RouteDescriptionComp from '@c/RouteDescriptionComp'

[
  Pagination,
  Dialog,
  Input,
  RadioGroup,
  RadioButton,
  Checkbox,
  Switch,
  Select,
  Option,
  Button,
  Popover,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Alert,
  Slider,
  Carousel,
  CarouselItem,
  Loading,
  Upload,
  Dropdown,
  DropdownMenu,
  DropdownItem,
].forEach(comp => Vue.use(comp))

const proto = Vue.prototype
proto.$alert = MessageBox.alert;
proto.$confirm = MessageBox.confirm;
proto.$prompt = MessageBox.prompt;
proto.$msgBox = MessageBox

Vue.use(VueClipboard)

Vue.component('send-verify-code-comp', SendVerifyCodeComp)
Vue.component('require-login-comp', RequireLoginComp)
Vue.component('obvious-price-comp', ObviousPriceComp)
Vue.component('route-description-comp', RouteDescriptionComp)
