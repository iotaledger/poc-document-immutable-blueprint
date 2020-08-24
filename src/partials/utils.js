function isValidTrytes(str) {
  let isValid = true
  //should be A-Z and 9s and all uppercase
  isValid = (str.length >= 81)
  console.log(isValid, str.length)
  return isValid
}

function redirectTo(url) {
  return window.location.replace(`${window.location.origin}${url}`);
}

function validateData(address, transactionHash, provider, file, cb) {
  let isValid = true
  if(!isValidTrytes(address) || !isValidTrytes(transactionHash)) {
    alert('Address and/or transactionHash are not yet set! Please fill the below with 81 Trytes.')
    isValid = false
  }
  if(provider=='' && isValid) {
    alert('Looks like the Node is not yet selected, please go and select your node! you are going to be redirected to start fresh again')
    redirectTo('/')
    isValid = false
  }
  if(file==null && isValid) {
    alert('Looks like the File is not set, please set your file to be validated! you are going to be redirected to start fresh again')
    redirectTo('/')
    isValid = false
  }
  return isValid
}

export {
  isValidTrytes,
  validateData,
  redirectTo
}
