import { fetchResource } from './api'
import format from 'string-format';

export default class ResourceInteractor {
  state = null;
  resourceUrl = '';

  constructor(resourceUrl, defaultState = {}) {
    this.resourceUrl = resourceUrl;
    this.state = defaultState;
  }

  fetch(urlParam) {
    return fetchResource(format(this.resourceUrl, urlParam))
  }

  onFetch() {
    return { loading: true }
  }

  onFetchSuccess(response) {
    return response;
  }

  onFetchError(error) {
    return { error: error.message }
  }
}
