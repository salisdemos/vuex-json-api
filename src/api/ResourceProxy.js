import { Route } from '../route/Route'
import { createApiResourceMethodProxy } from './createApiResourceMethodProxy'

/**
 * ResourceProxy
 *
 * A wrapper class for the available methods on
 * a route. The actual proxied axios-clients
 * will only be created once the first request on
 * a method is made.
 *
 * @class ResourceProxy
 */
export class ResourceProxy {
  constructor (resourcefulApi) {
    this.resourcefulApi = resourcefulApi
    this.routes = {}
    this.proxies = {}
    this.related = {}
  }

  /**
   * Adds a method to the resource
   *
   * @param {Route} route
   */
  addRoute (route) {
    if (!(route instanceof Route)) {
      throw new Error(`Expected Route, got ${route.constructor}`)
    }

    this.routes[route.action] = route
  }

  addRelation (relationName, relatedResourceProxy) {
    if (!(relatedResourceProxy instanceof ResourceProxy)) {
      throw new Error(`Expected ResourceProxy, got ${relatedResourceProxy.constructor}`)
    }

    this.related[relationName] = relatedResourceProxy
  }

  /**
   * Used by the resource method availability checks
   * to indicate a missing method.
   *
   * @param {string} methodName
   */
  methodNotAvailable (methodName) {
    throw new Error(`Method ${methodName} not available`)
  }

  getProxyForMethod (methodName) {
    if (!Object.prototype.hasOwnProperty.call(this.proxies, methodName)) {
      this.createProxyForMethodIfMissing(methodName)
    }

    return this.proxies[methodName]
  }

  createProxyForMethodIfMissing (methodName) {
    const proxy = createApiResourceMethodProxy(this.resourcefulApi, methodName, this.routes[methodName])

    this.proxies[methodName] = proxy
  }

  get () {
    return this.allowsItemAccess() ? this.getProxyForMethod('get') : this.methodNotAvailable('get')
  }

  list () {
    return this.isCollection() ? this.getProxyForMethod('list') : this.methodNotAvailable('list')
  }

  create () {
    return this.allowsCreation() ? this.getProxyForMethod('create') : this.methodNotAvailable('create')
  }

  replace () {
    return this.allowsReplacement ? this.getProxyForMethod('replace') : this.methodNotAvailable('replace')
  }

  update () {
    return this.allowsModification() ? this.getProxyForMethod('update') : this.methodNotAvailable('update')
  }

  delete () {
    return this.allowsDeletion() ? this.getProxyForMethod('delete') : this.methodNotAvailable('delete')
  }

  isCollection () {
    return ('list' in this.routes)
  }

  allowsModification () {
    return ('update' in this.routes)
  }

  allowsReplacement () {
    return ('replace' in this.routes)
  }

  allowsCreation () {
    return ('create' in this.routes)
  }

  allowsDeletion () {
    return ('delete' in this.routes)
  }

  allowsItemAccess () {
    return ('get' in this.routes)
  }

  hasRelated () {
    return Object.keys(this.related).length > 0
  }
}
