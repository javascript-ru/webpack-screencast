export default async function loadMoment() {
  const {default: moment} = await import('moment');
  const {default: locale} = await import(/* webpackInclude: /ru.js$/ */ `moment/locale/${LANG}`);
  moment.locale(LANG);
}
