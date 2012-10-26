package com.gordivery.gordiveryapp.fragments;

import android.os.Bundle;

import com.gordivery.gordiveryapp.utils.Defs;

public class ManagementFragment extends BaseWebFragment {

	public void onCreate (Bundle savedInstanceState){
		super.onCreate(savedInstanceState);
		
		mWebView.loadUrl(Defs.managementUrl);
	}
	
	@Override
	public void onViewVisible(){
		mWebView.loadUrl("javascript:"+Defs.managementJS);
	}

}
