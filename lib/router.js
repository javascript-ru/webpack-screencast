// http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url

export default class Router {
  constructor() {
    this.current = Router.getRoute();
    this.fallback = null;
    this.routes = [];

    this.updateRoute = this.handleRouteChange.bind(this);
  }

  static instance;

  static getInstance() {
    if (!Router.instance) {
      Router.instance = new Router();
    }
    return Router.instance;
  }

  static navigate(path = '') {
    history.pushState(null, null, '/' + Router.clearSlashes(path));
    window.dispatchEvent(new CustomEvent('routing'));
  }

  static linkClickHandler(path) {
    function handler(event) {
      event.preventDefault();
      Router.navigate(path);
    }
    return handler;
  }

  static getRoute() {
    const {pathname, search} = location;
    const route = Router.clearSlashes(decodeURI(pathname + search)).replace(/\?(.*)$/, '');
    return Router.clearSlashes(route);
  }

  static clearSlashes(path) {
    return path.toString().replace(/\/$/, '').replace(/^\//, '').trim();
  }

  addRoute(route, handler) {
    this.routes.push({route, handler});
    return this;
  };

  setFallback(handler) {
    this.fallback = handler;
    return this;
  }

  routing(route) {
    const foundRoute = this.routes.find((watchedRoute) => {
      const exact = typeof watchedRoute.route === 'string';
      return exact
        ? Router.clearSlashes(route) === Router.clearSlashes(watchedRoute.route)
        : route.match(watchedRoute.route);
    });

    if (foundRoute) {
      foundRoute.handler(route);
    } else {
      this.fallback();
    }
  }

  handleRouteChange() {
    const activeRoute = Router.getRoute();
    if (this.current !== activeRoute) {
      this.current = activeRoute;
      this.routing(activeRoute);
    }
  }

  listen() {
    this.routing(Router.getRoute());
    window.addEventListener('routing', this.updateRoute);
    window.addEventListener('popstate', this.updateRoute);
  };
};
