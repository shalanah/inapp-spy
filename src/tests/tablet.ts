import { appleTouchWindow, DeviceObj } from "./utils";

export const TABLET: DeviceObj = {
  IPAD: {
    inapp: {
      MESSENGER: [
        {
          useragents: [
            "Mozilla/5.0 (iPad; CPU OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E304 {useragents: [FBAN/MessengerForiOS;FBAV/117.0.0.36.70;FBBV/57539258;FBDV/iPad4,4;FBMD/iPad;FBSN/iOS;FBSV/10.3.1;FBSS/2;FBCR/;FBID/tablet;FBLC/zh_TW;FBOP/5;FBRV/0]",
          ],
          ...appleTouchWindow,
        },
      ],
      FACEBOOK: [
        {
          useragents: [
            "Mozilla/5.0 (iPad; CPU OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E304 {useragents: [FBAN/FBIOS;FBAV/92.0.0.46.70;FBBV/57733420;FBDV/iPad4,4;FBMD/iPad;FBSN/iOS;FBSV/10.3.1;FBSS/2;FBCR/;FBID/tablet;FBLC/zh_TW;FBOP/5;FBRV/0]",
          ],
          ...appleTouchWindow,
        },
      ],
      TWITTER: [
        {
          useragents: [
            "Mozilla/5.0 (iPad; CPU OS 10_3_1 like Mac OS X) AppleWebKit/602.3.12 (KHTML, like Gecko) Mobile/14E304 Twitter for iPhone",
          ],
          ...appleTouchWindow,
        },
      ],
      LINE: [
        {
          useragents: [
            "Mozilla/5.0 (iPad; CPU OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E304 Safari Line/7.3.0",
          ],
          ...appleTouchWindow,
        },
      ],
      INSTAGRAM: [
        {
          useragents: [
            "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E304 Instagram 10.20.0 (iPad4,4; iOS 10_3_1; zh_TW; zh-TW; scale=2.00; gamut=normal; 640x960)",
          ],
          ...appleTouchWindow,
        },
      ],
      WECHAT: [
        {
          useragents: [
            "Mozilla/5.0 (iPad; CPU OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E304 MicroMessenger/6.5.8 NetType/WIFI Language/zh_TW",
          ],
          ...appleTouchWindow,
        },
      ],
    },
    not_inapp: {
      CHROME: [
        {
          useragents: [
            "Mozilla/5.0 (iPad; CPU OS 10_3_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/58.0.3029.83 Mobile/14E304 Safari/602.1",
          ],
          ...appleTouchWindow,
        },
      ],
      SAFARI: [
        {
          useragents: [
            "Mozilla/5.0 (iPad; CPU OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
          ],
          ...appleTouchWindow,
        },
        {
          useragents: [
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",
          ],
          window: {
            SchemaDataExtractor: {},
            document: { ontouchend: {} }, // helps tell us this is an iPad (user agent is weird for iPad later versions)
          },
        },
      ],
    },
  },
};
