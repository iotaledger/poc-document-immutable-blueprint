/**
     * Is the value trytes.
     * @param str The string to validate.
     * @param length The length to match.
     * @param name The parameter name.
     */
function isValidTrytes(str) {
  if (!new RegExp(`^[A-Z9]{${str.length}}$`).test(str)) {
    return false;
  }
  return true;
}

/**
     * Is the given paramater a potential messageId
     * @param str The string to validate.
     */
function isMessageId(str) {
  if (!new RegExp(`^[0-9a-f]{${str.length}}$`).test(str) || str.length != 64) {
    return false;
  }
  return true;
}

function redirectTo(url) {
  return window.location.replace(`${window.location.origin}${url}`);
}

function validateData(address, transactionHash, provider, file, cb) {
  let isValid = true;
  if (file == null && isValid) {
    alert('Looks like the file is not set, please set your file to be validated! You are now going to be redirected to start fresh again.');
    redirectTo('/');
    isValid = false;
  }
  console.log(transactionHash)
  console.log(isMessageId(transactionHash))
  if (isValid && isMessageId(transactionHash)) {
    //Only on Chrysalis we need a provided node, as on legacy we use a hardcoded URL
    if (provider == '') {
      alert('Looks like the node is not yet selected, please go and select your node if you want to sign a document! You are now going to be redirected to start fresh again.');
      redirectTo('/');
      isValid = false;
    }
  }
  else if (isValid && (!isValidTrytes(address) || !isValidTrytes(transactionHash))) {
    alert('Did you attempt to enter a Proof of Existence issued on the Legacy-network? If so: Address and/or transactionHash are not yet set! Please fill the below with 81 Trytes.');
    isValid = false;
  }
  return isValid;
}

export {
  isMessageId,
  isValidTrytes,
  validateData,
  redirectTo
}
