// TODO: use me everywhere
export default function(template, options) {
  const elem = document.createElement('div');

  elem.innerHTML = template(options);

  return elem.firstElementChild;
};
