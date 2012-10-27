package com.gordivery.gordiveryapp.fragments;

import android.content.Intent;
import android.os.Bundle;

import com.gordivery.gordiveryapp.ComercDetailActivity;
import com.gordivery.gordiveryapp.utils.Defs;

public class ComercFragment extends BaseWebFragment {

	public void onCreate (Bundle savedInstanceState){
		super.onCreate(savedInstanceState);
		
		mWebView.loadUrl(Defs.comercUrl);
	}
	
	@Override
	public void onViewVisible(){
		mWebView.loadUrl("javascript:"+Defs.comercJS);
	}
	
	@Override 
    public void onActivityResult (int requestCode, int resultCode, Intent data){
    	if(requestCode == Defs.ComercActivity){
    		mWebView.loadUrl("javascript:"+Defs.comercJS);
    	}
    }
	
	@Override
    protected boolean overridePushUrl(String url){
    	Intent intent = new Intent(getActivity(), ComercDetailActivity.class);
    	startActivityForResult(intent,Defs.ComercActivity);
		return true;
    }

}
