export const logout = () => {
    localStorage.removeItem('user')

    // 화면을 새로고침 해준다.
    window.location.href = '/channels'
};
