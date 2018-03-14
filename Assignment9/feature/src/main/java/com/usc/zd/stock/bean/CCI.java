package com.usc.zd.stock.bean;

import java.util.Date;

public class CCI extends StockEntity {

    private Double cci;
    private Date date;

    public CCI(Double cci, Date date) {
        this.cci = Double.valueOf(cci);
        this.date = (Date) date.clone();
    }

    public Double getCci() {
        return Double.valueOf(cci);
    }

    public void setCci(Double cci) {
        this.cci = cci;
    }

    public Date getDate() {
        return (Date) date.clone();
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
