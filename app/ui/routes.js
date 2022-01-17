import OverviewView from '@ui/views/OverviewView.vue'
import ComponentView from '@ui/views/ComponentView.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: OverviewView,
  },
  {
    path: '/component/:name',
    name: 'component',
    component: ComponentView,
  },
]
