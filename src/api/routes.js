export const host = `${process.env.REACT_APP_BACKEND_URL}/api/`
export const registerRoute = `${host}auth/register`
export const loginRoute = `${host}auth/login`
export const sendMessageRoute = `${host}messages/addmsg`
export const getAllMessageRoute = `${host}messages/getmsg`


export const allUsersRoute = `${host}user/allusers`

export const setAvatarRoute = `${host}user/image`
export const removeAvatar = `${host}user/image`
export const updateUser = `${host}user/`