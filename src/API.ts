/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateEventInput = {
  id?: string | null,
  gId?: string | null,
  name: string,
  description?: string | null,
  startDate?: string | null,
  endDate?: string | null,
  location?: string | null,
  signUpURL?: string | null,
};

export type ModelEventConditionInput = {
  gId?: ModelStringInput | null,
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
  gId?: string | null,
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
  gId?: string | null,
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
  author?: string | null,
  link?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelArticleConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  author?: ModelStringInput | null,
  link?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelArticleConditionInput | null > | null,
  or?: Array< ModelArticleConditionInput | null > | null,
  not?: ModelArticleConditionInput | null,
};

export type Article = {
  __typename: "Article",
  id: string,
  title: string,
  description?: string | null,
  author?: string | null,
  link?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateArticleInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  author?: string | null,
  link?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteArticleInput = {
  id: string,
};

export type CreateMessageInput = {
  id?: string | null,
  title: string,
  body?: string | null,
  data?: string | null,
  ttl?: number | null,
  iosSubtitle?: string | null,
  iosBadgeCount?: number | null,
};

export type ModelMessageConditionInput = {
  title?: ModelStringInput | null,
  body?: ModelStringInput | null,
  data?: ModelStringInput | null,
  ttl?: ModelIntInput | null,
  iosSubtitle?: ModelStringInput | null,
  iosBadgeCount?: ModelIntInput | null,
  and?: Array< ModelMessageConditionInput | null > | null,
  or?: Array< ModelMessageConditionInput | null > | null,
  not?: ModelMessageConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Message = {
  __typename: "Message",
  id: string,
  title: string,
  body?: string | null,
  data?: string | null,
  ttl?: number | null,
  iosSubtitle?: string | null,
  iosBadgeCount?: number | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateMessageInput = {
  id: string,
  title?: string | null,
  body?: string | null,
  data?: string | null,
  ttl?: number | null,
  iosSubtitle?: string | null,
  iosBadgeCount?: number | null,
};

export type DeleteMessageInput = {
  id: string,
};

export type CreatePushTokensInput = {
  id?: string | null,
  token: string,
  ttl: number,
};

export type ModelPushTokensConditionInput = {
  ttl?: ModelIntInput | null,
  and?: Array< ModelPushTokensConditionInput | null > | null,
  or?: Array< ModelPushTokensConditionInput | null > | null,
  not?: ModelPushTokensConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type PushTokens = {
  __typename: "PushTokens",
  id: string,
  token: string,
  ttl: number,
  createdAt: string,
  updatedAt: string,
};

export type UpdatePushTokensInput = {
  id?: string | null,
  token: string,
  ttl?: number | null,
};

export type DeletePushTokensInput = {
  token: string,
};

export type ModelEventFilterInput = {
  id?: ModelIDInput | null,
  gId?: ModelStringInput | null,
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
  author?: ModelStringInput | null,
  link?: ModelStringInput | null,
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

export type ModelMessageFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  body?: ModelStringInput | null,
  data?: ModelStringInput | null,
  ttl?: ModelIntInput | null,
  iosSubtitle?: ModelStringInput | null,
  iosBadgeCount?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMessageFilterInput | null > | null,
  or?: Array< ModelMessageFilterInput | null > | null,
  not?: ModelMessageFilterInput | null,
};

export type ModelMessageConnection = {
  __typename: "ModelMessageConnection",
  items:  Array<Message | null >,
  nextToken?: string | null,
};

export type ModelPushTokensFilterInput = {
  id?: ModelIDInput | null,
  token?: ModelStringInput | null,
  ttl?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPushTokensFilterInput | null > | null,
  or?: Array< ModelPushTokensFilterInput | null > | null,
  not?: ModelPushTokensFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelPushTokensConnection = {
  __typename: "ModelPushTokensConnection",
  items:  Array<PushTokens | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionEventFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  gId?: ModelSubscriptionStringInput | null,
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
  author?: ModelSubscriptionStringInput | null,
  link?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionArticleFilterInput | null > | null,
  or?: Array< ModelSubscriptionArticleFilterInput | null > | null,
};

export type ModelSubscriptionMessageFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  body?: ModelSubscriptionStringInput | null,
  data?: ModelSubscriptionStringInput | null,
  ttl?: ModelSubscriptionIntInput | null,
  iosSubtitle?: ModelSubscriptionStringInput | null,
  iosBadgeCount?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMessageFilterInput | null > | null,
  or?: Array< ModelSubscriptionMessageFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionPushTokensFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  token?: ModelSubscriptionStringInput | null,
  ttl?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPushTokensFilterInput | null > | null,
  or?: Array< ModelSubscriptionPushTokensFilterInput | null > | null,
};

export type CreateEventMutationVariables = {
  input: CreateEventInput,
  condition?: ModelEventConditionInput | null,
};

export type CreateEventMutation = {
  createEvent?:  {
    __typename: "Event",
    id: string,
    gId?: string | null,
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
    gId?: string | null,
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
    gId?: string | null,
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
    author?: string | null,
    link?: string | null,
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
    author?: string | null,
    link?: string | null,
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
    author?: string | null,
    link?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMessageMutationVariables = {
  input: CreateMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type CreateMessageMutation = {
  createMessage?:  {
    __typename: "Message",
    id: string,
    title: string,
    body?: string | null,
    data?: string | null,
    ttl?: number | null,
    iosSubtitle?: string | null,
    iosBadgeCount?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMessageMutationVariables = {
  input: UpdateMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type UpdateMessageMutation = {
  updateMessage?:  {
    __typename: "Message",
    id: string,
    title: string,
    body?: string | null,
    data?: string | null,
    ttl?: number | null,
    iosSubtitle?: string | null,
    iosBadgeCount?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMessageMutationVariables = {
  input: DeleteMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type DeleteMessageMutation = {
  deleteMessage?:  {
    __typename: "Message",
    id: string,
    title: string,
    body?: string | null,
    data?: string | null,
    ttl?: number | null,
    iosSubtitle?: string | null,
    iosBadgeCount?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePushTokensMutationVariables = {
  input: CreatePushTokensInput,
  condition?: ModelPushTokensConditionInput | null,
};

export type CreatePushTokensMutation = {
  createPushTokens?:  {
    __typename: "PushTokens",
    id: string,
    token: string,
    ttl: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePushTokensMutationVariables = {
  input: UpdatePushTokensInput,
  condition?: ModelPushTokensConditionInput | null,
};

export type UpdatePushTokensMutation = {
  updatePushTokens?:  {
    __typename: "PushTokens",
    id: string,
    token: string,
    ttl: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePushTokensMutationVariables = {
  input: DeletePushTokensInput,
  condition?: ModelPushTokensConditionInput | null,
};

export type DeletePushTokensMutation = {
  deletePushTokens?:  {
    __typename: "PushTokens",
    id: string,
    token: string,
    ttl: number,
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
    gId?: string | null,
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
      gId?: string | null,
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
    author?: string | null,
    link?: string | null,
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
      author?: string | null,
      link?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetMessageQueryVariables = {
  id: string,
};

export type GetMessageQuery = {
  getMessage?:  {
    __typename: "Message",
    id: string,
    title: string,
    body?: string | null,
    data?: string | null,
    ttl?: number | null,
    iosSubtitle?: string | null,
    iosBadgeCount?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMessagesQueryVariables = {
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMessagesQuery = {
  listMessages?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      title: string,
      body?: string | null,
      data?: string | null,
      ttl?: number | null,
      iosSubtitle?: string | null,
      iosBadgeCount?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPushTokensQueryVariables = {
  token: string,
};

export type GetPushTokensQuery = {
  getPushTokens?:  {
    __typename: "PushTokens",
    id: string,
    token: string,
    ttl: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPushTokensQueryVariables = {
  token?: string | null,
  filter?: ModelPushTokensFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPushTokensQuery = {
  listPushTokens?:  {
    __typename: "ModelPushTokensConnection",
    items:  Array< {
      __typename: "PushTokens",
      id: string,
      token: string,
      ttl: number,
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
    gId?: string | null,
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
    gId?: string | null,
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
    gId?: string | null,
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
    author?: string | null,
    link?: string | null,
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
    author?: string | null,
    link?: string | null,
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
    author?: string | null,
    link?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
};

export type OnCreateMessageSubscription = {
  onCreateMessage?:  {
    __typename: "Message",
    id: string,
    title: string,
    body?: string | null,
    data?: string | null,
    ttl?: number | null,
    iosSubtitle?: string | null,
    iosBadgeCount?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
};

export type OnUpdateMessageSubscription = {
  onUpdateMessage?:  {
    __typename: "Message",
    id: string,
    title: string,
    body?: string | null,
    data?: string | null,
    ttl?: number | null,
    iosSubtitle?: string | null,
    iosBadgeCount?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
};

export type OnDeleteMessageSubscription = {
  onDeleteMessage?:  {
    __typename: "Message",
    id: string,
    title: string,
    body?: string | null,
    data?: string | null,
    ttl?: number | null,
    iosSubtitle?: string | null,
    iosBadgeCount?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePushTokensSubscriptionVariables = {
  filter?: ModelSubscriptionPushTokensFilterInput | null,
};

export type OnCreatePushTokensSubscription = {
  onCreatePushTokens?:  {
    __typename: "PushTokens",
    id: string,
    token: string,
    ttl: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePushTokensSubscriptionVariables = {
  filter?: ModelSubscriptionPushTokensFilterInput | null,
};

export type OnUpdatePushTokensSubscription = {
  onUpdatePushTokens?:  {
    __typename: "PushTokens",
    id: string,
    token: string,
    ttl: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePushTokensSubscriptionVariables = {
  filter?: ModelSubscriptionPushTokensFilterInput | null,
};

export type OnDeletePushTokensSubscription = {
  onDeletePushTokens?:  {
    __typename: "PushTokens",
    id: string,
    token: string,
    ttl: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};
