# AI Foundation End-to-End Usecase Implementation - (<%= projectConfig.projectName %>)

Contents within this repo are structured into following categories for ease of access:

1. [Introduction](#1-introduction)
2. [Pre-requisites](#2-pre-requisites)
3. [Dataset](#3-dataset)
4. [Create Artifact](#4-create-artifact)
5. [Docker Build](#5-docker-build)
6. [Training on AIF (Templates)](#6-training-on-aif-templates)
7. [Execution](#7-execution)
8. [Serving trained model in AIF](#8-serving-trained-model-in-aif)
9. [Inferencing on the deployed model](#9-inferencing-on-the-deployed-model)

# 1. Introduction 
In this use case, we will demonstrate developing and executing end to end ML pipelines like Training, Serving and Inferencing in the AI Core platform. The objectives of the task is to create a recommendation model and to provide all customizations so that it can be implemented for other datasets and use cases.

This folder and guide provides data and a process to train and deploy a recommendation model, using AIF and python. AI APIs are used to interact with different runtime workloads like AI Core and help trigger executions on the runtime. There are various ways in which the AI API calls can be made for AI Foundation platform. Follow all the steps, as each is necessary to realize the use cases on AI Core.

First, choose how you would like to realize the use case.

a. Calls in **Jupyter Notebook** using generic python requests module or via AI-API Client SDK. The notebook used to implement this use case is found [here](https://github.tools.sap/AI/examples/blob/master/recommendation_networkx/demo.ipynb).

b. Via **Postman** calls or curl commands. To use Postman, the corresponding postman environment and requests are attached as collections [here](https://github.tools.sap/AI/examples/blob/master/recommendation_networkx/postman_collection.json).

AI Core inferences can be achieved by any of the following options for Dockerfile customizations:

* Out of the box Centaur base-images
* Regular Non-Centaur Base images with Centaur as pip-installed dependency
* Without Centaur, using Open source base image with Custom Flask inferencing application.

In this use case, a Generative Graph model using networks is created, which is saved as pickled graph (.gpickle format), from which inferences are triggered. For this implementation, a regular [Non-Centaur Base image with Centaur as pip-installed dependency](https://github.tools.sap/AI/examples/blob/master/recommendation_networkx/Dockerfile) is used.
# 2. Pre-requisites


* Complete all the pre-requisite steps mentioned [here](https://github.tools.sap/AI/examples/blob/master/README.md)
* The following document uses the *ML_API_URL*, which refers to the base AI API which you got by completing the onboarding steps. A sample *ML_API_URL* would look like *https://api.ai.prod.us-east-1.aws.ml.hana.ondemand.com*. Here this URL represents a sample AI API issued from BTP, but you should use your own.

* If you use Postman: 
    - Download & import the postman_collection which is specific to this use case, from the current folder before starting with the execution in Postman.
    - Setup the environment variables using the postman environment JSON & complete the setup as mentioned [here](https://github.tools.sap/AI/examples/blob/master/README.md).



# 3. Dataset

https://www.kaggle.com/shivamb/netflix-shows

This dataset consists of tv shows and movies available on Netflix as of 2019. The dataset is collected from Flixable which is a third-party Netflix search engine.

In 2018, they released an interesting report which shows that the streaming service’s number of movies has decreased by more than 2,000 titles since 2010, while its number of TV shows has nearly tripled. It will be interesting to explore what other insights can be obtained from the same dataset.

Integrating this dataset with other external datasets such as ratings from IMDB or rotten tomatoes can also provide interesting findings.

The following steps are used to upload the data to S3. They also show a sample s3 update call. Note that the BUCKET and PREFIX change from user to user based on the objectstore registered with AI Core as part of the steps mentioned [here](https://github.tools.sap/AI/examples/blob/master/README.md).


```
aws s3 cp data s3://'Enter Bucket_Value'/<%= projectConfig.s3PathPrefix %><%= projectConfig.sTrainingInputArtifactPath %> --recursive  --profile aif
```
The folder structure of the data uploaded to S3 is as follows:
```
recommendation_networkx
    ├── data
    │   ├── netflix_titles.csv

```

# 4. Create Artifact
This step registers the artifact back to AIF. A sample of the URL is also mentioned where the {{ML_API_URL}} is replaced by the AI API URL received from BTP. The following API call is also implemented in Jupyter Notebook with `artifact.create()` \

API: POST: `{{ML_API_URL}}/v2/lm/artifacts`

```
https://api.ai.prod.us-east-1.aws.ml.hana.ondemand.com/v2/lm/artifacts
```
Request Body for registering artifact is:
```
{
    "labels":[
    ],
    "name":"<%= projectConfig.sDataSetPath %>",
    "kind": "dataset",
    "url":"ai://default/<%= projectConfig.projectNameAsPath %>" or "ai://<my-s3-objectstore-creds-name>/<%= projectConfig.projectNameAsPath %>",
    "description":"<%= projectConfig.projectNameAsPath %> Dataset",
    "scenarioId":"<%= projectConfig.scenarioId %>"
}
```

# 5. Docker Build
For training and serving, dockers needs to be built. 

Follow the [steps to login](https://github.tools.sap/AI/examples/blob/master/README.md#6-creating-docker-image).

The location of Dockerfile can be found [here](https://github.tools.sap/AI/examples/blob/master/houseprice_onnx/Dockerfile).


### Docker Build for training and serving
 ```
    docker build . -t <%= projectConfig.dockerRepositoryUrl %>/<%= projectConfig.dockerOrgUserPath %>/recommendation-networkx:1.0.0 

    docker push <%= projectConfig.dockerRepositoryUrl %>/<%= projectConfig.dockerOrgUserPath %>/recommendation-networkx:1.0.0 
```

# 6. Training on AIF (Templates)

Before starting the model training, YAML files are created which are used to trigger the training/serving job in AIF.
### training and serving YAMLs
```
templates/<%= projectConfig.projectNameAsPath %>_training.yaml
templates/<%= projectConfig.projectNameAsPath %>_serving.yaml
```
# 7. Execution
To start training a model, create a training configuration that will trigger the execution.

## Training Configuration
The following API call is also implemented in Jupyter Notebook with `configuration.create()` \
API: POST: `{{ML_API_URL}}/v2/lm/configurations`

In the request body, replace the artifact id with the id received as a response in Step 4.

```
{
    "name": "<%= projectConfig.projectName %>-training-config",
    "executableId": "<%= projectConfig.projectName %>-training-v1",
    "scenarioId": "<%= projectConfig.scenarioId %>",
    "versionId": "<%= projectConfig.scenarioVersionId %>",

    "inputArtifactBindings": [
        {
        "key": "<%= projectConfig.projectName %>-files",
        "artifactId": "<enter artifact id>"
    }
    ]
}
```

## Start execution
The following API call is also implemented in Jupyter Notebook with `execution.create()` \
API: POST: `{{ML_API_URL}}/v2/lm/configurations/{{configurationid}}/executions`
### List execution
The following API call is also implemented in Jupyter Notebook with `execution.get()` \
API: GET: `{{ML_API_URL}}/v2/lm/executions` 


# 8. Serving trained model in AIF
Once the execution has successfully completed, the execution returns the model artifact id which is an output of training. This artifact id is used to create the serving configuration where the **model_url** value is assigned that artifact id.
### Configuration
The following API call is also implemented in Jupyter Notebook with `configuration.create()` \
API: POST: `{{ML_API_URL}}/v2/lm/configurations`

Request Body:
```
{
    "name": "<%= projectConfig.servingProfile %>-serving-centaur",
    "executableId": "<%= projectConfig.sServingExecutableId %>-serving",
    "scenarioId": "<%= projectConfig.scenarioId %>",
    "versionId": "<%= projectConfig.scenarioVersionId %>",
    "parameterBindings": [],
  "inputArtifactBindings": 
  [
      {
      "key": "<%= projectConfig.sServingInputArtifactName %>",
      "artifactId": "<enter artifact id>"
    }
  ]
}
```
## Start Deployment
The following API call is also implemented in Jupyter Notebook with `deployment.create()` \
API: POST: `{{ML_API_URL}}/v2/lm/configurations/{{configurationid}}/deployments`
## List Deployment
The following API call is also implemented in Jupyter Notebook with `deployment.get()` \
API: GET: `{{ML_API_URL}}/v2/lm/deployments`



# 9. Inferencing on the deployed model
This implementation uses a regular Non-Centaur Base image but Centaur is used as a pip-installed dependency. Hence, no flask application is needed. The Centaur application takes care of hosting the inference script and makes it available at /predict. This endpoint is triggered during inference for response.

## Model Status
API: GET: `{{deploymentURL}}/v1/status` 


## Inference
API: POST: `{{deploymentURL}}/v1/models/houseprice:predict`

```
Request Body:
{ "text": "Stranger Things"}
```

The response output:

```
Response:
{"Beyond Stranger Things":12.0479563979,"Rowdy Rathore":2.5853986301,
"Big Stone Gap":2.3558875882, "Kicking and Screaming":1.5661401229, 
"Prank Encounters":1.2698616459}
```

