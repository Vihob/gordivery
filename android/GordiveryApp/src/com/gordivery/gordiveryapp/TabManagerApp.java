package com.gordivery.gordiveryapp;

import java.util.HashMap;

import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentTransaction;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.Window;
import android.widget.TabHost;
import android.widget.TabHost.TabSpec;
import android.widget.TextView;

import com.gordivery.gordiveryapp.fragments.BaseFragment;
import com.gordivery.gordiveryapp.fragments.ComercFragment;
import com.gordivery.gordiveryapp.fragments.ManagementFragment;
import com.gordivery.gordiveryapp.fragments.ProfileFragment;
import com.gordivery.gordiveryapp.fragments.RankingFragment;

public class TabManagerApp extends FragmentActivity {
	private TabHost mTabHost;
	TabManager mTabManager;
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		
		setContentView(R.layout.tabmanager);
		
		mTabHost = (TabHost) findViewById(android.R.id.tabhost);
		mTabHost.setup();

		mTabManager = new TabManager(this, mTabHost, R.id.container);

		mTabManager.addTab(createFirstTab(), ComercFragment.class, null);

		mTabManager.addTab(createSecondTab(), ManagementFragment.class, null);

		mTabManager.addTab(createThirdTab(), RankingFragment.class, null);

		mTabManager.addTab(createFourthTab(), ProfileFragment.class, null);

		if (savedInstanceState != null) {
			mTabHost.setCurrentTabByTag(savedInstanceState.getString("tab"));
		}
	}
	
	
	@Override
	protected void onSaveInstanceState(Bundle outState) {
		super.onSaveInstanceState(outState);
		if (outState != null) {
			outState.putString("tab", mTabHost.getCurrentTabTag());
		}
	}
	
	@Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
		BaseFragment currentFragment = mTabManager.getCurrentFragment();
        if (keyCode == KeyEvent.KEYCODE_BACK) {
        	if(currentFragment != null && currentFragment.onBackPressed()){
        		return true;
        	}
        	finish();
        }
        //TODO ELI: This line is a WORKAROUND, still needs to be fixed! -> inputs on webview fragment inside tabhost not working on jelly bean
        if(currentFragment != null) {
        	currentFragment.onKeyDown(keyCode, event);
        	return true;
        }
        
        return super.onKeyDown(keyCode, event);
    }
	
	@Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
		BaseFragment currentFragment = mTabManager.getCurrentFragment();
        //TODO ELI: This line is a WORKAROUND, still needs to be fixed! -> inputs on webview fragment inside tabhost not working on jelly bean
		if(currentFragment != null) {
			currentFragment.onKeyUp(keyCode, event);
			return true;
		}
		
		return super.onKeyUp(keyCode, event);
	}

	private TabSpec createFirstTab() {

		String tabText = getString(R.string.tab_comerc);
		View tabIndicator = LayoutInflater.from(this).inflate(
				R.layout.tabmanagercontent, null);
		tabIndicator.setBackgroundResource(R.drawable.tab_banking_operations_style);
		((TextView) tabIndicator.findViewById(R.id.tabmanagercontent_title))
				.setText(tabText);
		return mTabHost.newTabSpec(tabText).setIndicator(tabIndicator);
	}

	private TabSpec createSecondTab() {
		String tabText = getString(R.string.tab_management);
		View tabIndicator = LayoutInflater.from(this).inflate(
				R.layout.tabmanagercontent, null);
		tabIndicator.setBackgroundResource(R.drawable.tab_offices_style);
		((TextView) tabIndicator.findViewById(R.id.tabmanagercontent_title))
				.setText(tabText);
		return mTabHost.newTabSpec(tabText).setIndicator(tabIndicator);

	}

	private TabSpec createThirdTab() {
		String tabText = getString(R.string.tab_ranking);
		View tabIndicator = LayoutInflater.from(this).inflate(
				R.layout.tabmanagercontent, null);
		tabIndicator.setBackgroundResource(R.drawable.tab_contacts_style);
		((TextView) tabIndicator.findViewById(R.id.tabmanagercontent_title))
				.setText(tabText);
		return mTabHost.newTabSpec(tabText).setIndicator(tabIndicator);
	}

	private TabSpec createFourthTab() {
		String tabText = getString(R.string.tab_profile);
		View tabIndicator = LayoutInflater.from(this).inflate(
				R.layout.tabmanagercontent, null);
		tabIndicator.setBackgroundResource(R.drawable.tab_disclaimer_style);
		((TextView) tabIndicator.findViewById(R.id.tabmanagercontent_title))
				.setText(tabText);
		return mTabHost.newTabSpec(tabText).setIndicator(tabIndicator);

	}
	
	public static class TabManager implements TabHost.OnTabChangeListener {
		private final FragmentActivity mActivity;
		private final TabHost mTabHost;
		private final int mContainerId;
		private final HashMap<String, TabInfo> mTabs = new HashMap<String, TabInfo>();
		TabInfo mLastTab;

		static final class TabInfo {
			private final String tag;
			private final Class<?> clss;
			private final Bundle args;
			private BaseFragment fragment;

			TabInfo(String _tag, Class<?> _class, Bundle _args) {
				tag = _tag;
				clss = _class;
				args = _args;
			}
		}

		static class DummyTabFactory implements TabHost.TabContentFactory {
			private final Context mContext;

			public DummyTabFactory(Context context) {
				mContext = context;
			}

			@Override
			public View createTabContent(String tag) {
				View v = new View(mContext);
				v.setMinimumWidth(0);
				v.setMinimumHeight(0);
				return v;
			}
		}

		public TabManager(FragmentActivity activity, TabHost tabHost,
				int containerId) {
			mActivity = activity;
			mTabHost = tabHost;
			mContainerId = containerId;
			mTabHost.setOnTabChangedListener(this);
		}
		
		public BaseFragment getCurrentFragment(){
			
			if(mLastTab != null){
				return mLastTab.fragment;
			}
			return null;
		}

		public void addTab(TabHost.TabSpec tabSpec, Class<?> clss, Bundle args) {
			tabSpec.setContent(new DummyTabFactory(mActivity
					.getApplicationContext()));
			String tag = tabSpec.getTag();

			TabInfo info = new TabInfo(tag, clss, args);

			info.fragment = (BaseFragment) mActivity.getSupportFragmentManager()
					.findFragmentByTag(tag);
			if (info.fragment != null && !info.fragment.isDetached()) {
				FragmentTransaction ft = mActivity.getSupportFragmentManager()
						.beginTransaction();
				ft.detach(info.fragment);
				ft.commit();
			}

			mTabs.put(tag, info);
			mTabHost.addTab(tabSpec);
		}

		@Override
		public void onTabChanged(String tabId) {
			TabInfo newTab = mTabs.get(tabId);

			if (mLastTab != newTab) {
				FragmentTransaction ft = mActivity.getSupportFragmentManager()
						.beginTransaction();
				if (mLastTab != null) {
					if (mLastTab.fragment != null) {
						mLastTab.fragment.getView().setVisibility(View.GONE);
						mLastTab.fragment.onViewGone();
					}
				}
				if (newTab != null) {
					if (newTab.fragment == null) {
						newTab.fragment = (BaseFragment) Fragment.instantiate(mActivity,
								newTab.clss.getName(), newTab.args);
						ft.add(mContainerId, newTab.fragment, newTab.tag);
					} else {
						newTab.fragment.getView().setVisibility(View.VISIBLE);
						newTab.fragment.onViewVisible();
					}
				}

				mLastTab = newTab;

				ft.commit();
				mActivity.getSupportFragmentManager()
						.executePendingTransactions();
			}
		}
	}
}
