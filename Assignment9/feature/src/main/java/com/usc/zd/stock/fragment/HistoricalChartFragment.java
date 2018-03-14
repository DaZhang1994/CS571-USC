package com.usc.zd.stock.fragment;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.android.volley.DefaultRetryPolicy;
import com.usc.zd.stock.feature.R;
import com.usc.zd.stock.feature.StockDetailsActivity;

/**
 * Created by dazha on 2017/11/22.
 */

public class HistoricalChartFragment extends Fragment {

    private DefaultRetryPolicy defaultRetryPolicy;

    private String symbol;

    private String allStockInfoStr;

    private WebView historicalChart;

    private Handler historyHandler;

    private View rootView;

    private TextView errorHistory;

    private ProgressBar progressBar;

    @SuppressLint("HandlerLeak")
    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        historyHandler = new Handler() {
            public void handleMessage(Message msg) {
                if(msg.getData().keySet().contains("all")) {
                    allStockInfoStr = msg.getData().get("all").toString();
                    if("ERROR".equals(allStockInfoStr)){
                        showErrorHistory();
                    }
                    else {
                        showHistoryChart();
                        historicalChart.loadUrl("file:///android_asset/html/history.html");
                    }
                }
            }
        };
        StockDetailsActivity stockDetailsActivity = (StockDetailsActivity) context;
        stockDetailsActivity.setHistoryHandler(historyHandler);
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        symbol = getActivity().getIntent().getStringExtra("symbol");
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        if(rootView == null) {
            rootView = inflater.inflate(R.layout.fragment_historical_chart, container, false);
            historicalChart = (WebView) rootView.findViewById(R.id.chart_history);
            errorHistory = rootView.findViewById(R.id.error_history);
            progressBar = rootView.findViewById(R.id.progress_bar_history);

            if(allStockInfoStr == null){
                showProgressBar();
            }
            else{
                dismissProgressBar();
            }

            initHistoricalChart();
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
//        if(allStockInfoStr != null){
//            historicalChart.loadUrl("file:///android_asset/html/history.html");
//        }
    }

    private void showProgressBar(){
        progressBar.setVisibility(View.VISIBLE);
    }

    private void dismissProgressBar(){
        progressBar.setVisibility(View.INVISIBLE);
    }

    private void showErrorHistory(){
        dismissProgressBar();
        errorHistory.setVisibility(View.VISIBLE);
        historicalChart.setVisibility(View.INVISIBLE);
    }

    private void showHistoryChart(){
        dismissProgressBar();
        errorHistory.setVisibility(View.INVISIBLE);
        historicalChart.setVisibility(View.VISIBLE);
    }

    private void initHistoricalChart(){
        historicalChart.getSettings().setJavaScriptEnabled(true);
//        indicatorChart.getSettings().setAppCacheEnabled(true);
//        indicatorChart.getSettings().setCacheMode(WebSettings.LOAD_DEFAULT);
        historicalChart.getSettings().setDomStorageEnabled(true);
        historicalChart.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return true;
            }
        });
        historicalChart.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onJsAlert(WebView view, String url, String message, JsResult result)
            {
                return super.onJsAlert(view, url, message, result);
            }
        });
        historicalChart.addJavascriptInterface(this, "parameter");
    }

    @JavascriptInterface
    public String getSymbol(){
        return symbol;
    }

    @JavascriptInterface
    public String getAllStockInfoStr() {
        return allStockInfoStr;
    }
}
