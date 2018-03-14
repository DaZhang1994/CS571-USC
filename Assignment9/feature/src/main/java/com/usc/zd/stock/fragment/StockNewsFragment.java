package com.usc.zd.stock.fragment;


import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.toolbox.StringRequest;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.usc.zd.stock.adapter.NewsAdapter;
import com.usc.zd.stock.bean.News;
import com.usc.zd.stock.feature.R;
import com.usc.zd.stock.feature.StockDetailsActivity;

import java.util.ArrayList;

/**
 * Created by dazha on 2017/11/22.
 */

public class StockNewsFragment extends Fragment {

    private DefaultRetryPolicy defaultRetryPolicy;

    private ListView news;
    private NewsAdapter newsAdapter;

    private StringRequest newsReq;
    private ArrayList<News> newsList;
    private String newsStr;

    private String symbol;

    private Handler newsHandler;

    private View rootView;

    private TextView errorNews;

    private ProgressBar progressBar;


    @SuppressLint("HandlerLeak")
    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        newsHandler = new Handler() {
            public void handleMessage(Message msg) {
                if(msg.getData().keySet().contains("news")) {
                    newsStr = msg.getData().get("news").toString();
                    if("ERROR".equals(newsStr)){
                        showErrorNews();
                    }
                    else {
                        try {
                            newsList = new ArrayList<News>();
                            JsonArray arr = new JsonParser().parse(newsStr).getAsJsonArray();
                            if(arr.size() == 0){
                                showErrorNews();
                                return;
                            }
                            for (JsonElement jsonElement : arr) {
                                newsList.add(new Gson().fromJson(jsonElement, News.class));
                            }
                            showNews();
                            newsAdapter = new NewsAdapter(getActivity(), newsList);
                            news.setAdapter(newsAdapter);
                        }
                        catch (Exception e){
                            e.printStackTrace();
                            showErrorNews();
                        }
                    }
                }
            }
        };
        StockDetailsActivity stockDetailsActivity = (StockDetailsActivity) context;
        stockDetailsActivity.setNewsHandler(newsHandler);
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        symbol = getActivity().getIntent().getStringExtra("symbol");
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        if (rootView == null) {
            rootView = inflater.inflate(R.layout.fragment_stock_news, container, false);
            news = (ListView) rootView.findViewById(R.id.news);
            errorNews = rootView.findViewById(R.id.error_news);
            progressBar = rootView.findViewById(R.id.progress_bar_news);

            if(newsStr == null) {
                showProgressBar();
            }
            else{
                dismissProgressBar();
            }

            news.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> adapterView, View view, int position, long id) {
                    Intent intent = new Intent(Intent.ACTION_VIEW);
                    intent.setData(Uri.parse(newsList.get(position).getLink()));
                    startActivity(intent);
                }
            });
        }

        ViewGroup parent = (ViewGroup) rootView.getParent();
        if (parent != null) {
            parent.removeView(rootView);
        }
        return rootView;
    }

    @Override
    public void onResume() {
        super.onResume();
        if(newsAdapter != null){
            news.setAdapter(newsAdapter);
        }
    }

    private void showProgressBar(){
        progressBar.setVisibility(View.VISIBLE);
    }

    private void dismissProgressBar(){
        progressBar.setVisibility(View.INVISIBLE);
    }

    private void showErrorNews(){
        dismissProgressBar();
        errorNews.setVisibility(View.VISIBLE);
        news.setVisibility(View.INVISIBLE);
    }

    private void showNews(){
        dismissProgressBar();
        errorNews.setVisibility(View.INVISIBLE);
        news.setVisibility(View.VISIBLE);
    }
}
