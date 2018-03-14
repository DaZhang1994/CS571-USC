package com.usc.zd.stock.bean;

import java.util.Date;

public class News extends StockEntity {

    private String title;
    private String link;
    private String author;
    private String date;

    public News(String title, String link, String author, String date) {
        this.title = String.valueOf(title);
        this.link = String.valueOf(link);
        this.author = String.valueOf(author);
        this.date = String.valueOf(date);
    }

    public String getTitle() {
        return String.valueOf(title);
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLink(){
        return String.valueOf(link);
    }

    public void setLink(String link){
        this.link = link;
    }
    public String getAuthor() {
        return String.valueOf(author);
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDate() {
        return String.valueOf(date);
    }

    public void setDate(String date) {
        this.date = date;
    }
}
