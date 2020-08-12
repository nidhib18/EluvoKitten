import { storeData, getData } from "../helpers/StorageHelpers";
import { constants } from "../resources/Constants";


 export const getUserMood = () => {
    let userId = this.state.userDetails.user_id;
    let url = constants.USERMOOD_DEV_URL.replace("[userId]", userId).replace(
      "[occurredDate]",
      localToUtcDateTime(this.state.currentDate)
    );
    console.log("Url is", url);
    getData(constants.JWTKEY).then((jwt) =>
      fetch(url, {
        //calling API
        method: "GET",
        headers: {
          Authorization: "Bearer " + jwt, //Passing this will authorize the user
        },
      })
        .then((response) => response.json())

        .then((responseData) => {
          // If responseData is not empty, then isPainDataAvailable = true
          console.log(responseData);
          if (Object.keys(responseData).length) {
            this.setState({
              isMoodDataAvailable: true,
              painDetails: responseData.pain,
            });
          } else {
            this.setState({
              isMoodDataAvailable: false,
              
            });
          }
        })
        .catch((err) => console.log(err))
    );
  }
 
