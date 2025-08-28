import * as endpoints from "../test-data/env-endpoints.json";
import { getAPI, postAPI, putAPI } from "../../helper/apiRequests";

export default class ProductsApis {
  static async getAllBrands() {
    const responseArray = await getAPI(endpoints.brands, true);
    return responseArray;
  }

  static async getProductByColor(color) {
    let filter = `?color=${color}`;
    const responseArray = await getAPI(`${endpoints.products}${filter}`);
    return responseArray;
  }
}
