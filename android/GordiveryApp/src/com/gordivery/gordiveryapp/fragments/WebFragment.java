package com.gordivery.gordiveryapp.fragments;

import android.os.Bundle;

public class WebFragment extends BaseWebFragment {
	private String baseUrl;
	private WebFragmentListener mListener = null;
	
	public interface WebFragmentListener{
		void onUrlLoaded(String url);
	}
	
	@Override
	public void onCreate (Bundle savedInstanceState){
		super.onCreate(savedInstanceState);
		
		mWebView.loadUrl(baseUrl);
		
		customizeWebView();
	}
	
	public void setListener(WebFragmentListener listener){
		mListener = listener;
	}
	
	private void customizeWebView(){
		mWebView.getSettings().setSupportZoom(true);
		mWebView.getSettings().setBuiltInZoomControls(true);
		mWebView.getSettings().setUseWideViewPort(true);
		mWebView.getSettings().setLoadWithOverviewMode(true);
	}
	
	public void setUrl(String url){
		baseUrl = url;
		if(mWebView != null)mWebView.loadUrl(baseUrl);
	}
	
	public boolean canGoNext(){
		return mWebView.canGoForward();
	}
	
	public boolean canGoBack(){
		return mWebView.canGoBack();
	}
	
	@Override
	protected void onUrlLoaded(String url){
		if(mListener != null){
			mListener.onUrlLoaded(url);
		}
	}
	
	public void onForwardPressed(){
		if(mWebView.canGoForward()){
			mWebView.goForward();
		}
	}
	
	public void onRefreshPressed(){
		mWebView.reload();
	}
	
    protected boolean overrideMapUrl(String mapUrl){
    	//Forbidding opening maps on WebActivity
    	return false;
    }
    
    protected boolean overrideAlertUrl(String alertCodeEncoded){
    	//Forbidding opening alerts on WebActivity
    	return false;
    }
    
    @Override
    protected boolean overridePushUrl(String url){
    	//forbidding making push on WebActivity
    	return false;
    }
}
