import { ServiceProvider } from '@railken/quartz-core'

export class ImporterServiceProvider extends ServiceProvider {
  register() {
    this.registerComponent("DataViewImporter", require('../../components/DataViewImporter').default)
  }
}
