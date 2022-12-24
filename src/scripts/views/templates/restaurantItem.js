import CONFIG from "../../globals/config";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

const restaurantItem = (restaurant) => /* html */ `
<article class="lazyload">
<a href="/#/detail/${restaurant.id}">
  <div class="card">
    <div class="card-header">
      <img class="lazyload" data-src="${CONFIG.SMALL_BASE_IMAGE_URL}${restaurant.pictureId}" alt="${restaurant.name}">
      <div class="card-header-caption">${restaurant.city}</div>
    </div>
    <div class="card-detail">
      <h4><b>⭐️ ${restaurant.rating}</b></h4>
      <h2>${restaurant.name}</h2>
      <p>${restaurant.description}</p>
    </div>
  </div>
  </a>
</article>
`;

// eslint-disable-next-line import/prefer-default-export
export { restaurantItem };
