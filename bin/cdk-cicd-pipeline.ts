#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkCicdPipelineStack } from '../lib/cdk-cicd-pipeline-stack';

const app = new cdk.App();
new CdkCicdPipelineStack(app, 'CdkCicdPipelineStack', {
  env: { account: 'your_account_id', region: 'us-east-1' },
});

app.synth();