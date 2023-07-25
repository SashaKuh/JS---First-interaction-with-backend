import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Loading, Report } from 'notiflix';

const elements = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info')
};

const createMarkupCatInfo = (cat) => `
  <div class="thumb-pic">
    <img src="${cat.url}" alt="${cat.id}" height="350" />
  </div>
  <div class="thumb">
    <h1>${cat.breeds[0].name}</h1>
    <p><b>Description:</b> ${cat.breeds[0].description}</p>
    <p><b>Temperament:</b> ${cat.breeds[0].temperament}</p>
  </div>`;

const handleBreedSelectChange = (evt) => {
  evt.preventDefault();
  Loading.standard('Loading data, please wait...');
  const breedSelectId = elements.breedSelect.value;

  fetchCatByBreed(breedSelectId)
    .then(cat => {
      Loading.remove();
      elements.catInfo.innerHTML = createMarkupCatInfo(cat);
    })
    .catch(error => {
      console.error(error);
      Report.failure('Oops! Something went wrong! ');
    });
};

fetchBreeds()
  .then(data => {
    console.log(data);
    const option = data.map(({ id, name }) => `<option value="${id}">${name}</option>`);
    elements.breedSelect.innerHTML = option;
    Loading.remove();
  })
  .catch(() => {
    Report.failure('Oops! Something went wrong! ');
  });

elements.breedSelect.addEventListener('change', handleBreedSelectChange);
