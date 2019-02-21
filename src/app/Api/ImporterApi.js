import { ResourceApi } from '@railken/quartz-core'
import Vue from 'vue'

export class ImporterApi extends ResourceApi {
    resource_url = '/admin/importers';

    /**
     * @param {int} id
     * @param {Object} params
     *
     * @return {Promise}
     */
    import (id, params) {
      return Vue.http.post(this.getFullUrl() + '/' + id + '/import', params, { headers: { Authorization: 'Bearer ' + this.access_token }})
    }
};
