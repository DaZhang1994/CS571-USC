package com.usc.zd.stock.adapter;

import android.content.Context;
import android.support.v4.app.FragmentActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.usc.zd.stock.bean.CurrentStockInfo;
import com.usc.zd.stock.feature.R;

import java.text.SimpleDateFormat;

/**
 * Created by dazha on 2017/11/22.
 */

public class StockDetailsAdapter extends BaseAdapter {

    private FragmentActivity activity;
    private LayoutInflater inflater;
    private CurrentStockInfo currentStockInfo;

    public StockDetailsAdapter(FragmentActivity activity, CurrentStockInfo currentStockInfo)
    {
        this.activity = activity;
        this.currentStockInfo = currentStockInfo;
    }

    @Override
    public int getCount() {
        return 8;
    }

    @Override
    public Object getItem(int position) {
        switch (position){
            case 0:
                return currentStockInfo.getStockInfo().getSymbol();
            case 1:
                return currentStockInfo.getStockInfo().getPrice();
            case 2:
                return currentStockInfo.getChange() + " (" + currentStockInfo.getChangePercent() + "%)";
            case 3:
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                return sdf.format(currentStockInfo.getStockInfo().getDate()) + " EDT";
            case 4:
                return currentStockInfo.getOpenPrice();
            case 5:
                return currentStockInfo.getPrevClose();
            case 6:
                return currentStockInfo.getRange();
            case 7:
                return currentStockInfo.getStockInfo().getVolume();
            default:
                return null;
        }
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
            if (position != 2) {
                convertView = inflater.inflate(R.layout.row_stock_details, null);
            }
            else {
                convertView = inflater.inflate(R.layout.row_stock_details_change, null);
                ImageView changeIcon = (ImageView) convertView.findViewById(R.id.changeico_stock_details_row);
                if(currentStockInfo.getChange() > 0) {
                    changeIcon.setImageDrawable(activity.getDrawable(R.mipmap.up_change));
                }
                else{
                    changeIcon.setImageDrawable(activity.getDrawable(R.mipmap.down_change));
                }
            }
        }
        TextView subtitle = (TextView) convertView.findViewById(R.id.subtitle_stock_details_row);
        TextView content = (TextView) convertView.findViewById(R.id.content_stock_details_row);
        switch (position) {
            case 0:
                subtitle.setText("Stock Symbol");
                break;
            case 1:
                subtitle.setText("Last Price");
                break;
            case 2:
                subtitle.setText("Change");
                break;
            case 3:
                subtitle.setText("Timestamp");
                break;
            case 4:
                subtitle.setText("Open");
                break;
            case 5:
                subtitle.setText("Close");
                break;
            case 6:
                subtitle.setText("Day's Range");
                break;
            case 7:
                subtitle.setText("Volume");
                break;
            default:
                break;
        }
        content.setText(String.valueOf(getItem(position)));
        return convertView;
    }
}
