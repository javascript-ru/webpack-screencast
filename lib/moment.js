// todo: magic comments work only for dynamic
// todo: static import for moment, ignoreplugin in config, analyze stats.json

// https://chrisbateman.github.io/webpack-visualizer/ ? или другой сервис


let GlobalMoment;

require(`moment/locale/${LANG}`);

export default async function loadMoment() {
  if (!GlobalMoment) {
    const {default: moment} = await import('moment');
    const {default: locale} = await import(/* webpackInclude: /ru\.js$/ */ `moment/locale/${LANG}`);
    moment.locale(LANG);
    GlobalMoment = moment;
  }
  return GlobalMoment;
}
