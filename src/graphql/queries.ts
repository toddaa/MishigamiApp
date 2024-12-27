/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../../amplify/backend/function/mishigamiCalSync/src/src/API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getEvent = /* GraphQL */ `query GetEvent($id: ID!) {
  getEvent(id: $id) {
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
` as GeneratedQuery<APITypes.GetEventQueryVariables, APITypes.GetEventQuery>;
export const listEvents = /* GraphQL */ `query ListEvents(
  $filter: ModelEventFilterInput
  $limit: Int
  $nextToken: String
) {
  listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListEventsQueryVariables,
  APITypes.ListEventsQuery
>;
export const getArticle = /* GraphQL */ `query GetArticle($id: ID!) {
  getArticle(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetArticleQueryVariables,
  APITypes.GetArticleQuery
>;
export const listArticles = /* GraphQL */ `query ListArticles(
  $filter: ModelArticleFilterInput
  $limit: Int
  $nextToken: String
) {
  listArticles(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListArticlesQueryVariables,
  APITypes.ListArticlesQuery
>;
