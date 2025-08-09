
export function encryptKey(passkey){
  return btoa(passkey);
}

export function decryptKey(passkey){
    return atob(passkey);
    }

export const parseSringfy = (data) => {
  return JSON.parse(data);
}

export const convertFileToUrl = (file) => URL.createObjectURL(file);
