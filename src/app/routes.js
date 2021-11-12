import OverviewView from '@app/views/OverviewView.vue'
import ComponentView from '@app/views/ComponentView.vue'

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
