package com.usc.zd.stock.bean;

import java.util.ArrayList;
import java.util.Date;

public class SMA extends StockEntity {

    private Double sma;
    private Date date;

    public SMA(Double sma, Date date) {
        this.sma = Double.valueOf(sma);
        this.date = (Date) date.clone();
    }

    public Double getSma() {
        return Double.valueOf(sma);
    }

    public void setSma(Double sma) {
        this.sma = sma;
    }

    public Date getDate() {
        return (Date) date.clone();
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
