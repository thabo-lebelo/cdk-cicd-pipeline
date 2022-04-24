#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkCicdPipelineStack } from '../lib/cdk-cicd-pipeline-stack';

const app = new cdk.App();
new CdkCicdPipelineStack(app, 'CdkCicdPipelineStack', {
  env: { account: '123456789012', region: 'us-east-1' },
});

app.synth();