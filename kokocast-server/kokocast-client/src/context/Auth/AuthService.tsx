const AUTH_STORAGE_KEY = 'kokocast_authorization_token_key';

export const getToken = (): string | null => {
    return localStorage.getItem(AUTH_STORAGE_KEY);
};

export const saveToken = (token: string): void => {
    localStorage.setItem(AUTH_STORAGE_KEY, token);
};

export const clearToken = (): void => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
};
