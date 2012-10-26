package com.gordivery.gordiveryapp.fragments;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Timer;
import java.util.TimerTask;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.location.Location;
import android.location.LocationListener;
import android.net.Uri;
import android.os.Bundle;
import android.text.Html;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.CookieSyncManager;
import android.webkit.GeolocationPermissions;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebStorage;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.gordivery.gordiveryapp.R;
import com.gordivery.gordiveryapp.WebActivity;
import com.gordivery.gordiveryapp.utils.Utils;
import com.mobivery.location.MVYLocationFactory;
import com.mobivery.location.MVYLocationManager;

@SuppressLint("SetJavaScriptEnabled")
//------------------------------------------------------------------------------
public class BaseWebFragment extends BaseFragment{
    protected WebView mWebView;
    
    private MapDirections mMapDirections;
    
    private ProgressDialog loadingDialog;
    
	//Url links
	public static final String telephoneUrl = "tel:";
	public static final String mailUrl = "mailto:";
	public static final String mapsUrl = "maps:";
	public static final String pushUrl = "push:";
	public static final String webUrl = "web:";
	public static final String alertUrl = "alert:";
	public static final String showLoadingUrl = "showloading:";
	public static final String hideLoadingUrl = "hideloading:";
	
	//Intent parameters
	public static final String mainUrlTag = "com.mobivery.mainUrl";
	public static final String webActivityTitle = "com.mobivery.webActTitle";
	public static final String showOptions = "com.mobivery.showOptions";
	
	//Intent tags
	public static final int actionWebActivity = 7;
	
	//Maps constants
	public static final String k_USER_LOCATION_KEY = "user_location";
	public static final String k_SYSTEM_PLATFORM_CONSTANT = "systemPlatformConstant";
	public static final int minimumAccuracyDistance = 100; //Meters
	public static final long maximumAccuracyTime = 30000; //Seconds
	public static final long locationObtainingTimeout = 10000; //Seconds
	
	@Override
	public void onCreate (Bundle savedInstanceState){
		super.onCreate(savedInstanceState);
		
        mWebView = new WebView(getActivity());

        startContentViewer();
	}
	
	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
        
        mWebView.requestFocus();
		
		return mWebView;
	}
	
    public void onKeyDown(int keyCode, KeyEvent event) {
		mWebView.onKeyDown(keyCode, event);
	}
    
    public void onKeyUp(int keyCode, KeyEvent event){
    	mWebView.onKeyUp(keyCode, event);
    }
    
	@Override
	public boolean onBackPressed(){
	  if(mWebView.canGoBack())
	  {
	  	  mWebView.goBack();
	      return true;
	  }
	  return false;
	}
    
    @Override
    public void onStop()
    {   
        // All the cookies are stored on disk
        CookieSyncManager.getInstance().sync();

        super.onStop();
    }
    
    public void loadUrlWithLoading(String url){
    	showLoading(getString(R.string.loading));
    	mWebView.loadUrl(url);
    }
    
    protected synchronized void showLoading(final String message){
    	if(loadingDialog == null || !loadingDialog.isShowing()){
    		loadingDialog = ProgressDialog.show(getActivity(), "", message,true,true);
    		loadingDialog.setCancelable(false);
    	}
    }
    
    protected synchronized void hideLoading(){
    	if(loadingDialog != null) loadingDialog.cancel();
    	loadingDialog = null;
    }
    
    private void startContentViewer()
    {
		mWebView.clearCache(true);
        mWebView.setVerticalFadingEdgeEnabled(false);
        mWebView.setFadingEdgeLength(0);
        mWebView.setFocusable(true);
        WebSettings settings = mWebView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setGeolocationEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setDatabaseEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setLightTouchEnabled(true);
        
        String databasePath = getActivity().getApplicationContext().getDir("databases", Context.MODE_PRIVATE).getPath(); 
        settings.setDatabasePath(databasePath);              

        //remove white zone to the right (bellow scrollbar)
        mWebView.setScrollBarStyle(WebView.SCROLLBARS_OUTSIDE_OVERLAY);
        
        mWebView.setWebViewClient(new myWebViewClient());
        
        mWebView.setWebChromeClient(new myWebChromeClient());  
        
        mWebView.addJavascriptInterface(new myJSJavaBridge(), "mbApi" );
        
        //Webview focus bug fix
        mWebView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                switch (event.getAction()) {
                    case MotionEvent.ACTION_DOWN:
                    case MotionEvent.ACTION_UP:
                        if (!v.hasFocus()) {
                            v.requestFocus();
                        }
                        break;
                }
                return false;
            }
        });
    }
    
    private class MapDirections implements LocationListener{
    	
    	private MVYLocationManager mLocationManager;
    	private String mMapUrl;
    	private Location mCurrentLocation;
    	private boolean mAlreadyShown;
    	
    	private Timer mLocationTimer;
    	
    	public void launchMapForUrl(String urlToLaunch){
    		mMapUrl = urlToLaunch;
    		mAlreadyShown = false;
    		if(mLocationManager == null){
    			mLocationManager = MVYLocationFactory.getLocationManager(getActivity());
    			mLocationManager.setChangedLocationListener(this);
    		}
    		Location current = mLocationManager.getLastBestLocation(minimumAccuracyDistance, maximumAccuracyTime);
    		if(current != null){
    			mCurrentLocation = current;
    			launchMap();
    		}
    		else {
    			startTimeoutTimer();
    			showLoading(getString(R.string.getting_location));
    		}
    	}
    	
    	private void startTimeoutTimer(){
    		stopTimeoutTimer();
    		mLocationTimer = new Timer();
    		mLocationTimer.schedule(new TimerTask() {
				@Override
				public void run() {
					failedToObtainLocation();
				}
			}, locationObtainingTimeout);
    	}
    	private void stopTimeoutTimer(){
    		if(mLocationTimer != null){
    			mLocationTimer.cancel();
    			mLocationTimer = null;
    		}
    	}
    	
    	private synchronized void failedToObtainLocation(){
    		stopTimeoutTimer();
    		hideLoading();
    		
    		getActivity().runOnUiThread(new Runnable() {
				@Override
				public void run() {
		    		//Showing alert to the user
		    		Utils.showAlert(getActivity(), null, getString(R.string.location_failed), null, getString(R.string.ok));
				}
			});
    	}
    	
    	private synchronized void launchMap(){
    		stopTimeoutTimer();
    		hideLoading();
    		if(mCurrentLocation == null || mAlreadyShown) return;
        	//Replacing user_location by the real location
        	final String theRealUrl = mMapUrl.replace(k_USER_LOCATION_KEY,String.valueOf(mCurrentLocation.getLatitude())+","+String.valueOf(mCurrentLocation.getLongitude()));
        	
        	Runnable thePositiveAction = new Runnable() {
    			@Override
    			public void run() {
    				Utils.showMap(BaseWebFragment.this, theRealUrl);
    			}
    		};
        	
    		Utils.showYesNoAlert(getActivity(), null, getString(R.string.map_alert_msg), thePositiveAction, getString(R.string.yes), getString(R.string.no));
    		mAlreadyShown = true;
    	}
    	
		@Override
		public void onLocationChanged(Location location) {
			mCurrentLocation = location;
			launchMap();
		}

		@Override
		public void onProviderDisabled(String provider) {
		}

		@Override
		public void onProviderEnabled(String provider) {
		}

		@Override
		public void onStatusChanged(String provider, int status, Bundle extras) {
		}
    }
    
    //--------------------------------------------------------------------------
    private class myWebChromeClient extends WebChromeClient
    {
    	@Override
    	public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback){
			//Origin, allow, retain
    		callback.invoke(origin, true, true);
		}
		
    	@Override
		public void onExceededDatabaseQuota(String url, String databaseIdentifier, long currentQuota, long estimatedSize, long totalUsedQuota, WebStorage.QuotaUpdater quotaUpdater) { 
    		quotaUpdater.updateQuota(5 * 1024 * 1024); 
		}
    	
    	@Override
    	public boolean onJsAlert (WebView view, String url, String message, JsResult result){
    		AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
    		builder.setMessage(message)
    		       .setCancelable(false)
    		       .setPositiveButton(R.string.ok, new DialogInterface.OnClickListener() {
    		           public void onClick(DialogInterface dialog, int id) {
    		                
    		           }
    		       });
    		AlertDialog alert = builder.create();
    		alert.show();
    		
    		return true;
    	}
    }

    //--------------------------------------------------------------------------
    private class myWebViewClient extends WebViewClient 
    {
    	
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url)
        {
    		if(url.startsWith(telephoneUrl))
            {
    			Utils.callPhone(BaseWebFragment.this, url);
                return true;
            }
            else if(url.startsWith(mailUrl))
            {
                Utils.sendEmail(BaseWebFragment.this, url);
                return true;
            }
            else if(url.startsWith(mapsUrl)){
            	return overrideMapUrl(url);
            }
            else if(url.startsWith(alertUrl)){
            	return overrideAlertUrl(url.substring(alertUrl.length()));
            }
            else if(url.startsWith(showLoadingUrl)){
            	return overrideShowLoadingUrl(url.substring(showLoadingUrl.length()));
            }
            else if(url.startsWith(hideLoadingUrl)){
            	return overrideHideLoadingUrl();
            }
            else if(url.startsWith(pushUrl)){
            	return overridePushUrl(url.substring(pushUrl.length()));
            }
            else if(url.startsWith(webUrl)){
            	return overrideWebUrl(url.substring(webUrl.length()));
            }
            else {
            	return overrideUrlLoading(url);
            }
        }
        
        @Override
        public void onPageFinished(WebView view, String url){
        	onUrlLoaded(url);
        }
    }
    
    
  //--------------------------------------------------------------------------
    public class myJSJavaBridge{
    	public String getUrl(String tag){
    		//TODO marcel: return correct url in case
    		return "";
    	}
    	
    	public void showLoading(String msg){
    		BaseWebFragment.this.showLoading(msg);
    	}
    	
    	public void hideLoading(){
    		BaseWebFragment.this.hideLoading();
    	}
    }
    
    protected boolean overrideUrlLoading(String url){
    	return false;
    }
    
    protected void onUrlLoaded(String url){
    	
    }
    
    protected boolean overrideShowLoadingUrl(String loadingUrl){
    	final String msg;
    	try {
    		msg = URLDecoder.decode(loadingUrl,"UTF-8");
		} catch (UnsupportedEncodingException e1) {
			return true;
		}
    	
    	showLoading(msg);

    	return true;
    }
    
    protected boolean overrideHideLoadingUrl(){
    	hideLoading();
    	return true;
    }
    
    protected boolean overrideMapUrl(String mapUrl){
    	//Removing starting string
    	String theUrl = mapUrl.replace(mapsUrl, "");
    	//Replacing system_platform
    	theUrl = theUrl.replace(k_SYSTEM_PLATFORM_CONSTANT, "google");
    	
    	if(mMapDirections == null){
    		mMapDirections = new MapDirections();
    	}
    	mMapDirections.launchMapForUrl(theUrl);
    	return true;
    }
    
    protected boolean overrideAlertUrl(String alertCodeEncoded){
//    	<title>'+title+'<message>'+message;
    	String alertCode = null;
    	try {
			alertCode = URLDecoder.decode(alertCodeEncoded,"UTF-8");
		} catch (UnsupportedEncodingException e1) {
			return true;
		}
    	
    	String title = null;
    	String message = null;
    	String[] data = alertCode.split("<message>");
    	if(data.length == 2){
    		if(data[0].startsWith("<title>")){
    			title = data[0].replace("<title>", "");
    		}
				message = data[1];
    	}
    	Utils.showAlert(getActivity(), title, message, null, getString(R.string.ok));
    	return true;
    }
    
    protected boolean overridePushUrl(String url){
		String realUrl = Html.fromHtml(url).toString();
    	Intent intent = new Intent(getActivity(), WebActivity.class);
    	intent.putExtra(mainUrlTag, realUrl);
    	String title = titleForPushUrl(url);
    	if( title != null){
    		intent.putExtra(webActivityTitle, title);
    	}
    	startActivityForResult(intent,actionWebActivity);
		return true;
    }
    
    protected boolean overrideWebUrl(String url){
    	//Opening web browser with given url
    	Intent i = new Intent(Intent.ACTION_VIEW);
    	i.setData(Uri.parse(url));
    	startActivityForResult(i,actionWebActivity);
    	return true;
    }
    
    protected String titleForPushUrl(String url){
    	return null;
    }
}
