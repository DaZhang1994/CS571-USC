package com.usc.zd.stock.feature;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import com.android.volley.RequestQueue;
import com.android.volley.toolbox.Volley;

/**
 * Created by dazha on 2017/11/21.
 */

public abstract class BaseActivity extends AppCompatActivity {

    public static final String SERVER_ADDRESS = "http://mstock-env.us-west-2.elasticbeanstalk.com/";

    public static RequestQueue queue;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        queue = Volley.newRequestQueue(this);
    }

}
