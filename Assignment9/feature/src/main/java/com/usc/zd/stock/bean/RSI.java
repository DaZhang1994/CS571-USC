package com.usc.zd.stock.bean;

import java.util.Date;

public class RSI extends StockEntity {

    private Double rsi;
    private Date date;

    public RSI(Double rsi, Date date) {
        this.rsi = Double.valueOf(rsi);
        this.date = (Date) date.clone();
    }

    public Double getRsi() {
        return Double.valueOf(rsi);
    }

    public void setRsi(Double rsi) {
        this.rsi = rsi;
    }

    public Date getDate() {
        return (Date) date.clone();
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
