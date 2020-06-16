import moment from "moment";

export const utcToLocal = (utcDate) => {
  return moment.utc(utcDate).local().format("YYYY-MM-DD");
};

export const localToUtcDate = (localDate) => {
    return moment(localDate).utc().format('YYYY-MM-DD');
}

export const localToUtcDateTime = (localDate) => {
    return moment(localDate).utc().toISOString();
}