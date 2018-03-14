package com.usc.zd.stock.bean;

import java.util.Date;

public class ADX extends StockEntity {

    private Double adx;
    private Date date;

    public ADX(Double adx, Date date) {
        this.adx = Double.valueOf(adx);
        this.date = (Date) date.clone();
    }

    public Double getAdx() {
        return Double.valueOf(adx);
    }

    public void setAdx(Double adx) {
        this.adx = adx;
    }

    public Date getDate() {
        return (Date) date.clone();
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
