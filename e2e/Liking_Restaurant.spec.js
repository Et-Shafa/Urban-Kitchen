/* eslint-disable no-undef */
const assert = require("assert");

Feature("Liking Restaurant");

Before(({ I }) => {
  I.amOnPage("/#/favorite");
});

Scenario("showing empty liked restaurants", ({ I }) => {
  I.seeElement("#maincontent");
  I.see(
    "Anda belum menambahkan restaurant favorit",
    ".restaurant-list__not__found"
  );
});

Scenario("liking a restaurant", async ({ I }) => {
  I.see(
    "Anda belum menambahkan restaurant favorit",
    ".restaurant-list__not__found"
  );

  I.amOnPage("/");

  I.seeElement(".card-detail h2");

  const firstRestaurant = locate(".card-detail h2").first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);
  // I.click(locate("article a").first());

  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
  I.seeElement(".restaurant-list");

  const likedRestaurantName = await I.grabTextFrom(".card-detail h2");

  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario("unliking a restaurant", async ({ I }) => {
  I.see(
    "Anda belum menambahkan restaurant favorit",
    ".restaurant-list__not__found"
  );

  I.amOnPage("/");

  I.seeElement(".card-detail h2");

  const firstRestaurant = locate(".card-detail h2").first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);
  // I.click(locate("article a").first());

  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
  I.seeElement(".restaurant-list");

  const likedRestaurantName = await I.grabTextFrom(".card-detail h2");

  assert.strictEqual(firstRestaurantName, likedRestaurantName);

  I.click(likedRestaurantName);

  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
  I.seeElement(".restaurant-list");

  const unlikedRestaurantName = await I.grabTextFrom(".card-detail h2");

  assert.strictEqual(firstRestaurantName, unlikedRestaurantName);
});

// Scenario("searching restaurant", async ({ I }) => {
//   I.see(
//     "Anda belum menambahkan restaurant favorit",
//     ".restaurant-list__not__found"
//   );

//   I.amOnPage("/");

//   I.seeElement(".card-detail h2");

//   const names = [];

//   for (let i = 1; i <= 3; i++) {
//     I.click(locate(".card-detail h2").at(i));
//     I.seeElement("#likeButton");
//     I.click("#likeButton");
//     names.push(await I.grabTextFrom(".card-detail h2"));
//     I.amOnPage("/");
//   }

//   I.amOnPage("/#/favorite");
//   I.seeElement(".card-detail h2");

//   const searchQuery = names[1].substring(1, 3);
//   const matchingRestaurants = names.filter(
//     (name) => name.indexOf(searchQuery) !== -1
//   );

//   I.fillField("#query", searchQuery);
//   I.pressKey("Enter");

//   const visibleLikedRestaurants = await I.grabNumberOfVisibleElements(
//     ".card-detail h2"
//   );
//   assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurants);

//   matchingRestaurants.forEach(async (name, index) => {
//     const visibleName = await I.grabTextFrom(
//       locate(".card-detail h2").at(index + 1)
//     );
//     assert.strictEqual(name, visibleName);
//   });
// });
