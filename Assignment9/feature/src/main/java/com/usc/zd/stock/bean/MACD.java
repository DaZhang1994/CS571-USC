package com.usc.zd.stock.bean;

import java.util.Date;

public class MACD extends StockEntity {

    private Double macdSignal;
    private Double macdHist;
    private Double macd;
    private Date date;

    public MACD(Double macdSignal, Double macdHist, Double macd, Date date) {
        this.macdSignal = Double.valueOf(macdSignal);
        this.macdHist = Double.valueOf(macdHist);
        this.macd = Double.valueOf(macd);
        this.date = (Date) date.clone();
    }

    public Double getMacdSignal() {
        return Double.valueOf(macdSignal);
    }

    public void setMacdSignal(Double macdSignal) {
        this.macdSignal = macdSignal;
    }

    public Double getMacdHist() {
        return Double.valueOf(macdHist);
    }

    public void setMacdHist(Double macdHist) {
        this.macdHist = macdHist;
    }

    public Double getMacd() {
        return Double.valueOf(macd);
    }

    public void setMacd(Double macd) {
        this.macd = macd;
    }

    public Date getDate() {
        return (Date) date.clone();
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
