
# How to Use AI Core Template Generator in Visual Studio Code

-  press Command + shift + p for *mac* and Control + shift + p for *Windows* to open control center and choose open template wizard.

![](02_ai_core/docs/ai-core-template-wizard/img/tempelate_gen1.png)

- Once the Template generator opens choose AI core and press start.

![](02_ai_core/docs/ai-core-template-wizard/img/tempelate_gen2.png)

- If you have your custom code choose Basic Project or if you wanted to use the pre-generated training and serving code use AI core sample project for this demo we are going to use.

![](02_ai_core/docs/ai-core-template-wizard/img/tempelate_gen3.png)

- enter the project name and version and press enter

![](02_ai_core/docs/ai-core-template-wizard/img/tempelate_gen4.png)

- fill up the details like scenario ID and Resource plan.

![](02_ai_core/docs/ai-core-template-wizard/img/tempelate_gen5.png)

- Similarly fill the details for Serving Plan.

![](02_ai_core/docs/ai-core-template-wizard/img/tempelate_gen6.png)

- Choose the demo sample project as Movie Recommendation and click on next.

![](02_ai_core/docs/ai-core-template-wizard/img/tempelate_gen7.png)


- As a last step add the Docker Details like Docker registry URL and username and click next to create the project.

![](02_ai_core/docs/ai-core-template-wizard/img/tempelate_gen8.png)

- It will create all the required folders in the current directory.

![](02_ai_core/docs/ai-core-template-wizard/img/tempelate_gen9.png)


### Deploying Template to AI Core

In the generated tempelate visit Template folder > Pipelines and replace `ai-core_creds.json` and `S3_creds.json` with your actual AI core Creds.

![](02_ai_core/docs/ai-core-template-wizard/img/run_movie1.jpg)

Once done Under the same pipelines folder open AI-core-skd-notebook and replace the Configure variables with your own Variables and click on run all.

![](02_ai_core/docs/ai-core-template-wizard/img/run_movie2.jpg)
