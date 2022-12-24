import API_ENDPOINT from "../globals/api-endpoint";

class RestaurantDbSource {
  static async listRestaurant() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();

    return responseJson.restaurants;

    // if (responseJson.restaurants) {
    //   return responseJson.restaurants;
    // }
    // throw new Error("Daftar restaurant kosong.");
    // return responseJson.results;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }

  //   static async getAllResto() {
  //     const jsonResponse = await getData(API_ENDPOINT.LIST);
  //     if (jsonResponse.restaurants) {
  //       return jsonResponse.restaurants;
  //     }
  //     throw new Error('Daftar restaurant kosong.');
  //   }

  //   static async getRestoDetail(id) {
  //     const jsonResponse = await getData(API_ENDPOINT.DETAIL(id));
  //     if (jsonResponse.restaurant) {
  //       return jsonResponse.restaurant;
  //     }
  //     throw new Error('Detail restaurant tidak ditemukan.');
  //   }
}

export default RestaurantDbSource;
