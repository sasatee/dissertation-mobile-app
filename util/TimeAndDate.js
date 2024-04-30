import moment from "moment";
export const getDays = () => {
  const nextSevenDays = [];

  for (let i = 0; i < 7; i++) {
    const date = moment().add(i, "days");
    nextSevenDays.push({
      date: date,
      day: date.format("ddd"),
      formattedDate: date.format("Do MMM"),
    });
  }

  setNext7Days(nextSevenDays);
};

export const getTime = () => {
  const timeList = [];
  for (let i = 8; i <= 12; i++) {
    timeList.push({
      time: i + ":00 AM",
    });
    timeList.push({
      time: i + ":30 AM",
    });
  }

  for (let i = 1; i <= 6; i++) {
    timeList.push({
      time: i + ":00 PM",
    });
    timeList.push({
      time: i + ":30 PM",
    });
  }
  setTimeList(timeList);
  //console.log(timeList)
};
