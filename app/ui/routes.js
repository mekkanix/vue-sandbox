import OverviewView from '@ui/views/OverviewView.vue'
import ImportView from '@ui/views/ImportView.vue'
import ComponentView from '@ui/views/ComponentView.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: OverviewView,
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
