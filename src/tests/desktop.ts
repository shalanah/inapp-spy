import { DeviceObj } from "./utils";

export const DESKTOP: DeviceObj = {
  MACOS: {
    not_inapp: {
      SAFARI: [
        {
          useragents: [
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",
          ],
          window: {
            document: {}, // no touch events
          },
        },
      ],
      CHROME: [
        {
          useragents: [
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
          ],
          window: {
            document: {}, // no touch events
          },
        },
      ],
    },
  },
  WINDOWS: {
    not_inapp: {
      CHROME: [
        {
          useragents: [
            "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
          ],
        },
      ],
      FIREFOX: [
        {
          useragents: [
            "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0",
          ],
        },
      ],
      IE11: [
        {
          useragents: [
            "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
          ],
        },
      ],
    },
  },
  UBUNTU: {
    not_inapp: {
      CHROME: [
        {
          useragents: [
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3100.0 Safari/537.36",
          ],
        },
      ],
      FIREFOX: [
        {
          useragents: [
            "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:53.0) Gecko/20100101 Firefox/53.0",
          ],
        },
      ],
      VIVALDI: [
        {
          useragents: [
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.114 Safari/537.36 Vivaldi/1.9.818.50",
          ],
        },
      ],
    },
  },
};
