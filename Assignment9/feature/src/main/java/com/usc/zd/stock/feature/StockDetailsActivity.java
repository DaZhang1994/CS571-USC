package com.usc.zd.stock.feature;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.design.widget.TabLayout;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;
import android.widget.ProgressBar;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.facebook.CallbackManager;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.usc.zd.stock.adapter.StockDetailsAdapter;
import com.usc.zd.stock.bean.ADX;
import com.usc.zd.stock.bean.BBANDS;
import com.usc.zd.stock.bean.CCI;
import com.usc.zd.stock.bean.CurrentStockInfo;
import com.usc.zd.stock.bean.EMA;
import com.usc.zd.stock.bean.MACD;
import com.usc.zd.stock.bean.RSI;
import com.usc.zd.stock.bean.SMA;
import com.usc.zd.stock.bean.STOCH;
import com.usc.zd.stock.bean.StockInfo;
import com.usc.zd.stock.fragment.HistoricalChartFragment;
import com.usc.zd.stock.fragment.StockDetailsFragment;
import com.usc.zd.stock.fragment.StockNewsFragment;

public class StockDetailsActivity extends BaseActivity {

    private DefaultRetryPolicy defaultRetryPolicy;

    private StockDetailsAdapter stockDetailsAdapter;
    private ListView stockDetails;

    private CurrentStockInfo currentStockInfo;


    private String symbol;

    private Gson gson;

    private Gson chartGson;

    private Handler stockHandler;
    private Handler historyHandler;
    private Handler newsHandler;

    private ProgressBar progressBar;

    public static CallbackManager callbackManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_stock);

        Toolbar toolbar = findViewById(R.id.toolbar_stock);
        toolbar.getMenu().clear();
        toolbar.setTitle(getIntent().getStringExtra("symbol").toString());
        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });

        SectionsPagerAdapter mSectionsPagerAdapter = new SectionsPagerAdapter(getSupportFragmentManager());

        ViewPager mViewPager = (ViewPager) findViewById(R.id.container);
        mViewPager.setAdapter(mSectionsPagerAdapter);

        TabLayout tabLayout = (TabLayout) findViewById(R.id.tabs);

        mViewPager.addOnPageChangeListener(new TabLayout.TabLayoutOnPageChangeListener(tabLayout));
        mViewPager.setOffscreenPageLimit(2);
        tabLayout.addOnTabSelectedListener(new TabLayout.ViewPagerOnTabSelectedListener(mViewPager));

        defaultRetryPolicy = new DefaultRetryPolicy(30000, 0, 0);

        symbol = getIntent().getStringExtra("symbol");

        gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();

        chartGson = new GsonBuilder().setDateFormat("MM/dd").create();

        callbackManager = CallbackManager.Factory.create();

        fetchCurrentStockInfo();
        fetchRecentStockInfo();
        fetchSMA();
        fetchEMA();
        fetchSTOCH();
        fetchRSI();
        fetchADX();
        fetchCCI();
        fetchBBANDS();
        fetchMACD();
        fetchAllStockInfo();
        fetchNews();

    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        callbackManager.onActivityResult(requestCode, resultCode, data);
    }

    public void setStockHandler(Handler handler){
        this.stockHandler = handler;
    }

    public void setHistoryHandler(Handler handler){
        this.historyHandler = handler;
    }

    public void setNewsHandler(Handler handler){
        this.newsHandler = handler;
    }

    private void fetchCurrentStockInfo(){
        StringRequest currentStockInfoReq = new StringRequest(
                StockDetailsActivity.SERVER_ADDRESS + "?symbol=" + symbol,
                new Response.Listener<String>() {
                    public void onResponse(String response) {
                        sendStockMessage("currentStockInfo", response);
                    }
                },
                new Response.ErrorListener() {
                    public void onErrorResponse(VolleyError error) {
                        sendErrorStockMessage("currentStockInfo");
                        error.printStackTrace();
//                        Toast.makeText(getApplicationContext(), "连接服务器失败", Toast.LENGTH_SHORT).show();
                    }
                });
        currentStockInfoReq.setRetryPolicy(defaultRetryPolicy);
        StockDetailsActivity.queue.add(currentStockInfoReq);
    }

    private void fetchRecentStockInfo(){
        StringRequest recentStockInfoReq = new StringRequest(
                StockDetailsActivity.SERVER_ADDRESS + "RECENT?symbol=" + symbol,
                new Response.Listener<String>() {
                    public void onResponse(String response) {
                        try{
                            JsonArray arr = new JsonParser().parse(response).getAsJsonArray();
                            if(arr.size() == 0){
                                sendErrorStockMessage("recentStockInfo");
                                return;
                            }
                            for (JsonElement jsonElement : arr) {
                                chartGson.fromJson(jsonElement, StockInfo.class);
                            }
                            sendStockMessage("recentStockInfo", response);
                        }
                        catch (Exception e){
                            sendErrorStockMessage("recentStockInfo");
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    public void onErrorResponse(VolleyError error) {
                        sendErrorStockMessage("recentStockInfo");
                        error.printStackTrace();
//                        Toast.makeText(getApplicationContext(), "连接服务器失败", Toast.LENGTH_SHORT).show();
                    }
                });
        recentStockInfoReq.setRetryPolicy(defaultRetryPolicy);
        StockDetailsActivity.queue.add(recentStockInfoReq);
    }

    private void fetchSMA(){
        StringRequest smaReq = new StringRequest(
                StockDetailsActivity.SERVER_ADDRESS + "SMA?symbol=" + symbol,
                new Response.Listener<String>() {
                    public void onResponse(String response) {
                        try{
                            JsonArray arr = new JsonParser().parse(response).getAsJsonArray();
                            if(arr.size() == 0){
                                sendErrorStockMessage("sma");
                                return;
                            }
                            for (JsonElement jsonElement : arr) {
                                chartGson.fromJson(jsonElement, SMA.class);
                            }
                            sendStockMessage("sma", response);
                        }
                        catch (Exception e){
                            sendErrorStockMessage("sma");
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    public void onErrorResponse(VolleyError error) {
                        sendErrorStockMessage("sma");
                        error.printStackTrace();
//                        Toast.makeText(getApplicationContext(), "连接服务器失败", Toast.LENGTH_SHORT).show();
                    }
                });
        smaReq.setRetryPolicy(defaultRetryPolicy);
        StockDetailsActivity.queue.add(smaReq);
    }

    private void fetchEMA(){
        StringRequest emaReq = new StringRequest(
                StockDetailsActivity.SERVER_ADDRESS + "EMA?symbol=" + symbol,
                new Response.Listener<String>() {
                    public void onResponse(String response) {
                        try{
                            JsonArray arr = new JsonParser().parse(response).getAsJsonArray();
                            if(arr.size() == 0){
                                sendErrorStockMessage("ema");
                                return;
                            }
                            for (JsonElement jsonElement : arr) {
                                chartGson.fromJson(jsonElement, EMA.class);
                            }
                            sendStockMessage("ema", response);
                        }
                        catch (Exception e){
                            sendErrorStockMessage("ema");
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    public void onErrorResponse(VolleyError error) {
                        sendErrorStockMessage("ema");
                        error.printStackTrace();
//                        Toast.makeText(getApplicationContext(), "连接服务器失败", Toast.LENGTH_SHORT).show();
                    }
                });
        emaReq.setRetryPolicy(defaultRetryPolicy);
        StockDetailsActivity.queue.add(emaReq);
    }

    private void fetchSTOCH(){
        StringRequest stochReq = new StringRequest(
                StockDetailsActivity.SERVER_ADDRESS + "STOCH?symbol=" + symbol,
                new Response.Listener<String>() {
                    public void onResponse(String response) {
                        try{
                            JsonArray arr = new JsonParser().parse(response).getAsJsonArray();
                            if(arr.size() == 0){
                                sendErrorStockMessage("stoch");
                                return;
                            }
                            for (JsonElement jsonElement : arr) {
                                chartGson.fromJson(jsonElement, STOCH.class);
                            }
                            sendStockMessage("stoch", response);
                        }
                        catch (Exception e){
                            sendErrorStockMessage("stoch");
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    public void onErrorResponse(VolleyError error) {
                        sendErrorStockMessage("stoch");
                        error.printStackTrace();
//                        Toast.makeText(getApplicationContext(), "连接服务器失败", Toast.LENGTH_SHORT).show();
                    }
                });
        stochReq.setRetryPolicy(defaultRetryPolicy);
        StockDetailsActivity.queue.add(stochReq);
    }

    private void fetchRSI(){
        StringRequest rsiReq = new StringRequest(
                StockDetailsActivity.SERVER_ADDRESS + "RSI?symbol=" + symbol,
                new Response.Listener<String>() {
                    public void onResponse(String response) {
                        try{
                            JsonArray arr = new JsonParser().parse(response).getAsJsonArray();
                            if(arr.size() == 0){
                                sendErrorStockMessage("rsi");
                                return;
                            }
                            for (JsonElement jsonElement : arr) {
                                chartGson.fromJson(jsonElement, RSI.class);
                            }
                            sendStockMessage("rsi", response);
                        }
                        catch (Exception e){
                            sendErrorStockMessage("rsi");
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    public void onErrorResponse(VolleyError error) {
                        sendErrorStockMessage("rsi");
                        error.printStackTrace();
//                        Toast.makeText(getApplicationContext(), "连接服务器失败", Toast.LENGTH_SHORT).show();
                    }
                });
        rsiReq.setRetryPolicy(defaultRetryPolicy);
        StockDetailsActivity.queue.add(rsiReq);
    }

    private void fetchADX(){
        StringRequest adxReq = new StringRequest(
                StockDetailsActivity.SERVER_ADDRESS + "ADX?symbol=" + symbol,
                new Response.Listener<String>() {
                    public void onResponse(String response) {
                        try{
                            JsonArray arr = new JsonParser().parse(response).getAsJsonArray();
                            if(arr.size() == 0){
                                sendErrorStockMessage("adx");
                                return;
                            }
                            for (JsonElement jsonElement : arr) {
                                chartGson.fromJson(jsonElement, ADX.class);
                            }
                            sendStockMessage("adx", response);
                        }
                        catch (Exception e){
                            sendErrorStockMessage("adx");
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    public void onErrorResponse(VolleyError error) {
                        sendErrorStockMessage("adx");
                        error.printStackTrace();
//                        Toast.makeText(getApplicationContext(), "连接服务器失败", Toast.LENGTH_SHORT).show();
                    }
                });
        adxReq.setRetryPolicy(defaultRetryPolicy);
        StockDetailsActivity.queue.add(adxReq);
    }

    private void fetchCCI(){
        StringRequest cciReq = new StringRequest(
                StockDetailsActivity.SERVER_ADDRESS + "CCI?symbol=" + symbol,
                new Response.Listener<String>() {
                    public void onResponse(String response) {
                        try{
                            JsonArray arr = new JsonParser().parse(response).getAsJsonArray();
                            if(arr.size() == 0){
                                sendErrorStockMessage("cci");
                                return;
                            }
                            for (JsonElement jsonElement : arr) {
                                chartGson.fromJson(jsonElement, CCI.class);
                            }
                            sendStockMessage("cci", response);
                        }
                        catch (Exception e){
                            sendErrorStockMessage("cci");
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    public void onErrorResponse(VolleyError error) {
                        sendErrorStockMessage("cci");
                        error.printStackTrace();
//                        Toast.makeText(getApplicationContext(), "连接服务器失败", Toast.LENGTH_SHORT).show();
                    }
                });
        cciReq.setRetryPolicy(defaultRetryPolicy);
        StockDetailsActivity.queue.add(cciReq);
    }

    private void fetchBBANDS(){
        StringRequest bbandsReq = new StringRequest(
                StockDetailsActivity.SERVER_ADDRESS + "BBANDS?symbol=" + symbol,
                new Response.Listener<String>() {
                    public void onResponse(String response) {
                        try{
                            JsonArray arr = new JsonParser().parse(response).getAsJsonArray();
                            if(arr.size() == 0){
                                sendErrorStockMessage("bbands");
                                return;
                            }
                            for (JsonElement jsonElement : arr) {
                                chartGson.fromJson(jsonElement, BBANDS.class);
                            }
                            sendStockMessage("bbands", response);
                        }
                        catch (Exception e){
                            sendErrorStockMessage("bbands");
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    public void onErrorResponse(VolleyError error) {
                        sendErrorStockMessage("bbands");
                        error.printStackTrace();
//                        Toast.makeText(getApplicationContext(), "连接服务器失败", Toast.LENGTH_SHORT).show();
                    }
                });
        bbandsReq.setRetryPolicy(defaultRetryPolicy);
        StockDetailsActivity.queue.add(bbandsReq);
    }

    private void fetchMACD(){
        StringRequest macdReq = new StringRequest(
                StockDetailsActivity.SERVER_ADDRESS + "MACD?symbol=" + symbol,
                new Response.Listener<String>() {
                    public void onResponse(String response) {
                        try{
                            JsonArray arr = new JsonParser().parse(response).getAsJsonArray();
                            if(arr.size() == 0){
                                sendErrorStockMessage("macd");
                                return;
                            }
                            for (JsonElement jsonElement : arr) {
                                chartGson.fromJson(jsonElement, MACD.class);
                            }
                            sendStockMessage("macd", response);
                        }
                        catch (Exception e){
                            sendErrorStockMessage("macd");
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    public void onErrorResponse(VolleyError error) {
                        sendErrorStockMessage("macd");
                        error.printStackTrace();
//                        Toast.makeText(getApplicationContext(), "连接服务器失败", Toast.LENGTH_SHORT).show();
                    }
                });
        macdReq.setRetryPolicy(defaultRetryPolicy);
        StockDetailsActivity.queue.add(macdReq);
    }

    private void fetchAllStockInfo(){
        StringRequest allStockInfoReq = new StringRequest(
                StockDetailsActivity.SERVER_ADDRESS + "ALL?symbol=" + symbol,
                new Response.Listener<String>() {
                    public void onResponse(String response) {
                        try{
                            JsonArray arr = new JsonParser().parse(response).getAsJsonArray();
                            if(arr.size() == 0){
                                sendErrorHistoryMessage("all");
                                return;
                            }
                            for (JsonElement jsonElement : arr) {
                                gson.fromJson(jsonElement, StockInfo.class);
                            }
                            sendHistoryMessage("all", response);
                        }
                        catch (Exception e){
                            sendErrorHistoryMessage("all");
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    public void onErrorResponse(VolleyError error) {
                        sendErrorHistoryMessage("all");
                        error.printStackTrace();
//                        Toast.makeText(getApplicationContext(), "连接服务器失败", Toast.LENGTH_SHORT).show();
                    }
                });
        allStockInfoReq.setRetryPolicy(defaultRetryPolicy);
        StockDetailsActivity.queue.add(allStockInfoReq);
    }

    private void fetchNews(){
        StringRequest newsReq = new StringRequest(
                StockDetailsActivity.SERVER_ADDRESS + "NEWS?symbol=" + symbol,
                new Response.Listener<String>() {
                    public void onResponse(String response) {
                        sendNewsMessage("news", response);
                    }
                },
                new Response.ErrorListener() {
                    public void onErrorResponse(VolleyError error) {
                        sendErrorNewsMessage("news");
                        error.printStackTrace();
//                        Toast.makeText(getApplicationContext(), "连接服务器失败", Toast.LENGTH_SHORT).show();
                    }
                });
        newsReq.setRetryPolicy(defaultRetryPolicy);
        StockDetailsActivity.queue.add(newsReq);
    }

    private void sendStockMessage(String key, String msg){
        Message message = new Message();
        Bundle bundle = new Bundle();
        bundle.putString(key, msg);
        message.setData(bundle);
        stockHandler.sendMessage(message);
    }

    private void sendHistoryMessage(String key, String msg){
        Message message = new Message();
        Bundle bundle = new Bundle();
        bundle.putString(key, msg);
        message.setData(bundle);
        historyHandler.sendMessage(message);
    }

    private void sendNewsMessage(String key, String msg){
        Message message = new Message();
        Bundle bundle = new Bundle();
        bundle.putString(key, msg);
        message.setData(bundle);
        newsHandler.sendMessage(message);
    }

    private void sendErrorStockMessage(String key){
        Message message = new Message();
        Bundle bundle = new Bundle();
        bundle.putString(key, "ERROR");
        message.setData(bundle);
        stockHandler.sendMessage(message);
    }

    private void sendErrorHistoryMessage(String key){
        Message message = new Message();
        Bundle bundle = new Bundle();
        bundle.putString(key, "ERROR");
        message.setData(bundle);
        historyHandler.sendMessage(message);
    }

    private void sendErrorNewsMessage(String key){
        Message message = new Message();
        Bundle bundle = new Bundle();
        bundle.putString(key, "ERROR");
        message.setData(bundle);
        newsHandler.sendMessage(message);
    }

    public static class PlaceholderFragment extends Fragment {

        private static final String ARG_SECTION_NUMBER = "section_number";

        public PlaceholderFragment() {

        }

        public static PlaceholderFragment newInstance(int sectionNumber) {
            PlaceholderFragment fragment = new PlaceholderFragment();
            Bundle args = new Bundle();
            args.putInt(ARG_SECTION_NUMBER, sectionNumber);
            fragment.setArguments(args);
            return fragment;
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
            View rootView = inflater.inflate(R.layout.fragment_stock_details, container, false);
            return rootView;
        }
    }

    public class SectionsPagerAdapter extends FragmentPagerAdapter {

        public SectionsPagerAdapter(FragmentManager fm) {
            super(fm);
        }

        @Override
        public Fragment getItem(int position) {
            switch (position){
                case 0:
                    StockDetailsFragment stockDetailsFragment = new StockDetailsFragment();
                    return stockDetailsFragment;
                case 1:
                    HistoricalChartFragment historicalChartFragment = new HistoricalChartFragment();
                    return historicalChartFragment;
                case 2:
                    StockNewsFragment stockNewsFragment = new StockNewsFragment();
                    return stockNewsFragment;
                default:
                    return null;
            }
        }

        @Override
        public int getCount() {
            return 3;
        }

        @Override
        public CharSequence getPageTitle(int position) {
            switch (position){
                case 0:
                    return "STOCK_DETAILS";
                case 1:
                    return "HISTORICAL_CHART";
                case 2:
                    return "STOCK_NEWS";
                default:
                    return null;
            }
        }
    }
}
