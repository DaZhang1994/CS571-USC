package com.usc.zd.stock.bean;

import java.lang.reflect.Array;
import java.util.ArrayList;

/**
 * Created by dazha on 2017/11/21.
 */

public class Autocomplete extends StockEntity {
    private String letters;
    private ArrayList<String> autoItems;

    public  Autocomplete(){
        
    }

    public Autocomplete(String letters, ArrayList<String> autoItems){
        this.letters = String.valueOf(letters);
        this.autoItems = autoItems;
    }

    public String getLetters() {
        return String.valueOf(letters);
    }

    public void setLetters(String letters) {
        this.letters = letters;
    }

    public ArrayList<String> getAutoItems() {
        ArrayList<String> stockInfos = new ArrayList<String>();
        for(String autoItem : this.autoItems) {
            stockInfos.add(String.valueOf(autoItem));
        }
        return stockInfos;
    }

    public void setAutoItems(ArrayList<String> autoItems) {
        this.autoItems = autoItems;
    }
}
