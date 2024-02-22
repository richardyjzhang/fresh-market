package com.zhangrichard.freshmarket.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

/**
 * 用于生成UUID
 */
public class MyIDGenerator {

    private static SimpleDateFormat sdf
            = new SimpleDateFormat( "yyyy-MM-dd HH:mm:ss.SSS" );

    public static String newID() {
        String uuid = UUID.randomUUID().toString();
        uuid = uuid.replace("-", "");
        return uuid;
    }

    public static String newTime() {
        String time = sdf.format(new Date());
        return time;
    }
}
