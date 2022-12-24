import HomePage from "../views/pages/homePage";
import DetailRestaurantPage from "../views/pages/detailRestaurantPage";
import FavoriteRestaurantPage from "../views/pages/favoriteRestaurantPage";

const routes = {
  "/": HomePage, // default page
  "/homepage": HomePage,
  "/detail/:id": DetailRestaurantPage,
  "/favorite": FavoriteRestaurantPage,
};

export default routes;
