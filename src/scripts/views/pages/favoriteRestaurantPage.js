import FavoriteRestaurantIdb from "../../data/favorite-restaurant-idb";
import { restaurantItem } from "../templates/restaurantItem";

const FavoriteRestaurantPage = {
  async render() {
    return `
    <h1>Your Favorite Restaurant</h1>
    <div class="restaurant-list__not__found">
      <h3>Anda belum menambahkan restaurant favorit</h3>
    </div>
    <div class="restaurant-list"></div>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector(".restaurant-list");
    const restaurantNotFound = document.querySelector(
      ".restaurant-list__not__found"
    );

    document.querySelector(".jumbotron").style.display = "none";

    if (restaurants.length !== 0) {
      restaurantNotFound.innerHTML = "";
    }
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += restaurantItem(restaurant);
    });
  },
};

export default FavoriteRestaurantPage;
