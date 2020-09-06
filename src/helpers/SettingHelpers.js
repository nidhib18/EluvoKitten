import { storeData, getData } from "../helpers/StorageHelpers";
import { constants } from "../resources/Constants";
import { Auth } from "aws-amplify";

// We need to pass this.props.navigation, so that navigation happens only after user details has completed saving
 export const  saveUserSettings = async (userId) => {
   console.log("Starting save user setting");
   var jwt;
  await Auth.currentSession().then((res) => {
        let accessToken = res.getAccessToken();
        jwt = accessToken.getJwtToken();
        storeData(constants.JWTKEY, jwt);
   });
   let url = constants.GETUSERSETTINGS_DEV_URL.replace("[userId]", userId);
   console.log(url);
    //Get user details for the logged in user
   await fetch(url, {
      //calling API
      method: "GET",
      headers: {
        Authorization: "Bearer " + jwt, //Passing this will authorize the user
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        return responseData;
      })
      .then((data) => {
        console.log("Auth Helpers Save user setting", data);
        storeData(constants.USERSETTINGS, JSON.stringify(data)); // Convert user details object returned by API to a string and add to storage so that user details can be accessed on any screen without calling API again
        //nav.navigate("Home");
      })
      .catch((err) => console.log(err));

 
};
