// LocalStorage helpers with wallet-scoped keys

const getKey = (walletAddress: string, namespace: string): string => {
  return `innerproof_${walletAddress.slice(0, 12)}_${namespace}`;
};

export const storage = {
  get<T>(walletAddress: string, namespace: string): T | null {
    try {
      const key = getKey(walletAddress, namespace);
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) as T : null;
    } catch {
      return null;
    }
  },

  set<T>(walletAddress: string, namespace: string, value: T): void {
    try {
      const key = getKey(walletAddress, namespace);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  },

  remove(walletAddress: string, namespace: string): void {
    try {
      const key = getKey(walletAddress, namespace);
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Failed to remove from localStorage:', e);
    }
  },

  // For non-wallet-scoped data
  getGlobal<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(`innerproof_${key}`);
      return data ? JSON.parse(data) as T : null;
    } catch {
      return null;
    }
  },

  setGlobal<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`innerproof_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  },
};
