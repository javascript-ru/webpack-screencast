// http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url

const clearSlashes = path => path.toString().replace(/\/$/, '').replace(/^\//, '').trim();

const getRoute = (root) => {
  const {pathname, search} = location;
  const route = clearSlashes(decodeURI(pathname + search)).replace(/\?(.*)$/, '');
  return clearSlashes(route);
};

const checkRoute = (routes, fallback) => (route = getRoute()) => {
  const found = routes.some(({regexp, handler}) => {
    const exact = typeof regexp === 'string';
    const match = exact ? clearSlashes(route) === clearSlashes(regexp) : route.match(regexp);
    if (match) {
      handler(!exact && match[1]);
      return true;
    }
  });
  if (!found) fallback();
};

class SimpleRouter {
  constructor() {
    this.fallbackHandler = null;
    this.current = getRoute();
    this.routes = [];

    this.fallback = this.fallback.bind(this);
  }

  watch(regexp, handler) {
    this.routes.push({regexp, handler});
    return this;
  };

  fallback(handler) {
    this.fallbackHandler = handler;
    return this;
  }

  listen() {
    const routing = checkRoute(this.routes, this.fallbackHandler);
    routing(getRoute());

    const listener = (a) => {
      const activeRoute = getRoute();
      if (this.current !== activeRoute) {
        this.current = activeRoute;
        routing(activeRoute);
      }
    };

    window.onpopstate = listener;
    window.removeEventListener('routing', listener);
    window.addEventListener('routing', listener);
    return this;
  };

  navigate(path = '') {
    history.pushState(null, null, '/' + clearSlashes(path));
    window.dispatchEvent(new CustomEvent('routing'));
  };
};

export const router = new SimpleRouter();
