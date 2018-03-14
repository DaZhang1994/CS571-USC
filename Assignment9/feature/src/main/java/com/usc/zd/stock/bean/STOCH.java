package com.usc.zd.stock.bean;

import java.util.Date;

public class STOCH extends StockEntity {

    private Double slowK;
    private Double slowD;
    private Date date;

    public STOCH(Double slowK, Double slowD, Date date) {
        this.slowK = Double.valueOf(slowK);
        this.slowD = Double.valueOf(slowD);
        this.date = (Date) date.clone();
    }

    public Double getSlowK() {
        return Double.valueOf(slowK);
    }

    public void setSlowK(Double slowK) {
        this.slowK = slowK;
    }

    public Double getSlowD() {
        return Double.valueOf(slowD);
    }

    public void setSlowD(Double slowD) {
        this.slowK = slowD;
    }

    public Date getDate() {
        return (Date) date.clone();
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
