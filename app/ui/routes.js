import OverviewView from '@ui/views/OverviewView.vue'
import SettingsView from '@ui/views/SettingsView.vue'
import ImportView from '@ui/views/ImportView.vue'
import ComponentView from '@ui/views/ComponentView.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: OverviewView,
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView,
  },
  {
    path: '/import',
    name: 'import',
    component: ImportView,
  },
  {
    path: '/component/:name',
    name: 'component',
    component: ComponentView,
  },
]
