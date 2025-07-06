import { getIsSafariPrivate } from "../detectSafariPrivate";

const mockIndexedDB = {
  open: jest.fn(),
  deleteDatabase: jest.fn(),
};

const mockIDBDatabase = {
  createObjectStore: jest.fn(),
  close: jest.fn(),
};

const mockIDBObjectStore = {
  put: jest.fn(),
};

const mockPutRequest = {
  onerror: null as any,
  onsuccess: null as any,
};

const mockNavigatorStorage = {
  getDirectory: jest.fn(),
};

// Store original values
const originalNavigator = global.navigator;
const originalIndexedDB = global.indexedDB;

describe("detectSafariPrivate", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIDBDatabase.createObjectStore.mockReturnValue(mockIDBObjectStore);
    mockIDBObjectStore.put.mockReturnValue(mockPutRequest);
    mockIndexedDB.deleteDatabase.mockResolvedValue(undefined);
  });

  afterEach(() => {
    // Restore original values
    Object.defineProperty(global, "navigator", {
      value: originalNavigator,
      writable: true,
    });
    Object.defineProperty(global, "indexedDB", {
      value: originalIndexedDB,
      writable: true,
    });
  });

  describe("navigator undefined", () => {
    it("returns false when navigator is undefined", async () => {
      // Temporarily delete navigator
      delete (global as any).navigator;

      const result = await getIsSafariPrivate();

      expect(result).toBe(false);

      // Restore navigator
      Object.defineProperty(global, "navigator", {
        value: originalNavigator,
        writable: true,
      });
    });
  });

  describe("currentSafariTest (modern Safari)", () => {
    beforeEach(() => {
      // Mock modern Safari with storage.getDirectory
      Object.defineProperty(global, "navigator", {
        value: {
          ...originalNavigator,
          storage: mockNavigatorStorage,
        },
        writable: true,
      });
    });

    it("returns false when not in private mode", async () => {
      mockNavigatorStorage.getDirectory.mockResolvedValue({});

      const result = await getIsSafariPrivate();

      expect(result).toBe(false);
      expect(mockNavigatorStorage.getDirectory).toHaveBeenCalled();
    });

    it("returns true when in private mode with expected error message", async () => {
      const error = new Error("Unknown transient reason");
      mockNavigatorStorage.getDirectory.mockRejectedValue(error);

      const result = await getIsSafariPrivate();

      expect(result).toBe(true);
      expect(mockNavigatorStorage.getDirectory).toHaveBeenCalled();
    });

    it("returns true with case-insensitive error message matching", async () => {
      const error = new Error("UNKNOWN TRANSIENT REASON");
      mockNavigatorStorage.getDirectory.mockRejectedValue(error);

      const result = await getIsSafariPrivate();

      expect(result).toBe(true);
      expect(mockNavigatorStorage.getDirectory).toHaveBeenCalled();
    });

    it("returns false when error message does not indicate private mode", async () => {
      const error = new Error("some other error");
      mockNavigatorStorage.getDirectory.mockRejectedValue(error);

      const result = await getIsSafariPrivate();

      expect(result).toBe(false);
      expect(mockNavigatorStorage.getDirectory).toHaveBeenCalled();
    });

    it("returns false when error is not an Error instance", async () => {
      mockNavigatorStorage.getDirectory.mockRejectedValue("string error");

      const result = await getIsSafariPrivate();

      expect(result).toBe(false);
      expect(mockNavigatorStorage.getDirectory).toHaveBeenCalled();
    });

    it("handles null error gracefully", async () => {
      mockNavigatorStorage.getDirectory.mockRejectedValue(null);

      const result = await getIsSafariPrivate();

      expect(result).toBe(false);
      expect(mockNavigatorStorage.getDirectory).toHaveBeenCalled();
    });
  });

  describe("safari13to18Test (legacy Safari)", () => {
    beforeEach(() => {
      // Mock legacy Safari without storage.getDirectory but with maxTouchPoints
      Object.defineProperty(global, "navigator", {
        value: {
          ...originalNavigator,
          storage: undefined,
          maxTouchPoints: 5,
        },
        writable: true,
      });
      Object.defineProperty(global, "indexedDB", {
        value: mockIndexedDB,
        writable: true,
      });
      Object.defineProperty(global, "Blob", {
        value: class MockBlob {},
        writable: true,
      });
    });

    it("returns false when not in private mode (successful blob storage)", async () => {
      const mockDBRequest = {
        result: mockIDBDatabase,
        onupgradeneeded: null as any,
        onerror: null as any,
        onsuccess: null as any,
      };

      mockIndexedDB.open.mockReturnValue(mockDBRequest);

      const resultPromise = getIsSafariPrivate();

      // Simulate successful upgrade
      const upgradeEvent = {
        target: { result: mockIDBDatabase },
      };
      mockDBRequest.onupgradeneeded(upgradeEvent);

      // Simulate successful put operation
      mockPutRequest.onsuccess();

      const result = await resultPromise;

      expect(result).toBe(false);
      expect(mockIndexedDB.open).toHaveBeenCalled();
      expect(mockIDBDatabase.createObjectStore).toHaveBeenCalledWith("t", {
        autoIncrement: true,
      });
      expect(mockIDBObjectStore.put).toHaveBeenCalledWith(expect.any(Object)); // Blob
      expect(mockIDBDatabase.close).toHaveBeenCalled();
      expect(mockIndexedDB.deleteDatabase).toHaveBeenCalled();
    });

    it("returns true when in private mode (blob storage fails)", async () => {
      const mockDBRequest = {
        result: mockIDBDatabase,
        onupgradeneeded: null as any,
        onerror: null as any,
        onsuccess: null as any,
      };

      mockIndexedDB.open.mockReturnValue(mockDBRequest);

      const resultPromise = getIsSafariPrivate();

      // Simulate upgrade
      const upgradeEvent = {
        target: { result: mockIDBDatabase },
      };
      mockDBRequest.onupgradeneeded(upgradeEvent);

      // Simulate failed put operation (private mode)
      mockPutRequest.onerror({
        target: {
          error: new Error("Blobs are not yet supported"),
        },
      });

      const result = await resultPromise;

      expect(result).toBe(true);
      expect(mockIndexedDB.open).toHaveBeenCalled();
      expect(mockIDBDatabase.createObjectStore).toHaveBeenCalledWith("t", {
        autoIncrement: true,
      });
      expect(mockIDBObjectStore.put).toHaveBeenCalledWith(expect.any(Object)); // Blob
      expect(mockIDBDatabase.close).toHaveBeenCalled();
      expect(mockIndexedDB.deleteDatabase).toHaveBeenCalled();
    });

    it("returns false when db request fails", async () => {
      const mockDBRequest = {
        result: mockIDBDatabase,
        onupgradeneeded: null as any,
        onerror: null as any,
        onsuccess: null as any,
      };

      mockIndexedDB.open.mockReturnValue(mockDBRequest);

      const resultPromise = getIsSafariPrivate();

      // Simulate db error
      mockDBRequest.onerror();

      const result = await resultPromise;

      expect(result).toBe(false);
      expect(mockIndexedDB.open).toHaveBeenCalled();
      expect(mockIndexedDB.deleteDatabase).toHaveBeenCalled();
    });

    it("handles promise settlement correctly (only settle once)", async () => {
      const mockDBRequest = {
        result: mockIDBDatabase,
        onupgradeneeded: null as any,
        onerror: null as any,
        onsuccess: null as any,
      };

      mockIndexedDB.open.mockReturnValue(mockDBRequest);

      const resultPromise = getIsSafariPrivate();

      // Simulate upgrade
      const upgradeEvent = {
        target: { result: mockIDBDatabase },
      };
      mockDBRequest.onupgradeneeded(upgradeEvent);

      // Try to call both success and error (should only settle once)
      mockPutRequest.onsuccess();
      mockPutRequest.onerror({
        target: {
          error: new Error("Blobs are not yet supported"),
        },
      }); // This should be ignored

      const result = await resultPromise;

      expect(result).toBe(false); // Should be the first result (success)
      expect(mockIndexedDB.deleteDatabase).toHaveBeenCalledTimes(1); // Should only be called once
      expect(mockIDBDatabase.close).toHaveBeenCalledTimes(1); // Should only be called once
    });
  });

  describe("fallback scenarios", () => {
    it("returns false when neither storage.getDirectory nor maxTouchPoints are available", async () => {
      // Mock environment without modern Safari storage or touch support
      Object.defineProperty(global, "navigator", {
        value: {
          ...originalNavigator,
          storage: undefined,
          maxTouchPoints: undefined,
        },
        writable: true,
      });

      const result = await getIsSafariPrivate();

      expect(result).toBe(false);
    });

    it("uses currentSafariTest when storage.getDirectory is available even if maxTouchPoints is also available", async () => {
      // Mock both APIs available - should prefer modern one
      Object.defineProperty(global, "navigator", {
        value: {
          ...originalNavigator,
          storage: mockNavigatorStorage,
          maxTouchPoints: 5,
        },
        writable: true,
      });

      mockNavigatorStorage.getDirectory.mockResolvedValue({});

      const result = await getIsSafariPrivate();

      expect(result).toBe(false);
      expect(mockNavigatorStorage.getDirectory).toHaveBeenCalled();
      // indexedDB should not be called since modern API is preferred
      expect(mockIndexedDB.open).not.toHaveBeenCalled();
    });

    it("handles storage object without getDirectory method", async () => {
      // Mock storage object that exists but doesn't have getDirectory
      Object.defineProperty(global, "navigator", {
        value: {
          ...originalNavigator,
          storage: {}, // No getDirectory method
          maxTouchPoints: 5,
        },
        writable: true,
      });
      Object.defineProperty(global, "indexedDB", {
        value: mockIndexedDB,
        writable: true,
      });

      const mockDBRequest = {
        onupgradeneeded: null as any,
        onerror: null as any,
      };

      mockIndexedDB.open.mockReturnValue(mockDBRequest);

      const resultPromise = getIsSafariPrivate();

      // Should fall back to safari13to18Test
      const upgradeEvent = {
        target: { result: mockIDBDatabase },
      };
      mockDBRequest.onupgradeneeded(upgradeEvent);
      mockPutRequest.onsuccess();

      const result = await resultPromise;

      expect(result).toBe(false);
      expect(mockIndexedDB.open).toHaveBeenCalled();
    });
  });
});
