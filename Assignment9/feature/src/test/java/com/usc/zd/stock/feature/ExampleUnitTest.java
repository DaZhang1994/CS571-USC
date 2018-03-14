package com.usc.zd.stock.feature;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import org.junit.Test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import static org.junit.Assert.*;

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * @see <a href="http://d.android.com/tools/testing">Testing documentation</a>
 */
public class ExampleUnitTest {
    @Test
    public void addition_isCorrect() throws Exception {
        assertEquals(4, 2 + 2);
    }

    @Test
    public void test(){
//        String a = new String("AAA");
//        String b;
//        b = String.valueOf(a);
//        System.out.println(b);
//        a = new String("BBB");
//        System.out.println(a);
//        Double a = new Double(2.00);
//        Double b = Double.valueOf(a);
//        a = new Double(3.00);
//        System.out.println(b);
//          String a = null;
//          assert a != null : "WRONG";
//          System.out.print("AAA");
//        TestDate testDate = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Gson gson = new GsonBuilder()
                .setDateFormat("yyyy-MM-dd HH:mm:ss")
                .create();
//        String str = gson.toJson(testDate);
//        System.out.println(str);
        System.out.println(new Gson().fromJson("{\"date\":\"2017-11-22 16:00:00\"}", TestDate.class).getDate());
        System.out.println(gson.fromJson("{\"date\":\"2017-11-22 16:00:00\"}", TestDate.class).getDate());
        Date date = gson.fromJson("{\"date\":\"2017-11-22 16:00:00\"}", TestDate.class).getDate();
        System.out.println(sdf.format(date));
    }
}