@sap/jobs-client
=========

Node.js client for XS Advanced Job Scheduler service

This is a small Node.js module to integrate jobs in your Node.js application.
The module contains utilities to create REST calls according to expected by job scheduler
service request format used to register/unregister jobs in job scheduler service, update
job schedules and job status.

## Usage

This module works with job descriptor objects, having the properties as
the expected by the respective service in JobScheduler.

Example usage:

```js
  var jobsc = require('@sap/jobs-client');

  var options = {
    host: 'localhost',
    port: 4242,
    timeout: 15000,
    user: 'username',
    password: 'password',
    baseURL: 'http://apphost:port/'
  };

  var myJob = { /* according to job scheduler documentation */ };

  var scheduler = new jobsc.Scheduler(options);
  var scJob = { job: myJob };

  scheduler.createJob(scJob, function (error, body) {
    if (error) {
      return console.log('Error registering new job %s', error);
    }
    // job was created successfully
    job.id = body._id;
  });

  ...

```
Update job,
```js
  var req = {
    jobId: 33,
    job: {
      user : 'John',
      password : 'secret',
      active : 1
    }
  };
  scheduler.updateJob(req, function(err, result) {
    if(err){
      return console.log('Error updating job: %s', err);
    }
    //job was updated successfully
  });
```

Delete job,
```js
  var req = {
    jobId: 33
  };
  scheduler.deleteJob(req, function(err, result) {
    if(err){
      return console.log('Error deleting job: %s', err);
    }
    //job was deleted successfully
  });
```

Get job Details,
```js
  var req = {
    //by Id
    jobId: 33
  };
  scheduler.fetchJob(req, function(err, result) {
    if(err){
      return console.log('Error retrieving job: %s', err);
    }
    //job details retrieved successfully
  });
  var req = {
    //by name
    name: 'my job'
  };
  scheduler.fetchJob(req, function(err, result) {
    if(err){
      return console.log('Error retrieving job: %s', err);
    }
    //job details retrieved successfully
  });
```

Create job schedule,
```js
  var mySchedule = { /* according to job scheduler documentation */ }
  var req = {
    jobId: 33,
    schedule: mySchedule
  };
  scheduler.createJobSchedule(req, function(err, result) {
    if(err){
      return console.log('Error creating job schedule: %s', err);
    }
    //Schedule created successfully
  });
```

Update job schedule,
```js
  var req = {
    jobId: 33,
    scheduleId: 'ABC-DEF',
    schedule: {
      cron: "* * * * 4"
    }
  };
  scheduler.updateJobSchedule(req, function(err, result) {
    if(err){
      return console.log('Error updating job schedule: %s', err);
    }
    //Schedule updated successfully
  });
```

Delete job schedule,
```js
  var req = {
    jobId: 33,
    scheduleId: 'ABC-DEF'
  };
  scheduler.deleteJobSchedule(req, function(err, result) {
    if(err){
      return console.log('Error deleting schedule: %s', err);
    }
    //Schedule deleted successfully
  });
```

Get all jobs,
```js
  var req = {};
  scheduler.fetchAllJobs(req, function(err, result) {
    if(err){
      return console.log('Error retrieving jobs: %s', err);
    }
    //Jobs retrieved successfully
  });
```

Get job schedule details,
```js
  var req = {
    jobId: 33,
    scheduleId: 'ABC-DEF',
    displayLogs: false
  };
  scheduler.fetchJobSchedule(req, function(err, result) {
    if(err){
      return console.log('Error retrieving schedule: %s', err);
    }
    //Schedule retrieved successfully
  });
```

Get schedules of job,
```js
  var req = {
    jobId: 33
  };
  scheduler.fetchJobSchedules(req, function(err, result) {
    if(err){
      return console.log('Error retrieving all schedules: %s', err);
    }
    //All schedules retrieved successfully
  });
```

Update run log of schedule,
```js
  var req = {
    jobId: 33,
    scheduleId: 'ABC-DEF',
    runId: 1,
    data: data
  };
  scheduler.updateJobRunLog(req, function(err, result) {
    if(err){
      return console.log('Error updating run log: %s', err);
    }
    //Run log updated successfully
  });
```

Get run logs of schedule,
```js
  var req = {
    jobId: 33,
    scheduleId: 'ABC-DEF',
    page_size: 15,
    offset: 0
  };
  scheduler.getRunLogs(req, function(err, result) {
    if(err){
      return console.log('Error retrieving run logs: %s', err);
    }
    //Run log retrieved successfully
  });
```

Delete all schedules of job,
```js
  var req = {
    jobId: 3
  };
  scheduler.deleteAllJobSchedules(req, function(err, result) {
    if(err){
      return console.log('Error deleting schedules: %s', err);
    }
    //All schedules deleted successfully
  });
```

Bulk activation of schedules of job,
```js
  var req = {
    jobId: 3
  };
  scheduler.activateAllSchedules(req, function(err, result) {
    if(err){
      return console.log('Error activating bulk schedules: %s', err);
    }
    //All schedules activated successfully
  });
```

Bulk deactivation of schedules of job,
```js
  var req = {
    jobId: 3
  };
  scheduler.deactivateAllSchedules(req, function(err, result) {
    if(err){
      return console.log('Error deactivating bulk schedules: %s', err);
    }
    //All schedules deactivated successfully
  });
```


Get action logs of job,
```js
  var req = {
    jobId: 3
  };
  scheduler.getJobActionLogs(req, function(err, result) {
    if(err){
      return console.log('Error retrieving action logs: %s', err);
    }
    //All actionlogs logs retrieved successfully
  });
```

Get action logs of schedule,
```js
  var req = {
    jobId: 3,
    scheduleId: "ABC-DEF"
  };
  scheduler.getScheduleActionLogs(req, function(err, result) {
    if(err){
      return console.log('Error retrieving action logs: %s', err);
    }
    //All actionlogs logs retrieved successfully
  });
```

Get active and inactive jobcount
```js
  var req = {
    activeStatus: true // true- for getting active number of jobs and false- for getting inactive number of jobs
  };
  scheduler.getJobCount(req, function(err, result) {
    if(err){
      return console.log('Error retrieving jobcount: %s', err);
    }
    //Active Job count retrieved successfully
  });
```

###Search API :
Search can be done in both job and schedule entities. Here in the client 'q' contains the query parameter, you need to provide the query in decoded format, the client will decode the query. And filtering parameters can be provided as shown below:

```js
var searchToken = {
    q : 'job startTime:>2011-02-18 active:false',
    displaySchedules : 'false',
    offset : 0,
    page_size : 5
  };

  scheduler.searchJobs(searchToken,function(error,result){
      if(error){
        return console.log('Error during Job search: %s',error);
      }
      console.log(JSON.stringify(result));

  });
  ```
  For schedule search:
  ```js
  var searchScheduleToken = {
    q : 'startTime:>2011-02-18 active:false',
    offset : 0,
    page_size : 5
  };

  scheduler.searchSchedules(searchScheduleToken,function(error,result){
      if(error){
        return console.log('Error during Schedule search %s',error);
      }
      console.log(JSON.stringify(result));

  });
  ```
