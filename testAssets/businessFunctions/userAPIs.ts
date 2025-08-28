import * as endpoints from "../test-data/env-endpoints.json";
import { getAPI, postAPI } from "../../helper/apiRequests";
import * as userData from "../test-data/user-data.json";

export default class UserApis {
  static async getAllBrands() {
    const responseArray = await getAPI(endpoints.brands, true);
    return responseArray;
  }

  static async registerUser(email) {
    userData.createUserData.email = email;
    // const data = {
    //   client_invoice_bundles: userData,
    // };
    const responseArray = await postAPI(
      endpoints.registerUser,
      userData.createUserData
    );
    return responseArray;
  }
}
