import refs from "./refs";
import cardMarkup from "../templates/card.hbs";
import API from "./services/apiService.js";
import loadLightBox from "./components/lightbox.js";
import button from "./components/button.js";
import spinner from "./components/spinner.js";

refs.searchForm.addEventListener("submit", findCards);
refs.button.addEventListener("click", loadMoreCards);

// функція для відмальовки розмітки галереї, приховує кнопку, яка довантажує фото //

function renderCard(cardName) {
  const marcup = cardMarkup(cardName);
  refs.gallery.insertAdjacentHTML("beforeend", marcup);
  button.show();
  refs.gallery.addEventListener("click", loadLightBox);
}

// функція пошуку картинок //

function findCards(event) {
  event.preventDefault();

  button.hide();
  spinner.show();

  const input = refs.searchForm;
  API.query = input.elements.query.value;
  clearInput();
  searchLastPage();
}

// функція для завантаження більшої к-ті картинок

function loadMoreCards() {
  button.hide();
  spinner.show();
  API.incrementPage();
  searchLastPage();
}

// функція для очистки форми //

function clearInput() {
  refs.gallery.innerHTML = "";
  API.resetPage();
}

// функція для перевірки на останню сторінку

function searchLastPage() {
  API.fetchCards()
    .then((data) => {
      renderCard(data);
      spinner.hide();
      if (API.isLastPage) {
        button.hide();
      }
      if (API.page > 1) {
        window.scrollBy({
          top: window.innerHeight - 40,
          behavior: "smooth",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
