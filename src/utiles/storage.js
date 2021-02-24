export const getItem = TOKEN_NAME => {
  const data = window.localStorage.getItem(TOKEN_NAME)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
export const setItem = (TOKEN_NAME, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(TOKEN_NAME, value)
}

export const removeItem = TOKEN_NAME => {
  window.localStorage.removeItem(TOKEN_NAME)
}
