export default class Random {
  static getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  static getRandomMobileNumber() {
    const countryCode = "1";
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const firstDigits = Math.floor(Math.random() * 900) + 100;
    const lastDigits = Math.floor(Math.random() * 9000) + 1000;

    return `${countryCode}${areaCode}${firstDigits}${lastDigits}`;
  }

  static getRandomLetters(length) {
    let letters = "abcdefghijklmnopqrstuvwxyz",
      str = "";

    for (let i = 0; i < length; i++) {
      str += letters[Math.floor(Math.random() * letters.length)];
    }

    return str;
  }

  static getRandomAlphaNumeric(length) {
    let letters = "abcdefghijklmnopqrstuvwxyz0123456789",
      str = "";

    for (let i = 0; i < length; i++) {
      str += letters[Math.floor(Math.random() * letters.length)];
    }

    return str;
  }

  static getRandomMailsac() {
    const length = 10;
    let letters = "abcdefghijklmnopqrstuvwxyz0123456789",
      str = "";
    for (let i = 0; i < length; i++) {
      str += letters[Math.floor(Math.random() * letters.length)];
    }
    const email = str + "@mailsac.com";
    console.log("Random mailsac email is: ", email);
    return email;
  }

  static getRandomPassword(minLength) {
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let str = "";
    for (let i = 0; i < minLength/2; i++) {
      str += lower[Math.floor(Math.random() * lower.length)];
    }

    let symbols = "@#$%&";
    for (let i = 0; i < 2; i++) {
      str += symbols[Math.floor(Math.random() * symbols.length)];
    }

    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < minLength/2; i++) {
      str += upper[Math.floor(Math.random() * upper.length)];
    }

    str += this.getRandomNumber(1,2);

    return str;
  }

}