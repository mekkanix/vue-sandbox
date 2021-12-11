import OverviewView from '@/views/OverviewView.vue'
import ComponentView from '@/views/ComponentView.vue'

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
