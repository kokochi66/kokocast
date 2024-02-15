const AUTH_STORAGE_KEY = 'kokocast_authorization_token_key';
const AUTH_PROFILE_IMAGE_KEY = 'kokocast_profile_image_key';
const baseURL = process.env.REACT_APP_API_BASE_URL || '';

export const getToken = (): string | null => {
    return localStorage.getItem(AUTH_STORAGE_KEY);
};

export const saveToken = (token: string): void => {
    localStorage.setItem(AUTH_STORAGE_KEY, token);
};

export const clearToken = (): void => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTH_PROFILE_IMAGE_KEY);
};


export const getProfileImageUrl = (): string | undefined => {
    let profileImageUrl = localStorage.getItem(AUTH_PROFILE_IMAGE_KEY);
    return profileImageUrl ? baseURL + profileImageUrl : 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png';
}

export const saveProfileImageUrl = (imageUrl: string): void => {
    localStorage.setItem(AUTH_PROFILE_IMAGE_KEY, imageUrl);
}