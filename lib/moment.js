let GlobalMoment;

export default async function loadMoment() {
  if (!GlobalMoment) {
    const {default: moment} = await import('moment');
    const {default: locale} = await import(/* webpackInclude: /ru\.js$/ */ `moment/locale/${LANG}`);
    moment.locale(LANG);
    GlobalMoment = moment;
  }
  return GlobalMoment;
}
