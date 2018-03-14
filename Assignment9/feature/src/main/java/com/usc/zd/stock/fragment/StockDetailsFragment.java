package com.usc.zd.stock.fragment;

import android.annotation.SuppressLint;
import android.content.Context;
import android.net.Uri;
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
import android.widget.AdapterView;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.share.Sharer;
import com.facebook.share.model.ShareLinkContent;
import com.facebook.share.widget.ShareDialog;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.usc.zd.stock.adapter.StockDetailsAdapter;
import com.usc.zd.stock.bean.CurrentStockInfo;
import com.usc.zd.stock.database.DataBase;
import com.usc.zd.stock.feature.R;
import com.usc.zd.stock.feature.StockDetailsActivity;

import java.util.Date;

public class StockDetailsFragment extends Fragment {

    private String symbol;

    private ListView stockDetails;
    private StockDetailsAdapter stockDetailsAdapter;

    private CurrentStockInfo currentStockInfo;

    private String currentStockInfoStr;

    private String recentStockInfoStr;

    private String smaStr;

    private String emaStr;

    private String stochStr;

    private String rsiStr;

    private String adxStr;

    private String cciStr;

    private String bbandsStr;

    private String macdStr;

    private ImageView favorite;
    private ImageView facebook;

    private WebView indicatorChart;

    private Spinner indicatorSelector;

    private TextView title;

    private TextView change;

    private Gson gson;

    private String currentChart = "";

    private Handler stockDetailsHandler;

    private View rootView;

    private ProgressBar progressBarStock;

    private ProgressBar progressBarChart;

    private TextView errorTable;

    private TextView errorChart;

    private String option;

    private ShareDialog shareDialog;

    private CallbackManager callbackManager;

    public StockDetailsFragment() {

    }

    @SuppressLint("HandlerLeak")
    @Override
    public void onAttach(Context context) {
        super.onAttach(context);

        gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();

        stockDetailsHandler = new Handler() {
            public void handleMessage(Message msg) {
                if(msg.getData().keySet().contains("currentStockInfo")) {
                    currentStockInfoStr = msg.getData().get("currentStockInfo").toString();
                    try{
                        currentStockInfo = gson.fromJson(currentStockInfoStr, CurrentStockInfo.class);
                    }
                    catch (Exception e){
                        showErrorTable();
                        e.printStackTrace();
                        return;
                    }
                    stockDetailsAdapter = new StockDetailsAdapter(getActivity(), currentStockInfo);
                    stockDetails.setAdapter(stockDetailsAdapter);
                    enableFavorite();
                    setFavorite();
                    showStockDetails();
                    return;
                }
                else if(msg.getData().keySet().contains("recentStockInfo")){
                    recentStockInfoStr = msg.getData().get("recentStockInfo").toString();
                    if("Price".equals(currentChart)){
                        if("ERROR".equals(recentStockInfoStr)){
                            showErrorChart();
                        }
                        else {
                            showIndicatorChart();
                            drawChart(currentChart);
                        }
                    }
                    return;
                }
                else if(msg.getData().keySet().contains("sma")){
                    smaStr= msg.getData().get("sma").toString();
                    if("SMA".equals(currentChart)){
                        if("ERROR".equals(smaStr)){
                            showErrorChart();
                        }
                        else {
                            showIndicatorChart();
                            drawChart(currentChart);
                        }
                    }
                    return;
                }
                else if(msg.getData().keySet().contains("ema")){
                    emaStr= msg.getData().get("ema").toString();
                    if("EMA".equals(currentChart)){
                        if("ERROR".equals(emaStr)){
                            showErrorChart();
                        }
                        else {
                            showIndicatorChart();
                            drawChart(currentChart);
                        }
                    }
                    return;
                }
                else if(msg.getData().keySet().contains("stoch")){
                    stochStr = msg.getData().get("stoch").toString();
                    if("STOCH".equals(currentChart)){
                        if("ERROR".equals(stochStr)){
                            showErrorChart();
                        }
                        else {
                            showIndicatorChart();
                            drawChart(currentChart);
                        }
                    }
                    return;
                }
                else if(msg.getData().keySet().contains("rsi")){
                    rsiStr = msg.getData().get("rsi").toString();
                    if("RSI".equals(currentChart)){
                        if("ERROR".equals(rsiStr)){
                            showErrorChart();
                        }
                        else {
                            showIndicatorChart();
                            drawChart(currentChart);
                        }
                    }
                    return;
                }
                else if(msg.getData().keySet().contains("adx")){
                    adxStr = msg.getData().get("adx").toString();
                    if("ADX".equals(currentChart)){
                        if("ERROR".equals(adxStr)){
                            showErrorChart();
                        }
                        else {
                            showIndicatorChart();
                            drawChart(currentChart);
                        }
                    }
                    return;
                }
                else if(msg.getData().keySet().contains("cci")){
                    cciStr= msg.getData().get("cci").toString();
                    if("CCI".equals(currentChart)){
                        if("ERROR".equals(cciStr)){
                            showErrorChart();
                        }
                        else {
                            showIndicatorChart();
                            drawChart(currentChart);
                        }
                    }
                    return;
                }
                else if(msg.getData().keySet().contains("bbands")){
                    bbandsStr = msg.getData().get("bbands").toString();
                    if("BBANDS".equals(currentChart)){
                        if("ERROR".equals(bbandsStr)){
                            showErrorChart();
                        }
                        else {
                            showIndicatorChart();
                            drawChart(currentChart);
                        }
                    }
                    return;
                }
                else if(msg.getData().keySet().contains("macd")){
                    macdStr = msg.getData().get("macd").toString();
                    if("MACD".equals(currentChart)){
                        if("ERROR".equals(macdStr)){
                            showErrorChart();
                        }
                        else {
                            showIndicatorChart();
                            drawChart(currentChart);
                        }
                    }
                    return;
                }
            }
        };
        StockDetailsActivity stockDetailsActivity = (StockDetailsActivity) context;
        stockDetailsActivity.setStockHandler(stockDetailsHandler);
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        symbol = getActivity().getIntent().getStringExtra("symbol");

        gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        if (rootView == null) {
            rootView = inflater.inflate(R.layout.fragment_stock_details, container, false);

            title = rootView.findViewById(R.id.stock_details_txt);
            stockDetails = rootView.findViewById(R.id.details_stock);
            favorite = rootView.findViewById(R.id.favorites_stock);
            facebook = rootView.findViewById(R.id.facebook_stock);
            indicatorChart = rootView.findViewById(R.id.indicator_chart_stock);
            indicatorSelector = rootView.findViewById(R.id.indicators_selector_stock);
            change = rootView.findViewById(R.id.change_stock);
            errorTable = rootView.findViewById(R.id.error_details_stock);
            errorChart = rootView.findViewById(R.id.error_indicator_chart_stock);
            progressBarStock = rootView.findViewById(R.id.progress_bar_stock);
            progressBarChart = rootView.findViewById(R.id.progress_bar_chart);


            if(currentStockInfoStr == null){
                displayProgressBar();
            }
            else if("ERROR".equals(currentStockInfoStr)){
                showErrorTable();
            }
            else{
                showStockDetails();

            }

            initLocation();
            initIndicatorSelector();
            initIndicatorChart();
            initFavorite();
            initFacebook();
            initChange();
            initFBButton();
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
//        if(stockDetailsAdapter != null) {
//            stockDetails.setAdapter(stockDetailsAdapter);
//        }
//        drawChart(currentChart);
    }

    private void showErrorTable(){
        errorTable.setVisibility(View.VISIBLE);
        progressBarStock.setVisibility(View.INVISIBLE);
        stockDetails.setVisibility(View.INVISIBLE);
    }

    private void showStockDetails(){
        errorTable.setVisibility(View.INVISIBLE);
        progressBarStock.setVisibility(View.INVISIBLE);
        stockDetails.setVisibility(View.VISIBLE);
    }

    private void showErrorChart(){
        errorChart.setVisibility(View.VISIBLE);
        progressBarChart.setVisibility(View.INVISIBLE);
        indicatorChart.setVisibility(View.INVISIBLE);
    }

    private void showIndicatorChart(){
        errorChart.setVisibility(View.INVISIBLE);
        progressBarChart.setVisibility(View.INVISIBLE);
        indicatorChart.setVisibility(View.VISIBLE);
    }

    private void displayProgressBar(){
        progressBarStock.setVisibility(View.VISIBLE);
    }

    private void dismissProgressBar(){
        progressBarStock.setVisibility(View.INVISIBLE);
    }

    private void displayChartProgressBar(){
        progressBarChart.setVisibility(View.VISIBLE);
    }

    private void dismissChartProgressBar(){
        progressBarChart.setVisibility(View.INVISIBLE);
    }

    private void initFavorite(){
        favorite.setEnabled(false);
        favorite.setAlpha(0.5f);
        favorite.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(DataBase.get(symbol.toUpperCase(), getContext()) == null){
                    favorite.setImageDrawable(getActivity().getDrawable(R.mipmap.filled_star));
                    try{
                        CurrentStockInfo info = gson.fromJson(currentStockInfoStr, CurrentStockInfo.class);
                        info.getStockInfo().setDate(new Date());
                        currentStockInfoStr = new Gson().toJson(info);
                    }
                    catch (Exception e){
                        e.printStackTrace();
                    }
                    DataBase.insert(symbol.toUpperCase(), currentStockInfoStr, getContext());
                }
                else{
                    favorite.setImageDrawable(getActivity().getDrawable(R.mipmap.empty_star));
                    DataBase.delete(symbol.toUpperCase(), getContext());
                }
            }
        });
    }

    private void enableFavorite(){
        favorite.setEnabled(true);
        favorite.setAlpha(1.0f);
    }

    private void setFavorite(){
        if(DataBase.get(symbol.toUpperCase(), getContext()) == null){
            favorite.setImageDrawable(getActivity().getDrawable(R.mipmap.empty_star));
        }
        else{
            favorite.setImageDrawable(getActivity().getDrawable(R.mipmap.filled_star));
        }
    }

    private void initFacebook(){
        facebook.setEnabled(false);
        facebook.setAlpha(0.5f);
    }

    private void initFBButton(){
        FacebookCallback<Sharer.Result> shareCallback = new FacebookCallback<Sharer.Result>() {
            @Override
            public void onCancel() {
                System.out.println("ERROR");
                Toast.makeText(getActivity(), "Post Failed!", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onError(FacebookException error) {
                System.out.println("ERROR");
                Toast.makeText(getActivity(), "Post Failed!", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onSuccess(Sharer.Result result) {
                System.out.println("SUCCESS");
                Toast.makeText(getActivity(), "Post Successfully!", Toast.LENGTH_SHORT).show();
            }
        };

        shareDialog = new ShareDialog(getActivity());
        shareDialog.registerCallback(StockDetailsActivity.callbackManager, shareCallback);
        facebook.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (ShareDialog.canShow(ShareLinkContent.class)){
                    ShareLinkContent content = new ShareLinkContent.Builder()
                            .setContentUrl(Uri.parse("https://export.highcharts.com/" + option))
                            .build();
                    shareDialog.show(content);
                }
            }
        });
    }

    private void enableFacebook(){
        facebook.setEnabled(true);
        facebook.setAlpha(1.0f);
    }

    private void disableFacebook(){
        facebook.setEnabled(false);
        facebook.setAlpha(0.5f);
    }

    private void initLocation(){
        title.setFocusable(true);
        title.setFocusableInTouchMode(true);
        title.requestFocus();
    }

    private void initChange(){
        change.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                disableChange();

                currentChart = indicatorSelector.getSelectedItem().toString();
                drawChart(currentChart);
            }
        });
    }

    private void drawChart(String indicator){
        switch(indicator){
            case "Price":
                if(recentStockInfoStr == null){
                    displayChartProgressBar();
                    disableFacebook();
                }
                else if("ERROR".equals(recentStockInfoStr)) {
                    showErrorChart();
                    disableFacebook();
                }
                else{
                    indicatorChart.loadUrl("file:///android_asset/html/price.html");
                    showIndicatorChart();
                    enableFacebook();
                }
                break;
            case "SMA":
                if(smaStr == null){
                    displayChartProgressBar();
                    disableFacebook();
                }
                else if("ERROR".equals(smaStr)) {
                    showErrorChart();
                    disableFacebook();
                }
                else{
                    indicatorChart.loadUrl("file:///android_asset/html/sma.html");
                    showIndicatorChart();
                    enableFacebook();
                }
                break;
            case "EMA":
                if(emaStr == null){
                    displayChartProgressBar();
                    disableFacebook();
                }
                else if("ERROR".equals(emaStr)) {
                    showErrorChart();
                    disableFacebook();
                }
                else{
                    indicatorChart.loadUrl("file:///android_asset/html/ema.html");
                    showIndicatorChart();
                    enableFacebook();
                }
                break;
            case "STOCH":
                if(stochStr == null){
                    displayChartProgressBar();
                    disableFacebook();
                }
                else if("ERROR".equals(stochStr)) {
                    showErrorChart();
                    disableFacebook();
                }
                else{
                    indicatorChart.loadUrl("file:///android_asset/html/stoch.html");
                    showIndicatorChart();
                    enableFacebook();
                }
                break;
            case "RSI":
                if(rsiStr == null){
                    displayChartProgressBar();
                    disableFacebook();
                }
                else if("ERROR".equals(rsiStr)) {
                    showErrorChart();
                    disableFacebook();
                }
                else{
                    indicatorChart.loadUrl("file:///android_asset/html/rsi.html");
                    showIndicatorChart();
                    enableFacebook();
                }
                break;
            case "ADX":
                if(adxStr == null){
                    displayChartProgressBar();
                    disableFacebook();
                }
                else if("ERROR".equals(adxStr)) {
                    showErrorChart();
                    disableFacebook();
                }
                else{
                    indicatorChart.loadUrl("file:///android_asset/html/adx.html");
                    showIndicatorChart();
                    enableFacebook();
                }
                break;
            case "CCI":
                if(cciStr == null){
                    displayChartProgressBar();
                    disableFacebook();
                }
                else if("ERROR".equals(cciStr)) {
                    showErrorChart();
                    disableFacebook();
                }
                else{
                    indicatorChart.loadUrl("file:///android_asset/html/cci.html");
                    showIndicatorChart();
                    enableFacebook();
                }
                break;
            case "BBANDS":
                if(bbandsStr == null){
                    displayChartProgressBar();
                    disableFacebook();
                }
                else if("ERROR".equals(bbandsStr)) {
                    showErrorChart();
                    disableFacebook();
                }
                else{
                    indicatorChart.loadUrl("file:///android_asset/html/bbands.html");
                    showIndicatorChart();
                    enableFacebook();
                }
                break;
            case "MACD":
                if(macdStr == null){
                    displayChartProgressBar();
                    disableFacebook();
                }
                else if("ERROR".equals(macdStr)) {
                    showErrorChart();
                    disableFacebook();
                }
                else{
                    indicatorChart.loadUrl("file:///android_asset/html/macd.html");
                    showIndicatorChart();
                    enableFacebook();
                }
                break;
            default:
                break;
        }
    }

    private void disableChange(){
        change.setEnabled(false);
        change.setAlpha(0.5f);
    }

    private void enableChange(){
        change.setEnabled(true);
        change.setAlpha(1.0f);
    }

    private void initIndicatorSelector(){
        indicatorSelector.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                if(!indicatorSelector.getSelectedItem().toString().equals(currentChart)){
                    enableChange();
                }
                else{
                    disableChange();
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });
    }

    @SuppressLint("SetJavaScriptEnabled")
    private void initIndicatorChart(){
        indicatorChart.getSettings().setJavaScriptEnabled(true);
//        indicatorChart.getSettings().setAppCacheEnabled(true);
//        indicatorChart.getSettings().setCacheMode(WebSettings.LOAD_DEFAULT);
        indicatorChart.getSettings().setDomStorageEnabled(true);
        indicatorChart.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return true;
            }
        });
        indicatorChart.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onJsAlert(WebView view, String url, String message, JsResult result)
            {
                return super.onJsAlert(view, url, message, result);
            }
        });
        indicatorChart.addJavascriptInterface(this, "parameter");
    }

    @JavascriptInterface
    public String getCurrentStockInfoStr() {
        return currentStockInfoStr;
    }

    @JavascriptInterface
    public String getRecentStockInfoStr() {
        return recentStockInfoStr;
    }

    @JavascriptInterface
    public String getSmaStr() {
        return smaStr;
    }

    @JavascriptInterface
    public String getEmaStr() {
        return emaStr;
    }

    @JavascriptInterface
    public String getStochStr() {
        return stochStr;
    }

    @JavascriptInterface
    public String getRsiStr() {
        return rsiStr;
    }

    @JavascriptInterface
    public String getAdxStr() {
        return adxStr;
    }

    @JavascriptInterface
    public String getCciStr() {
        return cciStr;
    }

    @JavascriptInterface
    public String getBbandsStr() {
        return bbandsStr;
    }

    @JavascriptInterface
    public String getMacdStr() {
        return macdStr;
    }

    @JavascriptInterface
    public String getSymbol(){
        return symbol;
    }

    @JavascriptInterface
    public void getChartOptions(String option){
        this.option = option;
        System.out.println("AAAAAAAAAAAAA");
        System.out.println(option);
    }
}
