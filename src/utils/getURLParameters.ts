export const getURLParameters = () => {
  const query = window.location.search
  const urlParameters = new URLSearchParams(query)
  const code = urlParameters.get('code')
  const username = urlParameters.get('username')
  return { code, username }
}
