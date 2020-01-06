   const { Apkup } = require('apkup');
   const core = require('@actions/core');


   const serviceAccount = core.getInput('SERVICE_ACCOUNT_JSON');
   console.log(serviceAccount);
   console.log(Object.keys(serviceAccount));

   const apkup = new Apkup({
       client_email: 'moveo-service-account-212@api-5645872680891446472-637751.iam.gserviceaccount.com',
//       private_key: serviceAccount.private_key
       private_key: '58a978016bc8629a7d4fa9d109665d4f3c121086'
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