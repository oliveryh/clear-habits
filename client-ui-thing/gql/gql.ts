/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    mutation startEntry($id: Int!) {\n      Entry: startEntry(input: { id: $id }) {\n        entry {\n          id\n          description\n          complete\n          date\n          timerActive\n          timerTrackedTime\n          timerStartedAt\n          timerEstimatedTime\n        }\n      }\n    }\n  ": types.StartEntryDocument,
    "\n    mutation stopEntry($id: Int!) {\n      Entry: stopEntry(input: { id: $id }) {\n        entry {\n          id\n          description\n          complete\n          date\n          timerActive\n          timerTrackedTime\n          timerStartedAt\n          timerEstimatedTime\n        }\n      }\n    }\n  ": types.StopEntryDocument,
    "\n    mutation completeEntry($id: Int!) {\n      Entry: completeEntry(input: { id: $id }) {\n        entry {\n          id\n          description\n          complete\n          date\n          timerActive\n          timerTrackedTime\n          timerStartedAt\n          timerEstimatedTime\n        }\n      }\n    }\n  ": types.CompleteEntryDocument,
    "\n    mutation restartEntry($id: Int!) {\n      Entry: restartEntry(input: { id: $id }) {\n        entry {\n          id\n          description\n          complete\n          date\n          timerActive\n          timerTrackedTime\n          timerStartedAt\n          timerEstimatedTime\n        }\n      }\n    }\n  ": types.RestartEntryDocument,
    "\n    query filteredEntries($datesIn: [String!]!) {\n      entries(filter: { date: { in: $datesIn } }) {\n        id\n        description\n        complete\n        date\n        timerActive\n        timerTrackedTime\n        timerStartedAt\n        timerEstimatedTime\n        task {\n          id\n          description\n          project {\n            id\n            description\n            category {\n              id\n              color\n              colorContrast\n              description\n            }\n          }\n        }\n      }\n    }\n  ": types.FilteredEntriesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation startEntry($id: Int!) {\n      Entry: startEntry(input: { id: $id }) {\n        entry {\n          id\n          description\n          complete\n          date\n          timerActive\n          timerTrackedTime\n          timerStartedAt\n          timerEstimatedTime\n        }\n      }\n    }\n  "): (typeof documents)["\n    mutation startEntry($id: Int!) {\n      Entry: startEntry(input: { id: $id }) {\n        entry {\n          id\n          description\n          complete\n          date\n          timerActive\n          timerTrackedTime\n          timerStartedAt\n          timerEstimatedTime\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation stopEntry($id: Int!) {\n      Entry: stopEntry(input: { id: $id }) {\n        entry {\n          id\n          description\n          complete\n          date\n          timerActive\n          timerTrackedTime\n          timerStartedAt\n          timerEstimatedTime\n        }\n      }\n    }\n  "): (typeof documents)["\n    mutation stopEntry($id: Int!) {\n      Entry: stopEntry(input: { id: $id }) {\n        entry {\n          id\n          description\n          complete\n          date\n          timerActive\n          timerTrackedTime\n          timerStartedAt\n          timerEstimatedTime\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation completeEntry($id: Int!) {\n      Entry: completeEntry(input: { id: $id }) {\n        entry {\n          id\n          description\n          complete\n          date\n          timerActive\n          timerTrackedTime\n          timerStartedAt\n          timerEstimatedTime\n        }\n      }\n    }\n  "): (typeof documents)["\n    mutation completeEntry($id: Int!) {\n      Entry: completeEntry(input: { id: $id }) {\n        entry {\n          id\n          description\n          complete\n          date\n          timerActive\n          timerTrackedTime\n          timerStartedAt\n          timerEstimatedTime\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation restartEntry($id: Int!) {\n      Entry: restartEntry(input: { id: $id }) {\n        entry {\n          id\n          description\n          complete\n          date\n          timerActive\n          timerTrackedTime\n          timerStartedAt\n          timerEstimatedTime\n        }\n      }\n    }\n  "): (typeof documents)["\n    mutation restartEntry($id: Int!) {\n      Entry: restartEntry(input: { id: $id }) {\n        entry {\n          id\n          description\n          complete\n          date\n          timerActive\n          timerTrackedTime\n          timerStartedAt\n          timerEstimatedTime\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query filteredEntries($datesIn: [String!]!) {\n      entries(filter: { date: { in: $datesIn } }) {\n        id\n        description\n        complete\n        date\n        timerActive\n        timerTrackedTime\n        timerStartedAt\n        timerEstimatedTime\n        task {\n          id\n          description\n          project {\n            id\n            description\n            category {\n              id\n              color\n              colorContrast\n              description\n            }\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query filteredEntries($datesIn: [String!]!) {\n      entries(filter: { date: { in: $datesIn } }) {\n        id\n        description\n        complete\n        date\n        timerActive\n        timerTrackedTime\n        timerStartedAt\n        timerEstimatedTime\n        task {\n          id\n          description\n          project {\n            id\n            description\n            category {\n              id\n              color\n              colorContrast\n              description\n            }\n          }\n        }\n      }\n    }\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;