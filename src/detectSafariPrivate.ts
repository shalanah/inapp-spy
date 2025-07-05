// Source: https://github.com/Joe12387/detectIncognito
// - Pulled out relevant parts for iOS Safari 17+ incognito detection
// - For greater private mode detection coverage, use the full library
// - Detection only works over https 

const currentSafariTest = async (): Promise<boolean> => {
  try {
    await navigator.storage.getDirectory();
    return false;
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return msg.toLowerCase().includes("unknown transient reason");
  }
};

const safari13to18Test = (): Promise<boolean> => {
  let settled = false;
  return new Promise((resolve) => {
    const name = `idb${Math.random()}`;
    const openReq = indexedDB.open(name, 1);

    const finish = (isPrivate: boolean, db?: IDBDatabase) => {
      if (settled) return;
      settled = true;
      if (db) db.close();
      indexedDB.deleteDatabase(name);
      resolve(isPrivate);
    };

    openReq.onupgradeneeded = (ev) => {
      const db = (ev.target as IDBOpenDBRequest).result;
      const putReq = db
        .createObjectStore("t", { autoIncrement: true })
        .put(new Blob());

      putReq.onerror = (event) => {
        const req = event.target as IDBRequest;
        const message = req.error?.message || "";
        finish(message.includes("are not yet supported"), db);
      };
      putReq.onsuccess = () => finish(false, db);
    };

    openReq.onerror = () => finish(false);
    // optional safety net:
    openReq.onsuccess = () => finish(false, openReq.result);
  });
};

export const getIsSafariPrivate = async (): Promise<boolean> => {
  if (typeof navigator === "undefined") return false;

  if (navigator.storage?.getDirectory !== undefined) {
    return await currentSafariTest();
  } else if (navigator.maxTouchPoints !== undefined) {
    return await safari13to18Test();
  }
  return false; // Fallback if neither method is available
};
