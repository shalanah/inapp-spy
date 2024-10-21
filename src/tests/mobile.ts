import { appleTouchWindow, DeviceObj } from "./utils";

export const MOBILE: DeviceObj = {
  IPHONE: {
    inapp: {
      GSA: [
        {
          useragents: [
            "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/334.0.674067880 Mobile/15E148 Safari/604.1",
          ],
          ...appleTouchWindow,
        },
      ],
      TELEGRAM: [
        {
          useragents: [
            "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/22B5045g Safari/604.1",
          ], // user agent isn't how we parse this one yet
          window: {
            TelegramWebviewProxy: {},
            TelegramWebviewProxyProto: {},
            document: { ontouchend: {} },
          },
        },
      ],
      LINKEDIN: [
        {
          useragents: [
            "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 {useragents: [LinkedInApp]/9.30.1753",
          ],
          ...appleTouchWindow,
        },
      ],
      MESSENGER: [
        {
          useragents: [
            "Mozilla/5.0 (iPhone; CPU iPhone OS 10_2_1 like Mac OS X) AppleWebKit/602.4.6 (KHTML, like Gecko) Mobile/14D27 {useragents: [FBAN/MessengerForiOS;FBAV/117.0.0.36.70;FBBV/57539258;FBDV/iPhone7,2;FBMD/iPhone;FBSN/iOS;FBSV/10.2.1;FBSS/2;FBCR/&#20013-&#33775-&#38651-&#20449-;FBID/phone;FBLC/zh_TW;FBOP/5;FBRV/0]",
          ],
          ...appleTouchWindow,
        },
      ],
      FACEBOOK: [
        {
          useragents: [
            "Mozilla/5.0 (iPhone; CPU iPhone OS 10_2_1 like Mac OS X) AppleWebKit/602.4.6 (KHTML, like Gecko) Mobile/14D27 {useragents: [FBAN/FBIOS;FBAV/93.0.0.49.65;FBBV/58440824;FBDV/iPhone7,2;FBMD/iPhone;FBSN/iOS;FBSV/10.2.1;FBSS/2;FBCR/&#20013-&#33775-&#38651-&#20449-;FBID/phone;FBLC/zh_TW;FBOP/5;FBRV/0]",
          ],
          ...appleTouchWindow,
        },
      ],
      TWITTER: [
        {
          useragents: [
            "Mozilla/5.0 (iPhone; CPU iPhone OS 10_2_1 like Mac OS X) AppleWebKit/602.3.12 (KHTML, like Gecko) Mobile/14D27 Twitter for iPhone",
          ],
          ...appleTouchWindow,
        },
      ],
      LINE: [
        {
          useragents: [
            "Mozilla/5.0 (iPhone; CPU iPhone OS 10_2_1 like Mac OS X) AppleWebKit/602.4.6 (KHTML, like Gecko) Mobile/14D27 Safari Line/7.3.2",
          ],
          ...appleTouchWindow,
        },
      ],
      INSTAGRAM: [
        {
          useragents: [
            "Mozilla/5.0 (iPhone; CPU iPhone OS 10_2_1 like Mac OS X) AppleWebKit/602.4.6 (KHTML, like Gecko) Mobile/14D27 Instagram 10.21.0 (iPhone7,2; iOS 10_2_1; zh-Hant_JP; zh-Hant-JP; scale=2.00; gamut=normal; 750x1334)",
          ],
          ...appleTouchWindow,
        },
      ],
      WECHAT: [
        {
          useragents: [
            "Mozilla/5.0 (iPhone; CPU iPhone OS 10_2_1 like Mac OS X) AppleWebKit/602.4.6 (KHTML, like Gecko) Mobile/14D27 MicroMessenger/6.5.8 NetType/WIFI Language/zh_CN",
          ],
          ...appleTouchWindow,
        },
      ],
      SNAPCHAT: [
        {
          useragents: [
            "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3.1 Mobile/15E148 Snapchat/12.72.0.39 (like Safari/8617.2.4.10.8, panda)",
          ],
          ...appleTouchWindow,
        },
      ],
      TIKTOK: [
        {
          useragents: [
            "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 BytedanceWebview/d8a21c6 musical_ly_33.2.1 JsSdk/2.0 NetType/WIFI Channel/App Store ByteLocale/en Region/US FalconTag/BDB55B46-0286-4504-847E-C8300CB9F79D",
          ],
          ...appleTouchWindow,
        },
      ],
    },
    not_inapp: {
      SFSVC: [
        {
          useragents: [
            "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1",
          ],
          ...appleTouchWindow,
        },
      ],
      CHROME: [
        {
          useragents: [
            "Mozilla/5.0 (iPhone; CPU iPhone OS 10_2_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/58.0.3029.113 Mobile/14D27 Safari/602.1",
          ],
          ...appleTouchWindow,
        },
      ],
      YANDEX: [
        {
          useragents: [
            "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 YaBrowser/24.7.7.799.10 SA/3 Mobile/15E148 Safari/604.1",
          ],
          ...appleTouchWindow,
        },
      ],
      OPERA: [
        {
          useragents: [
            "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1 OPT/5.0.7",
          ],
          ...appleTouchWindow,
        },
      ],
      FIREFOX: [
        {
          useragents: [
            "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/130.1  Mobile/15E148 Safari/605.1.15",
          ],
          ...appleTouchWindow,
        },
      ],
      EDGE: [
        {
          useragents: [
            "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) EdgiOS/128.0.2739.82 Version/18.0 Mobile/15E148 Safari/604.1",
          ],
          ...appleTouchWindow,
        },
      ],
      PWA_SAFARI: [
        {
          useragents: [
            "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1",
          ],
          window: {
            navigator: {
              clearAppBadge: {}, // actually a fn but just testing for presence
            },
            ...appleTouchWindow,
          },
        },
      ],
      SAFARI: [
        {
          useragents: [
            "Mozilla/5.0 (iPhone; CPU iPhone OS 10_2_1 like Mac OS X) AppleWebKit/602.4.6 (KHTML, like Gecko) Version/10.0 Mobile/14D27 Safari/602.1",
          ],
          ...appleTouchWindow,
        },
        {
          useragents: [
            "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1",
          ],
          window: {
            SchemaDataExtractor: {},
            ...appleTouchWindow,
          },
        },
      ],
    },
  },
  SONY: {
    inapp: {
      MESSENGER: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 6.0.1; D6653 Build/23.5.A.0.575; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/58.0.3029.83 Mobile Safari/537.36 {useragents: [FB_IAB/MESSENGER;FBAV/118.0.0.19.82;]",
          ],
        },
      ],
      FACEBOOK: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 6.0.1; D6653 Build/23.5.A.0.575; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/58.0.3029.83 Mobile Safari/537.36 {useragents: [FB_IAB/FB4A;FBAV/124.0.0.22.66;]",
          ],
        },
      ],
      LINE: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 6.0.1; D6653 Build/23.5.A.0.575; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/58.0.3029.83 Mobile Safari/537.36 Line/7.4.0/IAB",
          ],
        },
      ],
      INSTAGRAM: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 6.0.1; D6653 Build/23.5.A.0.575; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/58.0.3029.83 Mobile Safari/537.36 Instagram 10.21.0 Android (23/6.0.1; 480dpi; 1080x1776; Sony; D6653; D6653; qcom; zh_TW)",
          ],
        },
      ],
      WECHAT: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 6.0.1; D6653 Build/23.5.A.0.575; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/58.0.3029.83 Mobile Safari/537.36 MicroMessenger/6.5.7.1041 NetType/WIFI Language/zh_TW",
          ],
        },
      ],
    },
    not_inapp: {
      CHROME: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 6.0.1; D6653 Build/23.5.A.0.575) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.83 Mobile Safari/537.36",
          ],
        },
      ],
    },
  },
  PIXEL: {
    inapp: {
      TIKTOK: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 14; Pixel 8 Build/UQ1A.240105.004; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/121.0.6167.143 Mobile Safari/537.36 musical_ly_2023303040 JsSdk/1.0 NetType/WIFI Channel/googleplay AppName/musical_ly app_version/33.3.4 ByteLocale/en ByteFullLocale/en Region/US AppId/1233 Spark/1.5.0.5-alpha.2 AppVersion/33.3.4 BytedanceWebview/d8a21c6",
          ],
        },
      ],
    },
    not_inapp: {
      PUFFIN: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 7.1.2; Pixel Build/N2G47E; zh-tw) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Puffin/6.0.9.15863AP",
          ],
        },
      ],
      CHROME: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36",
            "Mozilla/5.0 (Linux; Android 12; Pixel 3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36",
          ],
        },
      ],
    },
  },
  SAMSUNG: {
    inapp: {
      TELEGRAM: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 14; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.6668.100 Mobile Safari/537.36",
          ],
          window: {
            TelegramWebview: {},
          },
        },
      ],
      MESSENGER: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 6.0.1; SM-N9208 Build/MMB29K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/58.0.3029.83 Mobile Safari/537.36 {useragents: [FB_IAB/MESSENGER;FBAV/118.0.0.19.82;]",
          ],
        },
      ],
      FACEBOOK: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 6.0.1; SM-N9208 Build/MMB29K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/58.0.3029.83 Mobile Safari/537.36 {useragents: [FB_IAB/FB4A;FBAV/125.0.0.16.80;]",
          ],
        },
      ],
      LINE: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 6.0.1; SM-N9208 Build/MMB29K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/58.0.3029.83 Mobile Safari/537.36 Line/7.4.0/IAB",
          ],
        },
      ],
      WECHAT: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 6.0.1; SM-N9208 Build/MMB29K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/58.0.3029.83 Mobile Safari/537.36 MicroMessenger/6.5.7.1041 NetType/WIFI Language/zh_TW",
          ],
        },
      ],
      INSTAGRAM: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 6.0.1; SM-N9208 Build/MMB29K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/58.0.3029.83 Mobile Safari/537.36 Instagram 10.22.0 Android (23/6.0.1; 560dpi; 1440x2560; samsung; SM-N9208; noblelte; samsungexynos7420; zh_TW)",
          ],
        },
      ],
    },
    not_inapp: {
      CHROME: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 6.0.1; SM-N9208 Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.83 Mobile Safari/537.36",
          ],
        },
      ],
    },
  },
  ASUS: {
    inapp: {
      MESSENGER: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 4.4.2; ASUS_T00F Build/KVT49L) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36 {useragents: [FB_IAB/MESSENGER;FBAV/118.0.0.19.82;]",
          ],
        },
      ],
      FACEBOOK: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 4.4.2; ASUS_T00F Build/KVT49L) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36{useragents: [FBAN/EMA;FBLC/zh_TW;FBAV/42.0.0.3.64;]",
          ],
        },
      ],
    },
    not_inapp: {
      CHROME: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 4.4.2; ASUS_T00F Build/KVT49L) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.83 Mobile Safari/537.36",
          ],
        },
      ],
      FIREFOX: [
        {
          useragents: [
            "Mozilla/5.0 (Android 4.4.2; Mobile; rv:53.0) Gecko/53.0 Firefox/53.0",
          ],
        },
      ],
    },
  },
  REDMI: {
    inapp: {
      MESSENGER: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 6.0.1; Redmi Note 3 Build/MMB29M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/58.0.3029.83 Mobile Safari/537.36 {useragents: [FB_IAB/MESSENGER;FBAV/118.0.0.19.82;]",
          ],
        },
      ],
      FACEBOOK: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 6.0.1; Redmi Note 3 Build/MMB29M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/58.0.3029.83 Mobile Safari/537.36 {useragents: [FB_IAB/FB4A;FBAV/124.0.0.22.66;]",
          ],
        },
      ],
      LINE: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 6.0.1; Redmi Note 3 Build/MMB29M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/58.0.3029.83 Mobile Safari/537.36 Line/7.4.0/IAB",
          ],
        },
      ],
      INSTAGRAM: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 6.0.1; Redmi Note 3 Build/MMB29M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/58.0.3029.83 Mobile Safari/537.36 Instagram 10.21.0 Android (23/6.0.1; 480dpi; 1080x1920; Xiaomi; Redmi Note 3; kate; qcom; zh_TW)",
          ],
        },
      ],
    },
    not_inapp: {
      MIUI: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; U; Android 6.0.1; zh-tw; Redmi Note 3 Build/MMB29M) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.146 Mobile Safari/537.36 XiaoMi/MiuiBrowser/8.5.8",
          ],
        },
      ],
      CHROME: [
        {
          useragents: [
            "Mozilla/5.0 (Linux; Android 6.0.1; Redmi Note 3 Build/MMB29M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.83 Mobile Safari/537.36",
          ],
        },
      ],
    },
  },
  WINDOWS: {},
  HTC: {},
};
