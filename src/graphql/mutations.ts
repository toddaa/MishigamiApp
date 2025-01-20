/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createEvent = /* GraphQL */ `mutation CreateEvent(
  $input: CreateEventInput!
  $condition: ModelEventConditionInput
) {
  createEvent(input: $input, condition: $condition) {
    id
    gId
    name
    description
    startDate
    endDate
    location
    signUpURL
    category
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateEventMutationVariables,
  APITypes.CreateEventMutation
>;
export const updateEvent = /* GraphQL */ `mutation UpdateEvent(
  $input: UpdateEventInput!
  $condition: ModelEventConditionInput
) {
  updateEvent(input: $input, condition: $condition) {
    id
    gId
    name
    description
    startDate
    endDate
    location
    signUpURL
    category
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateEventMutationVariables,
  APITypes.UpdateEventMutation
>;
export const deleteEvent = /* GraphQL */ `mutation DeleteEvent(
  $input: DeleteEventInput!
  $condition: ModelEventConditionInput
) {
  deleteEvent(input: $input, condition: $condition) {
    id
    gId
    name
    description
    startDate
    endDate
    location
    signUpURL
    category
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteEventMutationVariables,
  APITypes.DeleteEventMutation
>;
export const createArticle = /* GraphQL */ `mutation CreateArticle(
  $input: CreateArticleInput!
  $condition: ModelArticleConditionInput
) {
  createArticle(input: $input, condition: $condition) {
    id
    title
    description
    author
    link
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateArticleMutationVariables,
  APITypes.CreateArticleMutation
>;
export const updateArticle = /* GraphQL */ `mutation UpdateArticle(
  $input: UpdateArticleInput!
  $condition: ModelArticleConditionInput
) {
  updateArticle(input: $input, condition: $condition) {
    id
    title
    description
    author
    link
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateArticleMutationVariables,
  APITypes.UpdateArticleMutation
>;
export const deleteArticle = /* GraphQL */ `mutation DeleteArticle(
  $input: DeleteArticleInput!
  $condition: ModelArticleConditionInput
) {
  deleteArticle(input: $input, condition: $condition) {
    id
    title
    description
    author
    link
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteArticleMutationVariables,
  APITypes.DeleteArticleMutation
>;
export const createMessage = /* GraphQL */ `mutation CreateMessage(
  $input: CreateMessageInput!
  $condition: ModelMessageConditionInput
) {
  createMessage(input: $input, condition: $condition) {
    id
    title
    body
    data
    ttl
    iosSubtitle
    iosBadgeCount
    target
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateMessageMutationVariables,
  APITypes.CreateMessageMutation
>;
export const updateMessage = /* GraphQL */ `mutation UpdateMessage(
  $input: UpdateMessageInput!
  $condition: ModelMessageConditionInput
) {
  updateMessage(input: $input, condition: $condition) {
    id
    title
    body
    data
    ttl
    iosSubtitle
    iosBadgeCount
    target
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateMessageMutationVariables,
  APITypes.UpdateMessageMutation
>;
export const deleteMessage = /* GraphQL */ `mutation DeleteMessage(
  $input: DeleteMessageInput!
  $condition: ModelMessageConditionInput
) {
  deleteMessage(input: $input, condition: $condition) {
    id
    title
    body
    data
    ttl
    iosSubtitle
    iosBadgeCount
    target
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMessageMutationVariables,
  APITypes.DeleteMessageMutation
>;
export const createPushTokens = /* GraphQL */ `mutation CreatePushTokens(
  $input: CreatePushTokensInput!
  $condition: ModelPushTokensConditionInput
) {
  createPushTokens(input: $input, condition: $condition) {
    id
    token
    ttl
    subscriptions
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePushTokensMutationVariables,
  APITypes.CreatePushTokensMutation
>;
export const updatePushTokens = /* GraphQL */ `mutation UpdatePushTokens(
  $input: UpdatePushTokensInput!
  $condition: ModelPushTokensConditionInput
) {
  updatePushTokens(input: $input, condition: $condition) {
    id
    token
    ttl
    subscriptions
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePushTokensMutationVariables,
  APITypes.UpdatePushTokensMutation
>;
export const deletePushTokens = /* GraphQL */ `mutation DeletePushTokens(
  $input: DeletePushTokensInput!
  $condition: ModelPushTokensConditionInput
) {
  deletePushTokens(input: $input, condition: $condition) {
    id
    token
    ttl
    subscriptions
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePushTokensMutationVariables,
  APITypes.DeletePushTokensMutation
>;
