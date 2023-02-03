export const STORAGE_ITEMS: LocalStorageItems = {
  accessToken: 'koodaki-admin-at',
  refreshToken: 'koodaki-admin-rt',
  user: 'user',
};

export interface LocalStorageItems {
  accessToken: string;
  refreshToken: string;
  user: string;
}
