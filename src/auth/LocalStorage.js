export default   {
  setUsername(value) {

    localStorage.setItem("username", value);
  },
  setPassword(value) {

    localStorage.setItem("password", value);
  },
  removeUsername() {
   
    return localStorage.removeItem("username");
   
  },
  removePassword() {
   
    return localStorage.removeItem("password") ;
   
  }, 
  getUsername() {
   
    return localStorage.getItem("username");
   
  },
  getPassword() {
   
    return localStorage.getItem("password") ;
   
  } ,
  setFilesEditorDrawerWidth(value) {
    localStorage.setItem("fileseditordrawerwidth", value);
  },
  getFilesEditorDrawerWidth() {
    return localStorage.getItem("fileseditordrawerwidth") ;
  },
   setRememberMeChecked(isChecked) {
    localStorage.setItem("axonarchive", isChecked ? "true" : "false");
  },
  setRememberUsername(value) {

    localStorage.setItem("rememberusername", value);
  },
  setRememberPassword(value) {

    localStorage.setItem("rememberpassword", value);
  },
  getRememberUsername() {

    return localStorage.getItem("rememberusername");
  },
 getRememberPassword() {

  return localStorage.getItem("rememberpassword");
  },
   getRememberMeChecked() {
    const rememberMeValue = localStorage.getItem("axonarchive");
    return rememberMeValue === "true";
  }

}
