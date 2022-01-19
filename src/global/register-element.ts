import { App } from 'vue'
import {
  ElButton,
  ElTable,
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElBacktop,
  ElBadge,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElInput,
  ElForm,
  ElFormItem,
  ElCheckbox,
  ElLink
} from 'element-plus/lib/components'

import { Cellphone, User } from '@element-plus/icons-vue'

const components = [
  ElButton,
  ElTable,
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElBacktop,
  ElBadge,
  ElTabs,
  ElTabPane,
  ElIcon,
  Cellphone,
  User,
  ElInput,
  ElForm,
  ElFormItem,
  ElCheckbox,
  ElLink
]

export default function (app: App): void {
  for (const cpn of components) {
    console.log(cpn)
    app.component(cpn.name, cpn)
  }
}
