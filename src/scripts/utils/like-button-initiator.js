import FavoriteRestaurantIdb from "../data/favorite-restaurant-idb";
import {
  LikeButtonTemplate,
  LikedButtonTemplate,
} from "../views/templates/likeButtonTemplate";

const LikeButtonInitiator = {
  async init({ likeButtonContainer, restaurants }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurants = restaurants;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurants;
    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    const restaurants = await FavoriteRestaurantIdb.getRestaurant(id);
    // console.log(restaurants.restaurant);
    return !!restaurants;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = LikeButtonTemplate();

    const likeButton = document.querySelector("#likeButton");
    likeButton.addEventListener("click", async () => {
      await FavoriteRestaurantIdb.putRestaurant(this._restaurants);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = LikedButtonTemplate();

    const likeButton = document.querySelector("#likeButton");
    likeButton.addEventListener("click", async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(this._restaurants.id);
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
