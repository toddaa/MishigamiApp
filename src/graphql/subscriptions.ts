/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../../amplify/backend/function/mishigamiCalSync/src/src/API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateEvent = /* GraphQL */ `subscription OnCreateEvent($filter: ModelSubscriptionEventFilterInput) {
  onCreateEvent(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateEventSubscriptionVariables,
  APITypes.OnCreateEventSubscription
>;
export const onUpdateEvent = /* GraphQL */ `subscription OnUpdateEvent($filter: ModelSubscriptionEventFilterInput) {
  onUpdateEvent(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateEventSubscriptionVariables,
  APITypes.OnUpdateEventSubscription
>;
export const onDeleteEvent = /* GraphQL */ `subscription OnDeleteEvent($filter: ModelSubscriptionEventFilterInput) {
  onDeleteEvent(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteEventSubscriptionVariables,
  APITypes.OnDeleteEventSubscription
>;
export const onCreateArticle = /* GraphQL */ `subscription OnCreateArticle($filter: ModelSubscriptionArticleFilterInput) {
  onCreateArticle(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateArticleSubscriptionVariables,
  APITypes.OnCreateArticleSubscription
>;
export const onUpdateArticle = /* GraphQL */ `subscription OnUpdateArticle($filter: ModelSubscriptionArticleFilterInput) {
  onUpdateArticle(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateArticleSubscriptionVariables,
  APITypes.OnUpdateArticleSubscription
>;
export const onDeleteArticle = /* GraphQL */ `subscription OnDeleteArticle($filter: ModelSubscriptionArticleFilterInput) {
  onDeleteArticle(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteArticleSubscriptionVariables,
  APITypes.OnDeleteArticleSubscription
>;
