import UrlParser from "../../routes/url-parser";
import RestaurantDbSource from "../../data/restaurantdb-source";
import { DetailRestaurant } from "../templates/detailRestaurant";
import LikeButtonInitiator from "../../utils/like-button-initiator";
import FavoriteRestaurantIdb from "../../data/favorite-restaurant-idb";

const DetailRestaurantPage = {
  async render() {
    return `
    <div class="detail-page">Fetch Data Detail
    </div>
    <div id="likeButtonContainer"></div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurants = await RestaurantDbSource.detailRestaurant(url.id);
    const restaurantDetail = document.querySelector(".detail-page");

    document.querySelector(".jumbotron").style.display = "none";

    restaurantDetail.innerHTML = DetailRestaurant(restaurants.restaurant);
    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurants: {
        id: restaurants.restaurant.id,
        name: restaurants.restaurant.name,
        description: restaurants.restaurant.description,
        pictureId: restaurants.restaurant.pictureId,
        city: restaurants.restaurant.city,
        rating: restaurants.restaurant.rating,
      },
    });
  },
};

export default DetailRestaurantPage;
