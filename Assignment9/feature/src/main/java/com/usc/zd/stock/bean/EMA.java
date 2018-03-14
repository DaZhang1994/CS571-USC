package com.usc.zd.stock.bean;

import java.util.Date;

public class EMA extends StockEntity {

    private Double ema;
    private Date date;

    public EMA(Double ema, Date date) {
        this.ema = Double.valueOf(ema);
        this.date = (Date) date.clone();
    }

    public Double getEma() {
        return Double.valueOf(ema);
    }

    public void setEma(Double ema) {
        this.ema = ema;
    }

    public Date getDate() {
        return (Date) date.clone();
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
