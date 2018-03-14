package com.usc.zd.stock.adapter;

import android.content.Context;
import android.support.v4.app.FragmentActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.usc.zd.stock.bean.News;
import com.usc.zd.stock.feature.R;

import java.util.ArrayList;

/**
 * Created by dazha on 2017/11/22.
 */

public class NewsAdapter extends BaseAdapter {

    private FragmentActivity activity;
    private LayoutInflater inflater;
    private ArrayList<News> newsList;

    public NewsAdapter(FragmentActivity activity, ArrayList<News> newsList)
    {
        this.activity = activity;
        this.newsList = newsList;
    }

    @Override
    public int getCount() {
        return newsList.size();
    }

    @Override
    public Object getItem(int position) {
        return newsList.get(position);
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
                convertView = inflater.inflate(R.layout.row_news, null);
        }
        TextView title = (TextView) convertView.findViewById(R.id.news_title_row);
        TextView author = (TextView) convertView.findViewById(R.id.news_author_row);
        TextView date = (TextView) convertView.findViewById(R.id.news_date_row);

        title.setText(newsList.get(position).getTitle());
        author.setText("Author: " + newsList.get(position).getAuthor());
        date.setText("Date: " + newsList.get(position).getDate());
        return convertView;
    }
}
