# TMutil
utility programs for tenant management related tasks


There are three projects in this repository 
1. JSUtil - command line interface which is written in node JS.
2. pc-server - is as collection of REST apis which has similar file which are there in JSUtil project. This rest APIs are currently for product catalog and feature toggle. Its written in expressJs
3. pc-ui - is a angular project which is just for visualization purpose. It consumes the data from pc-server.

Setup – 
The pc-server and pc-ui, both projects are build for local usage only. So the product catalog content repository and all feature toggle repositories needs to be present in the local machine.
The path of the product-catalog-content and feature-toggle repository are mentioned in the constant file. 
You can have a look in this file and update your local directories in this file – 
https://github.com/pritam-panhale-incontact/TMutil/blob/main/pc-server/src/util/constants.js

How to run
1.	Run the pc-server – 
	Go to pc-server directory  and run the command – node app.js
2.	Run pc-ui 
	Go to pc-ui and run the command – ng-serve
3.	Access the application from - http://localhost:4200/


Repositories for Feature Toggle -

https://github.com/nice-cxone/dev-feature-toggles.git
https://github.com/nice-cxone/test-feature-toggles.git
https://github.com/nice-cxone/staging-feature-toggles.git

https://github.com/nice-cxone/production-feature-toggles.git
https://github.com/nice-cxone/production-au-feature-toggles.git
https://github.com/nice-cxone/production-de-feature-toggles.git
https://github.com/nice-cxone/production-uk-feature-toggles.git
https://github.com/nice-cxone/production-fedramp-feature-toggles.git
https://github.com/nice-cxone/production-ca-feature-toggles.git
https://github.com/nice-cxone/production-jp-feature-toggles.git

https://github.com/nice-cxone/perf-feature-toggles.git
https://github.com/nice-cxone/icpune-perf-feature-toggles.git
https://github.com/nice-cxone/test-nvir-feature-toggles.git


Repository for product catalog

https://github.com/nice-cxone/saas-product-catalog-content
