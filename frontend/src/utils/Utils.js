export const readImg = file => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => resolve(reader.result)
  })
}
export const readVideo = (file) => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => resolve(reader.result)
  })
};

export const numberFormat = (number, digits) => {
  return Number(number).toLocaleString('th-TH', {
    minimumFractionDigits: digits || undefined,
    maximumFractionDigits: digits || undefined,
  })
}

/**
 * @param {Date} dateObj 
 * @returns 
 */
export const dateTimeToThaiString = (dateObj) => {
  return `${dateObj.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })} เวลา ${dateObj.toLocaleTimeString("th-TH", {
    timeStyle: "short",
  })} น.`;
};

export const getAuthTokens = () => {
  return new Promise(resolve => {
    return resolve(JSON.parse(localStorage.getItem('auth')))
  }).catch(e => null);
}