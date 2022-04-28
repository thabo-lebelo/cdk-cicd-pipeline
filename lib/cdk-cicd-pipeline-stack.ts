import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

export class CdkCicdPipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        new CodePipeline(this, 'Pipeline', {
            pipelineName: 'TestPipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.gitHub('thabo-lebelo/cdk-cicd-pipeline', 'main'), 
                commands: ['npm ci', 'npm run build', 'npx cdk synth']
            })
        });
    }
}
