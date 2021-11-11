import OverviewView from '@app/views/OverviewView.vue'
import CollectionView from '@app/views/CollectionView.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: OverviewView,
  },
  {
    path: '/collection',
    name: 'collection',
    component: CollectionView,
  },
]
