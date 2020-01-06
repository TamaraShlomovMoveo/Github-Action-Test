   const { Apkup } = require('apkup');
   const core = require('@actions/core');


   const serviceAccount = core.getInput('SERVICE_ACCOUNT_JSON');
   console.log(serviceAccount);
   console.log(Object.keys(serviceAccount));

   const apkup = new Apkup({
       client_email: 'tamara@moveo.co.il',
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
       })