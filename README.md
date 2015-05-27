# WFH Email Cron

This is a daemon written in Node.js to query the pebble {code} Working From Home API and then send a formatted email out.

# Installation

First install the dependencies

    npm install
    

Then copy the configuration file template into place

    cp config.js.template config.js

Fill out the configuration variables

* gmail
  * user - the gmail username for the sending account
  * password - the gmail password for the sending account
* mailOpts
  * from - the from address for the generated email
  * to - the to address for the generated email
  * subject - the subject for the generated email

To test the script you can simply run it

    node index.js

To run the script with config for different environments use an environment variable. 

    NODE_ENV=production node index.js

# Setting up the cron job

You will most likely want to run this on a daily basis to send an email out to the company.

The handling of the cron job is delegated to the operating system. If you need a primer on how to do this on UNIX you'll find it [here][1]

To run the task at 10am each day use this:

    * 10 * * 1-5 /path/to/script/index.js 


# TODO

* Pretty HTML Email
* Remove the need to map real names by adding these to the API
* Try a rewrite in Golang

[1]: http://www.cyberciti.biz/faq/how-do-i-add-jobs-to-cron-under-linux-or-unix-oses/



