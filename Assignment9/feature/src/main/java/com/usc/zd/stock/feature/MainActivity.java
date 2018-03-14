package com.usc.zd.stock.feature;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.v7.widget.SwitchCompat;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.ContextMenu;
import android.view.MenuItem;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.CompoundButton;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.facebook.login.LoginManager;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.usc.zd.stock.adapter.FavoritesAdapter;
import com.usc.zd.stock.bean.Autocomplete;
import com.usc.zd.stock.bean.CurrentStockInfo;
import com.usc.zd.stock.database.DataBase;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.LinkedList;

public class MainActivity extends BaseActivity {

    private TextView query;
    private TextView clear;
    private AutoCompleteTextView autoComplete;
    private SwitchCompat autoSwitch;
    private ImageView refresh;
    private Spinner sortMethod;
    private Spinner sortOrder;

    private StringRequest stringRequest;

    private Autocomplete auto;
    private ArrayAdapter<String> autoAdapter;

    private Gson gson;

    private static final ArrayList<String> sortMethodList = new ArrayList<String>();
    private static final ArrayList<String> sortOrderList = new ArrayList<String>();

    private LinkedList<CurrentStockInfo> favorList;
    private ListView favoriteList;
    private FavoritesAdapter favoritesAdapter;

    private String method = "Sort by";
    private String order = "Order";

    private DefaultRetryPolicy defaultRetryPolicy;

    private ProgressBar progressBar;

    private int refreshedCount;

    private Handler handler;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();

        defaultRetryPolicy = new DefaultRetryPolicy(30000, 0, 0);

        autoComplete = findViewById(R.id.autocomplete_main);
        query = findViewById(R.id.query_main);
        clear = findViewById(R.id.clear_main);
        autoSwitch = findViewById(R.id.auto_switch_main);
        refresh = findViewById(R.id.refresh_main);
        sortMethod = findViewById(R.id.sort_method_main);
        sortOrder = findViewById(R.id.sort_order_main);
        favoriteList = findViewById(R.id.favorite_list_main);
        progressBar = findViewById(R.id.progress_bar_main);

        initSortMethod();
        initSortOrder();
        initFavoriteList();
        initAutocomplete();
        initQuery();
        initClear();
        initRefresh();
        initAutoRefresh();

        LoginManager.getInstance().logOut();
    }

    @Override
    public boolean onContextItemSelected(MenuItem item) {
        if(item.getItemId() == 1) {
            AdapterView.AdapterContextMenuInfo menuInfo = (AdapterView.AdapterContextMenuInfo) item.getMenuInfo();
            int pos = menuInfo.position;
            DataBase.delete(favorList.get(pos).getStockInfo().getSymbol().toUpperCase(), this);
            favorList.remove(pos);
            sortFavorList();
            displayFavorList();
        }
        return super.onContextItemSelected(item);
    }

    @Override
    protected void onStart() {
        super.onStart();

        createFavorList();
        sortFavorList();
        displayFavorList();
        initHandler();
    }

    @SuppressLint("HandlerLeak")
    private void initHandler() {
        handler = new Handler() {
            @Override
            public void handleMessage(Message msg) {
                displayProgressBar();
                for (CurrentStockInfo info : favorList) {
                    StringRequest infoReq = new StringRequest(
                            StockDetailsActivity.SERVER_ADDRESS + "?symbol=" + info.getStockInfo().getSymbol(),
                            new Response.Listener<String>() {
                                public void onResponse(String response) {
                                    refreshedCount++;
                                    if (refreshedCount == favorList.size()) {
                                        dismissProgressBar();
                                        refreshedCount = 0;
                                        if(autoSwitch.isChecked()){
                                            handler.sendEmptyMessage(0);
                                        }
                                        else{
                                            refresh.setEnabled(true);
                                            refresh.setAlpha(1.0f);
                                        }
                                    }
                                    try {
                                        CurrentStockInfo stock = gson.fromJson(response, CurrentStockInfo.class);
                                        stock.getStockInfo().setDate(new Date());
                                        String stockStr = new Gson().toJson(stock);
                                        DataBase.insert(stock.getStockInfo().getSymbol().toUpperCase(), stockStr, MainActivity.this);
                                    } catch (Exception e) {
                                        e.printStackTrace();
                                    }
                                    createFavorList();
                                    sortFavorList();
                                    displayFavorList();
                                }
                            },
                            new Response.ErrorListener() {
                                public void onErrorResponse(VolleyError error) {
                                    refreshedCount++;
                                    if (refreshedCount == favorList.size()) {
                                        dismissProgressBar();
                                        refreshedCount = 0;
                                        if(autoSwitch.isChecked()){
                                            handler.sendEmptyMessage(0);
                                        }
                                        else{
                                            refresh.setEnabled(true);
                                            refresh.setAlpha(1.0f);
                                        }
                                    }
                                    error.printStackTrace();
//                                    Toast.makeText(getApplicationContext(), "连接服务器失败", Toast.LENGTH_SHORT).show();
                                }
                            });
                    infoReq.setRetryPolicy(defaultRetryPolicy);
                    queue.add(infoReq);
                }
            }
        };
    }

    private void initAutoRefresh(){
        autoSwitch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if(isChecked){
                    refresh.setEnabled(false);
                    refresh.setAlpha(0.5f);
                    handler.sendEmptyMessage(0);
                }
            }
        });
    }

    private void displayProgressBar(){
        progressBar.setVisibility(View.VISIBLE);
    }

    private void dismissProgressBar(){
        progressBar.setVisibility(View.INVISIBLE);
    }

    private void initRefresh(){
        refresh.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                autoSwitch.setEnabled(false);
                autoSwitch.setAlpha(0.5f);
                refresh.setEnabled(false);
                refresh.setAlpha(0.5f);
                displayProgressBar();
                for(CurrentStockInfo info : favorList){
                    StringRequest infoReq = new StringRequest(
                            StockDetailsActivity.SERVER_ADDRESS + "?symbol=" + info.getStockInfo().getSymbol(),
                            new Response.Listener<String>() {
                                public void onResponse(String response) {
                                    refreshedCount++;
                                    if(refreshedCount == favorList.size()){
                                        dismissProgressBar();
                                        refreshedCount = 0;
                                        refresh.setEnabled(true);
                                        refresh.setAlpha(1.0f);
                                        autoSwitch.setEnabled(true);
                                        autoSwitch.setAlpha(1.0f);
                                    }
                                    try {
                                        CurrentStockInfo stock = gson.fromJson(response, CurrentStockInfo.class);
                                        stock.getStockInfo().setDate(new Date());
                                        String stockStr = new Gson().toJson(stock);
                                        DataBase.insert(stock.getStockInfo().getSymbol().toUpperCase(), stockStr, MainActivity.this);
                                    }
                                    catch (Exception e){
                                        e.printStackTrace();
                                    }
                                    createFavorList();
                                    sortFavorList();
                                    displayFavorList();
                                }
                            },
                            new Response.ErrorListener() {
                                public void onErrorResponse(VolleyError error) {
                                    refreshedCount++;
                                    if(refreshedCount == favorList.size()){
                                        dismissProgressBar();
                                        refreshedCount = 0;
                                        refresh.setEnabled(true);
                                        refresh.setAlpha(1.0f);
                                        autoSwitch.setEnabled(true);
                                        autoSwitch.setAlpha(1.0f);
                                    }
                                    error.printStackTrace();
//                                    Toast.makeText(getApplicationContext(), "连接服务器失败", Toast.LENGTH_SHORT).show();
                                }
                            });
                    infoReq.setRetryPolicy(defaultRetryPolicy);
                    queue.add(infoReq);
                }
            }
        });
    }

    private void initClear(){
        clear.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                autoComplete.setText("");
            }
        });
    }

    private void initQuery(){
        query.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if("".equals(autoComplete.getText().toString().trim())){
                    Toast.makeText(getApplicationContext(), "Please input a stock symbol!", Toast.LENGTH_SHORT).show();
                    return;
                }
                Intent intent = new Intent(MainActivity.this, StockDetailsActivity.class);
                intent.putExtra("symbol", autoComplete.getText().toString().toUpperCase());
                autoComplete.setText("");
                hideKeyboard();
                startActivity(intent);
            }
        });
    }

    private void initAutocomplete(){
        autoComplete.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                autoComplete.setText(autoAdapter.getItem(position).split(" ")[0]);
                autoComplete.setSelection(autoComplete.getText().toString().length());
                hideKeyboard();
            }});

        autoComplete.addTextChangedListener(new TextWatcher() {
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {
//                autoComplete.setAdapter(new ArrayAdapter<String>(MainActivity.this, android.R.layout.simple_spinner_dropdown_item));
            }

            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            public void afterTextChanged(Editable editable) {
                stringRequest = new StringRequest(
                        MainActivity.SERVER_ADDRESS + "AUTOCOMPLETE?letters=" + autoComplete.getText(),
                        new Response.Listener<String>() {
                            public void onResponse(String response) {
                                try {
                                    auto = new Gson().fromJson(response, Autocomplete.class);
                                }
                                catch (Exception e){
                                    e.printStackTrace();
                                }
                                autoAdapter = new ArrayAdapter<String>(
                                        MainActivity.this,
                                        android.R.layout.simple_spinner_dropdown_item,
                                        auto.getAutoItems());
                                if(autoComplete.getText().toString().equals(auto.getLetters())) {
                                    autoComplete.setAdapter(autoAdapter);
                                    autoAdapter.notifyDataSetChanged();
                                }
                            }
                        },
                        new Response.ErrorListener() {
                            public void onErrorResponse(VolleyError error) {
                                error.printStackTrace();
//                                Toast.makeText(getApplicationContext(), "连接服务器失败", Toast.LENGTH_SHORT).show();
                            }
                        });
                stringRequest.setRetryPolicy(defaultRetryPolicy);
                queue.add(stringRequest);
            }
        });
    }

    private void initFavoriteList(){
        favoriteList.setOnCreateContextMenuListener(new View.OnCreateContextMenuListener() {
            @Override
            public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {
                menu.setHeaderTitle("Remove from favorites?");
                menu.add(0, 0, 0, "No");
                menu.add(0, 1, 0, "Yes");
            }
        });
        favoriteList.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                Intent intent = new Intent(MainActivity.this, StockDetailsActivity.class);
                intent.putExtra("symbol", favorList.get(i).getStockInfo().getSymbol());
                autoComplete.setText("");
                hideKeyboard();
                startActivity(intent);
            }
        });
    }

    private void hideKeyboard(){
        InputMethodManager imm = (InputMethodManager)getSystemService(Context.INPUT_METHOD_SERVICE);
        if(imm.isActive() && getCurrentFocus() != null){
            if (getCurrentFocus().getWindowToken() != null) {
                imm.hideSoftInputFromWindow(getCurrentFocus().getWindowToken(), InputMethodManager.HIDE_NOT_ALWAYS);
            }
        }
    }

    private void initSortMethodList(){
        sortMethodList.add("Sort by");
        sortMethodList.add("Default");
        sortMethodList.add("Symbol");
        sortMethodList.add("Price");
        sortMethodList.add("Change");
    }

    private void initSortMethod(){
        initSortMethodList();
        ArrayAdapter<String> sortMethodAdapter= new ArrayAdapter<String>(this, android.R.layout.simple_dropdown_item_1line, sortMethodList){
            @Override
            public boolean isEnabled(int position) {
                if (position == 0)
                    return false;
                return true;
            }
        };
        sortMethod.setAdapter(sortMethodAdapter);
        sortMethod.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                sortFavorList();
                displayFavorList();
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });
    }

    private void initSortOrderList(){
        sortOrderList.add("Order");
        sortOrderList.add("Ascending");
        sortOrderList.add("Descending");
    }

    private void initSortOrder(){
        initSortOrderList();
        ArrayAdapter<String> sortOrderAdapter= new ArrayAdapter<String>(this, android.R.layout.simple_dropdown_item_1line, sortOrderList){
            @Override
            public boolean isEnabled(int position) {
                if (position == 0)
                    return false;
                return true;
            }
        };
        sortOrder.setAdapter(sortOrderAdapter);
        sortOrder.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                sortFavorList();
                displayFavorList();
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });
    }

    private synchronized void sortFavorList(){
        method = (String) sortMethod.getSelectedItem();
        order = (String) sortOrder.getSelectedItem();
        if("Sort by".equals(method) || "Order".equals(order)){
            return;
        }
        if(favorList == null){
            return;
        }
        if(favorList.size() == 0){
            return;
        }
        if("Symbol".equals(method)) {
            if("Ascending".equals(order)){
                Collections.sort(favorList, new Comparator<CurrentStockInfo>() {
                    @Override
                    public int compare(CurrentStockInfo c1, CurrentStockInfo c2) {
                        return c1.getStockInfo().getSymbol().compareTo(c2.getStockInfo().getSymbol());
                    }
                });
            }
            else if("Descending".equals(order)){
                Collections.sort(favorList, new Comparator<CurrentStockInfo>() {
                    @Override
                    public int compare(CurrentStockInfo c1, CurrentStockInfo c2) {
                        return -(c1.getStockInfo().getSymbol().compareTo(c2.getStockInfo().getSymbol()));
                    }
                });
            }
        }
        if("Price".equals(method)) {
            if("Ascending".equals(order)){
                Collections.sort(favorList, new Comparator<CurrentStockInfo>() {
                    @Override
                    public int compare(CurrentStockInfo c1, CurrentStockInfo c2) {
                        return c1.getStockInfo().getPrice().compareTo(c2.getStockInfo().getPrice());
                    }
                });
            }
            else if("Descending".equals(order)){
                Collections.sort(favorList, new Comparator<CurrentStockInfo>() {
                    @Override
                    public int compare(CurrentStockInfo c1, CurrentStockInfo c2) {
                        return -(c1.getStockInfo().getPrice().compareTo(c2.getStockInfo().getPrice()));
                    }
                });
            }
        }
        if("Change".equals(method)) {
            if("Ascending".equals(order)){
                Collections.sort(favorList, new Comparator<CurrentStockInfo>() {
                    @Override
                    public int compare(CurrentStockInfo c1, CurrentStockInfo c2) {
                        return c1.getChangePercent().compareTo(c2.getChangePercent());
                    }
                });
            }
            else if("Descending".equals(order)){
                Collections.sort(favorList, new Comparator<CurrentStockInfo>() {
                    @Override
                    public int compare(CurrentStockInfo c1, CurrentStockInfo c2) {
                        return -c1.getChangePercent().compareTo(c2.getChangePercent());
                    }
                });
            }
        }
        if("Default".equals(method)) {
            if("Ascending".equals(order)){
                Collections.sort(favorList, new Comparator<CurrentStockInfo>() {
                    @Override
                    public int compare(CurrentStockInfo c1, CurrentStockInfo c2) {
                        return c1.getStockInfo().getDate().compareTo(c2.getStockInfo().getDate());
                    }
                });
            }
            else if("Descending".equals(order)){
                Collections.sort(favorList, new Comparator<CurrentStockInfo>() {
                    @Override
                    public int compare(CurrentStockInfo c1, CurrentStockInfo c2) {
                        return -c1.getStockInfo().getDate().compareTo(c2.getStockInfo().getDate());
                    }
                });
            }
        }
    }

    private synchronized void displayFavorList(){
        favoritesAdapter = new FavoritesAdapter(MainActivity.this, favorList);
        favoriteList.setAdapter(favoritesAdapter);
    }

    private synchronized void createFavorList(){
        LinkedList<String> list = DataBase.getAll(this);
        favorList = new LinkedList<CurrentStockInfo>();
        for(String s : list){
            try {
                favorList.add(new Gson().fromJson(s, CurrentStockInfo.class));
            }
            catch (Exception e){
                e.printStackTrace();
            }
        }
    }
}
