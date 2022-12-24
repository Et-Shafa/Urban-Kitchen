import CONFIG from "../../globals/config";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

const DetailRestaurant = (restaurant) => /* html */ `
<div class="detail-content lazyload" >
    <div class="content-row-one">
        <img class="lazyload" data-src="${CONFIG.SMALL_BASE_IMAGE_URL}${
  restaurant.pictureId
}" alt="${restaurant.name}">
        <div class="description">
            <h2>${restaurant.name}</h2>
            <p>${restaurant.description}</p>
        </div>
    </div>
    <div class="content-row-two">
        <div class="information">
          <table>
            <tr>
              <td >Kota</td>
              <td>: ${restaurant.city}</td>
            </tr>
            <tr>
              <td >Alamat</td>
              <td>: ${restaurant.address}</td>
            </tr>
            <tr>
              <td >Rating</td>
              <td>: ${restaurant.rating}</td>
            </tr>
            <tr>
              <td >Kategori</td>
              <td>: ${restaurant.categories
                .map((category) => `#${category.name}`)
                .join(" ")}</td>
            </tr>
          </table>
        </div>
        <div class="menu-container">
            <h2>Daftar Menu</h2>
            <div class="detail-menu">
                <div class="menu"><h3>Makanan</h3>${restaurant.menus.foods
                  .map((food) => `<li class="menu-item">${food.name}</li>`)
                  .join(" ")}</div>
                <div class="menu"><h3>Minuman</h3>${restaurant.menus.drinks
                  .map((drink) => `<li class="menu-item">${drink.name}</li>`)
                  .join(" ")}</div>
            </div>
        </div>
    </div>
    <div class="content-row-three">
      <h2>Review Pelanggan</h2>
      <div class="review-container">
      ${restaurant.customerReviews
        .map(
          (review) => `<div class="review-item">
          <p class="review-name">${review.name}</p>
          <p class="review-date">${review.date}</p>
          <p class="review-des">${review.review}</p>
          </div>`
        )
        .join(" ")}
        </div>
    </div>
</div>

    
`;

// eslint-disable-next-line import/prefer-default-export
export { DetailRestaurant };
