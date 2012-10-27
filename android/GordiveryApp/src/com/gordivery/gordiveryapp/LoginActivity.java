package com.gordivery.gordiveryapp;

import android.annotation.SuppressLint;
import android.app.ActionBar;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.FragmentTransaction;
import android.view.KeyEvent;
import android.view.MenuItem;

import com.example.android.actionbarcompat.ActionBarActivity;
import com.gordivery.gordiveryapp.R;
import com.gordivery.gordiveryapp.fragments.BaseWebFragment;
import com.gordivery.gordiveryapp.utils.Defs;

public class LoginActivity extends ActionBarActivity {
	private LoginFragment mWebFragment;
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		setTitle(R.string.login_title);
		
		setContentView(R.layout.webactivity);
		
		setUpHomeInCase();
		
		mWebFragment = new LoginFragment();
		FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
		ft.add(R.id.content_web, mWebFragment).commit();
	}
	
    @Override
    public void onResume(){
    	super.onResume();
    	
    }
    
    @Override
    public void onPause(){
    	super.onPause();
    	
    }
	
	@Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
        	finish();
        }
        return super.onKeyDown(keyCode, event);
    }
	
    @SuppressLint("NewApi")
	private void setUpHomeInCase(){
    	if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB){
    		ActionBar actionBar = getActionBar();
    		actionBar.setDisplayHomeAsUpEnabled(true);
    	}
    	if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.ICE_CREAM_SANDWICH){
    		getActionBar().setHomeButtonEnabled(true);
    	}
    }
	
    @Override
    public boolean onMenuItemSelected(int featureId, MenuItem item)
    {
    	switch(item.getItemId())
    	{
			case android.R.id.home:
				setResult(Defs.resultGoHome);
				finish();
				break;
    		default:
    			return super.onMenuItemSelected(featureId, item);
    	}
    	
    	return true;
    }
    
    public static class LoginFragment extends BaseWebFragment{
    	
    	@Override
    	public void onCreate (Bundle savedInstanceState){
    		super.onCreate(savedInstanceState);
    		
    		mWebView.loadUrl(Defs.LoginUrl);
    	}
    	
    	@Override
    	public void onViewVisible(){
    		mWebView.loadUrl("javascript:"+Defs.loginJS);
    	}
    }
}
