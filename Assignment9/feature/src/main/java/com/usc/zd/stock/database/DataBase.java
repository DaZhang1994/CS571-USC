package com.usc.zd.stock.database;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;

import java.util.LinkedList;
import java.util.Map;

public class DataBase {

	public static void insert(String key, String value, Context context) {
		SharedPreferences database = context.getSharedPreferences("stock", Activity.MODE_PRIVATE);
		database.edit().putString(key, value).commit();
	}

	public static void delete(String key, Context context) {
		SharedPreferences database = context.getSharedPreferences("stock", Activity.MODE_PRIVATE);
		database.edit().remove(key).commit();
	}

	public static String get(String key, Context context) {
		SharedPreferences database = context.getSharedPreferences("stock", Activity.MODE_PRIVATE);
		return database.getString(key, null);
	}

	public static LinkedList<String> getAll(Context context){
		SharedPreferences database = context.getSharedPreferences("stock", Activity.MODE_PRIVATE);
		LinkedList<String> list = new LinkedList<String>();
		for(Map.Entry<String, ?> entry : database.getAll().entrySet()){
			list.add((String) entry.getValue());
		}
		return list;
	}
}