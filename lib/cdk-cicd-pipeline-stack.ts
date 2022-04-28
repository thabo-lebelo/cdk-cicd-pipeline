import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { PipelineAppStage } from './pipeline-app-stage';

export class CdkCicdPipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: 'TestPipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.gitHub('thabo-lebelo/cdk-cicd-pipeline', 'main'),
                commands: ['npm ci', 'npm run build', 'npx cdk synth']
            })
        });

        const testingStage = pipeline.addStage(new PipelineAppStage(this, "test", {
            env: { account: "your_account_id", region: "us-east-1" }
        }));


        testingStage.addPre(new ShellStep("Run Unit Tests", { commands: ['npm install', 'npm test'] }));
        testingStage.addPost(new ManualApprovalStep('Manual approval before production'));

        const prodStage = pipeline.addStage(new PipelineAppStage(this, "prod", {
            env: { account: "your_account_id", region: "us-east-1" }
        }));
    }
}
