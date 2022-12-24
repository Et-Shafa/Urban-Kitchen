/* eslint-disable no-undef */
import FavoriteRestaurantSearchPresenter from "../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-presenter";
import FavoriteRestaurantIdb from "../src/scripts/data/favorite-restaurant-idb";

describe("Searching restaurants", () => {
  let presenter;
  let favoriteRestaurants;

  const searchRestaurant = (query) => {
    const queryElement = document.getElementById("query");
    queryElement.value = query;
    queryElement.dispatchEvent(new Event("change"));
  };

  const setRestaurantSearchContainer = () => {
    document.body.innerHTML = `
      <div id="restaurant-search-container">
        <input id="query" type="text">
        <div class="restaurant-result-container">
          <ul class="restaurants">
          </ul>
        </div>
      </div>
    `;
  };
  const constructPresenter = () => {
    favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe("When query is not empty", () => {
    it("should be able to capture the query typed by the user", () => {
      searchRestaurant("restaurant a");
      expect(presenter.latestQuery).toEqual("restaurant a");
    });

    it("should ask the model to search for liked restaurants", () => {
      searchRestaurant("restaurant a");
      // expect(FavoriteRestaurantIdb.searchRestaurant).toHaveBeenCalledWith(
      //   "restaurant a"
      // );
      expect(favoriteRestaurants.searchRestaurant).toHaveBeenCalledWith(
        "restaurant a"
      );
    });

    it("should show the found restaurants", () => {
      presenter._showFoundRestaurants([{ id: 1 }]);
      const foundRestaurants = document.querySelectorAll(".restaurant");
      expect(foundRestaurants.length).toEqual(1);
    });

    it("should show the name of the found restaurants", () => {
      presenter._showFoundRestaurants([{ id: 1, name: "Satu" }]);
      expect(
        document.querySelectorAll(".restaurant__name").item(0).textContent
      ).toEqual("Satu");
    });

    it("should show the name of the found restaurants", () => {
      presenter._showFoundRestaurants([{ id: 1, name: "Satu" }]);
      expect(
        document.querySelectorAll(".restaurant__name").item(0).textContent
      ).toEqual("Satu");
      presenter._showFoundRestaurants([
        { id: 1, name: "Satu" },
        { id: 2, name: "Dua" },
      ]);
      const restaurantNames = document.querySelectorAll(".restaurant__name");
      expect(restaurantNames.item(0).textContent).toEqual("Satu");
      expect(restaurantNames.item(1).textContent).toEqual("Dua");
    });

    it("should show - for found restaurant without name", () => {
      presenter._showFoundRestaurants([{ id: 1 }]);
      expect(
        document.querySelectorAll(".restaurant__name").item(0).textContent
      ).toEqual("-");
    });

    it("should show the restaurant found by Favorite Restaurant", (done) => {
      document
        .getElementById("restaurant-search-container")
        .addEventListener("restaurants:searched:updated", () => {
          expect(document.querySelectorAll(".restaurant").length).toEqual(3);
          done();
        });
      favoriteRestaurants.searchRestaurant
        .withArgs("restaurant a")
        .and.returnValues([
          { id: 111, name: "restaurant a" },
          { id: 222, name: "restaurant b" },
          { id: 333, name: "restaurant c" },
        ]);

      searchRestaurant("restaurant a");
    });

    it("should show the name of the restaurants found by Favorite Restaurants", (done) => {
      document
        .getElementById("restaurant-search-container")
        .addEventListener("restaurants:searched:updated", () => {
          const restaurantNames =
            document.querySelectorAll(".restaurant__name");
          expect(restaurantNames.item(0).textContent).toEqual("restaurant a");
          expect(restaurantNames.item(1).textContent).toEqual("restaurant b");
          expect(restaurantNames.item(2).textContent).toEqual("restaurant c");

          done();
        });

      favoriteRestaurants.searchRestaurant
        .withArgs("restaurant a")
        .and.returnValues([
          { id: 111, name: "restaurant a" },
          { id: 222, name: "restaurant b" },
          { id: 333, name: "restaurant c" },
        ]);

      searchRestaurant("restaurant a");
    });
  });

  describe("When query is empty", () => {
    it("should capture the query as empty", () => {
      searchRestaurant(" ");

      expect(presenter.latestQuery.length).toEqual(0);
    });

    it("should show all favorite restaurants", () => {
      searchRestaurant("    ");
      // expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
    });
  });

  describe("When no favorite restaurants could be found", () => {
    it("should show the empty message", (done) => {
      document
        .getElementById("restaurant-search-container")
        .addEventListener("restaurants:searched:updated", () => {
          expect(
            document.querySelectorAll(".restaurants__not__found").length
          ).toEqual(1);
          done();
        });

      favoriteRestaurants.searchRestaurant
        .withArgs("restaurant a")
        .and.returnValues([]);

      searchRestaurant("restaurant a");
    });

    it("should not show any restaurant", (done) => {
      document
        .getElementById("restaurant-search-container")
        .addEventListener("restaurants:searched:updated", () => {
          expect(document.querySelectorAll(".restaurant").length).toEqual(0);
          done();
        });
      favoriteRestaurants.searchRestaurant
        .withArgs("restaurant a")
        .and.returnValues([]);
      searchRestaurant("restaurant a");
    });
  });
});
