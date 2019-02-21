import { Attributes } from '@railken/quartz-core'
import { ImporterApi } from './../Api/ImporterApi'

export class ImporterAttribute extends Attributes.BelongsTo {
  constructor (name, options) {
    super(name, new ImporterApi())

    this.resourceConfig = () => { return require('./../Managers/ImporterManager').default };

    this.createComponent = {
      component: () => import('../../components/importer/Resource/create')
    }

    this.updateComponent = {
      component: () => import('../../components/importer/Resource/edit')
    }
  }
};
