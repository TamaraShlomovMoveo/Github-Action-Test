   const { Apkup } = require('apkup');
   const core = require('@actions/core');

   const private_key = `
   MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCSSt8rDB2JRxbE
   SiuBpjtTA3l46wpQroXKGLAJbgYoLNaDw8474X/LletMcPdZ198l3OTIhH+Lyi66
   71ESgo68P8sKWmLHtUhgV8OHHfuHyXmNvg/UpPfBaNebyQOYiMybYA7jLXhTbNTV
   Hv9O1nHpU+Xlw2JSAPUBrTuQ/vItszhgVg2opJ8d+W1XEO3jq9OzupbLX1diowfv
   cwHRpeFH+Gc0m4qLae0qdzF8LhqNelSRE4AXKH6t3kjJraMTHHE8Es+SEFj7HqJk
   M1Rl6+bSMLCIqM7PmYMl9A+ixPxneOI3Be5WHcr3X6HlKaKbc5zJfurwlu1tMS+C
   /ikjPl8LAgMBAAECggEABN2oVPJhtx5eCP2zOxbliT99K62cWbj8VTpYp0T5anOs
   rOmh3fGvAlKvEWCpMYanHZzJH/bxlnDio1rGFmNbo7JMKsDSi/RL1HyG0eMy6b4k
   pLd00ldXBaAFmou8lWG+IHrjnosgIfI66rMjEyMPMI9sVFCZNW4NDYG5ZftnixKK
   mSbgh1sC2yKFrPnobnq+AHhrt6V52/ad+G30hYfFUSCBvFPkpsbgOAHDqfkXcEI+
   FL2qEZPjhlp0p+hXUdtL6eME8i34aVGLJYrczwN4IrLswcnq7LirVJvsu7JuSW1K
   kKjIBWmDYckZUZOWatDG/vL1Rq7smYisfOgTK9zkkQKBgQDJukeXlZubw86uTfOH
   NdWKUpSBKA8dMxt4+3DFYYG8ihKg1s7NNpO0vh55aC+PlAhEADSv3FfCM0v/wfUb
   uAcL497ni3qXfcY0TfaBjqWojxKtNxvb883KgtNVTRTu8TKPaO1SpQpLdY8064Hc
   3Lr6sl82RTVATo65SWtZKeoMWwKBgQC5ppF70jkegL2loSukSiYq8AEWoNgQ1ZK5FtGkI7FEDTW/iQCrjvJoFByg2xWISnVBIR3msO0RAd1jHjD+4vzCqxqUF2OFF2mjnCNMP9yCja9Fpa0LIf6RFf5WH9d5qSL+ljFs8oaECFgYkuf+TceW/DdD5AXdD0vO1/ksA+Q3EQKBgQCi9ZaL/9GavU0jRdlq6rQ8b4WD6KZ9AiI5U3XAHYq+khOGVsDsyh/8LHFVxjJVnFIpDLmDL069lM7aJwcogzs+AbC5/9TiuDn7Wte9xUxRpHKD9zbMMmGWLKUoDYLRm4sqiqrcznJIjwlGyNE5aB6sEpgTsUjZUBy/1W2gs9lcbQKBgQC5MRaJPNCrw+LqeRbOwQTH6jg7uWEvkczWA5RGtzAaYU8PbHwVpvfaqM1SDJmzJgtHV+C7AhzJzWFpgXGAoS9ghUxzE827svo3MgboBgBS30FLKZSvuU52rkjS4tqQSw9UhMBzHI7g4G34vXrc6/vAeoIqoCjVNm/5uumdZZhe8QKBgHM4QQwezpDpz8tpKKYXlnLy2FFXKPzbgt3CyWwVqShCU9xKHXrzyKeZP/tZckLi62nrq5QN5F8Hd3+qPTvsrWvPXMeU56ZavT5TKsL5mbwoxyWDdsg2+wMF2K7SuGjX20S3bUH3Mvz3dus4H/upSNv3SSLK45KmmP6sMUMFn4R6"
   `

   const serviceAccount = core.getInput('SERVICE_ACCOUNT_JSON');
   console.log(serviceAccount);
   console.log(Object.keys(serviceAccount));

   const apkup = new Apkup({
       client_email: 'moveo-service-account-212@api-5645872680891446472-637751.iam.gserviceaccount.com',
//       private_key: serviceAccount.private_key
       private_key: private_key
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