package com.gordivery.gordiveryapp.fragments;

import android.os.Bundle;

import com.gordivery.gordiveryapp.utils.Defs;

public class ProfileFragment extends BaseWebFragment {

	public void onCreate (Bundle savedInstanceState){
		super.onCreate(savedInstanceState);
		
		mWebView.loadUrl(Defs.profileUrl);
	}
	
	@Override
	public void onViewVisible(){
		mWebView.loadUrl("javascript:"+Defs.profileJS);
	}

}
