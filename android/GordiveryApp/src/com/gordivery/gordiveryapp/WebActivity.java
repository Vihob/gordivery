package com.gordivery.gordiveryapp;

import android.annotation.SuppressLint;
import android.app.ActionBar;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.FragmentTransaction;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuItem;

import com.example.android.actionbarcompat.ActionBarActivity;
import com.gordivery.gordiveryapp.fragments.BaseWebFragment;
import com.gordivery.gordiveryapp.fragments.WebFragment;

public class WebActivity extends ActionBarActivity {
	
	private WebFragment mWebFragment;
	private boolean mShowOptions;
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		String mainUrl = getIntent().getExtras().getString(BaseWebFragment.mainUrlTag);
		String title = getIntent().getExtras().getString(BaseWebFragment.webActivityTitle);
		mShowOptions = getIntent().getExtras().getBoolean(BaseWebFragment.showOptions, true);
		
		if(title != null){
			setTitle(title);
		}
		
		setContentView(R.layout.webactivity);
		
		setUpHomeInCase();
		
		mWebFragment = new WebFragment();
		mWebFragment.setUrl(mainUrl);
		FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
		ft.add(R.id.content_web, mWebFragment).commit();
	}
	
	@Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
        	if(mWebFragment.onBackPressed()) return true;
        	else finish();
        }
        return super.onKeyDown(keyCode, event);
    }
	
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
    	if(mShowOptions){
    		getMenuInflater().inflate(R.menu.web_activity, menu);
    	}
        
        // Calling super after populating the menu is necessary here to ensure that the
        // action bar helpers have a chance to handle this event.
        return super.onCreateOptionsMenu(menu);
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
    			finish();
    			break;
    		case R.id.menu_web_back:
    			mWebFragment.onBackPressed();
    			break;
    		case R.id.menu_web_next:
    			mWebFragment.onForwardPressed();
    			break;
    		case R.id.menu_web_refresh:
    			mWebFragment.onRefreshPressed();
    			break;
    		default:
    			return super.onMenuItemSelected(featureId, item);
    	}
    	
    	return true;
    }
}
