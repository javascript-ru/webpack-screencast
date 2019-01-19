import './image.css';

export const Image = (link) => {
  const imageElement = document.createElement('img');
  imageElement.classList.add('image');
  imageElement.src = link;
  return imageElement;
};
