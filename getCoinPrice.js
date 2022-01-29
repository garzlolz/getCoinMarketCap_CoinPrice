const CoinMarketCap_apiToken = '[Your Token]'
const sheetName = 'BIT Buy';
const coinName = 'bit';
const fiatCurrency = 'USD';
const sheetRow = 4;
const sheetColumn = 2;

// Set your google sheet range to your coin's price
function getCoinPrice() {
    var getData = (coin) => {
        let url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${coin}`;
        const requestOptions = {
            method: 'GET',
            uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
            qs: {
                'start': '1',
                'limit': '5000',
                'convert': fiatCurrency
            },
            headers: {
                'X-CMC_PRO_API_KEY': CoinMarketCap_apiToken
            },
            json: true,
            gzip: true
        };

        let respone = UrlFetchApp.fetch(url, requestOptions);
        return JSON.parse(respone.getContentText());
    }
    //FetchUrl is for google spreadsheet if not , Change your request to another method!
    if (!sheetName) return console.log('Change FetchUrl To Another Request!');
    var responsePrice = getData(coinName.toUpperCase()).data[coinName.toUpperCase()].quote[fiatCurrency.toUpperCase()].price;
    var nowTime = () => {
        let d = new Date();
        return 'update at ' + d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.toLocaleTimeString();
    }
    //if you change the request method just delete these downside code
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);
    var sheetRange = sheet.getRange(sheetRow, sheetColumn);

    var resetRangePrice = (lastPrice) => {
        sheetRange.clearContent();
        sheetRange.setValue(lastPrice);
        sheetRange.setNote(nowTime());
        return lastPrice;
    }
    console.log(resetRangePrice(responsePrice));
}










