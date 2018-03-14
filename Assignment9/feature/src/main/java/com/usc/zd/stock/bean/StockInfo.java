package com.usc.zd.stock.bean;

import java.util.Date;



public class StockInfo extends StockEntity {

    private String symbol;
    private Double price;
    private Long volume;
    private Date date;

    public StockInfo(String symbol, Double price, Long volume, Date date) {
        this.symbol = String.valueOf(symbol);
        this.price = Double.valueOf(price);
        this.volume = Long.valueOf(volume);
        this.date = (Date) date.clone();
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setVolume(Long volume) {
        this.volume = volume;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getSymbol() {
        return String.valueOf(symbol);
    }

    public Double getPrice() {
        return Double.valueOf(price);
    }

    public Long getVolume() {
        return Long.valueOf(volume);
    }

    public Date getDate() {
        return (Date) date.clone();
    }

    protected Object clone() {
        StockInfo stockInfo = null;
        try {
            stockInfo = (StockInfo) super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        if (stockInfo != null) {
            stockInfo.symbol = String.valueOf(symbol);
            stockInfo.price = Double.valueOf(price);
            stockInfo.volume = Long.valueOf(volume);
            stockInfo.date = (Date) date.clone();
        }
        return stockInfo;
    }
}
