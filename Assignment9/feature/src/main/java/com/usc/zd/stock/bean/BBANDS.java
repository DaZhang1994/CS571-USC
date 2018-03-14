package com.usc.zd.stock.bean;

import java.util.Date;

public class BBANDS extends StockEntity {

    private Double lowerBand;
    private Double middleBand;
    private Double upperBand;
    private Date date;

    public BBANDS(Double lowerBand, Double middleBand, Double upperBand, Date date) {
        this.lowerBand = Double.valueOf(lowerBand);
        this.middleBand = Double.valueOf(middleBand);
        this.upperBand = Double.valueOf(upperBand);
        this.date = (Date) date.clone();
    }

    public Double getLowerBand() {
        return Double.valueOf(lowerBand);
    }

    public void setLowerBand(Double lowerBand) {
        this.lowerBand = lowerBand;
    }

    public Double getMiddleBand() {
        return Double.valueOf(middleBand);
    }

    public void setMiddleBand(Double middleBand) {
        this.middleBand = middleBand;
    }

    public Double getUpperBand() {
        return Double.valueOf(upperBand);
    }

    public void setUpperBand(Double upperBand) {
        this.upperBand = upperBand;
    }

    public Date getDate() {
        return (Date) date.clone();
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
