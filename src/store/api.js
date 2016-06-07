import request from 'superagent/lib/client'

export class Cafe {
  constructor(slug) {
    if (slug) {
      this._base = '/api/cafes/' + slug
    } else {
      this._base = '/api/cafes'
    }
  }

  topics(page, cb) {
    var query = {}
    const url = this._base + '/topics'
    var req = request.get(url)
    if (page) {
      req = req.query({page: page})
    }
    return req.end(cb)
  }
}
