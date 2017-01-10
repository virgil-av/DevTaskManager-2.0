/**
 * My API Sandbox
 *
 */


Sandbox.define('/projects','GET', function(req, res){
  // retrieve projects or, if there are none init, to empty array
  state.projects = state.projects || [];

  return res.json(state.projects);
});

Sandbox.define('/projects','POST', function(req, res){
  // Check the request, make sure it is a compatible type
  if (!req.is('application/json')) {
    return res.send(400, 'Invalid content type, expected application/json');
  }

  // Set the type of response, sets the content type.
  res.type('application/json');

  // retrieve users or, if there are none, init to empty array
  state.projects = state.projects || [];

  // persist user by adding to the state object
  state.projects.push(req.body);

  // state.listProjects.push(_.clone(req.body));

  return res.json(req.body);
});

Sandbox.define('/list','GET', function(req, res){
  // Set the type of response, sets the content type.
  res.type('application/json');

  // retrieve projects or, if there are none init, to empty array
  state.projects = state.projects || [];

  function createSumary(project) {
    var sumary = {
      "colorId": project.colorId,
      "creationDate": project.creationDate,
      "id": project.id,
      "projectName": project.projectName
    };

    return sumary;
  }

  var listSumary = _.map(state.projects, createSumary);



  return res.json(listSumary);
});

Sandbox.define('/projects/{id}','GET', function(req, res){
  // retrieve projects or, if there are none, init to empty array
  state.projects = state.projects || [];

  // route param {id} is available on req.params
  var projectId = req.params.id;

  // log it to the console
  console.log("Getting project with " + projectId + " details");

  // use lodash to find the user in the array
  var project = _.find(state.projects, {
    "id": projectId
  });

  return res.json(project);
});

Sandbox.define('/projects/{id}','DELETE', function(req, res){
  // retrieve projects or, if there are none, init to empty array
  state.projects = state.projects || [];

  // route param {id} is available on req.params
  var projectId = req.params.id;

  // log it to the console
  console.log("Getting project with " + projectId + " deleating");

  // use lodash to find the project in the array and delete it
  _.remove(state.projects, {
    'id': projectId
  });

  _.remove(state.listProjects, {
    'id': projectId
  });


  return res.json({
    "project": projectId,
    "status": "deleted"
  });
});

Sandbox.define('/list/{id}','GET', function(req, res){
  // retrieve projects or, if there are none, init to empty array
  state.projects = state.projects || [];

  // route param {id} is available on req.params
  var projectId = req.params.id;

  // log it to the console
  console.log("Getting project with " + projectId + " details");

  // use lodash to find the user in the array
  var project = _.find(state.projects, {
    "id": projectId
  });


  var sumary = {
    "id": project.id,
    "projectName": project.projectName,
  };



  return res.json(sumary);
});









Sandbox.define('/projects/{id}/tasks','GET', function(req, res){
  // retrieve projects or, if there are none, init to empty array
  state.projects = state.projects || [];

  // route param {id} is available on req.params
  var projectId = req.params.id;

  // log it to the console
  console.log("Getting project with " + projectId + " details");

  // use lodash to find the user in the array
  var project = _.find(state.projects, {
    "id": projectId
  });

  project.tasks = project.tasks || [];

  return res.json(project.tasks);
});

Sandbox.define('/projects/{id}/tasks', 'POST', function(req, res){
  // Check the request, make sure it is a compatible type
  if (!req.is('application/json')) {
    return res.send(400, 'Invalid content type, expected application/json');
  }

  // retrieve projects or, if there are none, init to empty array
  state.projects = state.projects || [];

  // route param {id} is available on req.params
  var projectId = req.params.id;

  // log it to the console
  console.log("Getting project with " + projectId + " details");

  // use lodash to find the user in the array
  var project = _.find(state.projects, {
    "id": projectId
  });

  project.tasks = project.tasks || [];

  project.tasks.push(req.body);


  return res.json(req.body);
});

Sandbox.define('/projects/{id}/tasks/{taskid}', 'DELETE', function(req, res){
  // retrieve projects or, if there are none, init to empty array
  state.projects = state.projects || [];

  // route param {id} is available on req.params
  var projectId = req.params.id;
  var taskId = req.params.taskid;

  // log it to the console
  console.log("Getting project with " + projectId + " details");

  // use lodash to find the user in the array
  var project = _.find(state.projects, {
    "id": projectId
  });

  _.remove(project.tasks, {
    "id": taskId
  });


  return res.json({
    "project": projectId,
    "task": taskId,
    "status": "deleted"
  });
});

Sandbox.define('/projects/{id}/discussion', 'POST', function(req, res){
  // Check the request, make sure it is a compatible type
  if (!req.is('application/json')) {
    return res.send(400, 'Invalid content type, expected application/json');
  }

  // retrieve projects or, if there are none, init to empty array
  state.projects = state.projects || [];

  // route param {id} is available on req.params
  var projectId = req.params.id;

  // log it to the console
  console.log("Getting project with " + projectId + " details");

  // use lodash to find the user in the array
  var project = _.find(state.projects, {
    "id": projectId
  });

  project.discussion = project.discussion || [];

  project.discussion.push(req.body);


  return res.json(req.body);
});

Sandbox.define('/projects/{id}/tasks/{taskid}/discussion', 'POST', function(req, res){
  // Check the request, make sure it is a compatible type
  if (!req.is('application/json')) {
    return res.send(400, 'Invalid content type, expected application/json');
  }

  // retrieve projects or, if there are none, init to empty array
  state.projects = state.projects || [];

  // route param {id} is available on req.params
  var projectId = req.params.id;
  var taskId = req.params.taskid;

  // log it to the console
  console.log("Getting project with " + projectId + " details");

  // use lodash to find the user in the array
  var project = _.find(state.projects, {
    "id": projectId
  });

  var task = _.find(project.tasks, {
    "id": taskId
  });

  task.discussion = task.discussion || [];

  task.discussion.push(req.body);


  return res.json(req.body);
});

Sandbox.define('/projects/{id}/tasks/{taskid}/discussion','GET', function(req, res){
  // retrieve projects or, if there are none, init to empty array
  state.projects = state.projects || [];

  // route param {id} is available on req.params
  var projectId = req.params.id;
  var taskId = req.params.taskid;

  // log it to the console
  console.log("Getting project with " + projectId + " details");

  // use lodash to find the user in the array
  var project = _.find(state.projects, {
    "id": projectId
  });

  var task = _.find(project.tasks, {
    "id": taskId
  });

  task.discussion = task.discussion || [];


  return res.json(task.discussion);
});

Sandbox.define('/projects/{id}/tasks/{taskid}','PATCH', function(req, res){
  // Check the request, make sure it is a compatible type
  if (!req.is('application/json')) {
    return res.send(400, 'Invalid content type, expected application/json');
  }

  // retrieve projects or, if there are none, init to empty array
  state.projects = state.projects || [];

  // route param {id} is available on req.params
  var projectId = req.params.id;
  var taskId = req.params.taskid;

  // log it to the console
  console.log("Getting project with " + projectId + " details");

  // use lodash to find the user in the array
  var project = _.find(state.projects, {
    "id": projectId
  });

  var task = _.find(project.tasks, {
    "id": taskId
  });

  _.merge(task, req.body);


  return res.json(req.body);
});


Sandbox.define('/projects/{id}/tasks/{taskid}/discussion/{messageid}', 'DELETE', function(req, res){
  // retrieve projects or, if there are none, init to empty array
  state.projects = state.projects || [];

  // route param {id} is available on req.params
  var projectId = req.params.id;
  var taskId = req.params.taskid;
  var messageId = req.params.messageid;

  // log it to the console
  console.log("Getting project with " + projectId + " details");

  // use lodash to find the user in the array
  var project = _.find(state.projects, {
    "id": projectId
  });

  var task = _.find(project.tasks, {
    "id": taskId
  });

  _.remove(task.discussion, {
    "id": messageId
  });


  return res.json({
    "status": "deleted"
  });

});



Sandbox.define('/projects/{id}/team', 'GET', function(req, res){
  // retrieve projects or, if there are none, init to empty array
  state.projects = state.projects || [];

  // route param {id} is available on req.params
  var projectId = req.params.id;

  // log it to the console
  console.log("Getting project with " + projectId + " details");

  // use lodash to find the user in the array
  var project = _.find(state.projects, {
    "id": projectId
  });

  project.team = project.team || [];

  return res.json(project.team);
});

Sandbox.define('/projects/{id}/team','POST', function(req, res){
  // Check the request, make sure it is a compatible type
  if (!req.is('application/json')) {
    return res.send(400, 'Invalid content type, expected application/json');
  }

  // retrieve projects or, if there are none, init to empty array
  state.projects = state.projects || [];

  // route param {id} is available on req.params
  var projectId = req.params.id;

  // log it to the console
  console.log("Getting project with " + projectId + " details");
  console.log(req.body);

  // use lodash to find the user in the array
  var project = _.find(state.projects, {
    "id": projectId
  });

  project.team = project.team || [];

  project.team.push(req.body);


  return res.json(req.body);
});

Sandbox.define('/projects/{id}/team/{name}', 'DELETE', function(req, res){
  // retrieve projects or, if there are none, init to empty array
  state.projects = state.projects || [];

  // route param {id} is available on req.params
  var projectId = req.params.id;
  var memberName = req.params.name;

  // log it to the console
  console.log("Getting project with " + projectId + " details");

  // use lodash to find the user in the array
  var project = _.find(state.projects, {
    "id": projectId
  });

  _.remove(project.team, {
    "name": memberName
  });


  return res.json({
    "status": "deleted"
  });
});

Sandbox.define('/projects/{id}/categories', 'GET', function(req, res){
  // retrieve projects or, if there are none, init to empty array
  state.projects = state.projects || [];

  // route param {id} is available on req.params
  var projectId = req.params.id;

  // log it to the console
  console.log("Getting project with " + projectId + " details");

  // use lodash to find the user in the array
  var project = _.find(state.projects, {
    "id": projectId
  });

  project.categories = project.categories || [];

  return res.json(project.categories);
});

Sandbox.define('/projects/{id}/categories','POST', function(req, res){
  // Check the request, make sure it is a compatible type
  if (!req.is('application/json')) {
    return res.send(400, 'Invalid content type, expected application/json');
  }

  // retrieve projects or, if there are none, init to empty array
  state.projects = state.projects || [];

  // route param {id} is available on req.params
  var projectId = req.params.id;

  // log it to the console
  console.log("Getting project with " + projectId + " details");
  console.log(req.body);

  // use lodash to find the user in the array
  var project = _.find(state.projects, {
    "id": projectId
  });

  project.categories = project.categories || [];

  project.categories.push(req.body);


  return res.json(req.body);
});

Sandbox.define('/projects/{id}/categories/{name}', 'DELETE', function(req, res){
  // retrieve projects or, if there are none, init to empty array
  state.projects = state.projects || [];

  // route param {id} is available on req.params
  var projectId = req.params.id;
  var categoryName = req.params.name;

  // log it to the console
  console.log("Getting project with " + projectId + " details");

  // use lodash to find the user in the array
  var project = _.find(state.projects, {
    "id": projectId
  });

  _.remove(project.categories, {
    "name": categoryName
  });


  return res.json({
    "status": "deleted"
  });
})

Sandbox.define('/activity','GET', function(req, res){
  state.activity = state.activity || [];

  return res.json(state.activity);
});

Sandbox.define('/activity','POST', function(req, res){
  if (!req.is('application/json')) {
    return res.send(400, 'Invalid content type, expected application/json');
  }


  res.type('application/json');


  state.activity = state.activity || [];


  state.activity.push(req.body);



  return res.json(req.body);
});
