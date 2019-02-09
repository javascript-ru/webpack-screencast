export default class Router {
  static routes = [];
  static current = null;
  static fallback = null;

  static _getRoute() {
    const {_removeSlashes} = Router;
    const {pathname, search} = location;
    const route = _removeSlashes(decodeURI(pathname + search)).replace(/\?(.*)$/, '');
    return _removeSlashes(route);
  }

  static _removeSlashes(path) {
    return path.toString().replace(/\/$/, '').replace(/^\//, '').trim();
  }
  
  static _route() {
    const {
      routes,
      current,
      fallback,
      _getRoute,
      _removeSlashes
    } = Router;

    const activeRoute = _getRoute();
    if (current === activeRoute) return;
    Router.current = activeRoute;

    const foundRoute = routes.find((watchedRoute) => {
      return typeof watchedRoute.route === 'string'
        ? _removeSlashes(activeRoute) === _removeSlashes(watchedRoute.route)
        : activeRoute.match(watchedRoute.route);
    });

    if (foundRoute) {
      foundRoute.handler(activeRoute);
    } else {
      fallback();
    }
  }

  static navigate(path = '') {
    const {_removeSlashes, _route} = Router;
    history.pushState(null, null, '/' + _removeSlashes(path));
    _route();
  }

  static linkClickHandler(path) {
    function handler(event) {
      event.preventDefault();
      Router.navigate(path);
    }
    return handler;
  }

  static addRoute(route, handler) {
    Router.routes.push({route, handler});
    return Router;
  };

  static setFallback(handler) {
    Router.fallback = handler;
    return Router;
  }

  static listen() {
    const {_route} = Router;
    window.addEventListener('popstate', _route);
    _route();
  };
};
