import Vue from 'vue'
import { ResourceApi } from '@railken/quartz-core'

export class FileApi extends ResourceApi {
  resource_url = '/admin/files';

  /**
   * Create
   *
   * @param {int} id
   * @param {object} params
   *
   * @return {Promise}
   */
  upload (id, params) {
    return Vue.http.post(this.getFullUrl() + "/" + id + "/upload", params, { headers: { Authorization: 'Bearer ' + this.access_token }}).then(this.parse)
  }
};
