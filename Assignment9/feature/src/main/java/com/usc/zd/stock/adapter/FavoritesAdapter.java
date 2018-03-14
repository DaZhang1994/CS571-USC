package com.usc.zd.stock.adapter;

import android.content.Context;
import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.usc.zd.stock.bean.CurrentStockInfo;
import com.usc.zd.stock.feature.R;

import java.util.LinkedList;

/**
 * Created by dazha on 2017/11/22.
 */

public class FavoritesAdapter extends BaseAdapter {

    private AppCompatActivity activity;
    private LayoutInflater inflater;
    private LinkedList<CurrentStockInfo> favoriteList;

    public FavoritesAdapter(AppCompatActivity activity, LinkedList<CurrentStockInfo> favoriteList)
    {
        this.activity = activity;
        this.favoriteList = favoriteList;
    }

    @Override
    public int getCount() {
        return favoriteList.size();
    }

    @Override
    public Object getItem(int position) {
        return favoriteList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup viewGroup) {
        if(inflater == null){
            inflater = (LayoutInflater) activity.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        }
        if(convertView == null) {
                convertView = inflater.inflate(R.layout.row_favorities, null);
        }
        TextView symbol = convertView.findViewById(R.id.favorite_symbol);
        TextView price =  convertView.findViewById(R.id.favorite_price);
        TextView change = convertView.findViewById(R.id.favorite_change);

        symbol.setText(favoriteList.get(position).getStockInfo().getSymbol());
        price.setText(favoriteList.get(position).getStockInfo().getPrice().toString());
        Double changePrice = favoriteList.get(position).getChange();
        Double changePercent = favoriteList.get(position).getChangePercent();
        if(changePrice > 0){
            change.setTextColor(Color.rgb(0, 100, 0));
        }
        else if(changePrice < 0){
            change.setTextColor(Color.rgb(254, 67, 101));
        }
        change.setText(changePrice + " (" + changePercent + "%)");
        return convertView;
    }
}
