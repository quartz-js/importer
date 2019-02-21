import { ServiceProvider } from '@railken/quartz-core'
import { container } from '@railken/quartz-core'

export class ImporterServiceProvider extends ServiceProvider {
  register() {

    this.addRoutes('app', require('./../../routes/importer.js'))

    this.addData({
      name: 'importer',
      icon: require('../../assets/impoter-icon.svg'),
      tags: ['data'],
      route: { name: 'importers.index' },
    })

    this.addLang({
      'en': require('../../../lang/importer/en.json'),
      'it': require('../../../lang/importer/it.json')
    })
  }
}
