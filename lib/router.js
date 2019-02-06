// http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url

// todo: try w/o getinstance for simplicity
export default class Router {
  constructor() {
    this.current = Router.getRoute();
    this.fallback = null;
    this.routes = [];
  }

  static getInstance() {
    if (!Router._instance) {
      Router._instance = new Router();
    }
    return Router._instance;
  }

  static navigate(path = '') {
    history.pushState(null, null, '/' + Router.clearSlashes(path));
    Router.getInstance().route();
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

  route() {
    const activeRoute = Router.getRoute();
    if (this.current === activeRoute) {
      return;
    }

    this.current = activeRoute;

    const foundRoute = this.routes.find((watchedRoute) => {
      return typeof watchedRoute.route === 'string'
        ? Router.clearSlashes(activeRoute) === Router.clearSlashes(watchedRoute.route)
        : route.match(watchedRoute.route);
    });

    if (foundRoute) {
      foundRoute.handler(activeRoute);
    } else {
      this.fallback();
    }
  }

  listen() {
    this.route();
    window.addEventListener('popstate', () => this.route());
  };
};
