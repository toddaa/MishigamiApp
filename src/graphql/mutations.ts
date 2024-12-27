/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../../amplify/backend/function/mishigamiCalSync/src/src/API";
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
    name
    description
    startDate
    endDate
    location
    signUpURL
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
    name
    description
    startDate
    endDate
    location
    signUpURL
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
    name
    description
    startDate
    endDate
    location
    signUpURL
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
    pubDate
    author
    location
    link
    category
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
    pubDate
    author
    location
    link
    category
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
    pubDate
    author
    location
    link
    category
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteArticleMutationVariables,
  APITypes.DeleteArticleMutation
>;
