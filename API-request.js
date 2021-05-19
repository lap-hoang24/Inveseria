let request, response, remarks, docs, ACCESS_KEY;


docs = "https://marketstack.com/documentation";

ACCESS_KEY = "75b6f2af2935400d9770adbdadf74a58";




// =================================================================================
//                                   DATA
// =================================================================================


// END OF DAY DATA

request = "http://api.marketstack.com/v1/eod?access_key=75b6f2af2935400d9770adbdadf74a58&symbols=AAPL,TSLA,AMZN"

let response = {
    "pagination": {
        "limit": 100,
        "offset": 0,
        "count": 100,
        "total": 753
    },
    "data": [
        {
            "open": 134.3,
            "high": 134.66,
            "low": 133.28,
            "close": 134.16,
            "volume": 81113424,
            "adj_high": null,
            "adj_low": null,
            "adj_close": 134.16,
            "adj_open": null,
            "adj_volume": null,
            "split_factor": 1,
            "symbol": "AAPL",
            "exchange": "XNAS",
            "date": "2021-04-16T00:00:00+0000"
        },
        {
            "open": 3380,
            "high": 3406.8,
            "low": 3355.5901,
            "close": 3399.4399,
            "volume": 3186049,
            "adj_high": null,
            "adj_low": null,
            "adj_close": 3399.4399,
            "adj_open": null,
            "adj_volume": null,
            "split_factor": 1,
            "symbol": "AMZN",
            "exchange": "XNAS",
            "date": "2021-04-16T00:00:00+0000"
        },
        {
            "open": 728.65,
            "high": 749.408,
            "low": 724.6,
            "close": 739.78,
            "volume": 27635198,
            "adj_high": null,
            "adj_low": null,
            "adj_close": 739.78,
            "adj_open": null,
            "adj_volume": null,
            "split_factor": 1,
            "symbol": "TSLA",
            "exchange": "XNAS",
            "date": "2021-04-16T00:00:00+0000"
        },
    ]
}


// ==================================
// INTRA DAY DATA

request = "http://api.marketstack.com/v1/intraday?access_key=ffeab6a86076cff0f69f0de0983a6058&symbols=TESLA,AAPL,SQ,ETSY,ABNB"


response = {
    "pagination": {
        "limit": 100,
        "offset": 0,
        "count": 100,
        "total": 13320
    },
    "data": [
        {
            "open": 134.15,
            "high": 134.15,
            "low": 134.15,
            "last": null,
            "close": null,
            "volume": null,
            "date": "2021-04-17T00:00:00+0000",
            "symbol": "AAPL",
            "exchange": "IEXG"
        },
        {
            "open": 739.39,
            "high": 739.39,
            "low": 739.39,
            "last": null,
            "close": null,
            "volume": null,
            "date": "2021-04-17T00:00:00+0000",
            "symbol": "TSLA",
            "exchange": "IEXG"
        },
        {
            "open": 219.85,
            "high": 219.85,
            "low": 219.85,
            "last": null,
            "close": null,
            "volume": null,
            "date": "2021-04-17T00:00:00+0000",
            "symbol": "ETSY",
            "exchange": "IEXG"
        },
        {
            "open": 256.115,
            "high": 256.115,
            "low": 256.115,
            "last": null,
            "close": null,
            "volume": null,
            "date": "2021-04-17T00:00:00+0000",
            "symbol": "SQ",
            "exchange": "IEXG"
        },
    ]
}


// ================================




