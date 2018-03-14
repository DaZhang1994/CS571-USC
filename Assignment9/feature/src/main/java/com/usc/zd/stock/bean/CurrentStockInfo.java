package com.usc.zd.stock.bean;

/**
 * Created by dazha on 2017/11/20.
 */

public class CurrentStockInfo extends StockEntity {

    private StockInfo stockInfo;
    private Double change;
    private Double changePercent;
    private Double openPrice;
    private Double prevClose;
    private String range;
    private Double high;
    private Double low;

    public CurrentStockInfo(StockInfo stockInfo, Double change, Double changePercent, Double openPrice, Double prevClose, Double high, Double low) {
        this.stockInfo = (StockInfo) stockInfo.clone();
        this.change = Double.valueOf(change);
        this.changePercent = Double.valueOf(changePercent);
        this.openPrice = Double.valueOf(openPrice);
        this.prevClose = Double.valueOf(prevClose);
        this.high = Double.valueOf(high);
        this.low = Double.valueOf(low);
        this.range = this.low + " - " + this.high;
    }

    public StockInfo getStockInfo() {
        return stockInfo;
    }

    public Double getChange() {
        return Double.valueOf(change);
    }

    public Double getChangePercent() {
        return Double.valueOf(changePercent);
    }

    public Double getOpenPrice() {
        return Double.valueOf(openPrice);
    }

    public Double getPrevClose() {
        return Double.valueOf(prevClose);
    }

    public String getRange() {
        return String.valueOf(range);
    }

    public Double getHigh() {
        return Double.valueOf(high);
    }

    public Double getLow() {
        return Double.valueOf(low);
    }

    protected Object clone() {
        CurrentStockInfo currentStockInfo = null;
        try {
            currentStockInfo = (CurrentStockInfo) super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        assert currentStockInfo != null;
        currentStockInfo.stockInfo = (StockInfo) stockInfo.clone();
        currentStockInfo.change = Double.valueOf(change);
        currentStockInfo.changePercent = Double.valueOf(changePercent);
        currentStockInfo.openPrice = Double.valueOf(openPrice);
        currentStockInfo.prevClose = Double.valueOf(prevClose);
        currentStockInfo.high = Double.valueOf(high);
        currentStockInfo.low = Double.valueOf(low);
        currentStockInfo.range = String.valueOf(range);
        return currentStockInfo;
    }

    public void setStockInfo(StockInfo stockInfo) {
        this.stockInfo = stockInfo;
    }

    public void setChange(Double change) {
        this.change = change;
    }

    public void setChangePercent(Double changePercent) {
        this.changePercent = changePercent;
    }

    public void setOpenPrice(Double openPrice) {
        this.openPrice = openPrice;
    }

    public void setPrevClose(Double prevClose) {
        this.prevClose = prevClose;
    }

    public void setRange(String range) {
        this.range = range;
    }

    public void setHigh(Double high) {
        this.high = high;
    }

    public void setLow(Double low) {
        this.low = low;
    }
}
