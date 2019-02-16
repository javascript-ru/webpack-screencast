import router from 'lib/router';

// https://github.com/webpack/webpack/issues/8637
export default async function (pageModule) {
  if (module.hot) {
    module.hot.accept([
      '../pages/item',
      '../pages/error',
      '../pages/main',
      '../pages/itemsList'
    ], () => router.route(true));
  }

  switch (pageModule) {
    case 'item':
      return (await import('../pages/item')).default;
    case 'itemsList':
      return (await import('../pages/itemsList')).default;
    case 'main':
      return (await import('../pages/main')).default;
    case 'error':
      return (await import('../pages/error')).default;
    default:
      console.error('Unexpected page name!');
      break;
  }
}
