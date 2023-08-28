# AI Core Generated Project (<%= projectConfig.projectName %>)

## **Step 1: Add your Connections to the AI Core Toolkit in VS Code /BAS**

<br>

1. Add your AI CORE Connection

   - Click on the `+` button in the `AI Core` section to `create AI Core connection`
    - When prompted, enter the following details from the Service Key of your AI Core instance. Your service key can be found in your BTP Account
      - clientid
      - clientsecret
      - URL
      - AI_API_URL

2. Add your Objectstore Connection

   - Click on the `+` button in the `S3 ObjectStore` section to `add New ObjectStore Connection` below details required
     - When prompted, enter the following details. The details that are from the Service Key of your AI Core instance can be found in your BTP Account. Others are from your storage account 
       - name
       - bucket --> ObjectStore Bucket ID
       - region --> ObjectStore Region ID
       - AWS_ACCESS_KEY_ID --> ObjectStore ACCESS KEY ID
       - AWS_SECRET_ACCESS_KEY --> ObjectStore SECRET KEY

3. Add your Docker Repository
   - Click on the `+` button in the `AI CORE Docker` section to `add new Docker Repository`
     - When prompted, enter the following details
       - name --> your choice of identifier, such as 'docker-registry-secret'
       - docker-repo-URL --> Docker Repository URL
       - username --> Docker Repository username
       - password --> Docker Repository password

<br><br>

## **Step 2: Add your AI Core Configurations**

<br>

1. Add your Git Repository

   - Right click on the `Git Repository` node --> `Register Git Repository`
     - When prompted, enter the following details
       - name --> Git Repository Name
       - URL --> Git Repository URL
       - username --> Git Repository Username
       - password --> Git Repository [Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

2. Add an Application

   - Right click on the `Applications` node --> `Register Application`
     - When prompted, enter the following details
       - applicationName --> Your choice of Application Name (string)
       - repositoryURL --> Git Repository URL
       - revision --> Git revision --> "HEAD" (this is usually useful only for HEAD, FETCH_HEAD, ORIG_HEAD, MERGE_HEAD and CHERRY_PICK_HEAD)
       - path --> Folder Name in Git Repository Where your YAML Files are stored (string)

3. Add your Docker credentials
   - Right click on the `Docker Creds` node --> `Register Docker Credentials`
     - When prompted, enter the following details
       - name --> your choice of identifier, such as 'docker-registry-secret'
       - docker-repo-URL --> Docker Repository URL -> or docker.io for docker hub accounts
       - username --> Docker Repository Username>
       - password --> Docker Repository Password>

<br><br>

## **Step 3: Data Upload and Data Binding to AI CORE**

<br>


1. Register the ObjectStore Credentials to AI Core 
   -  Click on the `ML-Operations` node and AI Core Connection to expand
      - Click on the `Resource Groups` node to expand
      - Click on Resource Group Name to Expand 
        - Right click on theObjectStore Creds node 
          - Click on `Register ObjectStore Creds` 
            - name --> default or my-s3-objectstore-creds-name>
            - bucket --> ObjectStore Bucket ID
            - pathPrefix --> your choice of path prefix, that you specify while uploading s3 data (string), for example ue0sex6
            - region --> ObjectStore Region ID
            - AWS_ACCESS_KEY_ID --> ObjectStore ACCESS KEY ID
            - AWS_SECRET_ACCESS_KEY --> ObjectStore SECRET KEY

2. Upload Data to Objectstore S3

   - Right click on `S3 Object Store Connection`
     - Click on `Upload Files to S3`
       - When prompted, enter the following details
         - Enter Path value for AI Core, including your path prefix: ue0sex6/basic_demo/ for example
         - Select a file from desktop to upload

2. Create an Artifact in AI Core
   <br>
   Register the uploaded data as an artifact, for use later during training
   <br>
   `**Note**: AWS s3 folder name ('<%= projectConfig.sTrainingInputArtifactPath %>' in "s3://'Enter Bucket_Value'/<%= projectConfig.s3PathPrefix %><%= projectConfig.sTrainingInputArtifactPath %>') & artifact folder name ('<%= projectConfig.sTrainingInputArtifactPath %>' in "ai://default/<%= projectConfig.projectNameAsPath %>") must match.`

   - Register Artifacts under the `ML Scenarios` node
     - Expand the `Scenarions` node
       - Right click on `Artifacts`
         - Click on `Create Artifact`
           -  When prompted, enter the following details
             - name --> <%= projectConfig.sDataSetPath %>
             - kind --> select dropdown value `dataset`
             - URL --> "ai://default/<%= projectConfig.projectNameAsPath %>" or "ai://<my-s3-objectstore-creds-name>/<%= projectConfig.projectNameAsPath %>"
             - description --> <enter description> like <%= projectConfig.projectName %> Dataset

<br><br>

## **Step 4: Docker Build and Push to Docker Repository**

<br>
Build the docker image required to train and serve by following these steps

<br>

1. Docker login

   ```
   docker login <%= projectConfig.dockerRepositoryUrl %> -u <uid> -p <api-key>
   ```

2. Docker Build

   ```
   docker build . -t <%= projectConfig.dockerRepositoryUrl %>/<%= projectConfig.dockerOrgUserPath %>/basic:1.0.0 
   ```

3. Docker Push

   ```
   docker push <%= projectConfig.dockerRepositoryUrl %>/<%= projectConfig.dockerOrgUserPath %>/basic:1.0.0
   ```

## **Step 5: Model Training Configurations and Execution**

<br>

1. Create Training Configuration Profile

   - Right click on the `Training-Configurations` node 
    - click on `Create Training Configuration` 
    - When prompted, enter the following details 
      - Configuration Profile Name --> your choice of name, for example 'basic-demo-training-config' (string)
      - Select the Executable ID from the dropdown --> basic-demo-training-v1 
      - Select a Version Id --> 0.0.1 
      - If multiple input artifacts assigned then select multiple artifacts for each key value, for example ` "inputArtifactBindings": [{ "key": "basic-demo-files", "artifactId": "<enter artifact id>" }} `
     <br>

2. Start Model Training
   <br>

   - Expand the `Training-Configurations` node
     - Expand `Training Configurations` name by clicking the arrow
       - Right click on `Executions`
         - Click on `Start Execution`     

   - List the executions details and check the logs
       - Click on the `Executions` nodes to expand
         - Check the logs by expanding the child nodes. The execution status is shown next to the name
           - Right click the child node 
             - click on `check Detailed Execution Logs`

<br><br>

## **Step 6: Serving Configuration and Deployment Operations**

When the model is successfully trained, it can be used for serving

1. Create a Serving Configuration profile
   - Right click on the `Serving-Configurations` node
     - Click on `Create Deployment Configurations'
       <br><br>
       - When prompted, enter the following details 
         - name --><%= projectConfig.servingProfile %>-serving-centaur
         - executableId --> <%= projectConfig.sServingExecutableId %>-serving
         - Select versionId
         - Select multiple parameters

           ```
             parameterBindings": [
               {
                 "key": "<%= projectConfig.sServingInputParamsName %>",
                 "value": "<%= projectConfig.sServingInputParamsDefaultValue %>"
               }
             ]
           ```

         - If you are using multiples models, select them and enter the artifact IDs as shown below

           ```
             "inputArtifactBindings": [
                 {
                 "key": "<%= projectConfig.sServingInputArtifactName %>"
                 "artifactId": "<enter model artifact id>"
               }
             ]
           ```

2. Start Model Deployment

   - Click on `Serving Configuration Profile Name` to expand
     - Right click on `Deployments`
       - Click on ` Start Deployment`
         
    Alternatively
    - Go to your_generated_project -> Pipelines
    - replace the `aicore-creds.json` and `s3-creds.json` with your creds.
    - Open `aicore-sdk-notebook.ipynb` and replace the Variables with your details
    - Click on `run all`
  
  - List deployments to check deployment Details
       - Click on the `Deployments` node to list all deployments
       - Expand the child nodes
       - Right click on the `deployment` node the and click `View Deployment Details` and `View Deployment Logs`


         

## ** Step 7: Test Model Inference with Deployment URL to Test Model**

When the deployment is in running state, the deployment URL returned in the response in the previous step can be used for inferencing. The correct format it as shown below.

### **Model Status**

```

API: GET: <deployment-URL>/v1/status

```

### **Test Model Inference Inference**

```

API: POST: {{deploymenturl}}/v1/models/<%= projectConfig.sServingInputParamsDefaultValue %>:predict
```

