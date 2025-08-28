export default class DateTime {
  constructor() {

  }

  static getDateTimeNow() {
    let dateTime = new Date();
    console.log("date now is ", dateTime);
    return dateTime;
  }

  static getTimeNow() {
    let date = new Date();
    let timeNow = date.toLocaleTimeString();
    console.log("time now is ", timeNow);
    return timeNow;
  }

  static getDateNow() {
    let date = new Date();
    let dateNow = date.toLocaleDateString('en-US');
    console.log("Date now is ", dateNow);
    return dateNow;
  }

  static getUpcomingMonth(offset = 1) {
    let d = new Date(),
      monthStart,
      currentMonth = d.getMonth() + 1 + offset, //Months are zero based
      currentYear = d.getFullYear();
    // Offset the year when the month is greater than 12
    currentMonth < 13
      ? (monthStart = currentMonth + "/1/" + currentYear)
      : (monthStart =
        (currentMonth % 12) + "/1/" + (currentYear + ~~(currentMonth / 12)));
    return monthStart;
  }


  static millisecondsToMinutesAndSeconds(milliseconds: number) {
    const totalSeconds = Math.round(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    const time: number = parseFloat(minutes + '.' + (seconds < 10 ? '0' + seconds : seconds));
    return time;
  }

  static millisecondsToHoursAndMinutes(milliseconds: number) {
    const totalMinutes = Math.round(milliseconds / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const time: number = parseFloat(hours + '.' + (minutes < 10 ? '0' + minutes : minutes))
    return time;
  }
  
  //   dateOneMonthAgo() {
  //     let offset = new Date().getTimezoneOffset();
  //     let today = new Date(new Date() - offset * 60 * 1000);
  //     today.setMonth(today.getMonth() - 1);
  //     let dd = today.getDate();
  //     let mm = today.getMonth() + 1;
  //     let yyyy = today.getFullYear();
  //     if (dd < 10) {
  //       dd = "0" + dd;
  //     }
  //     if (mm < 10) {
  //       mm = "0" + mm;
  //     }
  //     return mm + "/" + dd + "/" + yyyy;
  //   }
}