/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateEventInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  startDate?: string | null,
  endDate?: string | null,
  location?: string | null,
  signUpURL?: string | null,
};

export type ModelEventConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  location?: ModelStringInput | null,
  signUpURL?: ModelStringInput | null,
  and?: Array< ModelEventConditionInput | null > | null,
  or?: Array< ModelEventConditionInput | null > | null,
  not?: ModelEventConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Event = {
  __typename: "Event",
  id: string,
  name: string,
  description?: string | null,
  startDate?: string | null,
  endDate?: string | null,
  location?: string | null,
  signUpURL?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateEventInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  startDate?: string | null,
  endDate?: string | null,
  location?: string | null,
  signUpURL?: string | null,
};

export type DeleteEventInput = {
  id: string,
};

export type CreateArticleInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  pubDate?: string | null,
  author?: string | null,
  location?: string | null,
  link?: string | null,
  category?: string | null,
};

export type ModelArticleConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  pubDate?: ModelStringInput | null,
  author?: ModelStringInput | null,
  location?: ModelStringInput | null,
  link?: ModelStringInput | null,
  category?: ModelStringInput | null,
  and?: Array< ModelArticleConditionInput | null > | null,
  or?: Array< ModelArticleConditionInput | null > | null,
  not?: ModelArticleConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Article = {
  __typename: "Article",
  id: string,
  title: string,
  description?: string | null,
  pubDate?: string | null,
  author?: string | null,
  location?: string | null,
  link?: string | null,
  category?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateArticleInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  pubDate?: string | null,
  author?: string | null,
  location?: string | null,
  link?: string | null,
  category?: string | null,
};

export type DeleteArticleInput = {
  id: string,
};

export type ModelEventFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  location?: ModelStringInput | null,
  signUpURL?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelEventFilterInput | null > | null,
  or?: Array< ModelEventFilterInput | null > | null,
  not?: ModelEventFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelEventConnection = {
  __typename: "ModelEventConnection",
  items:  Array<Event | null >,
  nextToken?: string | null,
};

export type ModelArticleFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  pubDate?: ModelStringInput | null,
  author?: ModelStringInput | null,
  location?: ModelStringInput | null,
  link?: ModelStringInput | null,
  category?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelArticleFilterInput | null > | null,
  or?: Array< ModelArticleFilterInput | null > | null,
  not?: ModelArticleFilterInput | null,
};

export type ModelArticleConnection = {
  __typename: "ModelArticleConnection",
  items:  Array<Article | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionEventFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  startDate?: ModelSubscriptionStringInput | null,
  endDate?: ModelSubscriptionStringInput | null,
  location?: ModelSubscriptionStringInput | null,
  signUpURL?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionEventFilterInput | null > | null,
  or?: Array< ModelSubscriptionEventFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionArticleFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  pubDate?: ModelSubscriptionStringInput | null,
  author?: ModelSubscriptionStringInput | null,
  location?: ModelSubscriptionStringInput | null,
  link?: ModelSubscriptionStringInput | null,
  category?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionArticleFilterInput | null > | null,
  or?: Array< ModelSubscriptionArticleFilterInput | null > | null,
};

export type CreateEventMutationVariables = {
  input: CreateEventInput,
  condition?: ModelEventConditionInput | null,
};

export type CreateEventMutation = {
  createEvent?:  {
    __typename: "Event",
    id: string,
    name: string,
    description?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    location?: string | null,
    signUpURL?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateEventMutationVariables = {
  input: UpdateEventInput,
  condition?: ModelEventConditionInput | null,
};

export type UpdateEventMutation = {
  updateEvent?:  {
    __typename: "Event",
    id: string,
    name: string,
    description?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    location?: string | null,
    signUpURL?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteEventMutationVariables = {
  input: DeleteEventInput,
  condition?: ModelEventConditionInput | null,
};

export type DeleteEventMutation = {
  deleteEvent?:  {
    __typename: "Event",
    id: string,
    name: string,
    description?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    location?: string | null,
    signUpURL?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateArticleMutationVariables = {
  input: CreateArticleInput,
  condition?: ModelArticleConditionInput | null,
};

export type CreateArticleMutation = {
  createArticle?:  {
    __typename: "Article",
    id: string,
    title: string,
    description?: string | null,
    pubDate?: string | null,
    author?: string | null,
    location?: string | null,
    link?: string | null,
    category?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateArticleMutationVariables = {
  input: UpdateArticleInput,
  condition?: ModelArticleConditionInput | null,
};

export type UpdateArticleMutation = {
  updateArticle?:  {
    __typename: "Article",
    id: string,
    title: string,
    description?: string | null,
    pubDate?: string | null,
    author?: string | null,
    location?: string | null,
    link?: string | null,
    category?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteArticleMutationVariables = {
  input: DeleteArticleInput,
  condition?: ModelArticleConditionInput | null,
};

export type DeleteArticleMutation = {
  deleteArticle?:  {
    __typename: "Article",
    id: string,
    title: string,
    description?: string | null,
    pubDate?: string | null,
    author?: string | null,
    location?: string | null,
    link?: string | null,
    category?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetEventQueryVariables = {
  id: string,
};

export type GetEventQuery = {
  getEvent?:  {
    __typename: "Event",
    id: string,
    name: string,
    description?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    location?: string | null,
    signUpURL?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListEventsQueryVariables = {
  filter?: ModelEventFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEventsQuery = {
  listEvents?:  {
    __typename: "ModelEventConnection",
    items:  Array< {
      __typename: "Event",
      id: string,
      name: string,
      description?: string | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      signUpURL?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetArticleQueryVariables = {
  id: string,
};

export type GetArticleQuery = {
  getArticle?:  {
    __typename: "Article",
    id: string,
    title: string,
    description?: string | null,
    pubDate?: string | null,
    author?: string | null,
    location?: string | null,
    link?: string | null,
    category?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListArticlesQueryVariables = {
  filter?: ModelArticleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListArticlesQuery = {
  listArticles?:  {
    __typename: "ModelArticleConnection",
    items:  Array< {
      __typename: "Article",
      id: string,
      title: string,
      description?: string | null,
      pubDate?: string | null,
      author?: string | null,
      location?: string | null,
      link?: string | null,
      category?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateEventSubscriptionVariables = {
  filter?: ModelSubscriptionEventFilterInput | null,
};

export type OnCreateEventSubscription = {
  onCreateEvent?:  {
    __typename: "Event",
    id: string,
    name: string,
    description?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    location?: string | null,
    signUpURL?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateEventSubscriptionVariables = {
  filter?: ModelSubscriptionEventFilterInput | null,
};

export type OnUpdateEventSubscription = {
  onUpdateEvent?:  {
    __typename: "Event",
    id: string,
    name: string,
    description?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    location?: string | null,
    signUpURL?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteEventSubscriptionVariables = {
  filter?: ModelSubscriptionEventFilterInput | null,
};

export type OnDeleteEventSubscription = {
  onDeleteEvent?:  {
    __typename: "Event",
    id: string,
    name: string,
    description?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    location?: string | null,
    signUpURL?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateArticleSubscriptionVariables = {
  filter?: ModelSubscriptionArticleFilterInput | null,
};

export type OnCreateArticleSubscription = {
  onCreateArticle?:  {
    __typename: "Article",
    id: string,
    title: string,
    description?: string | null,
    pubDate?: string | null,
    author?: string | null,
    location?: string | null,
    link?: string | null,
    category?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateArticleSubscriptionVariables = {
  filter?: ModelSubscriptionArticleFilterInput | null,
};

export type OnUpdateArticleSubscription = {
  onUpdateArticle?:  {
    __typename: "Article",
    id: string,
    title: string,
    description?: string | null,
    pubDate?: string | null,
    author?: string | null,
    location?: string | null,
    link?: string | null,
    category?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteArticleSubscriptionVariables = {
  filter?: ModelSubscriptionArticleFilterInput | null,
};

export type OnDeleteArticleSubscription = {
  onDeleteArticle?:  {
    __typename: "Article",
    id: string,
    title: string,
    description?: string | null,
    pubDate?: string | null,
    author?: string | null,
    location?: string | null,
    link?: string | null,
    category?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
