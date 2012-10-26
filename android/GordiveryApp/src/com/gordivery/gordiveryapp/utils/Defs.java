package com.gordivery.gordiveryapp.utils;

public class Defs {
	
	//Webview urls
	public static final String internalUrlBase = "file:///android_asset/html5/html/";
	public static final String comercUrl = "file:///android_asset/html5/html/ComercView.html";
	public static final String managementUrl = "file:///android_asset/html5/html/ManagementView.html";
	public static final String profileUrl = "file:///android_asset/html5/html/ProfileView.html";
	public static final String rankingUrl = "file:///android_asset/html5/html/RankingView.html";
	
	
	//Javascript code on ShowingView
	public static final String comercJS = "comercController.viewWillAppear();";
	public static final String managementJS = "managementController.viewWillAppear();";
	public static final String profileJS = "profileController.viewWillAppear();";
	public static final String rankingJS = "rankingController.viewWillAppear();";
	

	//Activities request ids
	public static final int mainUrlId = 1;
	public static final int actionDial = 3;  		//Call to phone activity
	public static final int actionSend = 4;  		//Send email activity
	public static final int externalBrowser = 5;  	//Open external browser
	public static final int actionMap = 6;
}
