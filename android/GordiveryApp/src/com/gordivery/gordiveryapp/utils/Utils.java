package com.gordivery.gordiveryapp.utils;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.support.v4.app.Fragment;

import com.gordivery.gordiveryapp.R;
import com.gordivery.gordiveryapp.fragments.BaseWebFragment;

public class Utils {
	
	public static void callPhone(Fragment ctx, String numberUrl){
        //Launching call activity
        Intent dialIntent = new Intent(Intent.ACTION_DIAL);
        dialIntent.setData(Uri.parse(numberUrl));
        ctx.startActivityForResult(dialIntent, Defs.actionDial);
	}
	
	public static void sendEmail(Fragment ctx, String destinationUrl){
        Intent emailIntent = new Intent(android.content.Intent.ACTION_SEND);
        emailIntent.setType("plain/text");
        String email = destinationUrl.substring(BaseWebFragment.mailUrl.length());
        emailIntent.putExtra(android.content.Intent.EXTRA_EMAIL, new String[]{email});
        ctx.startActivityForResult(Intent.createChooser(emailIntent, ctx.getString(R.string.send_mail)), Defs.actionSend);
	}
	
	public static void showMap(Fragment ctx, String mapUrl){
    	Intent mapIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(mapUrl));
    	ctx.startActivityForResult(mapIntent, Defs.actionMap);
	}

	public static void showAlert(Context ctx, String title, String message, final Runnable positive, String posButton){
		showYesNoAlert(ctx, title, message, positive, posButton, null);
	}
	
	public static void showYesNoAlert(Context ctx, String title, String message, final Runnable positive, String posButton, String negButton)
    {
    	AlertDialog.Builder builder = new AlertDialog.Builder(ctx);
		builder.setTitle(title);
		builder.setCancelable(false);
		boolean show = false;
		if(message != null)
		{
			builder.setMessage(message);
		}
		
		if(posButton != null)
		{
			builder.setPositiveButton(posButton, new DialogInterface.OnClickListener()
			{
				public void onClick(DialogInterface dialog, int id)
				{
					if(positive != null){
						positive.run();
					}
				}
			});
			show = true;
		}
		
		if(negButton != null)
		{
			builder.setNegativeButton(negButton, new DialogInterface.OnClickListener()
			{
				public void onClick(DialogInterface dialog, int id)
				{
					//Just dismiss
			    }
			});
			show = true;
		}
		
		if(show)
		{
			AlertDialog alert = builder.create();
			alert.show();
		}
    }
}
