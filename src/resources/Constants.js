export const constants = {
  JWTKEY: "@jwt",

  NOTAUTHORISED_EXCEPTION: "NotAuthorizedException",
  USERNOTFOUND_EXCEPTION: "UserNotFoundException",
  USERNAMEEXISTS_EXCEPTION:"UsernameExistsException",
  USERDETAILS: "@userdetails",
  CURRENTDATE: "currentDate",
  USERSETTINGS: "usersettings",
  APPOINTMENT: "appointment",
  NO_OF_YEARS: 5 ,
  PERIODPRODUCTS_LISTID: 8,
  BOWELSYMPTOMS:9,
  EXERCISETYPE_LISTID:10,
  FOODTYPE_LISTID:12,
  SEXUALACTIVITY_LISTID:11,





  /* API URls */
    USERDETAILS_DEV_URL:
    "https://bzi87na9hg.execute-api.ap-southeast-2.amazonaws.com/DEV/userdetails?userName=",
    USERPAIN_DEV_URL:
    "https://kcxtvx9cxi.execute-api.ap-southeast-2.amazonaws.com/DEV/symptoms?userId=[userId]&occurredDate=[occurredDate]",
    PAINLOCATIONS_DEV_URL:
    "https://dv4tzoya4d.execute-api.ap-southeast-2.amazonaws.com/DEV/listitems?listId=5",
    ADDUSERPAIN_DEV_URL:
    "https://kkm5v5hx80.execute-api.ap-southeast-2.amazonaws.com/DEV/pain",
    PAINTYPE_DEV_URL:
    "https://dv4tzoya4d.execute-api.ap-southeast-2.amazonaws.com/DEV/listitems?listId=6",

    USERMOOD_DEV_URL: 
    "https://rove497t6i.execute-api.ap-southeast-2.amazonaws.com/DEV/getusermood?userId=[userId]&occurredDate=[occurredDate]",
    ADDUSERMOOD_DEV_URL:
    "https://ztc18x9jg8.execute-api.ap-southeast-2.amazonaws.com/DEV/addusermood",
    MOODDESCRIPTION_DEV_URL:
    "https://dv4tzoya4d.execute-api.ap-southeast-2.amazonaws.com/DEV/listitems?listId=7",

    USERBLOOD_DEV_URL:
    "https://32okmj248c.execute-api.ap-southeast-2.amazonaws.com/DEV/blood?userId=[userId]&occurredDate=[occurredDate]",
    ADDUSERBLOOD_DEV_URL:
    "https://g08zgmf516.execute-api.ap-southeast-2.amazonaws.com/DEV/blood",
    PERIODPRODUCT_DEV_URL:
    "https://dv4tzoya4d.execute-api.ap-southeast-2.amazonaws.com/DEV/listitems?listId=8",

  
    ADDUSERDIGESTION_DEV_URL:
    "https://tuibhqyk4b.execute-api.ap-southeast-2.amazonaws.com/DEV/digestion",
    USERDIGESTION_DEV_URL:
    "https://hdqpvu1gs6.execute-api.ap-southeast-2.amazonaws.com/DEV/digestion?userId=[userId]&occurredDate=[occurredDate]",
    BOWELSYMPTOM_DEV_URL:
    "https://dv4tzoya4d.execute-api.ap-southeast-2.amazonaws.com/DEV/listitems?listId=9",
  
    ADDUSEREXERCISE_DEV_URL:
    "https://4ux2fevvb5.execute-api.ap-southeast-2.amazonaws.com/DEV/exercise",
    USEREXERCISE_DEV_URL:
    "https://5332zg2601.execute-api.ap-southeast-2.amazonaws.com/DEV/exercise?userId=[userId]&occurredDate=[occurredDate]",
    EXERCISETYPE_DEV_URL:
    "https://dv4tzoya4d.execute-api.ap-southeast-2.amazonaws.com/DEV/listitems?listId=10",

  
    ADDUSERSEX_DEV_URL:
    "https://7f1f9t2qe0.execute-api.ap-southeast-2.amazonaws.com/DEV/sex", 
    USERSEX_DEV_URL: 
    "https://zgh7cz93bc.execute-api.ap-southeast-2.amazonaws.com/DEV/getusersex?userId=[userId]&occurredDate=[occurredDate]",
    SEXUALACTIVITY_DEV_URL:
    "https://dv4tzoya4d.execute-api.ap-southeast-2.amazonaws.com/DEV/listitems?listId=11",

  
    ADDUSERDIET_DEV_URL: 
    "https://lwi59gn6j6.execute-api.ap-southeast-2.amazonaws.com/DEV/diet",
    USERDIET_DEV_URL: 
    "https://4u2yruqepb.execute-api.ap-southeast-2.amazonaws.com/DEV/diet?userId=[userId]&occurredDate=[occurredDate]",
    FOODTYPE_DEV_URL:
    "https://dv4tzoya4d.execute-api.ap-southeast-2.amazonaws.com/DEV/listitems?listId=12",

  
    ADDUSERMEDICATION_DEV_URL: 
    "https://dj280krk8i.execute-api.ap-southeast-2.amazonaws.com/DEV/addusermedication",
    USERMEDICATION_DEV_URL:
    "https://0qkeudkka9.execute-api.ap-southeast-2.amazonaws.com/DEV/getusermedication?userId=[userId]&occuredDate=[occuredDate]",
    MEDICATIONSIDEEFFECTS_DEV_URL:
    "https://dv4tzoya4d.execute-api.ap-southeast-2.amazonaws.com/DEV/listitems?listId=13",

    GETUSERSETTINGS_DEV_URL:
    "https://wbgd0fem0e.execute-api.ap-southeast-2.amazonaws.com/DEV/settings?userId=[userId]",

    UPDATEUSERSETTINGS_DEV_URL:
    "https://85n1xoyyu1.execute-api.ap-southeast-2.amazonaws.com/DEV/settings",

    GETWEEKLYCHARTS_DEV_URL:
    "https://1xr9e39ry4.execute-api.ap-southeast-2.amazonaws.com/DEV/weekly?userId=[userId]&DayOfWeek=[DayOfWeek]",

    ADDTAGS_DEV_URL:
    "https://kkeo9fr2pg.execute-api.ap-southeast-2.amazonaws.com/DEV/tags",

    GETTAGS_DEV_URL:
    "https://dv4tzoya4d.execute-api.ap-southeast-2.amazonaws.com/DEV",

    GETMONTHLYCHARTS_DEV_URL:
    "https://1kwl2gipc0.execute-api.ap-southeast-2.amazonaws.com/DEV/monthly?userId=[userId]",

    GETYEARLYCHARTS_DEV_URL:
    "https://ci7tfssnmk.execute-api.ap-southeast-2.amazonaws.com/DEV/yearly?userId=[userId]&no_of_years=[NO_OF_YEARS]",

    NO_OF_YEARS: 5,

    GETAPPOINTMENT_DEV_URL:
    "https://ewan0blk87.execute-api.ap-southeast-2.amazonaws.com/DEV/getappointment?userId=[userId]&appointmentDate=[appointmentDate]",

    ADDAPPOINTMENT_DEV_URL:
    "https://xnho3p0bdg.execute-api.ap-southeast-2.amazonaws.com/DEV/addappointment",

    UPDATEAPPOINTMENT_DEV_URL:
    "https://mtm2pz3j8l.execute-api.ap-southeast-2.amazonaws.com/DEV/updateappointment",
   
    GETALLAPPOINTMENTS_DEV_URL:
      "https://ewan0blk87.execute-api.ap-southeast-2.amazonaws.com/DEV/getappointment?userId=[userId]",
    GETEDITAPPOINTMENT_DEV_URL:
      "https://ewan0blk87.execute-api.ap-southeast-2.amazonaws.com/DEV/getappointment?userId=[userId]&appointmentId=[appointmentId]",

};