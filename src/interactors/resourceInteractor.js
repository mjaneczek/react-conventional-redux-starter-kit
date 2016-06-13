import { fetchResource } from '../services/api'
import format from 'string-format';

export default class ResourceInteractor {
  state = {};
  resourceUrl = '';

  constructor(resourceUrl) {
    this.resourceUrl = resourceUrl;
  }

  fetch(a1, a2) {
    return fetchResource(format(this.resourceUrl, a1, a2))
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
