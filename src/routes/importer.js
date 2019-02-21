const routes = [{
  path: 'importers',
  component: () => import('./../components/importer/app'),
  children: [
    {
      path: '',
      name: 'importers.index',
      component: () => import('./../components/importer/Page/index')
    },
    {
      path: ':id',
      name: 'importers.show',
      component: () => import('./../components/importer/Page/show')
    }
  ]
}]
module.exports = routes;
