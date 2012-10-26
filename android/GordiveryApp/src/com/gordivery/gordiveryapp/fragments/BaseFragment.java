package com.gordivery.gordiveryapp.fragments;

import android.support.v4.app.Fragment;
import android.view.KeyEvent;

public class BaseFragment extends Fragment {

	public boolean onBackPressed(){
		return false;
	}
	
	public void onViewGone(){
		
	}
	
	public void onViewVisible(){
		
	}
	
    public void onKeyDown(int keyCode, KeyEvent event) {
	}
    
    public void onKeyUp(int keyCode, KeyEvent event){
    }
}
