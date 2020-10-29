export class Stock {
    [symbol: string]: StockDetails
}

export class StockDetails {
    symbol: string;
    description: string;
    currency: string;
    exchange: string;
    assetType: string;
    cusip: string;
}
