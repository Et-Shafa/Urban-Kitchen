import RestaurantDbSource from "../../data/restaurantdb-source";
import { restaurantItem } from "../templates/restaurantItem";

const HomePage = {
  async render() {
    return /* html */ `
        
    <h1>Explore Restaurant</h1>
    <div class="restaurant-list"></div>

    
      `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    const restaurants = await RestaurantDbSource.listRestaurant();
    const restaurantsList = document.querySelector(".restaurant-list");

    document.querySelector(".jumbotron").style.display = "block";
    restaurants.forEach((restaurant) => {
      restaurantsList.innerHTML += restaurantItem(restaurant);
    });
  },
};

export default HomePage;
