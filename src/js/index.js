import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Loading, Report } from 'notiflix';

const elements = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info')
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
  elements.catInfo.style.display = 'none'; 
  Loading.standard('Loading data, please wait...');

  const breedSelectId = elements.breedSelect.value;

  fetchCatByBreed(breedSelectId)
    .then(cat => {
      Loading.remove();
      elements.catInfo.innerHTML = createMarkupCatInfo(cat);
      elements.catInfo.style.display = 'block'; 
    })
    .catch(error => {
      console.error(error);
      Report.failure('Oops! Something went wrong!');
      Loading.remove();
      elements.catInfo.style.display = 'block'; 
    });
};

fetchBreeds()
  .then(data => {
    const option = data.map(({ id, name }) => `<option value="${id}">${name}</option>`);
    elements.breedSelect.innerHTML = option;
    Loading.remove();
    elements.breedSelect.style.display = 'block'; 
  })
  .catch(() => {
    Report.failure('Oops! Something went wrong!');
    Loading.remove();
    elements.breedSelect.style.display = 'block'; 
  });

elements.breedSelect.addEventListener('change', handleBreedSelectChange);