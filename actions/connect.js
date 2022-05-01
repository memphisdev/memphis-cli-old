
const login = require("../controllers/login")
const fs = require('fs');

module.exports = (credentials) => {
     let fixedUrl;
     let url = credentials.server.endsWith('/') ? credentials.server.slice(0, -1) : credentials.server;
     url = url.endsWith('api') ? url.replace('/api', '') : url;
     try {
          if(!url.startsWith("http")){
               fixedUrl = "https://" + url;
          }
          else{
               fixedUrl = url;
          }
          return login(fixedUrl, credentials.user, credentials.password)
               .then(res => {
                    if (res){
                         const d = new Date();
                         const expiration = d.getTime() + res.expires_in - 100000;
                         const credentialsDetails = {
                              user: credentials.user,
                              password: credentials.password,
                              server: fixedUrl,
                              jwt: res.jwt,
                              expiration: expiration
                         };
                         const data = JSON.stringify(credentialsDetails);
                         fs.writeFileSync('.memconfig', data);
                         console.log(`Connected successfully to ${fixedUrl}`);
                    }
                    else {
                         let fixedUrl;
                              try {
                                  if(!url.startsWith("http")){
                                      fixedUrl = "http://" + url;
                                  }
                                  else if(url.startsWith("https")){
                                      fixedUrl = url.replace("https", "http"); 
                                  }
                                  else if(!url.startsWith("https")){
                                        fixedUrl = url.replace("http", "https");
                                  }
                                  return login(fixedUrl, credentials.user, credentials.password)
                                  .then(res => {
                                        if (res){ 
                                             const d = new Date();
                                             const expiration = d.getTime() + res.expires_in - 100000;
                                             const credentialsDetails = {
                                                  user: credentials.user,
                                                  password: credentials.password,
                                                  server: fixedUrl,
                                                  jwt: res.jwt,
                                                  expiration: expiration
                                             };
                                             const data = JSON.stringify(credentialsDetails);
                                             fs.writeFileSync('.memconfig', data);
                                             console.log(`Connected successfully to ${fixedUrl}`);
                                        }
                                        else{
                                             console.log("Failed to connect to Memphis control plane.")
                                        }
                                   }).catch((error) => {
                                        if (error.status === 666){
                                             console.log(error.errorObj.message);
                                        } else {
                                             console.log("Failed to connect to Memphis control plane.")
                                        }
                                   });
                              } catch (error) {
                                   if (error.status === 666){
                                        console.log(error.errorObj.message);
                                   } else {
                                        console.log("Failed to connect to Memphis control plane.")
                                   }
                              }
                         console.log("Failed to connect to Memphis control plane.")
                         fs.writeFileSync('.memconfig', "");
                    }
                    return res
               })
               .catch((error) => {
                    if (error.status === 666){
                         console.log(error.errorObj.message);
                    } else {
                         console.log("Failed to connect to Memphis control plane.")
                    }
               });
        } catch (error) {
          if (error.status === 666){
               console.log(error.errorObj.message);
          } else {
               console.log("Failed to connect to Memphis control plane.")
          }
        }

        
     
}
