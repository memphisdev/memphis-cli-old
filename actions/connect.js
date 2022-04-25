
const login = require("../controllers/login")
const fs = require('fs');

module.exports = (credentials) => {
     let fixedUrl;
     try {
          if(!credentials.server.startsWith("http")){
               fixedUrl = "https://" + credentials.server;
          }
          else{
               fixedUrl = credentials.server;
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
                         console.log("Connected successfully to Memphis control plane.")
                    }
                    else {
                         let fixedUrl;
                              try {
                                  if(!credentials.server.startsWith("http")){
                                      fixedUrl = "http://" + url;
                                  }
                                  else if(credentials.server.startsWith("https")){
                                      fixedUrl = credentials.server.replace("https", "http"); 
                                  }
                                  else if(!credentials.server.startsWith("https")){
                                        fixedUrl = credentials.server.replace("http", "https");
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
                                             console.log("Connected successfully to Memphis control plane.")
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
