import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Loading, Report } from 'notiflix';

const elements = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader')
};

elements.breedSelect.classList.add('hidden');
Loading.standard('Loading data, please wait...');

const createMarkupCatInfo = (cat) => `
<div class="container">
    <div class="thumb-pic">
        <img src="${cat.url}" alt="${cat.id}" height="350" />
    </div>
    <div class="thumb">
        <h1>${cat.breeds[0].name}</h1>
        <p>${cat.breeds[0].description}</p>
        <p><b>Temperament:</b> ${cat.breeds[0].temperament}</p>
    </div>
</div>`;

const handleBreedSelectChange = (evt) => {
  evt.preventDefault();
  elements.breedSelect.classList.add('hidden'); 
  elements.catInfo.innerHTML = ''; 
  Loading.standard('Loading data, please wait...');
  const breedSelectId = elements.breedSelect.value;

  fetchCatByBreed(breedSelectId)
    .then(cat => {
      Loading.remove();
      elements.catInfo.innerHTML = createMarkupCatInfo(cat); 
      elements.breedSelect.classList.remove('hidden');
    })
    .catch(error => {
      console.error(error);
      Report.failure('Oops! Something went wrong! ');
      elements.breedSelect.classList.remove('hidden'); 
    })
    .finally(() => Loading.remove());
};

fetchBreeds()
  .then(data => {
    console.log(data);
    const option = data.map(({ id, name }) => `<option value="${id}">${name}</option>`);
    elements.breedSelect.innerHTML = option;
    Loading.remove();
    elements.breedSelect.classList.remove('hidden'); 
  })
  .catch(() => {
    Report.failure('Oops! Something went wrong! ');
    elements.breedSelect.classList.remove('hidden'); 
  });

elements.breedSelect.addEventListener('change', handleBreedSelectChange);
