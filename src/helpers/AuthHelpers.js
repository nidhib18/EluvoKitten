import { storeData, getData } from "../helpers/StorageHelpers";
import { constants } from "../resources/Constants";
import { Auth } from "aws-amplify";
export const saveUserDetails = (username) => 
{
    Auth.currentSession().then((res) => {
        let accessToken = res.getAccessToken();
        let jwt = accessToken.getJwtToken();
        storeData(constants.JWTKEY, jwt);

        //Get user details for the logged in user
        fetch(constants.USERDETAILS_DEV_URL + username, {  //calling API
          method: "GET",
          headers: {
            Authorization: "Bearer " + jwt,  //Passing this will authorize the user 
          },
        })
        .then(response => response.json()) 
        .then(responseData =>  {
          return responseData;
        })
        .then(data => {
          console.log(data);
          storeData(constants.USERDETAILS,JSON.stringify(data)); // Convert user details object returned by API to a string and add to storage so that user details can be accessed on any screen without calling API again
          

        })
        .catch((err) =>
          console.log(err)
      );
      
        
      })
}