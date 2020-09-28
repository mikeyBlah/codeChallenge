exports.verifyJson = (data) => {
  try { 
    JSON.parse(data); 
    return true; 
  } 
  catch (err) { 
    return false; }
}