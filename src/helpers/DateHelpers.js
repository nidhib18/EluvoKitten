import moment from "moment";

export const utcToLocal = (utcDate) =>
{
    return moment.utc(utcDate).local().format("YYYY-MM-DD");
    
} 