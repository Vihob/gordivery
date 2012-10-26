package com.mobivery.location;

import android.content.Context;

public class MVYLocationFactory {
	public static MVYLocationManager getLocationManager(Context context) {
	    return android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.GINGERBREAD ? new MVYLocationManagerGingerbread(context) : new MVYLocationManagerLegacy(context);
	}
}
