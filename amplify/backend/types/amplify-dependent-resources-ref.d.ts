export type AmplifyDependentResourcesAttributes = {
  "analytics": {
    "mishigamiapp": {
      "Id": "string",
      "Region": "string",
      "appName": "string"
    }
  },
  "api": {
    "mishigamiapp": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "auth": {
    "mishigamiapp": {
      "IdentityPoolId": "string",
      "IdentityPoolName": "string"
    }
  },
  "function": {
    "mishigamiCalSync": {
      "Arn": "string",
      "CloudWatchEventRule": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "mishigamiNewSync": {
      "Arn": "string",
      "CloudWatchEventRule": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  }
}