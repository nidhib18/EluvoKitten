export const constants = {
  JWTKEY: "@jwt",

  NOTAUTHORISED_EXCEPTION: "NotAuthorizedException",
  USERNOTFOUND_EXCEPTION: "UserNotFoundException",
  USERDETAILS: "@userdetails",
  CURRENTDATE: "currentDate",

  /* API URls */
  USERDETAILS_DEV_URL:
    "https://bzi87na9hg.execute-api.ap-southeast-2.amazonaws.com/DEV/userdetails?userName=",
  USERPAIN_DEV_URL:
    "https://fpvzw0lz9i.execute-api.ap-southeast-2.amazonaws.com/DEV/pain?userId=[userId]&occurredDate=[occurredDate]",
  PAINLOCATIONS_DEV_URL:
    "https://dv4tzoya4d.execute-api.ap-southeast-2.amazonaws.com/DEV/listitems?listId=5",
  ADDUSERPAIN_DEV_URL:
  "https://kkm5v5hx80.execute-api.ap-southeast-2.amazonaws.com/DEV/pain",
  PAINTYPE_DEV_URL:
  "https://dv4tzoya4d.execute-api.ap-southeast-2.amazonaws.com/DEV/listitems?listId=6",

  USERMOOD_DEV_URL: 
  "https://rove497t6i.execute-api.ap-southeast-2.amazonaws.com/DEV/mood?userId=[userId]&occurredDate=[occurredDate]",
  ADDUSERMOOD_DEV_URL:
  "https://ztc18x9jg8.execute-api.ap-southeast-2.amazonaws.com/DEV/mood",
  MOODDESCRIPTION_DEV_URL:
  "https://dv4tzoya4d.execute-api.ap-southeast-2.amazonaws.com/DEV/listitems?listId=7"

};
