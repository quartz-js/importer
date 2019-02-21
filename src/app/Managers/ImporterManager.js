import { ImporterApi } from '../Api/ImporterApi'
import { Attributes, Manager } from '@railken/quartz-core'
import { DataBuilderAttribute } from '@railken/quartz/data-builder/src/app/Attributes/DataBuilderAttribute'

export default new Manager({
  name: 'importer',
  route: 'importers',
  manager: new ImporterApi(),
  icon: require('../../assets/importer-icon.svg'),
  attributes: [
    new Attributes.Id(),
    new Attributes.Base('name'),
    new Attributes.Base('description'),
    new DataBuilderAttribute('data_builder_id'),
    new Attributes.Base('data'),
    new Attributes.DateTime('created_at'),
    new Attributes.DateTime('updated_at')
  ]
})
