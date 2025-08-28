// import * as countryCode from "../helper/countryCode.json"
export default class GenericHelper {
    constructor() {
    }

    static getNumberValueOfCurrency(currency) {
        console.log("currency value is ", currency);
        console.log("type of currency is ", typeof(currency));        
        const number = this.getNumberValueOfString(currency);
        return number;
    }

    static getNumberValueOfString(value) {
        if(typeof(value != String)){
            value = value + "";
        }
        const formattedString = value.replace(/[^0-9.-]+/g, "");
        const number = Number(formattedString);
        return number;
    }

    // static getCountryNameForCode(code){
    //     const countryName = countryCode[code];
    //     return countryName;        
    // }

}