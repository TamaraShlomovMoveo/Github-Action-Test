   const { Apkup } = require('apkup');
   const core = require('@actions/core');

   const serviceAccount = JSON.parse(core.getInput('SERVICE_ACCOUNT_JSON'));
   console.log(serviceAccount.client_email);
    console.log("private key: " + serviceAccount.private_key)



   const apkup = new Apkup({
       client_email: serviceAccount.client_email,
//       private_key: serviceAccount.private_key
       private_key: serviceAccount.private_key
   });



   const releaseFilePath = process.env.GITHUB_WORKSPACE + '/app-release.apk';

   apkup
       .upload(releaseFilePath, {
           releaseNotes: [
               {
                   language: 'en-US',
                   text: "DEMO"
               }
           ]
       })
       .then(data => {
           console.log('YAY i uploaded successfully');
       })
       .catch(err => {
           console.log("Failed uoloading", err);
           console.log(JSON.stringify(err.response.data));
           throw err;
       })