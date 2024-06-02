/* eslint-disable */
// @ts-nocheck

/**
 * ⚠️ THIS FILE HAS BEEN GENERATED BY A CODE GENERATOR.
 *
 * YOU SHOULD NOT MAKE CHANGES TO THIS FILE.
 */

import { gql } from '@apollo/client';
import * as React from 'react';
import * as Apollo from '@apollo/client';
import * as ApolloReactComponents from '@apollo/client/react/components';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type File = {
  __typename?: 'File';
  alt: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  type: FileType;
  updatedAt: Scalars['Date']['output'];
  variants?: Maybe<Array<FileVariant>>;
};

export enum FileType {
  Jpeg = 'jpeg',
  Png = 'png'
}

export type FileVariant = {
  __typename?: 'FileVariant';
  createdAt: Scalars['Date']['output'];
  fileId: Scalars['ID']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  path: Scalars['String']['output'];
  quality: Quality;
  updatedAt: Scalars['Date']['output'];
  width: Scalars['Int']['output'];
};

export type LoggedInUser = User & {
  __typename?: 'LoggedInUser';
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['Date']['output'];
  username: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deletePost?: Maybe<Post>;
};


export type MutationDeletePostArgs = {
  id: Scalars['ID']['input'];
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  authorId: Scalars['ID']['output'];
  createdAt: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  file?: Maybe<File>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type PublicUser = User & {
  __typename?: 'PublicUser';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['Date']['output'];
  username: Scalars['String']['output'];
};

export enum Quality {
  Optimized = 'OPTIMIZED',
  Raw = 'RAW',
  Thumbnail = 'THUMBNAIL'
}

export type Query = {
  __typename?: 'Query';
  loggedInUser?: Maybe<LoggedInUser>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  publicUser?: Maybe<PublicUser>;
};


export type QueryPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPostsArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPublicUserArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['Date']['output'];
  username: Scalars['String']['output'];
};

export type LoggedInUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInUserQuery = { __typename?: 'Query', loggedInUser?: { __typename?: 'LoggedInUser', id: string, username: string, createdAt: any, email: string, updatedAt: any } | null };

export type PostQueryVariables = Exact<{
  postId: Scalars['ID']['input'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, title: string, description: string, createdAt: any, updatedAt: any, author?: { __typename?: 'LoggedInUser', username: string } | { __typename?: 'PublicUser', username: string } | null, file?: { __typename?: 'File', id: string, type: FileType, alt: string, variants?: Array<{ __typename?: 'FileVariant', id: string, width: number, height: number, path: string, quality: Quality, createdAt: any, updatedAt: any }> | null } | null } | null };

export type PostsQueryVariables = Exact<{
  filter?: InputMaybe<Scalars['String']['input']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, title: string, file?: { __typename?: 'File', type: FileType, variants?: Array<{ __typename?: 'FileVariant', id: string, path: string, width: number, height: number, quality: Quality }> | null } | null }> };


export const LoggedInUserDocument = gql`
    query LoggedInUser {
  loggedInUser {
    id
    username
    createdAt
    email
    updatedAt
  }
}
    `;
export type LoggedInUserComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<LoggedInUserQuery, LoggedInUserQueryVariables>, 'query'>;

    export const LoggedInUserComponent = (props: LoggedInUserComponentProps) => (
      <ApolloReactComponents.Query<LoggedInUserQuery, LoggedInUserQueryVariables> query={LoggedInUserDocument} {...props} />
    );
    

/**
 * __useLoggedInUserQuery__
 *
 * To run a query within a React component, call `useLoggedInUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoggedInUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoggedInUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoggedInUserQuery(baseOptions?: Apollo.QueryHookOptions<LoggedInUserQuery, LoggedInUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoggedInUserQuery, LoggedInUserQueryVariables>(LoggedInUserDocument, options);
      }
export function useLoggedInUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoggedInUserQuery, LoggedInUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoggedInUserQuery, LoggedInUserQueryVariables>(LoggedInUserDocument, options);
        }
export function useLoggedInUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LoggedInUserQuery, LoggedInUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoggedInUserQuery, LoggedInUserQueryVariables>(LoggedInUserDocument, options);
        }
export type LoggedInUserQueryHookResult = ReturnType<typeof useLoggedInUserQuery>;
export type LoggedInUserLazyQueryHookResult = ReturnType<typeof useLoggedInUserLazyQuery>;
export type LoggedInUserSuspenseQueryHookResult = ReturnType<typeof useLoggedInUserSuspenseQuery>;
export type LoggedInUserQueryResult = Apollo.QueryResult<LoggedInUserQuery, LoggedInUserQueryVariables>;
export const PostDocument = gql`
    query Post($postId: ID!) {
  post(id: $postId) {
    id
    title
    description
    createdAt
    updatedAt
    author {
      username
    }
    file {
      id
      type
      alt
      variants {
        id
        width
        height
        path
        quality
        createdAt
        updatedAt
      }
    }
  }
}
    `;
export type PostComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PostQuery, PostQueryVariables>, 'query'> & ({ variables: PostQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const PostComponent = (props: PostComponentProps) => (
      <ApolloReactComponents.Query<PostQuery, PostQueryVariables> query={PostDocument} {...props} />
    );
    

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables> & ({ variables: PostQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export function usePostSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostSuspenseQueryHookResult = ReturnType<typeof usePostSuspenseQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts($filter: String) {
  posts(filter: $filter) {
    id
    title
    file {
      variants {
        id
        path
        width
        height
        quality
      }
      type
    }
  }
}
    `;
export type PostsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PostsQuery, PostsQueryVariables>, 'query'>;

    export const PostsComponent = (props: PostsComponentProps) => (
      <ApolloReactComponents.Query<PostsQuery, PostsQueryVariables> query={PostsDocument} {...props} />
    );
    

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export function usePostsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsSuspenseQueryHookResult = ReturnType<typeof usePostsSuspenseQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;