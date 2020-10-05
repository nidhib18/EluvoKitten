import { storeData, getData } from "../helpers/StorageHelpers";
import { constants } from "../resources/Constants";
import { Auth } from "aws-amplify";

// We need to pass this.props.navigation, so that navigation happens only after user details has completed saving
 export const  saveUserDetails = async (username) => {
   console.log("Starting save user details");
   var jwt;
  await Auth.currentSession().then((res) => {
        let accessToken = res.getAccessToken();
        jwt = accessToken.getJwtToken();
        storeData(constants.JWTKEY, jwt);
   });

   console.log("Auth Helpers", username);
    //Get user details for the logged in user
   await fetch(constants.USERDETAILS_DEV_URL + username, {
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
        console.log("Auth Helpers Save user details", data);
        storeData(constants.USERDETAILS, JSON.stringify(data)); // Convert user details object returned by API to a string and add to storage so that user details can be accessed on any screen without calling API again
        //nav.navigate("Home");
      })
      .catch((err) => console.log(err));

  console.log("**finishing Save USER Details**")
};