/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A floating point number that requires more precision than IEEE 754 binary 64 */
  BigFloat: { input: any; output: any; }
  /**
   * A signed eight-byte integer. The upper big integer values are greater than the
   * max value for a JavaScript number. Therefore all big integers will be output as
   * strings and not numbers.
   */
  BigInt: { input: any; output: any; }
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: { input: any; output: any; }
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: { input: any; output: any; }
  /**
   * A JSON Web Token defined by [RFC 7519](https://tools.ietf.org/html/rfc7519)
   * which securely represents claims between two parties.
   */
  JwtToken: { input: any; output: any; }
};

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type BooleanFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Boolean']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Boolean']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Boolean']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** A connection to a list of `Category` values. */
export type CategoriesConnection = {
  __typename?: 'CategoriesConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<CategoryAggregates>;
  /** A list of edges which contains the `Category` and cursor to aid in pagination. */
  edges: Array<CategoriesEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<CategoryAggregates>>;
  /** A list of `Category` objects. */
  nodes: Array<Maybe<Category>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Category` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Category` values. */
export type CategoriesConnectionGroupedAggregatesArgs = {
  groupBy: Array<CategoriesGroupBy>;
  having?: InputMaybe<CategoriesHavingInput>;
};

/** A `Category` edge in the connection. */
export type CategoriesEdge = {
  __typename?: 'CategoriesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Category` at the end of the edge. */
  node?: Maybe<Category>;
};

/** Grouping methods for `Category` for usage during aggregation. */
export enum CategoriesGroupBy {
  Color = 'COLOR',
  ColorContrast = 'COLOR_CONTRAST',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Description = 'DESCRIPTION',
  PersonId = 'PERSON_ID'
}

export type CategoriesHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
};

export type CategoriesHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
};

/** Conditions for `Category` aggregates. */
export type CategoriesHavingInput = {
  AND?: InputMaybe<Array<CategoriesHavingInput>>;
  OR?: InputMaybe<Array<CategoriesHavingInput>>;
  average?: InputMaybe<CategoriesHavingAverageInput>;
  distinctCount?: InputMaybe<CategoriesHavingDistinctCountInput>;
  max?: InputMaybe<CategoriesHavingMaxInput>;
  maxDate?: InputMaybe<CategoriesHavingMaxDateInput>;
  min?: InputMaybe<CategoriesHavingMinInput>;
  minDate?: InputMaybe<CategoriesHavingMinDateInput>;
  stddevPopulation?: InputMaybe<CategoriesHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<CategoriesHavingStddevSampleInput>;
  sum?: InputMaybe<CategoriesHavingSumInput>;
  variancePopulation?: InputMaybe<CategoriesHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<CategoriesHavingVarianceSampleInput>;
};

export type CategoriesHavingMaxDateInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
};

export type CategoriesHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
};

export type CategoriesHavingMinDateInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
};

export type CategoriesHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
};

export type CategoriesHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
};

export type CategoriesHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
};

export type CategoriesHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
};

export type CategoriesHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
};

export type CategoriesHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
};

/** Methods to use when ordering `Category`. */
export enum CategoriesOrderBy {
  ColorAsc = 'COLOR_ASC',
  ColorContrastAsc = 'COLOR_CONTRAST_ASC',
  ColorContrastDesc = 'COLOR_CONTRAST_DESC',
  ColorDesc = 'COLOR_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PersonIdAsc = 'PERSON_ID_ASC',
  PersonIdDesc = 'PERSON_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectsConnectionAverageCategoryIdAsc = 'PROJECTS_CONNECTION_AVERAGE_CATEGORY_ID_ASC',
  ProjectsConnectionAverageCategoryIdDesc = 'PROJECTS_CONNECTION_AVERAGE_CATEGORY_ID_DESC',
  ProjectsConnectionAverageCreatedAtAsc = 'PROJECTS_CONNECTION_AVERAGE_CREATED_AT_ASC',
  ProjectsConnectionAverageCreatedAtDesc = 'PROJECTS_CONNECTION_AVERAGE_CREATED_AT_DESC',
  ProjectsConnectionAverageDescriptionAsc = 'PROJECTS_CONNECTION_AVERAGE_DESCRIPTION_ASC',
  ProjectsConnectionAverageDescriptionDesc = 'PROJECTS_CONNECTION_AVERAGE_DESCRIPTION_DESC',
  ProjectsConnectionAverageIdAsc = 'PROJECTS_CONNECTION_AVERAGE_ID_ASC',
  ProjectsConnectionAverageIdDesc = 'PROJECTS_CONNECTION_AVERAGE_ID_DESC',
  ProjectsConnectionAveragePersonIdAsc = 'PROJECTS_CONNECTION_AVERAGE_PERSON_ID_ASC',
  ProjectsConnectionAveragePersonIdDesc = 'PROJECTS_CONNECTION_AVERAGE_PERSON_ID_DESC',
  ProjectsConnectionAverageTargetDaysAsc = 'PROJECTS_CONNECTION_AVERAGE_TARGET_DAYS_ASC',
  ProjectsConnectionAverageTargetDaysDesc = 'PROJECTS_CONNECTION_AVERAGE_TARGET_DAYS_DESC',
  ProjectsConnectionAverageTargetMaxTimePerWeekAsc = 'PROJECTS_CONNECTION_AVERAGE_TARGET_MAX_TIME_PER_WEEK_ASC',
  ProjectsConnectionAverageTargetMaxTimePerWeekDesc = 'PROJECTS_CONNECTION_AVERAGE_TARGET_MAX_TIME_PER_WEEK_DESC',
  ProjectsConnectionAverageTargetMinTimePerWeekAsc = 'PROJECTS_CONNECTION_AVERAGE_TARGET_MIN_TIME_PER_WEEK_ASC',
  ProjectsConnectionAverageTargetMinTimePerWeekDesc = 'PROJECTS_CONNECTION_AVERAGE_TARGET_MIN_TIME_PER_WEEK_DESC',
  ProjectsConnectionCountAsc = 'PROJECTS_CONNECTION_COUNT_ASC',
  ProjectsConnectionCountDesc = 'PROJECTS_CONNECTION_COUNT_DESC',
  ProjectsConnectionDistinctCountCategoryIdAsc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_CATEGORY_ID_ASC',
  ProjectsConnectionDistinctCountCategoryIdDesc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_CATEGORY_ID_DESC',
  ProjectsConnectionDistinctCountCreatedAtAsc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_CREATED_AT_ASC',
  ProjectsConnectionDistinctCountCreatedAtDesc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_CREATED_AT_DESC',
  ProjectsConnectionDistinctCountDescriptionAsc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_DESCRIPTION_ASC',
  ProjectsConnectionDistinctCountDescriptionDesc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_DESCRIPTION_DESC',
  ProjectsConnectionDistinctCountIdAsc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_ID_ASC',
  ProjectsConnectionDistinctCountIdDesc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_ID_DESC',
  ProjectsConnectionDistinctCountPersonIdAsc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_PERSON_ID_ASC',
  ProjectsConnectionDistinctCountPersonIdDesc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_PERSON_ID_DESC',
  ProjectsConnectionDistinctCountTargetDaysAsc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_TARGET_DAYS_ASC',
  ProjectsConnectionDistinctCountTargetDaysDesc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_TARGET_DAYS_DESC',
  ProjectsConnectionDistinctCountTargetMaxTimePerWeekAsc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_TARGET_MAX_TIME_PER_WEEK_ASC',
  ProjectsConnectionDistinctCountTargetMaxTimePerWeekDesc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_TARGET_MAX_TIME_PER_WEEK_DESC',
  ProjectsConnectionDistinctCountTargetMinTimePerWeekAsc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_TARGET_MIN_TIME_PER_WEEK_ASC',
  ProjectsConnectionDistinctCountTargetMinTimePerWeekDesc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_TARGET_MIN_TIME_PER_WEEK_DESC',
  ProjectsConnectionMaxCategoryIdAsc = 'PROJECTS_CONNECTION_MAX_CATEGORY_ID_ASC',
  ProjectsConnectionMaxCategoryIdDesc = 'PROJECTS_CONNECTION_MAX_CATEGORY_ID_DESC',
  ProjectsConnectionMaxCreatedAtAsc = 'PROJECTS_CONNECTION_MAX_CREATED_AT_ASC',
  ProjectsConnectionMaxCreatedAtDesc = 'PROJECTS_CONNECTION_MAX_CREATED_AT_DESC',
  ProjectsConnectionMaxDateCategoryIdAsc = 'PROJECTS_CONNECTION_MAX_DATE_CATEGORY_ID_ASC',
  ProjectsConnectionMaxDateCategoryIdDesc = 'PROJECTS_CONNECTION_MAX_DATE_CATEGORY_ID_DESC',
  ProjectsConnectionMaxDateCreatedAtAsc = 'PROJECTS_CONNECTION_MAX_DATE_CREATED_AT_ASC',
  ProjectsConnectionMaxDateCreatedAtDesc = 'PROJECTS_CONNECTION_MAX_DATE_CREATED_AT_DESC',
  ProjectsConnectionMaxDateDescriptionAsc = 'PROJECTS_CONNECTION_MAX_DATE_DESCRIPTION_ASC',
  ProjectsConnectionMaxDateDescriptionDesc = 'PROJECTS_CONNECTION_MAX_DATE_DESCRIPTION_DESC',
  ProjectsConnectionMaxDateIdAsc = 'PROJECTS_CONNECTION_MAX_DATE_ID_ASC',
  ProjectsConnectionMaxDateIdDesc = 'PROJECTS_CONNECTION_MAX_DATE_ID_DESC',
  ProjectsConnectionMaxDatePersonIdAsc = 'PROJECTS_CONNECTION_MAX_DATE_PERSON_ID_ASC',
  ProjectsConnectionMaxDatePersonIdDesc = 'PROJECTS_CONNECTION_MAX_DATE_PERSON_ID_DESC',
  ProjectsConnectionMaxDateTargetDaysAsc = 'PROJECTS_CONNECTION_MAX_DATE_TARGET_DAYS_ASC',
  ProjectsConnectionMaxDateTargetDaysDesc = 'PROJECTS_CONNECTION_MAX_DATE_TARGET_DAYS_DESC',
  ProjectsConnectionMaxDateTargetMaxTimePerWeekAsc = 'PROJECTS_CONNECTION_MAX_DATE_TARGET_MAX_TIME_PER_WEEK_ASC',
  ProjectsConnectionMaxDateTargetMaxTimePerWeekDesc = 'PROJECTS_CONNECTION_MAX_DATE_TARGET_MAX_TIME_PER_WEEK_DESC',
  ProjectsConnectionMaxDateTargetMinTimePerWeekAsc = 'PROJECTS_CONNECTION_MAX_DATE_TARGET_MIN_TIME_PER_WEEK_ASC',
  ProjectsConnectionMaxDateTargetMinTimePerWeekDesc = 'PROJECTS_CONNECTION_MAX_DATE_TARGET_MIN_TIME_PER_WEEK_DESC',
  ProjectsConnectionMaxDescriptionAsc = 'PROJECTS_CONNECTION_MAX_DESCRIPTION_ASC',
  ProjectsConnectionMaxDescriptionDesc = 'PROJECTS_CONNECTION_MAX_DESCRIPTION_DESC',
  ProjectsConnectionMaxIdAsc = 'PROJECTS_CONNECTION_MAX_ID_ASC',
  ProjectsConnectionMaxIdDesc = 'PROJECTS_CONNECTION_MAX_ID_DESC',
  ProjectsConnectionMaxPersonIdAsc = 'PROJECTS_CONNECTION_MAX_PERSON_ID_ASC',
  ProjectsConnectionMaxPersonIdDesc = 'PROJECTS_CONNECTION_MAX_PERSON_ID_DESC',
  ProjectsConnectionMaxTargetDaysAsc = 'PROJECTS_CONNECTION_MAX_TARGET_DAYS_ASC',
  ProjectsConnectionMaxTargetDaysDesc = 'PROJECTS_CONNECTION_MAX_TARGET_DAYS_DESC',
  ProjectsConnectionMaxTargetMaxTimePerWeekAsc = 'PROJECTS_CONNECTION_MAX_TARGET_MAX_TIME_PER_WEEK_ASC',
  ProjectsConnectionMaxTargetMaxTimePerWeekDesc = 'PROJECTS_CONNECTION_MAX_TARGET_MAX_TIME_PER_WEEK_DESC',
  ProjectsConnectionMaxTargetMinTimePerWeekAsc = 'PROJECTS_CONNECTION_MAX_TARGET_MIN_TIME_PER_WEEK_ASC',
  ProjectsConnectionMaxTargetMinTimePerWeekDesc = 'PROJECTS_CONNECTION_MAX_TARGET_MIN_TIME_PER_WEEK_DESC',
  ProjectsConnectionMinCategoryIdAsc = 'PROJECTS_CONNECTION_MIN_CATEGORY_ID_ASC',
  ProjectsConnectionMinCategoryIdDesc = 'PROJECTS_CONNECTION_MIN_CATEGORY_ID_DESC',
  ProjectsConnectionMinCreatedAtAsc = 'PROJECTS_CONNECTION_MIN_CREATED_AT_ASC',
  ProjectsConnectionMinCreatedAtDesc = 'PROJECTS_CONNECTION_MIN_CREATED_AT_DESC',
  ProjectsConnectionMinDateCategoryIdAsc = 'PROJECTS_CONNECTION_MIN_DATE_CATEGORY_ID_ASC',
  ProjectsConnectionMinDateCategoryIdDesc = 'PROJECTS_CONNECTION_MIN_DATE_CATEGORY_ID_DESC',
  ProjectsConnectionMinDateCreatedAtAsc = 'PROJECTS_CONNECTION_MIN_DATE_CREATED_AT_ASC',
  ProjectsConnectionMinDateCreatedAtDesc = 'PROJECTS_CONNECTION_MIN_DATE_CREATED_AT_DESC',
  ProjectsConnectionMinDateDescriptionAsc = 'PROJECTS_CONNECTION_MIN_DATE_DESCRIPTION_ASC',
  ProjectsConnectionMinDateDescriptionDesc = 'PROJECTS_CONNECTION_MIN_DATE_DESCRIPTION_DESC',
  ProjectsConnectionMinDateIdAsc = 'PROJECTS_CONNECTION_MIN_DATE_ID_ASC',
  ProjectsConnectionMinDateIdDesc = 'PROJECTS_CONNECTION_MIN_DATE_ID_DESC',
  ProjectsConnectionMinDatePersonIdAsc = 'PROJECTS_CONNECTION_MIN_DATE_PERSON_ID_ASC',
  ProjectsConnectionMinDatePersonIdDesc = 'PROJECTS_CONNECTION_MIN_DATE_PERSON_ID_DESC',
  ProjectsConnectionMinDateTargetDaysAsc = 'PROJECTS_CONNECTION_MIN_DATE_TARGET_DAYS_ASC',
  ProjectsConnectionMinDateTargetDaysDesc = 'PROJECTS_CONNECTION_MIN_DATE_TARGET_DAYS_DESC',
  ProjectsConnectionMinDateTargetMaxTimePerWeekAsc = 'PROJECTS_CONNECTION_MIN_DATE_TARGET_MAX_TIME_PER_WEEK_ASC',
  ProjectsConnectionMinDateTargetMaxTimePerWeekDesc = 'PROJECTS_CONNECTION_MIN_DATE_TARGET_MAX_TIME_PER_WEEK_DESC',
  ProjectsConnectionMinDateTargetMinTimePerWeekAsc = 'PROJECTS_CONNECTION_MIN_DATE_TARGET_MIN_TIME_PER_WEEK_ASC',
  ProjectsConnectionMinDateTargetMinTimePerWeekDesc = 'PROJECTS_CONNECTION_MIN_DATE_TARGET_MIN_TIME_PER_WEEK_DESC',
  ProjectsConnectionMinDescriptionAsc = 'PROJECTS_CONNECTION_MIN_DESCRIPTION_ASC',
  ProjectsConnectionMinDescriptionDesc = 'PROJECTS_CONNECTION_MIN_DESCRIPTION_DESC',
  ProjectsConnectionMinIdAsc = 'PROJECTS_CONNECTION_MIN_ID_ASC',
  ProjectsConnectionMinIdDesc = 'PROJECTS_CONNECTION_MIN_ID_DESC',
  ProjectsConnectionMinPersonIdAsc = 'PROJECTS_CONNECTION_MIN_PERSON_ID_ASC',
  ProjectsConnectionMinPersonIdDesc = 'PROJECTS_CONNECTION_MIN_PERSON_ID_DESC',
  ProjectsConnectionMinTargetDaysAsc = 'PROJECTS_CONNECTION_MIN_TARGET_DAYS_ASC',
  ProjectsConnectionMinTargetDaysDesc = 'PROJECTS_CONNECTION_MIN_TARGET_DAYS_DESC',
  ProjectsConnectionMinTargetMaxTimePerWeekAsc = 'PROJECTS_CONNECTION_MIN_TARGET_MAX_TIME_PER_WEEK_ASC',
  ProjectsConnectionMinTargetMaxTimePerWeekDesc = 'PROJECTS_CONNECTION_MIN_TARGET_MAX_TIME_PER_WEEK_DESC',
  ProjectsConnectionMinTargetMinTimePerWeekAsc = 'PROJECTS_CONNECTION_MIN_TARGET_MIN_TIME_PER_WEEK_ASC',
  ProjectsConnectionMinTargetMinTimePerWeekDesc = 'PROJECTS_CONNECTION_MIN_TARGET_MIN_TIME_PER_WEEK_DESC',
  ProjectsConnectionStddevPopulationCategoryIdAsc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_CATEGORY_ID_ASC',
  ProjectsConnectionStddevPopulationCategoryIdDesc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_CATEGORY_ID_DESC',
  ProjectsConnectionStddevPopulationCreatedAtAsc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_CREATED_AT_ASC',
  ProjectsConnectionStddevPopulationCreatedAtDesc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_CREATED_AT_DESC',
  ProjectsConnectionStddevPopulationDescriptionAsc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_DESCRIPTION_ASC',
  ProjectsConnectionStddevPopulationDescriptionDesc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_DESCRIPTION_DESC',
  ProjectsConnectionStddevPopulationIdAsc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_ID_ASC',
  ProjectsConnectionStddevPopulationIdDesc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_ID_DESC',
  ProjectsConnectionStddevPopulationPersonIdAsc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_PERSON_ID_ASC',
  ProjectsConnectionStddevPopulationPersonIdDesc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_PERSON_ID_DESC',
  ProjectsConnectionStddevPopulationTargetDaysAsc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_TARGET_DAYS_ASC',
  ProjectsConnectionStddevPopulationTargetDaysDesc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_TARGET_DAYS_DESC',
  ProjectsConnectionStddevPopulationTargetMaxTimePerWeekAsc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_TARGET_MAX_TIME_PER_WEEK_ASC',
  ProjectsConnectionStddevPopulationTargetMaxTimePerWeekDesc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_TARGET_MAX_TIME_PER_WEEK_DESC',
  ProjectsConnectionStddevPopulationTargetMinTimePerWeekAsc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_TARGET_MIN_TIME_PER_WEEK_ASC',
  ProjectsConnectionStddevPopulationTargetMinTimePerWeekDesc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_TARGET_MIN_TIME_PER_WEEK_DESC',
  ProjectsConnectionStddevSampleCategoryIdAsc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_CATEGORY_ID_ASC',
  ProjectsConnectionStddevSampleCategoryIdDesc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_CATEGORY_ID_DESC',
  ProjectsConnectionStddevSampleCreatedAtAsc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_CREATED_AT_ASC',
  ProjectsConnectionStddevSampleCreatedAtDesc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_CREATED_AT_DESC',
  ProjectsConnectionStddevSampleDescriptionAsc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_DESCRIPTION_ASC',
  ProjectsConnectionStddevSampleDescriptionDesc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_DESCRIPTION_DESC',
  ProjectsConnectionStddevSampleIdAsc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_ID_ASC',
  ProjectsConnectionStddevSampleIdDesc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_ID_DESC',
  ProjectsConnectionStddevSamplePersonIdAsc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_PERSON_ID_ASC',
  ProjectsConnectionStddevSamplePersonIdDesc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_PERSON_ID_DESC',
  ProjectsConnectionStddevSampleTargetDaysAsc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_TARGET_DAYS_ASC',
  ProjectsConnectionStddevSampleTargetDaysDesc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_TARGET_DAYS_DESC',
  ProjectsConnectionStddevSampleTargetMaxTimePerWeekAsc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_TARGET_MAX_TIME_PER_WEEK_ASC',
  ProjectsConnectionStddevSampleTargetMaxTimePerWeekDesc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_TARGET_MAX_TIME_PER_WEEK_DESC',
  ProjectsConnectionStddevSampleTargetMinTimePerWeekAsc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_TARGET_MIN_TIME_PER_WEEK_ASC',
  ProjectsConnectionStddevSampleTargetMinTimePerWeekDesc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_TARGET_MIN_TIME_PER_WEEK_DESC',
  ProjectsConnectionSumCategoryIdAsc = 'PROJECTS_CONNECTION_SUM_CATEGORY_ID_ASC',
  ProjectsConnectionSumCategoryIdDesc = 'PROJECTS_CONNECTION_SUM_CATEGORY_ID_DESC',
  ProjectsConnectionSumCreatedAtAsc = 'PROJECTS_CONNECTION_SUM_CREATED_AT_ASC',
  ProjectsConnectionSumCreatedAtDesc = 'PROJECTS_CONNECTION_SUM_CREATED_AT_DESC',
  ProjectsConnectionSumDescriptionAsc = 'PROJECTS_CONNECTION_SUM_DESCRIPTION_ASC',
  ProjectsConnectionSumDescriptionDesc = 'PROJECTS_CONNECTION_SUM_DESCRIPTION_DESC',
  ProjectsConnectionSumIdAsc = 'PROJECTS_CONNECTION_SUM_ID_ASC',
  ProjectsConnectionSumIdDesc = 'PROJECTS_CONNECTION_SUM_ID_DESC',
  ProjectsConnectionSumPersonIdAsc = 'PROJECTS_CONNECTION_SUM_PERSON_ID_ASC',
  ProjectsConnectionSumPersonIdDesc = 'PROJECTS_CONNECTION_SUM_PERSON_ID_DESC',
  ProjectsConnectionSumTargetDaysAsc = 'PROJECTS_CONNECTION_SUM_TARGET_DAYS_ASC',
  ProjectsConnectionSumTargetDaysDesc = 'PROJECTS_CONNECTION_SUM_TARGET_DAYS_DESC',
  ProjectsConnectionSumTargetMaxTimePerWeekAsc = 'PROJECTS_CONNECTION_SUM_TARGET_MAX_TIME_PER_WEEK_ASC',
  ProjectsConnectionSumTargetMaxTimePerWeekDesc = 'PROJECTS_CONNECTION_SUM_TARGET_MAX_TIME_PER_WEEK_DESC',
  ProjectsConnectionSumTargetMinTimePerWeekAsc = 'PROJECTS_CONNECTION_SUM_TARGET_MIN_TIME_PER_WEEK_ASC',
  ProjectsConnectionSumTargetMinTimePerWeekDesc = 'PROJECTS_CONNECTION_SUM_TARGET_MIN_TIME_PER_WEEK_DESC',
  ProjectsConnectionVariancePopulationCategoryIdAsc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_CATEGORY_ID_ASC',
  ProjectsConnectionVariancePopulationCategoryIdDesc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_CATEGORY_ID_DESC',
  ProjectsConnectionVariancePopulationCreatedAtAsc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_CREATED_AT_ASC',
  ProjectsConnectionVariancePopulationCreatedAtDesc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_CREATED_AT_DESC',
  ProjectsConnectionVariancePopulationDescriptionAsc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_DESCRIPTION_ASC',
  ProjectsConnectionVariancePopulationDescriptionDesc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_DESCRIPTION_DESC',
  ProjectsConnectionVariancePopulationIdAsc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_ID_ASC',
  ProjectsConnectionVariancePopulationIdDesc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_ID_DESC',
  ProjectsConnectionVariancePopulationPersonIdAsc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_PERSON_ID_ASC',
  ProjectsConnectionVariancePopulationPersonIdDesc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_PERSON_ID_DESC',
  ProjectsConnectionVariancePopulationTargetDaysAsc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_TARGET_DAYS_ASC',
  ProjectsConnectionVariancePopulationTargetDaysDesc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_TARGET_DAYS_DESC',
  ProjectsConnectionVariancePopulationTargetMaxTimePerWeekAsc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_TARGET_MAX_TIME_PER_WEEK_ASC',
  ProjectsConnectionVariancePopulationTargetMaxTimePerWeekDesc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_TARGET_MAX_TIME_PER_WEEK_DESC',
  ProjectsConnectionVariancePopulationTargetMinTimePerWeekAsc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_TARGET_MIN_TIME_PER_WEEK_ASC',
  ProjectsConnectionVariancePopulationTargetMinTimePerWeekDesc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_TARGET_MIN_TIME_PER_WEEK_DESC',
  ProjectsConnectionVarianceSampleCategoryIdAsc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_CATEGORY_ID_ASC',
  ProjectsConnectionVarianceSampleCategoryIdDesc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_CATEGORY_ID_DESC',
  ProjectsConnectionVarianceSampleCreatedAtAsc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_CREATED_AT_ASC',
  ProjectsConnectionVarianceSampleCreatedAtDesc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_CREATED_AT_DESC',
  ProjectsConnectionVarianceSampleDescriptionAsc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_DESCRIPTION_ASC',
  ProjectsConnectionVarianceSampleDescriptionDesc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_DESCRIPTION_DESC',
  ProjectsConnectionVarianceSampleIdAsc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_ID_ASC',
  ProjectsConnectionVarianceSampleIdDesc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_ID_DESC',
  ProjectsConnectionVarianceSamplePersonIdAsc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_PERSON_ID_ASC',
  ProjectsConnectionVarianceSamplePersonIdDesc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_PERSON_ID_DESC',
  ProjectsConnectionVarianceSampleTargetDaysAsc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_TARGET_DAYS_ASC',
  ProjectsConnectionVarianceSampleTargetDaysDesc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_TARGET_DAYS_DESC',
  ProjectsConnectionVarianceSampleTargetMaxTimePerWeekAsc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_TARGET_MAX_TIME_PER_WEEK_ASC',
  ProjectsConnectionVarianceSampleTargetMaxTimePerWeekDesc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_TARGET_MAX_TIME_PER_WEEK_DESC',
  ProjectsConnectionVarianceSampleTargetMinTimePerWeekAsc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_TARGET_MIN_TIME_PER_WEEK_ASC',
  ProjectsConnectionVarianceSampleTargetMinTimePerWeekDesc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_TARGET_MIN_TIME_PER_WEEK_DESC'
}

export type Category = Node & {
  __typename?: 'Category';
  color?: Maybe<Scalars['String']['output']>;
  colorContrast?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['Datetime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Person` that is related to this `Category`. */
  person?: Maybe<Person>;
  personId: Scalars['Int']['output'];
  /** Reads and enables pagination through a set of `Project`. */
  projects: Array<Project>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsConnection: ProjectsConnection;
};


export type CategoryProjectsArgs = {
  condition?: InputMaybe<ProjectCondition>;
  filter?: InputMaybe<ProjectFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};


export type CategoryProjectsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ProjectCondition>;
  filter?: InputMaybe<ProjectFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};

export type CategoryAggregates = {
  __typename?: 'CategoryAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<CategoryAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<CategoryDistinctCountAggregates>;
  keys?: Maybe<Array<Scalars['String']['output']>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<CategoryMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<CategoryMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<CategoryStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<CategoryStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<CategorySumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<CategoryVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<CategoryVarianceSampleAggregates>;
};

export type CategoryAverageAggregates = {
  __typename?: 'CategoryAverageAggregates';
  /** Mean average of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
};

/**
 * A condition to be used against `Category` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type CategoryCondition = {
  /** Checks for equality with the object’s `color` field. */
  color?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `colorContrast` field. */
  colorContrast?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `personId` field. */
  personId?: InputMaybe<Scalars['Int']['input']>;
};

export type CategoryDistinctCountAggregates = {
  __typename?: 'CategoryDistinctCountAggregates';
  /** Distinct count of color across the matching connection */
  color?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of colorContrast across the matching connection */
  colorContrast?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of description across the matching connection */
  description?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of id across the matching connection */
  id?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of personId across the matching connection */
  personId?: Maybe<Scalars['BigInt']['output']>;
};

/** A filter to be used against `Category` object types. All fields are combined with a logical ‘and.’ */
export type CategoryFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<CategoryFilter>>;
  /** Filter by the object’s `color` field. */
  color?: InputMaybe<StringFilter>;
  /** Filter by the object’s `colorContrast` field. */
  colorContrast?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<CategoryFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<CategoryFilter>>;
  /** Filter by the object’s `personId` field. */
  personId?: InputMaybe<IntFilter>;
};

export type CategoryMaxAggregates = {
  __typename?: 'CategoryMaxAggregates';
  /** Maximum of id across the matching connection */
  id?: Maybe<Scalars['Int']['output']>;
  /** Maximum of personId across the matching connection */
  personId?: Maybe<Scalars['Int']['output']>;
};

export type CategoryMinAggregates = {
  __typename?: 'CategoryMinAggregates';
  /** Minimum of id across the matching connection */
  id?: Maybe<Scalars['Int']['output']>;
  /** Minimum of personId across the matching connection */
  personId?: Maybe<Scalars['Int']['output']>;
};

/** Represents an update to a `Category`. Fields that are set will be updated. */
export type CategoryPatch = {
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
};

export type CategoryStddevPopulationAggregates = {
  __typename?: 'CategoryStddevPopulationAggregates';
  /** Population standard deviation of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
};

export type CategoryStddevSampleAggregates = {
  __typename?: 'CategoryStddevSampleAggregates';
  /** Sample standard deviation of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
};

export type CategorySumAggregates = {
  __typename?: 'CategorySumAggregates';
  /** Sum of id across the matching connection */
  id: Scalars['BigInt']['output'];
  /** Sum of personId across the matching connection */
  personId: Scalars['BigInt']['output'];
};

export type CategoryVariancePopulationAggregates = {
  __typename?: 'CategoryVariancePopulationAggregates';
  /** Population variance of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
};

export type CategoryVarianceSampleAggregates = {
  __typename?: 'CategoryVarianceSampleAggregates';
  /** Sample variance of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
};

/** All input for the `completeEntry` mutation. */
export type CompleteEntryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** The output of our `completeEntry` mutation. */
export type CompleteEntryPayload = {
  __typename?: 'CompleteEntryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  entry?: Maybe<Entry>;
  /** An edge for our `Entry`. May be used by Relay 1. */
  entryEdge?: Maybe<EntriesEdge>;
  /** Reads a single `Person` that is related to this `Entry`. */
  person?: Maybe<Person>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Task` that is related to this `Entry`. */
  task?: Maybe<Task>;
};


/** The output of our `completeEntry` mutation. */
export type CompleteEntryPayloadEntryEdgeArgs = {
  orderBy?: InputMaybe<Array<EntriesOrderBy>>;
};

/** All input for the `createCategory` mutation. */
export type CreateCategoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `createCategory` mutation. */
export type CreateCategoryPayload = {
  __typename?: 'CreateCategoryPayload';
  category?: Maybe<Category>;
  /** An edge for our `Category`. May be used by Relay 1. */
  categoryEdge?: Maybe<CategoriesEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Person` that is related to this `Category`. */
  person?: Maybe<Person>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `createCategory` mutation. */
export type CreateCategoryPayloadCategoryEdgeArgs = {
  orderBy?: InputMaybe<Array<CategoriesOrderBy>>;
};

/** All input for the `createEntry` mutation. */
export type CreateEntryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  taskId?: InputMaybe<Scalars['Int']['input']>;
  timerEstimatedTime?: InputMaybe<Scalars['Int']['input']>;
  timerTrackedTime?: InputMaybe<Scalars['Int']['input']>;
};

/** The output of our `createEntry` mutation. */
export type CreateEntryPayload = {
  __typename?: 'CreateEntryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  entry?: Maybe<Entry>;
  /** An edge for our `Entry`. May be used by Relay 1. */
  entryEdge?: Maybe<EntriesEdge>;
  /** Reads a single `Person` that is related to this `Entry`. */
  person?: Maybe<Person>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Task` that is related to this `Entry`. */
  task?: Maybe<Task>;
};


/** The output of our `createEntry` mutation. */
export type CreateEntryPayloadEntryEdgeArgs = {
  orderBy?: InputMaybe<Array<EntriesOrderBy>>;
};

/** All input for the `createEntryWithTask` mutation. */
export type CreateEntryWithTaskInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['Int']['input']>;
  timerEstimatedTime?: InputMaybe<Scalars['Int']['input']>;
};

/** The output of our `createEntryWithTask` mutation. */
export type CreateEntryWithTaskPayload = {
  __typename?: 'CreateEntryWithTaskPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  entry?: Maybe<Entry>;
  /** An edge for our `Entry`. May be used by Relay 1. */
  entryEdge?: Maybe<EntriesEdge>;
  /** Reads a single `Person` that is related to this `Entry`. */
  person?: Maybe<Person>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Task` that is related to this `Entry`. */
  task?: Maybe<Task>;
};


/** The output of our `createEntryWithTask` mutation. */
export type CreateEntryWithTaskPayloadEntryEdgeArgs = {
  orderBy?: InputMaybe<Array<EntriesOrderBy>>;
};

/** All input for the create `Person` mutation. */
export type CreatePersonInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Person` to be created by this mutation. */
  person: PersonInput;
};

/** The output of our create `Person` mutation. */
export type CreatePersonPayload = {
  __typename?: 'CreatePersonPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Person` that was created by this mutation. */
  person?: Maybe<Person>;
  /** An edge for our `Person`. May be used by Relay 1. */
  personEdge?: Maybe<PeopleEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Person` mutation. */
export type CreatePersonPayloadPersonEdgeArgs = {
  orderBy?: InputMaybe<Array<PeopleOrderBy>>;
};

/** All input for the `createProject` mutation. */
export type CreateProjectInput = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `createProject` mutation. */
export type CreateProjectPayload = {
  __typename?: 'CreateProjectPayload';
  /** Reads a single `Category` that is related to this `Project`. */
  category?: Maybe<Category>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Person` that is related to this `Project`. */
  person?: Maybe<Person>;
  project?: Maybe<Project>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `createProject` mutation. */
export type CreateProjectPayloadProjectEdgeArgs = {
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};

/** All input for the `createTask` mutation. */
export type CreateTaskInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['Int']['input']>;
};

/** The output of our `createTask` mutation. */
export type CreateTaskPayload = {
  __typename?: 'CreateTaskPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Person` that is related to this `Task`. */
  person?: Maybe<Person>;
  /** Reads a single `Project` that is related to this `Task`. */
  project?: Maybe<Project>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  task?: Maybe<Task>;
  /** An edge for our `Task`. May be used by Relay 1. */
  taskEdge?: Maybe<TasksEdge>;
};


/** The output of our `createTask` mutation. */
export type CreateTaskPayloadTaskEdgeArgs = {
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Datetime']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Datetime']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Datetime']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Datetime']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Datetime']['input']>>;
};

/** All input for the `deleteCategoryByNodeId` mutation. */
export type DeleteCategoryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Category` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteCategory` mutation. */
export type DeleteCategoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
};

/** The output of our delete `Category` mutation. */
export type DeleteCategoryPayload = {
  __typename?: 'DeleteCategoryPayload';
  /** The `Category` that was deleted by this mutation. */
  category?: Maybe<Category>;
  /** An edge for our `Category`. May be used by Relay 1. */
  categoryEdge?: Maybe<CategoriesEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedCategoryNodeId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Person` that is related to this `Category`. */
  person?: Maybe<Person>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Category` mutation. */
export type DeleteCategoryPayloadCategoryEdgeArgs = {
  orderBy?: InputMaybe<Array<CategoriesOrderBy>>;
};

/** All input for the `deleteEntryByNodeId` mutation. */
export type DeleteEntryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Entry` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteEntry` mutation. */
export type DeleteEntryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
};

/** The output of our delete `Entry` mutation. */
export type DeleteEntryPayload = {
  __typename?: 'DeleteEntryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedEntryNodeId?: Maybe<Scalars['ID']['output']>;
  /** The `Entry` that was deleted by this mutation. */
  entry?: Maybe<Entry>;
  /** An edge for our `Entry`. May be used by Relay 1. */
  entryEdge?: Maybe<EntriesEdge>;
  /** Reads a single `Person` that is related to this `Entry`. */
  person?: Maybe<Person>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Task` that is related to this `Entry`. */
  task?: Maybe<Task>;
};


/** The output of our delete `Entry` mutation. */
export type DeleteEntryPayloadEntryEdgeArgs = {
  orderBy?: InputMaybe<Array<EntriesOrderBy>>;
};

/** All input for the `deletePersonByNodeId` mutation. */
export type DeletePersonByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Person` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deletePerson` mutation. */
export type DeletePersonInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
};

/** The output of our delete `Person` mutation. */
export type DeletePersonPayload = {
  __typename?: 'DeletePersonPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedPersonNodeId?: Maybe<Scalars['ID']['output']>;
  /** The `Person` that was deleted by this mutation. */
  person?: Maybe<Person>;
  /** An edge for our `Person`. May be used by Relay 1. */
  personEdge?: Maybe<PeopleEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Person` mutation. */
export type DeletePersonPayloadPersonEdgeArgs = {
  orderBy?: InputMaybe<Array<PeopleOrderBy>>;
};

/** All input for the `deleteProjectByNodeId` mutation. */
export type DeleteProjectByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Project` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteProject` mutation. */
export type DeleteProjectInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
};

/** The output of our delete `Project` mutation. */
export type DeleteProjectPayload = {
  __typename?: 'DeleteProjectPayload';
  /** Reads a single `Category` that is related to this `Project`. */
  category?: Maybe<Category>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedProjectNodeId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Person` that is related to this `Project`. */
  person?: Maybe<Person>;
  /** The `Project` that was deleted by this mutation. */
  project?: Maybe<Project>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Project` mutation. */
export type DeleteProjectPayloadProjectEdgeArgs = {
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};

/** All input for the `deleteTaskByNodeId` mutation. */
export type DeleteTaskByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Task` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteTask` mutation. */
export type DeleteTaskInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
};

/** The output of our delete `Task` mutation. */
export type DeleteTaskPayload = {
  __typename?: 'DeleteTaskPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedTaskNodeId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Person` that is related to this `Task`. */
  person?: Maybe<Person>;
  /** Reads a single `Project` that is related to this `Task`. */
  project?: Maybe<Project>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Task` that was deleted by this mutation. */
  task?: Maybe<Task>;
  /** An edge for our `Task`. May be used by Relay 1. */
  taskEdge?: Maybe<TasksEdge>;
};


/** The output of our delete `Task` mutation. */
export type DeleteTaskPayloadTaskEdgeArgs = {
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};

/** A connection to a list of `Entry` values. */
export type EntriesConnection = {
  __typename?: 'EntriesConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<EntryAggregates>;
  /** A list of edges which contains the `Entry` and cursor to aid in pagination. */
  edges: Array<EntriesEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<EntryAggregates>>;
  /** A list of `Entry` objects. */
  nodes: Array<Maybe<Entry>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Entry` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Entry` values. */
export type EntriesConnectionGroupedAggregatesArgs = {
  groupBy: Array<EntriesGroupBy>;
  having?: InputMaybe<EntriesHavingInput>;
};

/** A `Entry` edge in the connection. */
export type EntriesEdge = {
  __typename?: 'EntriesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Entry` at the end of the edge. */
  node?: Maybe<Entry>;
};

/** Grouping methods for `Entry` for usage during aggregation. */
export enum EntriesGroupBy {
  Complete = 'COMPLETE',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Date = 'DATE',
  Description = 'DESCRIPTION',
  ListOrder = 'LIST_ORDER',
  PersonId = 'PERSON_ID',
  TaskId = 'TASK_ID',
  TimerActive = 'TIMER_ACTIVE',
  TimerEstimatedTime = 'TIMER_ESTIMATED_TIME',
  TimerStartedAt = 'TIMER_STARTED_AT',
  TimerStartedAtTruncatedToDay = 'TIMER_STARTED_AT_TRUNCATED_TO_DAY',
  TimerStartedAtTruncatedToHour = 'TIMER_STARTED_AT_TRUNCATED_TO_HOUR',
  TimerTrackedTime = 'TIMER_TRACKED_TIME'
}

export type EntriesHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  listOrder?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  taskId?: InputMaybe<HavingIntFilter>;
  timerEstimatedTime?: InputMaybe<HavingIntFilter>;
  timerStartedAt?: InputMaybe<HavingDatetimeFilter>;
  timerTrackedTime?: InputMaybe<HavingIntFilter>;
};

export type EntriesHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  listOrder?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  taskId?: InputMaybe<HavingIntFilter>;
  timerEstimatedTime?: InputMaybe<HavingIntFilter>;
  timerStartedAt?: InputMaybe<HavingDatetimeFilter>;
  timerTrackedTime?: InputMaybe<HavingIntFilter>;
};

/** Conditions for `Entry` aggregates. */
export type EntriesHavingInput = {
  AND?: InputMaybe<Array<EntriesHavingInput>>;
  OR?: InputMaybe<Array<EntriesHavingInput>>;
  average?: InputMaybe<EntriesHavingAverageInput>;
  distinctCount?: InputMaybe<EntriesHavingDistinctCountInput>;
  max?: InputMaybe<EntriesHavingMaxInput>;
  maxDate?: InputMaybe<EntriesHavingMaxDateInput>;
  min?: InputMaybe<EntriesHavingMinInput>;
  minDate?: InputMaybe<EntriesHavingMinDateInput>;
  stddevPopulation?: InputMaybe<EntriesHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<EntriesHavingStddevSampleInput>;
  sum?: InputMaybe<EntriesHavingSumInput>;
  variancePopulation?: InputMaybe<EntriesHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<EntriesHavingVarianceSampleInput>;
};

export type EntriesHavingMaxDateInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  listOrder?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  taskId?: InputMaybe<HavingIntFilter>;
  timerEstimatedTime?: InputMaybe<HavingIntFilter>;
  timerStartedAt?: InputMaybe<HavingDatetimeFilter>;
  timerTrackedTime?: InputMaybe<HavingIntFilter>;
};

export type EntriesHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  listOrder?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  taskId?: InputMaybe<HavingIntFilter>;
  timerEstimatedTime?: InputMaybe<HavingIntFilter>;
  timerStartedAt?: InputMaybe<HavingDatetimeFilter>;
  timerTrackedTime?: InputMaybe<HavingIntFilter>;
};

export type EntriesHavingMinDateInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  listOrder?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  taskId?: InputMaybe<HavingIntFilter>;
  timerEstimatedTime?: InputMaybe<HavingIntFilter>;
  timerStartedAt?: InputMaybe<HavingDatetimeFilter>;
  timerTrackedTime?: InputMaybe<HavingIntFilter>;
};

export type EntriesHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  listOrder?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  taskId?: InputMaybe<HavingIntFilter>;
  timerEstimatedTime?: InputMaybe<HavingIntFilter>;
  timerStartedAt?: InputMaybe<HavingDatetimeFilter>;
  timerTrackedTime?: InputMaybe<HavingIntFilter>;
};

export type EntriesHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  listOrder?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  taskId?: InputMaybe<HavingIntFilter>;
  timerEstimatedTime?: InputMaybe<HavingIntFilter>;
  timerStartedAt?: InputMaybe<HavingDatetimeFilter>;
  timerTrackedTime?: InputMaybe<HavingIntFilter>;
};

export type EntriesHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  listOrder?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  taskId?: InputMaybe<HavingIntFilter>;
  timerEstimatedTime?: InputMaybe<HavingIntFilter>;
  timerStartedAt?: InputMaybe<HavingDatetimeFilter>;
  timerTrackedTime?: InputMaybe<HavingIntFilter>;
};

export type EntriesHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  listOrder?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  taskId?: InputMaybe<HavingIntFilter>;
  timerEstimatedTime?: InputMaybe<HavingIntFilter>;
  timerStartedAt?: InputMaybe<HavingDatetimeFilter>;
  timerTrackedTime?: InputMaybe<HavingIntFilter>;
};

export type EntriesHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  listOrder?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  taskId?: InputMaybe<HavingIntFilter>;
  timerEstimatedTime?: InputMaybe<HavingIntFilter>;
  timerStartedAt?: InputMaybe<HavingDatetimeFilter>;
  timerTrackedTime?: InputMaybe<HavingIntFilter>;
};

export type EntriesHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  listOrder?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  taskId?: InputMaybe<HavingIntFilter>;
  timerEstimatedTime?: InputMaybe<HavingIntFilter>;
  timerStartedAt?: InputMaybe<HavingDatetimeFilter>;
  timerTrackedTime?: InputMaybe<HavingIntFilter>;
};

/** Methods to use when ordering `Entry`. */
export enum EntriesOrderBy {
  CompleteAsc = 'COMPLETE_ASC',
  CompleteDesc = 'COMPLETE_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DateAsc = 'DATE_ASC',
  DateDesc = 'DATE_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  ListOrderAsc = 'LIST_ORDER_ASC',
  ListOrderDesc = 'LIST_ORDER_DESC',
  Natural = 'NATURAL',
  PersonIdAsc = 'PERSON_ID_ASC',
  PersonIdDesc = 'PERSON_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TaskIdAsc = 'TASK_ID_ASC',
  TaskIdDesc = 'TASK_ID_DESC',
  TimerActiveAsc = 'TIMER_ACTIVE_ASC',
  TimerActiveDesc = 'TIMER_ACTIVE_DESC',
  TimerEstimatedTimeAsc = 'TIMER_ESTIMATED_TIME_ASC',
  TimerEstimatedTimeDesc = 'TIMER_ESTIMATED_TIME_DESC',
  TimerStartedAtAsc = 'TIMER_STARTED_AT_ASC',
  TimerStartedAtDesc = 'TIMER_STARTED_AT_DESC',
  TimerTrackedTimeAsc = 'TIMER_TRACKED_TIME_ASC',
  TimerTrackedTimeDesc = 'TIMER_TRACKED_TIME_DESC'
}

export type Entry = Node & {
  __typename?: 'Entry';
  complete: Scalars['Boolean']['output'];
  createdAt: Scalars['Datetime']['output'];
  date: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  listOrder?: Maybe<Scalars['Int']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Person` that is related to this `Entry`. */
  person?: Maybe<Person>;
  personId: Scalars['Int']['output'];
  /** Reads a single `Task` that is related to this `Entry`. */
  task?: Maybe<Task>;
  taskId: Scalars['Int']['output'];
  timerActive: Scalars['Boolean']['output'];
  timerEstimatedTime: Scalars['Int']['output'];
  timerStartedAt?: Maybe<Scalars['Datetime']['output']>;
  timerTrackedTime: Scalars['Int']['output'];
};

export type EntryAggregates = {
  __typename?: 'EntryAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<EntryAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<EntryDistinctCountAggregates>;
  keys?: Maybe<Array<Scalars['String']['output']>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<EntryMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<EntryMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<EntryStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<EntryStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<EntrySumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<EntryVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<EntryVarianceSampleAggregates>;
};

export type EntryAverageAggregates = {
  __typename?: 'EntryAverageAggregates';
  /** Mean average of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of listOrder across the matching connection */
  listOrder?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of taskId across the matching connection */
  taskId?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of timerEstimatedTime across the matching connection */
  timerEstimatedTime?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of timerTrackedTime across the matching connection */
  timerTrackedTime?: Maybe<Scalars['BigFloat']['output']>;
};

/** A condition to be used against `Entry` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type EntryCondition = {
  /** Checks for equality with the object’s `complete` field. */
  complete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `date` field. */
  date?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `listOrder` field. */
  listOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `personId` field. */
  personId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `taskId` field. */
  taskId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `timerActive` field. */
  timerActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `timerEstimatedTime` field. */
  timerEstimatedTime?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `timerStartedAt` field. */
  timerStartedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `timerTrackedTime` field. */
  timerTrackedTime?: InputMaybe<Scalars['Int']['input']>;
};

export type EntryDistinctCountAggregates = {
  __typename?: 'EntryDistinctCountAggregates';
  /** Distinct count of complete across the matching connection */
  complete?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of date across the matching connection */
  date?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of description across the matching connection */
  description?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of id across the matching connection */
  id?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of listOrder across the matching connection */
  listOrder?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of personId across the matching connection */
  personId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of taskId across the matching connection */
  taskId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of timerActive across the matching connection */
  timerActive?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of timerEstimatedTime across the matching connection */
  timerEstimatedTime?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of timerStartedAt across the matching connection */
  timerStartedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of timerTrackedTime across the matching connection */
  timerTrackedTime?: Maybe<Scalars['BigInt']['output']>;
};

/** A filter to be used against `Entry` object types. All fields are combined with a logical ‘and.’ */
export type EntryFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<EntryFilter>>;
  /** Filter by the object’s `complete` field. */
  complete?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `date` field. */
  date?: InputMaybe<StringFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Filter by the object’s `listOrder` field. */
  listOrder?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<EntryFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<EntryFilter>>;
  /** Filter by the object’s `personId` field. */
  personId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `taskId` field. */
  taskId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `timerActive` field. */
  timerActive?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `timerEstimatedTime` field. */
  timerEstimatedTime?: InputMaybe<IntFilter>;
  /** Filter by the object’s `timerStartedAt` field. */
  timerStartedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `timerTrackedTime` field. */
  timerTrackedTime?: InputMaybe<IntFilter>;
};

export type EntryMaxAggregates = {
  __typename?: 'EntryMaxAggregates';
  /** Maximum of id across the matching connection */
  id?: Maybe<Scalars['Int']['output']>;
  /** Maximum of listOrder across the matching connection */
  listOrder?: Maybe<Scalars['Int']['output']>;
  /** Maximum of personId across the matching connection */
  personId?: Maybe<Scalars['Int']['output']>;
  /** Maximum of taskId across the matching connection */
  taskId?: Maybe<Scalars['Int']['output']>;
  /** Maximum of timerEstimatedTime across the matching connection */
  timerEstimatedTime?: Maybe<Scalars['Int']['output']>;
  /** Maximum of timerTrackedTime across the matching connection */
  timerTrackedTime?: Maybe<Scalars['Int']['output']>;
};

export type EntryMinAggregates = {
  __typename?: 'EntryMinAggregates';
  /** Minimum of id across the matching connection */
  id?: Maybe<Scalars['Int']['output']>;
  /** Minimum of listOrder across the matching connection */
  listOrder?: Maybe<Scalars['Int']['output']>;
  /** Minimum of personId across the matching connection */
  personId?: Maybe<Scalars['Int']['output']>;
  /** Minimum of taskId across the matching connection */
  taskId?: Maybe<Scalars['Int']['output']>;
  /** Minimum of timerEstimatedTime across the matching connection */
  timerEstimatedTime?: Maybe<Scalars['Int']['output']>;
  /** Minimum of timerTrackedTime across the matching connection */
  timerTrackedTime?: Maybe<Scalars['Int']['output']>;
};

/** An input for mutations affecting `EntryOrder` */
export type EntryOrderInput = {
  date?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  listOrder?: InputMaybe<Scalars['Int']['input']>;
};

/** Represents an update to a `Entry`. Fields that are set will be updated. */
export type EntryPatch = {
  complete?: InputMaybe<Scalars['Boolean']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  listOrder?: InputMaybe<Scalars['Int']['input']>;
  taskId?: InputMaybe<Scalars['Int']['input']>;
  timerEstimatedTime?: InputMaybe<Scalars['Int']['input']>;
  timerTrackedTime?: InputMaybe<Scalars['Int']['input']>;
};

export type EntryStddevPopulationAggregates = {
  __typename?: 'EntryStddevPopulationAggregates';
  /** Population standard deviation of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of listOrder across the matching connection */
  listOrder?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of taskId across the matching connection */
  taskId?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of timerEstimatedTime across the matching connection */
  timerEstimatedTime?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of timerTrackedTime across the matching connection */
  timerTrackedTime?: Maybe<Scalars['BigFloat']['output']>;
};

export type EntryStddevSampleAggregates = {
  __typename?: 'EntryStddevSampleAggregates';
  /** Sample standard deviation of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of listOrder across the matching connection */
  listOrder?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of taskId across the matching connection */
  taskId?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of timerEstimatedTime across the matching connection */
  timerEstimatedTime?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of timerTrackedTime across the matching connection */
  timerTrackedTime?: Maybe<Scalars['BigFloat']['output']>;
};

export type EntrySumAggregates = {
  __typename?: 'EntrySumAggregates';
  /** Sum of id across the matching connection */
  id: Scalars['BigInt']['output'];
  /** Sum of listOrder across the matching connection */
  listOrder: Scalars['BigInt']['output'];
  /** Sum of personId across the matching connection */
  personId: Scalars['BigInt']['output'];
  /** Sum of taskId across the matching connection */
  taskId: Scalars['BigInt']['output'];
  /** Sum of timerEstimatedTime across the matching connection */
  timerEstimatedTime: Scalars['BigInt']['output'];
  /** Sum of timerTrackedTime across the matching connection */
  timerTrackedTime: Scalars['BigInt']['output'];
};

export type EntryVariancePopulationAggregates = {
  __typename?: 'EntryVariancePopulationAggregates';
  /** Population variance of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of listOrder across the matching connection */
  listOrder?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of taskId across the matching connection */
  taskId?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of timerEstimatedTime across the matching connection */
  timerEstimatedTime?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of timerTrackedTime across the matching connection */
  timerTrackedTime?: Maybe<Scalars['BigFloat']['output']>;
};

export type EntryVarianceSampleAggregates = {
  __typename?: 'EntryVarianceSampleAggregates';
  /** Sample variance of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of listOrder across the matching connection */
  listOrder?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of taskId across the matching connection */
  taskId?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of timerEstimatedTime across the matching connection */
  timerEstimatedTime?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of timerTrackedTime across the matching connection */
  timerTrackedTime?: Maybe<Scalars['BigFloat']['output']>;
};

export type HavingDatetimeFilter = {
  equalTo?: InputMaybe<Scalars['Datetime']['input']>;
  greaterThan?: InputMaybe<Scalars['Datetime']['input']>;
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  lessThan?: InputMaybe<Scalars['Datetime']['input']>;
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  notEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
};

export type HavingIntFilter = {
  equalTo?: InputMaybe<Scalars['Int']['input']>;
  greaterThan?: InputMaybe<Scalars['Int']['input']>;
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  lessThan?: InputMaybe<Scalars['Int']['input']>;
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  notEqualTo?: InputMaybe<Scalars['Int']['input']>;
};

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Int']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Int']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Int']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Int']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Int']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  completeEntry?: Maybe<CompleteEntryPayload>;
  createCategory?: Maybe<CreateCategoryPayload>;
  createEntry?: Maybe<CreateEntryPayload>;
  createEntryWithTask?: Maybe<CreateEntryWithTaskPayload>;
  /** Creates a single `Person`. */
  createPerson?: Maybe<CreatePersonPayload>;
  createProject?: Maybe<CreateProjectPayload>;
  createTask?: Maybe<CreateTaskPayload>;
  /** Deletes a single `Category` using a unique key. */
  deleteCategory?: Maybe<DeleteCategoryPayload>;
  /** Deletes a single `Category` using its globally unique id. */
  deleteCategoryByNodeId?: Maybe<DeleteCategoryPayload>;
  /** Deletes a single `Entry` using a unique key. */
  deleteEntry?: Maybe<DeleteEntryPayload>;
  /** Deletes a single `Entry` using its globally unique id. */
  deleteEntryByNodeId?: Maybe<DeleteEntryPayload>;
  /** Deletes a single `Person` using a unique key. */
  deletePerson?: Maybe<DeletePersonPayload>;
  /** Deletes a single `Person` using its globally unique id. */
  deletePersonByNodeId?: Maybe<DeletePersonPayload>;
  /** Deletes a single `Project` using a unique key. */
  deleteProject?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `Project` using its globally unique id. */
  deleteProjectByNodeId?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `Task` using a unique key. */
  deleteTask?: Maybe<DeleteTaskPayload>;
  /** Deletes a single `Task` using its globally unique id. */
  deleteTaskByNodeId?: Maybe<DeleteTaskPayload>;
  reorderEntries?: Maybe<ReorderEntriesPayload>;
  restartEntry?: Maybe<RestartEntryPayload>;
  /** Creates a JWT jwt_token that will securely identify a person and give them certain permissions. This jwt_token expires in 2 days. */
  signIn?: Maybe<SignInPayload>;
  /** Registers a single user and creates an account in our forum. */
  signUp?: Maybe<SignUpPayload>;
  startEntry?: Maybe<StartEntryPayload>;
  stopEntry?: Maybe<StopEntryPayload>;
  /** Updates a single `Category` using a unique key and a patch. */
  updateCategory?: Maybe<UpdateCategoryPayload>;
  /** Updates a single `Category` using its globally unique id and a patch. */
  updateCategoryByNodeId?: Maybe<UpdateCategoryPayload>;
  /** Updates a single `Entry` using a unique key and a patch. */
  updateEntry?: Maybe<UpdateEntryPayload>;
  /** Updates a single `Entry` using its globally unique id and a patch. */
  updateEntryByNodeId?: Maybe<UpdateEntryPayload>;
  /** Updates a single `Person` using a unique key and a patch. */
  updatePerson?: Maybe<UpdatePersonPayload>;
  /** Updates a single `Person` using its globally unique id and a patch. */
  updatePersonByNodeId?: Maybe<UpdatePersonPayload>;
  /** Updates a single `Project` using a unique key and a patch. */
  updateProject?: Maybe<UpdateProjectPayload>;
  /** Updates a single `Project` using its globally unique id and a patch. */
  updateProjectByNodeId?: Maybe<UpdateProjectPayload>;
  /** Updates a single `Task` using a unique key and a patch. */
  updateTask?: Maybe<UpdateTaskPayload>;
  /** Updates a single `Task` using its globally unique id and a patch. */
  updateTaskByNodeId?: Maybe<UpdateTaskPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCompleteEntryArgs = {
  input: CompleteEntryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEntryArgs = {
  input: CreateEntryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEntryWithTaskArgs = {
  input: CreateEntryWithTaskInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePersonArgs = {
  input: CreatePersonInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCategoryArgs = {
  input: DeleteCategoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCategoryByNodeIdArgs = {
  input: DeleteCategoryByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEntryArgs = {
  input: DeleteEntryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEntryByNodeIdArgs = {
  input: DeleteEntryByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePersonArgs = {
  input: DeletePersonInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePersonByNodeIdArgs = {
  input: DeletePersonByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectArgs = {
  input: DeleteProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectByNodeIdArgs = {
  input: DeleteProjectByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTaskArgs = {
  input: DeleteTaskInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTaskByNodeIdArgs = {
  input: DeleteTaskByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationReorderEntriesArgs = {
  input: ReorderEntriesInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRestartEntryArgs = {
  input: RestartEntryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationSignInArgs = {
  input: SignInInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationSignUpArgs = {
  input: SignUpInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationStartEntryArgs = {
  input: StartEntryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationStopEntryArgs = {
  input: StopEntryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCategoryByNodeIdArgs = {
  input: UpdateCategoryByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEntryArgs = {
  input: UpdateEntryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEntryByNodeIdArgs = {
  input: UpdateEntryByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePersonArgs = {
  input: UpdatePersonInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePersonByNodeIdArgs = {
  input: UpdatePersonByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectByNodeIdArgs = {
  input: UpdateProjectByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTaskByNodeIdArgs = {
  input: UpdateTaskByNodeIdInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

/** A connection to a list of `Person` values. */
export type PeopleConnection = {
  __typename?: 'PeopleConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<PersonAggregates>;
  /** A list of edges which contains the `Person` and cursor to aid in pagination. */
  edges: Array<PeopleEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<PersonAggregates>>;
  /** A list of `Person` objects. */
  nodes: Array<Maybe<Person>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Person` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Person` values. */
export type PeopleConnectionGroupedAggregatesArgs = {
  groupBy: Array<PersonGroupBy>;
  having?: InputMaybe<PersonHavingInput>;
};

/** A `Person` edge in the connection. */
export type PeopleEdge = {
  __typename?: 'PeopleEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Person` at the end of the edge. */
  node?: Maybe<Person>;
};

/** Methods to use when ordering `Person`. */
export enum PeopleOrderBy {
  CategoriesConnectionAverageColorAsc = 'CATEGORIES_CONNECTION_AVERAGE_COLOR_ASC',
  CategoriesConnectionAverageColorContrastAsc = 'CATEGORIES_CONNECTION_AVERAGE_COLOR_CONTRAST_ASC',
  CategoriesConnectionAverageColorContrastDesc = 'CATEGORIES_CONNECTION_AVERAGE_COLOR_CONTRAST_DESC',
  CategoriesConnectionAverageColorDesc = 'CATEGORIES_CONNECTION_AVERAGE_COLOR_DESC',
  CategoriesConnectionAverageCreatedAtAsc = 'CATEGORIES_CONNECTION_AVERAGE_CREATED_AT_ASC',
  CategoriesConnectionAverageCreatedAtDesc = 'CATEGORIES_CONNECTION_AVERAGE_CREATED_AT_DESC',
  CategoriesConnectionAverageDescriptionAsc = 'CATEGORIES_CONNECTION_AVERAGE_DESCRIPTION_ASC',
  CategoriesConnectionAverageDescriptionDesc = 'CATEGORIES_CONNECTION_AVERAGE_DESCRIPTION_DESC',
  CategoriesConnectionAverageIdAsc = 'CATEGORIES_CONNECTION_AVERAGE_ID_ASC',
  CategoriesConnectionAverageIdDesc = 'CATEGORIES_CONNECTION_AVERAGE_ID_DESC',
  CategoriesConnectionAveragePersonIdAsc = 'CATEGORIES_CONNECTION_AVERAGE_PERSON_ID_ASC',
  CategoriesConnectionAveragePersonIdDesc = 'CATEGORIES_CONNECTION_AVERAGE_PERSON_ID_DESC',
  CategoriesConnectionCountAsc = 'CATEGORIES_CONNECTION_COUNT_ASC',
  CategoriesConnectionCountDesc = 'CATEGORIES_CONNECTION_COUNT_DESC',
  CategoriesConnectionDistinctCountColorAsc = 'CATEGORIES_CONNECTION_DISTINCT_COUNT_COLOR_ASC',
  CategoriesConnectionDistinctCountColorContrastAsc = 'CATEGORIES_CONNECTION_DISTINCT_COUNT_COLOR_CONTRAST_ASC',
  CategoriesConnectionDistinctCountColorContrastDesc = 'CATEGORIES_CONNECTION_DISTINCT_COUNT_COLOR_CONTRAST_DESC',
  CategoriesConnectionDistinctCountColorDesc = 'CATEGORIES_CONNECTION_DISTINCT_COUNT_COLOR_DESC',
  CategoriesConnectionDistinctCountCreatedAtAsc = 'CATEGORIES_CONNECTION_DISTINCT_COUNT_CREATED_AT_ASC',
  CategoriesConnectionDistinctCountCreatedAtDesc = 'CATEGORIES_CONNECTION_DISTINCT_COUNT_CREATED_AT_DESC',
  CategoriesConnectionDistinctCountDescriptionAsc = 'CATEGORIES_CONNECTION_DISTINCT_COUNT_DESCRIPTION_ASC',
  CategoriesConnectionDistinctCountDescriptionDesc = 'CATEGORIES_CONNECTION_DISTINCT_COUNT_DESCRIPTION_DESC',
  CategoriesConnectionDistinctCountIdAsc = 'CATEGORIES_CONNECTION_DISTINCT_COUNT_ID_ASC',
  CategoriesConnectionDistinctCountIdDesc = 'CATEGORIES_CONNECTION_DISTINCT_COUNT_ID_DESC',
  CategoriesConnectionDistinctCountPersonIdAsc = 'CATEGORIES_CONNECTION_DISTINCT_COUNT_PERSON_ID_ASC',
  CategoriesConnectionDistinctCountPersonIdDesc = 'CATEGORIES_CONNECTION_DISTINCT_COUNT_PERSON_ID_DESC',
  CategoriesConnectionMaxColorAsc = 'CATEGORIES_CONNECTION_MAX_COLOR_ASC',
  CategoriesConnectionMaxColorContrastAsc = 'CATEGORIES_CONNECTION_MAX_COLOR_CONTRAST_ASC',
  CategoriesConnectionMaxColorContrastDesc = 'CATEGORIES_CONNECTION_MAX_COLOR_CONTRAST_DESC',
  CategoriesConnectionMaxColorDesc = 'CATEGORIES_CONNECTION_MAX_COLOR_DESC',
  CategoriesConnectionMaxCreatedAtAsc = 'CATEGORIES_CONNECTION_MAX_CREATED_AT_ASC',
  CategoriesConnectionMaxCreatedAtDesc = 'CATEGORIES_CONNECTION_MAX_CREATED_AT_DESC',
  CategoriesConnectionMaxDateColorAsc = 'CATEGORIES_CONNECTION_MAX_DATE_COLOR_ASC',
  CategoriesConnectionMaxDateColorContrastAsc = 'CATEGORIES_CONNECTION_MAX_DATE_COLOR_CONTRAST_ASC',
  CategoriesConnectionMaxDateColorContrastDesc = 'CATEGORIES_CONNECTION_MAX_DATE_COLOR_CONTRAST_DESC',
  CategoriesConnectionMaxDateColorDesc = 'CATEGORIES_CONNECTION_MAX_DATE_COLOR_DESC',
  CategoriesConnectionMaxDateCreatedAtAsc = 'CATEGORIES_CONNECTION_MAX_DATE_CREATED_AT_ASC',
  CategoriesConnectionMaxDateCreatedAtDesc = 'CATEGORIES_CONNECTION_MAX_DATE_CREATED_AT_DESC',
  CategoriesConnectionMaxDateDescriptionAsc = 'CATEGORIES_CONNECTION_MAX_DATE_DESCRIPTION_ASC',
  CategoriesConnectionMaxDateDescriptionDesc = 'CATEGORIES_CONNECTION_MAX_DATE_DESCRIPTION_DESC',
  CategoriesConnectionMaxDateIdAsc = 'CATEGORIES_CONNECTION_MAX_DATE_ID_ASC',
  CategoriesConnectionMaxDateIdDesc = 'CATEGORIES_CONNECTION_MAX_DATE_ID_DESC',
  CategoriesConnectionMaxDatePersonIdAsc = 'CATEGORIES_CONNECTION_MAX_DATE_PERSON_ID_ASC',
  CategoriesConnectionMaxDatePersonIdDesc = 'CATEGORIES_CONNECTION_MAX_DATE_PERSON_ID_DESC',
  CategoriesConnectionMaxDescriptionAsc = 'CATEGORIES_CONNECTION_MAX_DESCRIPTION_ASC',
  CategoriesConnectionMaxDescriptionDesc = 'CATEGORIES_CONNECTION_MAX_DESCRIPTION_DESC',
  CategoriesConnectionMaxIdAsc = 'CATEGORIES_CONNECTION_MAX_ID_ASC',
  CategoriesConnectionMaxIdDesc = 'CATEGORIES_CONNECTION_MAX_ID_DESC',
  CategoriesConnectionMaxPersonIdAsc = 'CATEGORIES_CONNECTION_MAX_PERSON_ID_ASC',
  CategoriesConnectionMaxPersonIdDesc = 'CATEGORIES_CONNECTION_MAX_PERSON_ID_DESC',
  CategoriesConnectionMinColorAsc = 'CATEGORIES_CONNECTION_MIN_COLOR_ASC',
  CategoriesConnectionMinColorContrastAsc = 'CATEGORIES_CONNECTION_MIN_COLOR_CONTRAST_ASC',
  CategoriesConnectionMinColorContrastDesc = 'CATEGORIES_CONNECTION_MIN_COLOR_CONTRAST_DESC',
  CategoriesConnectionMinColorDesc = 'CATEGORIES_CONNECTION_MIN_COLOR_DESC',
  CategoriesConnectionMinCreatedAtAsc = 'CATEGORIES_CONNECTION_MIN_CREATED_AT_ASC',
  CategoriesConnectionMinCreatedAtDesc = 'CATEGORIES_CONNECTION_MIN_CREATED_AT_DESC',
  CategoriesConnectionMinDateColorAsc = 'CATEGORIES_CONNECTION_MIN_DATE_COLOR_ASC',
  CategoriesConnectionMinDateColorContrastAsc = 'CATEGORIES_CONNECTION_MIN_DATE_COLOR_CONTRAST_ASC',
  CategoriesConnectionMinDateColorContrastDesc = 'CATEGORIES_CONNECTION_MIN_DATE_COLOR_CONTRAST_DESC',
  CategoriesConnectionMinDateColorDesc = 'CATEGORIES_CONNECTION_MIN_DATE_COLOR_DESC',
  CategoriesConnectionMinDateCreatedAtAsc = 'CATEGORIES_CONNECTION_MIN_DATE_CREATED_AT_ASC',
  CategoriesConnectionMinDateCreatedAtDesc = 'CATEGORIES_CONNECTION_MIN_DATE_CREATED_AT_DESC',
  CategoriesConnectionMinDateDescriptionAsc = 'CATEGORIES_CONNECTION_MIN_DATE_DESCRIPTION_ASC',
  CategoriesConnectionMinDateDescriptionDesc = 'CATEGORIES_CONNECTION_MIN_DATE_DESCRIPTION_DESC',
  CategoriesConnectionMinDateIdAsc = 'CATEGORIES_CONNECTION_MIN_DATE_ID_ASC',
  CategoriesConnectionMinDateIdDesc = 'CATEGORIES_CONNECTION_MIN_DATE_ID_DESC',
  CategoriesConnectionMinDatePersonIdAsc = 'CATEGORIES_CONNECTION_MIN_DATE_PERSON_ID_ASC',
  CategoriesConnectionMinDatePersonIdDesc = 'CATEGORIES_CONNECTION_MIN_DATE_PERSON_ID_DESC',
  CategoriesConnectionMinDescriptionAsc = 'CATEGORIES_CONNECTION_MIN_DESCRIPTION_ASC',
  CategoriesConnectionMinDescriptionDesc = 'CATEGORIES_CONNECTION_MIN_DESCRIPTION_DESC',
  CategoriesConnectionMinIdAsc = 'CATEGORIES_CONNECTION_MIN_ID_ASC',
  CategoriesConnectionMinIdDesc = 'CATEGORIES_CONNECTION_MIN_ID_DESC',
  CategoriesConnectionMinPersonIdAsc = 'CATEGORIES_CONNECTION_MIN_PERSON_ID_ASC',
  CategoriesConnectionMinPersonIdDesc = 'CATEGORIES_CONNECTION_MIN_PERSON_ID_DESC',
  CategoriesConnectionStddevPopulationColorAsc = 'CATEGORIES_CONNECTION_STDDEV_POPULATION_COLOR_ASC',
  CategoriesConnectionStddevPopulationColorContrastAsc = 'CATEGORIES_CONNECTION_STDDEV_POPULATION_COLOR_CONTRAST_ASC',
  CategoriesConnectionStddevPopulationColorContrastDesc = 'CATEGORIES_CONNECTION_STDDEV_POPULATION_COLOR_CONTRAST_DESC',
  CategoriesConnectionStddevPopulationColorDesc = 'CATEGORIES_CONNECTION_STDDEV_POPULATION_COLOR_DESC',
  CategoriesConnectionStddevPopulationCreatedAtAsc = 'CATEGORIES_CONNECTION_STDDEV_POPULATION_CREATED_AT_ASC',
  CategoriesConnectionStddevPopulationCreatedAtDesc = 'CATEGORIES_CONNECTION_STDDEV_POPULATION_CREATED_AT_DESC',
  CategoriesConnectionStddevPopulationDescriptionAsc = 'CATEGORIES_CONNECTION_STDDEV_POPULATION_DESCRIPTION_ASC',
  CategoriesConnectionStddevPopulationDescriptionDesc = 'CATEGORIES_CONNECTION_STDDEV_POPULATION_DESCRIPTION_DESC',
  CategoriesConnectionStddevPopulationIdAsc = 'CATEGORIES_CONNECTION_STDDEV_POPULATION_ID_ASC',
  CategoriesConnectionStddevPopulationIdDesc = 'CATEGORIES_CONNECTION_STDDEV_POPULATION_ID_DESC',
  CategoriesConnectionStddevPopulationPersonIdAsc = 'CATEGORIES_CONNECTION_STDDEV_POPULATION_PERSON_ID_ASC',
  CategoriesConnectionStddevPopulationPersonIdDesc = 'CATEGORIES_CONNECTION_STDDEV_POPULATION_PERSON_ID_DESC',
  CategoriesConnectionStddevSampleColorAsc = 'CATEGORIES_CONNECTION_STDDEV_SAMPLE_COLOR_ASC',
  CategoriesConnectionStddevSampleColorContrastAsc = 'CATEGORIES_CONNECTION_STDDEV_SAMPLE_COLOR_CONTRAST_ASC',
  CategoriesConnectionStddevSampleColorContrastDesc = 'CATEGORIES_CONNECTION_STDDEV_SAMPLE_COLOR_CONTRAST_DESC',
  CategoriesConnectionStddevSampleColorDesc = 'CATEGORIES_CONNECTION_STDDEV_SAMPLE_COLOR_DESC',
  CategoriesConnectionStddevSampleCreatedAtAsc = 'CATEGORIES_CONNECTION_STDDEV_SAMPLE_CREATED_AT_ASC',
  CategoriesConnectionStddevSampleCreatedAtDesc = 'CATEGORIES_CONNECTION_STDDEV_SAMPLE_CREATED_AT_DESC',
  CategoriesConnectionStddevSampleDescriptionAsc = 'CATEGORIES_CONNECTION_STDDEV_SAMPLE_DESCRIPTION_ASC',
  CategoriesConnectionStddevSampleDescriptionDesc = 'CATEGORIES_CONNECTION_STDDEV_SAMPLE_DESCRIPTION_DESC',
  CategoriesConnectionStddevSampleIdAsc = 'CATEGORIES_CONNECTION_STDDEV_SAMPLE_ID_ASC',
  CategoriesConnectionStddevSampleIdDesc = 'CATEGORIES_CONNECTION_STDDEV_SAMPLE_ID_DESC',
  CategoriesConnectionStddevSamplePersonIdAsc = 'CATEGORIES_CONNECTION_STDDEV_SAMPLE_PERSON_ID_ASC',
  CategoriesConnectionStddevSamplePersonIdDesc = 'CATEGORIES_CONNECTION_STDDEV_SAMPLE_PERSON_ID_DESC',
  CategoriesConnectionSumColorAsc = 'CATEGORIES_CONNECTION_SUM_COLOR_ASC',
  CategoriesConnectionSumColorContrastAsc = 'CATEGORIES_CONNECTION_SUM_COLOR_CONTRAST_ASC',
  CategoriesConnectionSumColorContrastDesc = 'CATEGORIES_CONNECTION_SUM_COLOR_CONTRAST_DESC',
  CategoriesConnectionSumColorDesc = 'CATEGORIES_CONNECTION_SUM_COLOR_DESC',
  CategoriesConnectionSumCreatedAtAsc = 'CATEGORIES_CONNECTION_SUM_CREATED_AT_ASC',
  CategoriesConnectionSumCreatedAtDesc = 'CATEGORIES_CONNECTION_SUM_CREATED_AT_DESC',
  CategoriesConnectionSumDescriptionAsc = 'CATEGORIES_CONNECTION_SUM_DESCRIPTION_ASC',
  CategoriesConnectionSumDescriptionDesc = 'CATEGORIES_CONNECTION_SUM_DESCRIPTION_DESC',
  CategoriesConnectionSumIdAsc = 'CATEGORIES_CONNECTION_SUM_ID_ASC',
  CategoriesConnectionSumIdDesc = 'CATEGORIES_CONNECTION_SUM_ID_DESC',
  CategoriesConnectionSumPersonIdAsc = 'CATEGORIES_CONNECTION_SUM_PERSON_ID_ASC',
  CategoriesConnectionSumPersonIdDesc = 'CATEGORIES_CONNECTION_SUM_PERSON_ID_DESC',
  CategoriesConnectionVariancePopulationColorAsc = 'CATEGORIES_CONNECTION_VARIANCE_POPULATION_COLOR_ASC',
  CategoriesConnectionVariancePopulationColorContrastAsc = 'CATEGORIES_CONNECTION_VARIANCE_POPULATION_COLOR_CONTRAST_ASC',
  CategoriesConnectionVariancePopulationColorContrastDesc = 'CATEGORIES_CONNECTION_VARIANCE_POPULATION_COLOR_CONTRAST_DESC',
  CategoriesConnectionVariancePopulationColorDesc = 'CATEGORIES_CONNECTION_VARIANCE_POPULATION_COLOR_DESC',
  CategoriesConnectionVariancePopulationCreatedAtAsc = 'CATEGORIES_CONNECTION_VARIANCE_POPULATION_CREATED_AT_ASC',
  CategoriesConnectionVariancePopulationCreatedAtDesc = 'CATEGORIES_CONNECTION_VARIANCE_POPULATION_CREATED_AT_DESC',
  CategoriesConnectionVariancePopulationDescriptionAsc = 'CATEGORIES_CONNECTION_VARIANCE_POPULATION_DESCRIPTION_ASC',
  CategoriesConnectionVariancePopulationDescriptionDesc = 'CATEGORIES_CONNECTION_VARIANCE_POPULATION_DESCRIPTION_DESC',
  CategoriesConnectionVariancePopulationIdAsc = 'CATEGORIES_CONNECTION_VARIANCE_POPULATION_ID_ASC',
  CategoriesConnectionVariancePopulationIdDesc = 'CATEGORIES_CONNECTION_VARIANCE_POPULATION_ID_DESC',
  CategoriesConnectionVariancePopulationPersonIdAsc = 'CATEGORIES_CONNECTION_VARIANCE_POPULATION_PERSON_ID_ASC',
  CategoriesConnectionVariancePopulationPersonIdDesc = 'CATEGORIES_CONNECTION_VARIANCE_POPULATION_PERSON_ID_DESC',
  CategoriesConnectionVarianceSampleColorAsc = 'CATEGORIES_CONNECTION_VARIANCE_SAMPLE_COLOR_ASC',
  CategoriesConnectionVarianceSampleColorContrastAsc = 'CATEGORIES_CONNECTION_VARIANCE_SAMPLE_COLOR_CONTRAST_ASC',
  CategoriesConnectionVarianceSampleColorContrastDesc = 'CATEGORIES_CONNECTION_VARIANCE_SAMPLE_COLOR_CONTRAST_DESC',
  CategoriesConnectionVarianceSampleColorDesc = 'CATEGORIES_CONNECTION_VARIANCE_SAMPLE_COLOR_DESC',
  CategoriesConnectionVarianceSampleCreatedAtAsc = 'CATEGORIES_CONNECTION_VARIANCE_SAMPLE_CREATED_AT_ASC',
  CategoriesConnectionVarianceSampleCreatedAtDesc = 'CATEGORIES_CONNECTION_VARIANCE_SAMPLE_CREATED_AT_DESC',
  CategoriesConnectionVarianceSampleDescriptionAsc = 'CATEGORIES_CONNECTION_VARIANCE_SAMPLE_DESCRIPTION_ASC',
  CategoriesConnectionVarianceSampleDescriptionDesc = 'CATEGORIES_CONNECTION_VARIANCE_SAMPLE_DESCRIPTION_DESC',
  CategoriesConnectionVarianceSampleIdAsc = 'CATEGORIES_CONNECTION_VARIANCE_SAMPLE_ID_ASC',
  CategoriesConnectionVarianceSampleIdDesc = 'CATEGORIES_CONNECTION_VARIANCE_SAMPLE_ID_DESC',
  CategoriesConnectionVarianceSamplePersonIdAsc = 'CATEGORIES_CONNECTION_VARIANCE_SAMPLE_PERSON_ID_ASC',
  CategoriesConnectionVarianceSamplePersonIdDesc = 'CATEGORIES_CONNECTION_VARIANCE_SAMPLE_PERSON_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  EntriesConnectionAverageCompleteAsc = 'ENTRIES_CONNECTION_AVERAGE_COMPLETE_ASC',
  EntriesConnectionAverageCompleteDesc = 'ENTRIES_CONNECTION_AVERAGE_COMPLETE_DESC',
  EntriesConnectionAverageCreatedAtAsc = 'ENTRIES_CONNECTION_AVERAGE_CREATED_AT_ASC',
  EntriesConnectionAverageCreatedAtDesc = 'ENTRIES_CONNECTION_AVERAGE_CREATED_AT_DESC',
  EntriesConnectionAverageDateAsc = 'ENTRIES_CONNECTION_AVERAGE_DATE_ASC',
  EntriesConnectionAverageDateDesc = 'ENTRIES_CONNECTION_AVERAGE_DATE_DESC',
  EntriesConnectionAverageDescriptionAsc = 'ENTRIES_CONNECTION_AVERAGE_DESCRIPTION_ASC',
  EntriesConnectionAverageDescriptionDesc = 'ENTRIES_CONNECTION_AVERAGE_DESCRIPTION_DESC',
  EntriesConnectionAverageIdAsc = 'ENTRIES_CONNECTION_AVERAGE_ID_ASC',
  EntriesConnectionAverageIdDesc = 'ENTRIES_CONNECTION_AVERAGE_ID_DESC',
  EntriesConnectionAverageListOrderAsc = 'ENTRIES_CONNECTION_AVERAGE_LIST_ORDER_ASC',
  EntriesConnectionAverageListOrderDesc = 'ENTRIES_CONNECTION_AVERAGE_LIST_ORDER_DESC',
  EntriesConnectionAveragePersonIdAsc = 'ENTRIES_CONNECTION_AVERAGE_PERSON_ID_ASC',
  EntriesConnectionAveragePersonIdDesc = 'ENTRIES_CONNECTION_AVERAGE_PERSON_ID_DESC',
  EntriesConnectionAverageTaskIdAsc = 'ENTRIES_CONNECTION_AVERAGE_TASK_ID_ASC',
  EntriesConnectionAverageTaskIdDesc = 'ENTRIES_CONNECTION_AVERAGE_TASK_ID_DESC',
  EntriesConnectionAverageTimerActiveAsc = 'ENTRIES_CONNECTION_AVERAGE_TIMER_ACTIVE_ASC',
  EntriesConnectionAverageTimerActiveDesc = 'ENTRIES_CONNECTION_AVERAGE_TIMER_ACTIVE_DESC',
  EntriesConnectionAverageTimerEstimatedTimeAsc = 'ENTRIES_CONNECTION_AVERAGE_TIMER_ESTIMATED_TIME_ASC',
  EntriesConnectionAverageTimerEstimatedTimeDesc = 'ENTRIES_CONNECTION_AVERAGE_TIMER_ESTIMATED_TIME_DESC',
  EntriesConnectionAverageTimerStartedAtAsc = 'ENTRIES_CONNECTION_AVERAGE_TIMER_STARTED_AT_ASC',
  EntriesConnectionAverageTimerStartedAtDesc = 'ENTRIES_CONNECTION_AVERAGE_TIMER_STARTED_AT_DESC',
  EntriesConnectionAverageTimerTrackedTimeAsc = 'ENTRIES_CONNECTION_AVERAGE_TIMER_TRACKED_TIME_ASC',
  EntriesConnectionAverageTimerTrackedTimeDesc = 'ENTRIES_CONNECTION_AVERAGE_TIMER_TRACKED_TIME_DESC',
  EntriesConnectionCountAsc = 'ENTRIES_CONNECTION_COUNT_ASC',
  EntriesConnectionCountDesc = 'ENTRIES_CONNECTION_COUNT_DESC',
  EntriesConnectionDistinctCountCompleteAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_COMPLETE_ASC',
  EntriesConnectionDistinctCountCompleteDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_COMPLETE_DESC',
  EntriesConnectionDistinctCountCreatedAtAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_CREATED_AT_ASC',
  EntriesConnectionDistinctCountCreatedAtDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_CREATED_AT_DESC',
  EntriesConnectionDistinctCountDateAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_DATE_ASC',
  EntriesConnectionDistinctCountDateDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_DATE_DESC',
  EntriesConnectionDistinctCountDescriptionAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_DESCRIPTION_ASC',
  EntriesConnectionDistinctCountDescriptionDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_DESCRIPTION_DESC',
  EntriesConnectionDistinctCountIdAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_ID_ASC',
  EntriesConnectionDistinctCountIdDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_ID_DESC',
  EntriesConnectionDistinctCountListOrderAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_LIST_ORDER_ASC',
  EntriesConnectionDistinctCountListOrderDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_LIST_ORDER_DESC',
  EntriesConnectionDistinctCountPersonIdAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_PERSON_ID_ASC',
  EntriesConnectionDistinctCountPersonIdDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_PERSON_ID_DESC',
  EntriesConnectionDistinctCountTaskIdAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_TASK_ID_ASC',
  EntriesConnectionDistinctCountTaskIdDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_TASK_ID_DESC',
  EntriesConnectionDistinctCountTimerActiveAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_TIMER_ACTIVE_ASC',
  EntriesConnectionDistinctCountTimerActiveDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_TIMER_ACTIVE_DESC',
  EntriesConnectionDistinctCountTimerEstimatedTimeAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_TIMER_ESTIMATED_TIME_ASC',
  EntriesConnectionDistinctCountTimerEstimatedTimeDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_TIMER_ESTIMATED_TIME_DESC',
  EntriesConnectionDistinctCountTimerStartedAtAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_TIMER_STARTED_AT_ASC',
  EntriesConnectionDistinctCountTimerStartedAtDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_TIMER_STARTED_AT_DESC',
  EntriesConnectionDistinctCountTimerTrackedTimeAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_TIMER_TRACKED_TIME_ASC',
  EntriesConnectionDistinctCountTimerTrackedTimeDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_TIMER_TRACKED_TIME_DESC',
  EntriesConnectionMaxCompleteAsc = 'ENTRIES_CONNECTION_MAX_COMPLETE_ASC',
  EntriesConnectionMaxCompleteDesc = 'ENTRIES_CONNECTION_MAX_COMPLETE_DESC',
  EntriesConnectionMaxCreatedAtAsc = 'ENTRIES_CONNECTION_MAX_CREATED_AT_ASC',
  EntriesConnectionMaxCreatedAtDesc = 'ENTRIES_CONNECTION_MAX_CREATED_AT_DESC',
  EntriesConnectionMaxDateAsc = 'ENTRIES_CONNECTION_MAX_DATE_ASC',
  EntriesConnectionMaxDateCompleteAsc = 'ENTRIES_CONNECTION_MAX_DATE_COMPLETE_ASC',
  EntriesConnectionMaxDateCompleteDesc = 'ENTRIES_CONNECTION_MAX_DATE_COMPLETE_DESC',
  EntriesConnectionMaxDateCreatedAtAsc = 'ENTRIES_CONNECTION_MAX_DATE_CREATED_AT_ASC',
  EntriesConnectionMaxDateCreatedAtDesc = 'ENTRIES_CONNECTION_MAX_DATE_CREATED_AT_DESC',
  EntriesConnectionMaxDateDateAsc = 'ENTRIES_CONNECTION_MAX_DATE_DATE_ASC',
  EntriesConnectionMaxDateDateDesc = 'ENTRIES_CONNECTION_MAX_DATE_DATE_DESC',
  EntriesConnectionMaxDateDesc = 'ENTRIES_CONNECTION_MAX_DATE_DESC',
  EntriesConnectionMaxDateDescriptionAsc = 'ENTRIES_CONNECTION_MAX_DATE_DESCRIPTION_ASC',
  EntriesConnectionMaxDateDescriptionDesc = 'ENTRIES_CONNECTION_MAX_DATE_DESCRIPTION_DESC',
  EntriesConnectionMaxDateIdAsc = 'ENTRIES_CONNECTION_MAX_DATE_ID_ASC',
  EntriesConnectionMaxDateIdDesc = 'ENTRIES_CONNECTION_MAX_DATE_ID_DESC',
  EntriesConnectionMaxDateListOrderAsc = 'ENTRIES_CONNECTION_MAX_DATE_LIST_ORDER_ASC',
  EntriesConnectionMaxDateListOrderDesc = 'ENTRIES_CONNECTION_MAX_DATE_LIST_ORDER_DESC',
  EntriesConnectionMaxDatePersonIdAsc = 'ENTRIES_CONNECTION_MAX_DATE_PERSON_ID_ASC',
  EntriesConnectionMaxDatePersonIdDesc = 'ENTRIES_CONNECTION_MAX_DATE_PERSON_ID_DESC',
  EntriesConnectionMaxDateTaskIdAsc = 'ENTRIES_CONNECTION_MAX_DATE_TASK_ID_ASC',
  EntriesConnectionMaxDateTaskIdDesc = 'ENTRIES_CONNECTION_MAX_DATE_TASK_ID_DESC',
  EntriesConnectionMaxDateTimerActiveAsc = 'ENTRIES_CONNECTION_MAX_DATE_TIMER_ACTIVE_ASC',
  EntriesConnectionMaxDateTimerActiveDesc = 'ENTRIES_CONNECTION_MAX_DATE_TIMER_ACTIVE_DESC',
  EntriesConnectionMaxDateTimerEstimatedTimeAsc = 'ENTRIES_CONNECTION_MAX_DATE_TIMER_ESTIMATED_TIME_ASC',
  EntriesConnectionMaxDateTimerEstimatedTimeDesc = 'ENTRIES_CONNECTION_MAX_DATE_TIMER_ESTIMATED_TIME_DESC',
  EntriesConnectionMaxDateTimerStartedAtAsc = 'ENTRIES_CONNECTION_MAX_DATE_TIMER_STARTED_AT_ASC',
  EntriesConnectionMaxDateTimerStartedAtDesc = 'ENTRIES_CONNECTION_MAX_DATE_TIMER_STARTED_AT_DESC',
  EntriesConnectionMaxDateTimerTrackedTimeAsc = 'ENTRIES_CONNECTION_MAX_DATE_TIMER_TRACKED_TIME_ASC',
  EntriesConnectionMaxDateTimerTrackedTimeDesc = 'ENTRIES_CONNECTION_MAX_DATE_TIMER_TRACKED_TIME_DESC',
  EntriesConnectionMaxDescriptionAsc = 'ENTRIES_CONNECTION_MAX_DESCRIPTION_ASC',
  EntriesConnectionMaxDescriptionDesc = 'ENTRIES_CONNECTION_MAX_DESCRIPTION_DESC',
  EntriesConnectionMaxIdAsc = 'ENTRIES_CONNECTION_MAX_ID_ASC',
  EntriesConnectionMaxIdDesc = 'ENTRIES_CONNECTION_MAX_ID_DESC',
  EntriesConnectionMaxListOrderAsc = 'ENTRIES_CONNECTION_MAX_LIST_ORDER_ASC',
  EntriesConnectionMaxListOrderDesc = 'ENTRIES_CONNECTION_MAX_LIST_ORDER_DESC',
  EntriesConnectionMaxPersonIdAsc = 'ENTRIES_CONNECTION_MAX_PERSON_ID_ASC',
  EntriesConnectionMaxPersonIdDesc = 'ENTRIES_CONNECTION_MAX_PERSON_ID_DESC',
  EntriesConnectionMaxTaskIdAsc = 'ENTRIES_CONNECTION_MAX_TASK_ID_ASC',
  EntriesConnectionMaxTaskIdDesc = 'ENTRIES_CONNECTION_MAX_TASK_ID_DESC',
  EntriesConnectionMaxTimerActiveAsc = 'ENTRIES_CONNECTION_MAX_TIMER_ACTIVE_ASC',
  EntriesConnectionMaxTimerActiveDesc = 'ENTRIES_CONNECTION_MAX_TIMER_ACTIVE_DESC',
  EntriesConnectionMaxTimerEstimatedTimeAsc = 'ENTRIES_CONNECTION_MAX_TIMER_ESTIMATED_TIME_ASC',
  EntriesConnectionMaxTimerEstimatedTimeDesc = 'ENTRIES_CONNECTION_MAX_TIMER_ESTIMATED_TIME_DESC',
  EntriesConnectionMaxTimerStartedAtAsc = 'ENTRIES_CONNECTION_MAX_TIMER_STARTED_AT_ASC',
  EntriesConnectionMaxTimerStartedAtDesc = 'ENTRIES_CONNECTION_MAX_TIMER_STARTED_AT_DESC',
  EntriesConnectionMaxTimerTrackedTimeAsc = 'ENTRIES_CONNECTION_MAX_TIMER_TRACKED_TIME_ASC',
  EntriesConnectionMaxTimerTrackedTimeDesc = 'ENTRIES_CONNECTION_MAX_TIMER_TRACKED_TIME_DESC',
  EntriesConnectionMinCompleteAsc = 'ENTRIES_CONNECTION_MIN_COMPLETE_ASC',
  EntriesConnectionMinCompleteDesc = 'ENTRIES_CONNECTION_MIN_COMPLETE_DESC',
  EntriesConnectionMinCreatedAtAsc = 'ENTRIES_CONNECTION_MIN_CREATED_AT_ASC',
  EntriesConnectionMinCreatedAtDesc = 'ENTRIES_CONNECTION_MIN_CREATED_AT_DESC',
  EntriesConnectionMinDateAsc = 'ENTRIES_CONNECTION_MIN_DATE_ASC',
  EntriesConnectionMinDateCompleteAsc = 'ENTRIES_CONNECTION_MIN_DATE_COMPLETE_ASC',
  EntriesConnectionMinDateCompleteDesc = 'ENTRIES_CONNECTION_MIN_DATE_COMPLETE_DESC',
  EntriesConnectionMinDateCreatedAtAsc = 'ENTRIES_CONNECTION_MIN_DATE_CREATED_AT_ASC',
  EntriesConnectionMinDateCreatedAtDesc = 'ENTRIES_CONNECTION_MIN_DATE_CREATED_AT_DESC',
  EntriesConnectionMinDateDateAsc = 'ENTRIES_CONNECTION_MIN_DATE_DATE_ASC',
  EntriesConnectionMinDateDateDesc = 'ENTRIES_CONNECTION_MIN_DATE_DATE_DESC',
  EntriesConnectionMinDateDesc = 'ENTRIES_CONNECTION_MIN_DATE_DESC',
  EntriesConnectionMinDateDescriptionAsc = 'ENTRIES_CONNECTION_MIN_DATE_DESCRIPTION_ASC',
  EntriesConnectionMinDateDescriptionDesc = 'ENTRIES_CONNECTION_MIN_DATE_DESCRIPTION_DESC',
  EntriesConnectionMinDateIdAsc = 'ENTRIES_CONNECTION_MIN_DATE_ID_ASC',
  EntriesConnectionMinDateIdDesc = 'ENTRIES_CONNECTION_MIN_DATE_ID_DESC',
  EntriesConnectionMinDateListOrderAsc = 'ENTRIES_CONNECTION_MIN_DATE_LIST_ORDER_ASC',
  EntriesConnectionMinDateListOrderDesc = 'ENTRIES_CONNECTION_MIN_DATE_LIST_ORDER_DESC',
  EntriesConnectionMinDatePersonIdAsc = 'ENTRIES_CONNECTION_MIN_DATE_PERSON_ID_ASC',
  EntriesConnectionMinDatePersonIdDesc = 'ENTRIES_CONNECTION_MIN_DATE_PERSON_ID_DESC',
  EntriesConnectionMinDateTaskIdAsc = 'ENTRIES_CONNECTION_MIN_DATE_TASK_ID_ASC',
  EntriesConnectionMinDateTaskIdDesc = 'ENTRIES_CONNECTION_MIN_DATE_TASK_ID_DESC',
  EntriesConnectionMinDateTimerActiveAsc = 'ENTRIES_CONNECTION_MIN_DATE_TIMER_ACTIVE_ASC',
  EntriesConnectionMinDateTimerActiveDesc = 'ENTRIES_CONNECTION_MIN_DATE_TIMER_ACTIVE_DESC',
  EntriesConnectionMinDateTimerEstimatedTimeAsc = 'ENTRIES_CONNECTION_MIN_DATE_TIMER_ESTIMATED_TIME_ASC',
  EntriesConnectionMinDateTimerEstimatedTimeDesc = 'ENTRIES_CONNECTION_MIN_DATE_TIMER_ESTIMATED_TIME_DESC',
  EntriesConnectionMinDateTimerStartedAtAsc = 'ENTRIES_CONNECTION_MIN_DATE_TIMER_STARTED_AT_ASC',
  EntriesConnectionMinDateTimerStartedAtDesc = 'ENTRIES_CONNECTION_MIN_DATE_TIMER_STARTED_AT_DESC',
  EntriesConnectionMinDateTimerTrackedTimeAsc = 'ENTRIES_CONNECTION_MIN_DATE_TIMER_TRACKED_TIME_ASC',
  EntriesConnectionMinDateTimerTrackedTimeDesc = 'ENTRIES_CONNECTION_MIN_DATE_TIMER_TRACKED_TIME_DESC',
  EntriesConnectionMinDescriptionAsc = 'ENTRIES_CONNECTION_MIN_DESCRIPTION_ASC',
  EntriesConnectionMinDescriptionDesc = 'ENTRIES_CONNECTION_MIN_DESCRIPTION_DESC',
  EntriesConnectionMinIdAsc = 'ENTRIES_CONNECTION_MIN_ID_ASC',
  EntriesConnectionMinIdDesc = 'ENTRIES_CONNECTION_MIN_ID_DESC',
  EntriesConnectionMinListOrderAsc = 'ENTRIES_CONNECTION_MIN_LIST_ORDER_ASC',
  EntriesConnectionMinListOrderDesc = 'ENTRIES_CONNECTION_MIN_LIST_ORDER_DESC',
  EntriesConnectionMinPersonIdAsc = 'ENTRIES_CONNECTION_MIN_PERSON_ID_ASC',
  EntriesConnectionMinPersonIdDesc = 'ENTRIES_CONNECTION_MIN_PERSON_ID_DESC',
  EntriesConnectionMinTaskIdAsc = 'ENTRIES_CONNECTION_MIN_TASK_ID_ASC',
  EntriesConnectionMinTaskIdDesc = 'ENTRIES_CONNECTION_MIN_TASK_ID_DESC',
  EntriesConnectionMinTimerActiveAsc = 'ENTRIES_CONNECTION_MIN_TIMER_ACTIVE_ASC',
  EntriesConnectionMinTimerActiveDesc = 'ENTRIES_CONNECTION_MIN_TIMER_ACTIVE_DESC',
  EntriesConnectionMinTimerEstimatedTimeAsc = 'ENTRIES_CONNECTION_MIN_TIMER_ESTIMATED_TIME_ASC',
  EntriesConnectionMinTimerEstimatedTimeDesc = 'ENTRIES_CONNECTION_MIN_TIMER_ESTIMATED_TIME_DESC',
  EntriesConnectionMinTimerStartedAtAsc = 'ENTRIES_CONNECTION_MIN_TIMER_STARTED_AT_ASC',
  EntriesConnectionMinTimerStartedAtDesc = 'ENTRIES_CONNECTION_MIN_TIMER_STARTED_AT_DESC',
  EntriesConnectionMinTimerTrackedTimeAsc = 'ENTRIES_CONNECTION_MIN_TIMER_TRACKED_TIME_ASC',
  EntriesConnectionMinTimerTrackedTimeDesc = 'ENTRIES_CONNECTION_MIN_TIMER_TRACKED_TIME_DESC',
  EntriesConnectionStddevPopulationCompleteAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_COMPLETE_ASC',
  EntriesConnectionStddevPopulationCompleteDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_COMPLETE_DESC',
  EntriesConnectionStddevPopulationCreatedAtAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_CREATED_AT_ASC',
  EntriesConnectionStddevPopulationCreatedAtDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_CREATED_AT_DESC',
  EntriesConnectionStddevPopulationDateAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_DATE_ASC',
  EntriesConnectionStddevPopulationDateDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_DATE_DESC',
  EntriesConnectionStddevPopulationDescriptionAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_DESCRIPTION_ASC',
  EntriesConnectionStddevPopulationDescriptionDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_DESCRIPTION_DESC',
  EntriesConnectionStddevPopulationIdAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_ID_ASC',
  EntriesConnectionStddevPopulationIdDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_ID_DESC',
  EntriesConnectionStddevPopulationListOrderAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_LIST_ORDER_ASC',
  EntriesConnectionStddevPopulationListOrderDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_LIST_ORDER_DESC',
  EntriesConnectionStddevPopulationPersonIdAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_PERSON_ID_ASC',
  EntriesConnectionStddevPopulationPersonIdDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_PERSON_ID_DESC',
  EntriesConnectionStddevPopulationTaskIdAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_TASK_ID_ASC',
  EntriesConnectionStddevPopulationTaskIdDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_TASK_ID_DESC',
  EntriesConnectionStddevPopulationTimerActiveAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_TIMER_ACTIVE_ASC',
  EntriesConnectionStddevPopulationTimerActiveDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_TIMER_ACTIVE_DESC',
  EntriesConnectionStddevPopulationTimerEstimatedTimeAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_TIMER_ESTIMATED_TIME_ASC',
  EntriesConnectionStddevPopulationTimerEstimatedTimeDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_TIMER_ESTIMATED_TIME_DESC',
  EntriesConnectionStddevPopulationTimerStartedAtAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_TIMER_STARTED_AT_ASC',
  EntriesConnectionStddevPopulationTimerStartedAtDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_TIMER_STARTED_AT_DESC',
  EntriesConnectionStddevPopulationTimerTrackedTimeAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_TIMER_TRACKED_TIME_ASC',
  EntriesConnectionStddevPopulationTimerTrackedTimeDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_TIMER_TRACKED_TIME_DESC',
  EntriesConnectionStddevSampleCompleteAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_COMPLETE_ASC',
  EntriesConnectionStddevSampleCompleteDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_COMPLETE_DESC',
  EntriesConnectionStddevSampleCreatedAtAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_CREATED_AT_ASC',
  EntriesConnectionStddevSampleCreatedAtDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_CREATED_AT_DESC',
  EntriesConnectionStddevSampleDateAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_DATE_ASC',
  EntriesConnectionStddevSampleDateDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_DATE_DESC',
  EntriesConnectionStddevSampleDescriptionAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_DESCRIPTION_ASC',
  EntriesConnectionStddevSampleDescriptionDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_DESCRIPTION_DESC',
  EntriesConnectionStddevSampleIdAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_ID_ASC',
  EntriesConnectionStddevSampleIdDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_ID_DESC',
  EntriesConnectionStddevSampleListOrderAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_LIST_ORDER_ASC',
  EntriesConnectionStddevSampleListOrderDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_LIST_ORDER_DESC',
  EntriesConnectionStddevSamplePersonIdAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_PERSON_ID_ASC',
  EntriesConnectionStddevSamplePersonIdDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_PERSON_ID_DESC',
  EntriesConnectionStddevSampleTaskIdAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_TASK_ID_ASC',
  EntriesConnectionStddevSampleTaskIdDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_TASK_ID_DESC',
  EntriesConnectionStddevSampleTimerActiveAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_TIMER_ACTIVE_ASC',
  EntriesConnectionStddevSampleTimerActiveDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_TIMER_ACTIVE_DESC',
  EntriesConnectionStddevSampleTimerEstimatedTimeAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_TIMER_ESTIMATED_TIME_ASC',
  EntriesConnectionStddevSampleTimerEstimatedTimeDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_TIMER_ESTIMATED_TIME_DESC',
  EntriesConnectionStddevSampleTimerStartedAtAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_TIMER_STARTED_AT_ASC',
  EntriesConnectionStddevSampleTimerStartedAtDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_TIMER_STARTED_AT_DESC',
  EntriesConnectionStddevSampleTimerTrackedTimeAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_TIMER_TRACKED_TIME_ASC',
  EntriesConnectionStddevSampleTimerTrackedTimeDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_TIMER_TRACKED_TIME_DESC',
  EntriesConnectionSumCompleteAsc = 'ENTRIES_CONNECTION_SUM_COMPLETE_ASC',
  EntriesConnectionSumCompleteDesc = 'ENTRIES_CONNECTION_SUM_COMPLETE_DESC',
  EntriesConnectionSumCreatedAtAsc = 'ENTRIES_CONNECTION_SUM_CREATED_AT_ASC',
  EntriesConnectionSumCreatedAtDesc = 'ENTRIES_CONNECTION_SUM_CREATED_AT_DESC',
  EntriesConnectionSumDateAsc = 'ENTRIES_CONNECTION_SUM_DATE_ASC',
  EntriesConnectionSumDateDesc = 'ENTRIES_CONNECTION_SUM_DATE_DESC',
  EntriesConnectionSumDescriptionAsc = 'ENTRIES_CONNECTION_SUM_DESCRIPTION_ASC',
  EntriesConnectionSumDescriptionDesc = 'ENTRIES_CONNECTION_SUM_DESCRIPTION_DESC',
  EntriesConnectionSumIdAsc = 'ENTRIES_CONNECTION_SUM_ID_ASC',
  EntriesConnectionSumIdDesc = 'ENTRIES_CONNECTION_SUM_ID_DESC',
  EntriesConnectionSumListOrderAsc = 'ENTRIES_CONNECTION_SUM_LIST_ORDER_ASC',
  EntriesConnectionSumListOrderDesc = 'ENTRIES_CONNECTION_SUM_LIST_ORDER_DESC',
  EntriesConnectionSumPersonIdAsc = 'ENTRIES_CONNECTION_SUM_PERSON_ID_ASC',
  EntriesConnectionSumPersonIdDesc = 'ENTRIES_CONNECTION_SUM_PERSON_ID_DESC',
  EntriesConnectionSumTaskIdAsc = 'ENTRIES_CONNECTION_SUM_TASK_ID_ASC',
  EntriesConnectionSumTaskIdDesc = 'ENTRIES_CONNECTION_SUM_TASK_ID_DESC',
  EntriesConnectionSumTimerActiveAsc = 'ENTRIES_CONNECTION_SUM_TIMER_ACTIVE_ASC',
  EntriesConnectionSumTimerActiveDesc = 'ENTRIES_CONNECTION_SUM_TIMER_ACTIVE_DESC',
  EntriesConnectionSumTimerEstimatedTimeAsc = 'ENTRIES_CONNECTION_SUM_TIMER_ESTIMATED_TIME_ASC',
  EntriesConnectionSumTimerEstimatedTimeDesc = 'ENTRIES_CONNECTION_SUM_TIMER_ESTIMATED_TIME_DESC',
  EntriesConnectionSumTimerStartedAtAsc = 'ENTRIES_CONNECTION_SUM_TIMER_STARTED_AT_ASC',
  EntriesConnectionSumTimerStartedAtDesc = 'ENTRIES_CONNECTION_SUM_TIMER_STARTED_AT_DESC',
  EntriesConnectionSumTimerTrackedTimeAsc = 'ENTRIES_CONNECTION_SUM_TIMER_TRACKED_TIME_ASC',
  EntriesConnectionSumTimerTrackedTimeDesc = 'ENTRIES_CONNECTION_SUM_TIMER_TRACKED_TIME_DESC',
  EntriesConnectionVariancePopulationCompleteAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_COMPLETE_ASC',
  EntriesConnectionVariancePopulationCompleteDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_COMPLETE_DESC',
  EntriesConnectionVariancePopulationCreatedAtAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_CREATED_AT_ASC',
  EntriesConnectionVariancePopulationCreatedAtDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_CREATED_AT_DESC',
  EntriesConnectionVariancePopulationDateAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_DATE_ASC',
  EntriesConnectionVariancePopulationDateDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_DATE_DESC',
  EntriesConnectionVariancePopulationDescriptionAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_DESCRIPTION_ASC',
  EntriesConnectionVariancePopulationDescriptionDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_DESCRIPTION_DESC',
  EntriesConnectionVariancePopulationIdAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_ID_ASC',
  EntriesConnectionVariancePopulationIdDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_ID_DESC',
  EntriesConnectionVariancePopulationListOrderAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_LIST_ORDER_ASC',
  EntriesConnectionVariancePopulationListOrderDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_LIST_ORDER_DESC',
  EntriesConnectionVariancePopulationPersonIdAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_PERSON_ID_ASC',
  EntriesConnectionVariancePopulationPersonIdDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_PERSON_ID_DESC',
  EntriesConnectionVariancePopulationTaskIdAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_TASK_ID_ASC',
  EntriesConnectionVariancePopulationTaskIdDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_TASK_ID_DESC',
  EntriesConnectionVariancePopulationTimerActiveAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_TIMER_ACTIVE_ASC',
  EntriesConnectionVariancePopulationTimerActiveDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_TIMER_ACTIVE_DESC',
  EntriesConnectionVariancePopulationTimerEstimatedTimeAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_TIMER_ESTIMATED_TIME_ASC',
  EntriesConnectionVariancePopulationTimerEstimatedTimeDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_TIMER_ESTIMATED_TIME_DESC',
  EntriesConnectionVariancePopulationTimerStartedAtAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_TIMER_STARTED_AT_ASC',
  EntriesConnectionVariancePopulationTimerStartedAtDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_TIMER_STARTED_AT_DESC',
  EntriesConnectionVariancePopulationTimerTrackedTimeAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_TIMER_TRACKED_TIME_ASC',
  EntriesConnectionVariancePopulationTimerTrackedTimeDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_TIMER_TRACKED_TIME_DESC',
  EntriesConnectionVarianceSampleCompleteAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_COMPLETE_ASC',
  EntriesConnectionVarianceSampleCompleteDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_COMPLETE_DESC',
  EntriesConnectionVarianceSampleCreatedAtAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_CREATED_AT_ASC',
  EntriesConnectionVarianceSampleCreatedAtDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_CREATED_AT_DESC',
  EntriesConnectionVarianceSampleDateAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_DATE_ASC',
  EntriesConnectionVarianceSampleDateDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_DATE_DESC',
  EntriesConnectionVarianceSampleDescriptionAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_DESCRIPTION_ASC',
  EntriesConnectionVarianceSampleDescriptionDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_DESCRIPTION_DESC',
  EntriesConnectionVarianceSampleIdAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_ID_ASC',
  EntriesConnectionVarianceSampleIdDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_ID_DESC',
  EntriesConnectionVarianceSampleListOrderAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_LIST_ORDER_ASC',
  EntriesConnectionVarianceSampleListOrderDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_LIST_ORDER_DESC',
  EntriesConnectionVarianceSamplePersonIdAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_PERSON_ID_ASC',
  EntriesConnectionVarianceSamplePersonIdDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_PERSON_ID_DESC',
  EntriesConnectionVarianceSampleTaskIdAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_TASK_ID_ASC',
  EntriesConnectionVarianceSampleTaskIdDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_TASK_ID_DESC',
  EntriesConnectionVarianceSampleTimerActiveAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_TIMER_ACTIVE_ASC',
  EntriesConnectionVarianceSampleTimerActiveDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_TIMER_ACTIVE_DESC',
  EntriesConnectionVarianceSampleTimerEstimatedTimeAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_TIMER_ESTIMATED_TIME_ASC',
  EntriesConnectionVarianceSampleTimerEstimatedTimeDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_TIMER_ESTIMATED_TIME_DESC',
  EntriesConnectionVarianceSampleTimerStartedAtAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_TIMER_STARTED_AT_ASC',
  EntriesConnectionVarianceSampleTimerStartedAtDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_TIMER_STARTED_AT_DESC',
  EntriesConnectionVarianceSampleTimerTrackedTimeAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_TIMER_TRACKED_TIME_ASC',
  EntriesConnectionVarianceSampleTimerTrackedTimeDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_TIMER_TRACKED_TIME_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectsConnectionAverageCategoryIdAsc = 'PROJECTS_CONNECTION_AVERAGE_CATEGORY_ID_ASC',
  ProjectsConnectionAverageCategoryIdDesc = 'PROJECTS_CONNECTION_AVERAGE_CATEGORY_ID_DESC',
  ProjectsConnectionAverageCreatedAtAsc = 'PROJECTS_CONNECTION_AVERAGE_CREATED_AT_ASC',
  ProjectsConnectionAverageCreatedAtDesc = 'PROJECTS_CONNECTION_AVERAGE_CREATED_AT_DESC',
  ProjectsConnectionAverageDescriptionAsc = 'PROJECTS_CONNECTION_AVERAGE_DESCRIPTION_ASC',
  ProjectsConnectionAverageDescriptionDesc = 'PROJECTS_CONNECTION_AVERAGE_DESCRIPTION_DESC',
  ProjectsConnectionAverageIdAsc = 'PROJECTS_CONNECTION_AVERAGE_ID_ASC',
  ProjectsConnectionAverageIdDesc = 'PROJECTS_CONNECTION_AVERAGE_ID_DESC',
  ProjectsConnectionAveragePersonIdAsc = 'PROJECTS_CONNECTION_AVERAGE_PERSON_ID_ASC',
  ProjectsConnectionAveragePersonIdDesc = 'PROJECTS_CONNECTION_AVERAGE_PERSON_ID_DESC',
  ProjectsConnectionAverageTargetDaysAsc = 'PROJECTS_CONNECTION_AVERAGE_TARGET_DAYS_ASC',
  ProjectsConnectionAverageTargetDaysDesc = 'PROJECTS_CONNECTION_AVERAGE_TARGET_DAYS_DESC',
  ProjectsConnectionAverageTargetMaxTimePerWeekAsc = 'PROJECTS_CONNECTION_AVERAGE_TARGET_MAX_TIME_PER_WEEK_ASC',
  ProjectsConnectionAverageTargetMaxTimePerWeekDesc = 'PROJECTS_CONNECTION_AVERAGE_TARGET_MAX_TIME_PER_WEEK_DESC',
  ProjectsConnectionAverageTargetMinTimePerWeekAsc = 'PROJECTS_CONNECTION_AVERAGE_TARGET_MIN_TIME_PER_WEEK_ASC',
  ProjectsConnectionAverageTargetMinTimePerWeekDesc = 'PROJECTS_CONNECTION_AVERAGE_TARGET_MIN_TIME_PER_WEEK_DESC',
  ProjectsConnectionCountAsc = 'PROJECTS_CONNECTION_COUNT_ASC',
  ProjectsConnectionCountDesc = 'PROJECTS_CONNECTION_COUNT_DESC',
  ProjectsConnectionDistinctCountCategoryIdAsc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_CATEGORY_ID_ASC',
  ProjectsConnectionDistinctCountCategoryIdDesc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_CATEGORY_ID_DESC',
  ProjectsConnectionDistinctCountCreatedAtAsc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_CREATED_AT_ASC',
  ProjectsConnectionDistinctCountCreatedAtDesc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_CREATED_AT_DESC',
  ProjectsConnectionDistinctCountDescriptionAsc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_DESCRIPTION_ASC',
  ProjectsConnectionDistinctCountDescriptionDesc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_DESCRIPTION_DESC',
  ProjectsConnectionDistinctCountIdAsc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_ID_ASC',
  ProjectsConnectionDistinctCountIdDesc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_ID_DESC',
  ProjectsConnectionDistinctCountPersonIdAsc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_PERSON_ID_ASC',
  ProjectsConnectionDistinctCountPersonIdDesc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_PERSON_ID_DESC',
  ProjectsConnectionDistinctCountTargetDaysAsc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_TARGET_DAYS_ASC',
  ProjectsConnectionDistinctCountTargetDaysDesc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_TARGET_DAYS_DESC',
  ProjectsConnectionDistinctCountTargetMaxTimePerWeekAsc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_TARGET_MAX_TIME_PER_WEEK_ASC',
  ProjectsConnectionDistinctCountTargetMaxTimePerWeekDesc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_TARGET_MAX_TIME_PER_WEEK_DESC',
  ProjectsConnectionDistinctCountTargetMinTimePerWeekAsc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_TARGET_MIN_TIME_PER_WEEK_ASC',
  ProjectsConnectionDistinctCountTargetMinTimePerWeekDesc = 'PROJECTS_CONNECTION_DISTINCT_COUNT_TARGET_MIN_TIME_PER_WEEK_DESC',
  ProjectsConnectionMaxCategoryIdAsc = 'PROJECTS_CONNECTION_MAX_CATEGORY_ID_ASC',
  ProjectsConnectionMaxCategoryIdDesc = 'PROJECTS_CONNECTION_MAX_CATEGORY_ID_DESC',
  ProjectsConnectionMaxCreatedAtAsc = 'PROJECTS_CONNECTION_MAX_CREATED_AT_ASC',
  ProjectsConnectionMaxCreatedAtDesc = 'PROJECTS_CONNECTION_MAX_CREATED_AT_DESC',
  ProjectsConnectionMaxDateCategoryIdAsc = 'PROJECTS_CONNECTION_MAX_DATE_CATEGORY_ID_ASC',
  ProjectsConnectionMaxDateCategoryIdDesc = 'PROJECTS_CONNECTION_MAX_DATE_CATEGORY_ID_DESC',
  ProjectsConnectionMaxDateCreatedAtAsc = 'PROJECTS_CONNECTION_MAX_DATE_CREATED_AT_ASC',
  ProjectsConnectionMaxDateCreatedAtDesc = 'PROJECTS_CONNECTION_MAX_DATE_CREATED_AT_DESC',
  ProjectsConnectionMaxDateDescriptionAsc = 'PROJECTS_CONNECTION_MAX_DATE_DESCRIPTION_ASC',
  ProjectsConnectionMaxDateDescriptionDesc = 'PROJECTS_CONNECTION_MAX_DATE_DESCRIPTION_DESC',
  ProjectsConnectionMaxDateIdAsc = 'PROJECTS_CONNECTION_MAX_DATE_ID_ASC',
  ProjectsConnectionMaxDateIdDesc = 'PROJECTS_CONNECTION_MAX_DATE_ID_DESC',
  ProjectsConnectionMaxDatePersonIdAsc = 'PROJECTS_CONNECTION_MAX_DATE_PERSON_ID_ASC',
  ProjectsConnectionMaxDatePersonIdDesc = 'PROJECTS_CONNECTION_MAX_DATE_PERSON_ID_DESC',
  ProjectsConnectionMaxDateTargetDaysAsc = 'PROJECTS_CONNECTION_MAX_DATE_TARGET_DAYS_ASC',
  ProjectsConnectionMaxDateTargetDaysDesc = 'PROJECTS_CONNECTION_MAX_DATE_TARGET_DAYS_DESC',
  ProjectsConnectionMaxDateTargetMaxTimePerWeekAsc = 'PROJECTS_CONNECTION_MAX_DATE_TARGET_MAX_TIME_PER_WEEK_ASC',
  ProjectsConnectionMaxDateTargetMaxTimePerWeekDesc = 'PROJECTS_CONNECTION_MAX_DATE_TARGET_MAX_TIME_PER_WEEK_DESC',
  ProjectsConnectionMaxDateTargetMinTimePerWeekAsc = 'PROJECTS_CONNECTION_MAX_DATE_TARGET_MIN_TIME_PER_WEEK_ASC',
  ProjectsConnectionMaxDateTargetMinTimePerWeekDesc = 'PROJECTS_CONNECTION_MAX_DATE_TARGET_MIN_TIME_PER_WEEK_DESC',
  ProjectsConnectionMaxDescriptionAsc = 'PROJECTS_CONNECTION_MAX_DESCRIPTION_ASC',
  ProjectsConnectionMaxDescriptionDesc = 'PROJECTS_CONNECTION_MAX_DESCRIPTION_DESC',
  ProjectsConnectionMaxIdAsc = 'PROJECTS_CONNECTION_MAX_ID_ASC',
  ProjectsConnectionMaxIdDesc = 'PROJECTS_CONNECTION_MAX_ID_DESC',
  ProjectsConnectionMaxPersonIdAsc = 'PROJECTS_CONNECTION_MAX_PERSON_ID_ASC',
  ProjectsConnectionMaxPersonIdDesc = 'PROJECTS_CONNECTION_MAX_PERSON_ID_DESC',
  ProjectsConnectionMaxTargetDaysAsc = 'PROJECTS_CONNECTION_MAX_TARGET_DAYS_ASC',
  ProjectsConnectionMaxTargetDaysDesc = 'PROJECTS_CONNECTION_MAX_TARGET_DAYS_DESC',
  ProjectsConnectionMaxTargetMaxTimePerWeekAsc = 'PROJECTS_CONNECTION_MAX_TARGET_MAX_TIME_PER_WEEK_ASC',
  ProjectsConnectionMaxTargetMaxTimePerWeekDesc = 'PROJECTS_CONNECTION_MAX_TARGET_MAX_TIME_PER_WEEK_DESC',
  ProjectsConnectionMaxTargetMinTimePerWeekAsc = 'PROJECTS_CONNECTION_MAX_TARGET_MIN_TIME_PER_WEEK_ASC',
  ProjectsConnectionMaxTargetMinTimePerWeekDesc = 'PROJECTS_CONNECTION_MAX_TARGET_MIN_TIME_PER_WEEK_DESC',
  ProjectsConnectionMinCategoryIdAsc = 'PROJECTS_CONNECTION_MIN_CATEGORY_ID_ASC',
  ProjectsConnectionMinCategoryIdDesc = 'PROJECTS_CONNECTION_MIN_CATEGORY_ID_DESC',
  ProjectsConnectionMinCreatedAtAsc = 'PROJECTS_CONNECTION_MIN_CREATED_AT_ASC',
  ProjectsConnectionMinCreatedAtDesc = 'PROJECTS_CONNECTION_MIN_CREATED_AT_DESC',
  ProjectsConnectionMinDateCategoryIdAsc = 'PROJECTS_CONNECTION_MIN_DATE_CATEGORY_ID_ASC',
  ProjectsConnectionMinDateCategoryIdDesc = 'PROJECTS_CONNECTION_MIN_DATE_CATEGORY_ID_DESC',
  ProjectsConnectionMinDateCreatedAtAsc = 'PROJECTS_CONNECTION_MIN_DATE_CREATED_AT_ASC',
  ProjectsConnectionMinDateCreatedAtDesc = 'PROJECTS_CONNECTION_MIN_DATE_CREATED_AT_DESC',
  ProjectsConnectionMinDateDescriptionAsc = 'PROJECTS_CONNECTION_MIN_DATE_DESCRIPTION_ASC',
  ProjectsConnectionMinDateDescriptionDesc = 'PROJECTS_CONNECTION_MIN_DATE_DESCRIPTION_DESC',
  ProjectsConnectionMinDateIdAsc = 'PROJECTS_CONNECTION_MIN_DATE_ID_ASC',
  ProjectsConnectionMinDateIdDesc = 'PROJECTS_CONNECTION_MIN_DATE_ID_DESC',
  ProjectsConnectionMinDatePersonIdAsc = 'PROJECTS_CONNECTION_MIN_DATE_PERSON_ID_ASC',
  ProjectsConnectionMinDatePersonIdDesc = 'PROJECTS_CONNECTION_MIN_DATE_PERSON_ID_DESC',
  ProjectsConnectionMinDateTargetDaysAsc = 'PROJECTS_CONNECTION_MIN_DATE_TARGET_DAYS_ASC',
  ProjectsConnectionMinDateTargetDaysDesc = 'PROJECTS_CONNECTION_MIN_DATE_TARGET_DAYS_DESC',
  ProjectsConnectionMinDateTargetMaxTimePerWeekAsc = 'PROJECTS_CONNECTION_MIN_DATE_TARGET_MAX_TIME_PER_WEEK_ASC',
  ProjectsConnectionMinDateTargetMaxTimePerWeekDesc = 'PROJECTS_CONNECTION_MIN_DATE_TARGET_MAX_TIME_PER_WEEK_DESC',
  ProjectsConnectionMinDateTargetMinTimePerWeekAsc = 'PROJECTS_CONNECTION_MIN_DATE_TARGET_MIN_TIME_PER_WEEK_ASC',
  ProjectsConnectionMinDateTargetMinTimePerWeekDesc = 'PROJECTS_CONNECTION_MIN_DATE_TARGET_MIN_TIME_PER_WEEK_DESC',
  ProjectsConnectionMinDescriptionAsc = 'PROJECTS_CONNECTION_MIN_DESCRIPTION_ASC',
  ProjectsConnectionMinDescriptionDesc = 'PROJECTS_CONNECTION_MIN_DESCRIPTION_DESC',
  ProjectsConnectionMinIdAsc = 'PROJECTS_CONNECTION_MIN_ID_ASC',
  ProjectsConnectionMinIdDesc = 'PROJECTS_CONNECTION_MIN_ID_DESC',
  ProjectsConnectionMinPersonIdAsc = 'PROJECTS_CONNECTION_MIN_PERSON_ID_ASC',
  ProjectsConnectionMinPersonIdDesc = 'PROJECTS_CONNECTION_MIN_PERSON_ID_DESC',
  ProjectsConnectionMinTargetDaysAsc = 'PROJECTS_CONNECTION_MIN_TARGET_DAYS_ASC',
  ProjectsConnectionMinTargetDaysDesc = 'PROJECTS_CONNECTION_MIN_TARGET_DAYS_DESC',
  ProjectsConnectionMinTargetMaxTimePerWeekAsc = 'PROJECTS_CONNECTION_MIN_TARGET_MAX_TIME_PER_WEEK_ASC',
  ProjectsConnectionMinTargetMaxTimePerWeekDesc = 'PROJECTS_CONNECTION_MIN_TARGET_MAX_TIME_PER_WEEK_DESC',
  ProjectsConnectionMinTargetMinTimePerWeekAsc = 'PROJECTS_CONNECTION_MIN_TARGET_MIN_TIME_PER_WEEK_ASC',
  ProjectsConnectionMinTargetMinTimePerWeekDesc = 'PROJECTS_CONNECTION_MIN_TARGET_MIN_TIME_PER_WEEK_DESC',
  ProjectsConnectionStddevPopulationCategoryIdAsc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_CATEGORY_ID_ASC',
  ProjectsConnectionStddevPopulationCategoryIdDesc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_CATEGORY_ID_DESC',
  ProjectsConnectionStddevPopulationCreatedAtAsc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_CREATED_AT_ASC',
  ProjectsConnectionStddevPopulationCreatedAtDesc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_CREATED_AT_DESC',
  ProjectsConnectionStddevPopulationDescriptionAsc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_DESCRIPTION_ASC',
  ProjectsConnectionStddevPopulationDescriptionDesc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_DESCRIPTION_DESC',
  ProjectsConnectionStddevPopulationIdAsc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_ID_ASC',
  ProjectsConnectionStddevPopulationIdDesc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_ID_DESC',
  ProjectsConnectionStddevPopulationPersonIdAsc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_PERSON_ID_ASC',
  ProjectsConnectionStddevPopulationPersonIdDesc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_PERSON_ID_DESC',
  ProjectsConnectionStddevPopulationTargetDaysAsc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_TARGET_DAYS_ASC',
  ProjectsConnectionStddevPopulationTargetDaysDesc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_TARGET_DAYS_DESC',
  ProjectsConnectionStddevPopulationTargetMaxTimePerWeekAsc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_TARGET_MAX_TIME_PER_WEEK_ASC',
  ProjectsConnectionStddevPopulationTargetMaxTimePerWeekDesc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_TARGET_MAX_TIME_PER_WEEK_DESC',
  ProjectsConnectionStddevPopulationTargetMinTimePerWeekAsc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_TARGET_MIN_TIME_PER_WEEK_ASC',
  ProjectsConnectionStddevPopulationTargetMinTimePerWeekDesc = 'PROJECTS_CONNECTION_STDDEV_POPULATION_TARGET_MIN_TIME_PER_WEEK_DESC',
  ProjectsConnectionStddevSampleCategoryIdAsc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_CATEGORY_ID_ASC',
  ProjectsConnectionStddevSampleCategoryIdDesc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_CATEGORY_ID_DESC',
  ProjectsConnectionStddevSampleCreatedAtAsc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_CREATED_AT_ASC',
  ProjectsConnectionStddevSampleCreatedAtDesc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_CREATED_AT_DESC',
  ProjectsConnectionStddevSampleDescriptionAsc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_DESCRIPTION_ASC',
  ProjectsConnectionStddevSampleDescriptionDesc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_DESCRIPTION_DESC',
  ProjectsConnectionStddevSampleIdAsc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_ID_ASC',
  ProjectsConnectionStddevSampleIdDesc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_ID_DESC',
  ProjectsConnectionStddevSamplePersonIdAsc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_PERSON_ID_ASC',
  ProjectsConnectionStddevSamplePersonIdDesc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_PERSON_ID_DESC',
  ProjectsConnectionStddevSampleTargetDaysAsc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_TARGET_DAYS_ASC',
  ProjectsConnectionStddevSampleTargetDaysDesc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_TARGET_DAYS_DESC',
  ProjectsConnectionStddevSampleTargetMaxTimePerWeekAsc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_TARGET_MAX_TIME_PER_WEEK_ASC',
  ProjectsConnectionStddevSampleTargetMaxTimePerWeekDesc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_TARGET_MAX_TIME_PER_WEEK_DESC',
  ProjectsConnectionStddevSampleTargetMinTimePerWeekAsc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_TARGET_MIN_TIME_PER_WEEK_ASC',
  ProjectsConnectionStddevSampleTargetMinTimePerWeekDesc = 'PROJECTS_CONNECTION_STDDEV_SAMPLE_TARGET_MIN_TIME_PER_WEEK_DESC',
  ProjectsConnectionSumCategoryIdAsc = 'PROJECTS_CONNECTION_SUM_CATEGORY_ID_ASC',
  ProjectsConnectionSumCategoryIdDesc = 'PROJECTS_CONNECTION_SUM_CATEGORY_ID_DESC',
  ProjectsConnectionSumCreatedAtAsc = 'PROJECTS_CONNECTION_SUM_CREATED_AT_ASC',
  ProjectsConnectionSumCreatedAtDesc = 'PROJECTS_CONNECTION_SUM_CREATED_AT_DESC',
  ProjectsConnectionSumDescriptionAsc = 'PROJECTS_CONNECTION_SUM_DESCRIPTION_ASC',
  ProjectsConnectionSumDescriptionDesc = 'PROJECTS_CONNECTION_SUM_DESCRIPTION_DESC',
  ProjectsConnectionSumIdAsc = 'PROJECTS_CONNECTION_SUM_ID_ASC',
  ProjectsConnectionSumIdDesc = 'PROJECTS_CONNECTION_SUM_ID_DESC',
  ProjectsConnectionSumPersonIdAsc = 'PROJECTS_CONNECTION_SUM_PERSON_ID_ASC',
  ProjectsConnectionSumPersonIdDesc = 'PROJECTS_CONNECTION_SUM_PERSON_ID_DESC',
  ProjectsConnectionSumTargetDaysAsc = 'PROJECTS_CONNECTION_SUM_TARGET_DAYS_ASC',
  ProjectsConnectionSumTargetDaysDesc = 'PROJECTS_CONNECTION_SUM_TARGET_DAYS_DESC',
  ProjectsConnectionSumTargetMaxTimePerWeekAsc = 'PROJECTS_CONNECTION_SUM_TARGET_MAX_TIME_PER_WEEK_ASC',
  ProjectsConnectionSumTargetMaxTimePerWeekDesc = 'PROJECTS_CONNECTION_SUM_TARGET_MAX_TIME_PER_WEEK_DESC',
  ProjectsConnectionSumTargetMinTimePerWeekAsc = 'PROJECTS_CONNECTION_SUM_TARGET_MIN_TIME_PER_WEEK_ASC',
  ProjectsConnectionSumTargetMinTimePerWeekDesc = 'PROJECTS_CONNECTION_SUM_TARGET_MIN_TIME_PER_WEEK_DESC',
  ProjectsConnectionVariancePopulationCategoryIdAsc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_CATEGORY_ID_ASC',
  ProjectsConnectionVariancePopulationCategoryIdDesc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_CATEGORY_ID_DESC',
  ProjectsConnectionVariancePopulationCreatedAtAsc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_CREATED_AT_ASC',
  ProjectsConnectionVariancePopulationCreatedAtDesc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_CREATED_AT_DESC',
  ProjectsConnectionVariancePopulationDescriptionAsc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_DESCRIPTION_ASC',
  ProjectsConnectionVariancePopulationDescriptionDesc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_DESCRIPTION_DESC',
  ProjectsConnectionVariancePopulationIdAsc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_ID_ASC',
  ProjectsConnectionVariancePopulationIdDesc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_ID_DESC',
  ProjectsConnectionVariancePopulationPersonIdAsc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_PERSON_ID_ASC',
  ProjectsConnectionVariancePopulationPersonIdDesc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_PERSON_ID_DESC',
  ProjectsConnectionVariancePopulationTargetDaysAsc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_TARGET_DAYS_ASC',
  ProjectsConnectionVariancePopulationTargetDaysDesc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_TARGET_DAYS_DESC',
  ProjectsConnectionVariancePopulationTargetMaxTimePerWeekAsc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_TARGET_MAX_TIME_PER_WEEK_ASC',
  ProjectsConnectionVariancePopulationTargetMaxTimePerWeekDesc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_TARGET_MAX_TIME_PER_WEEK_DESC',
  ProjectsConnectionVariancePopulationTargetMinTimePerWeekAsc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_TARGET_MIN_TIME_PER_WEEK_ASC',
  ProjectsConnectionVariancePopulationTargetMinTimePerWeekDesc = 'PROJECTS_CONNECTION_VARIANCE_POPULATION_TARGET_MIN_TIME_PER_WEEK_DESC',
  ProjectsConnectionVarianceSampleCategoryIdAsc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_CATEGORY_ID_ASC',
  ProjectsConnectionVarianceSampleCategoryIdDesc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_CATEGORY_ID_DESC',
  ProjectsConnectionVarianceSampleCreatedAtAsc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_CREATED_AT_ASC',
  ProjectsConnectionVarianceSampleCreatedAtDesc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_CREATED_AT_DESC',
  ProjectsConnectionVarianceSampleDescriptionAsc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_DESCRIPTION_ASC',
  ProjectsConnectionVarianceSampleDescriptionDesc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_DESCRIPTION_DESC',
  ProjectsConnectionVarianceSampleIdAsc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_ID_ASC',
  ProjectsConnectionVarianceSampleIdDesc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_ID_DESC',
  ProjectsConnectionVarianceSamplePersonIdAsc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_PERSON_ID_ASC',
  ProjectsConnectionVarianceSamplePersonIdDesc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_PERSON_ID_DESC',
  ProjectsConnectionVarianceSampleTargetDaysAsc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_TARGET_DAYS_ASC',
  ProjectsConnectionVarianceSampleTargetDaysDesc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_TARGET_DAYS_DESC',
  ProjectsConnectionVarianceSampleTargetMaxTimePerWeekAsc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_TARGET_MAX_TIME_PER_WEEK_ASC',
  ProjectsConnectionVarianceSampleTargetMaxTimePerWeekDesc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_TARGET_MAX_TIME_PER_WEEK_DESC',
  ProjectsConnectionVarianceSampleTargetMinTimePerWeekAsc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_TARGET_MIN_TIME_PER_WEEK_ASC',
  ProjectsConnectionVarianceSampleTargetMinTimePerWeekDesc = 'PROJECTS_CONNECTION_VARIANCE_SAMPLE_TARGET_MIN_TIME_PER_WEEK_DESC',
  TasksConnectionAverageCompleteAsc = 'TASKS_CONNECTION_AVERAGE_COMPLETE_ASC',
  TasksConnectionAverageCompleteDesc = 'TASKS_CONNECTION_AVERAGE_COMPLETE_DESC',
  TasksConnectionAverageCreatedAtAsc = 'TASKS_CONNECTION_AVERAGE_CREATED_AT_ASC',
  TasksConnectionAverageCreatedAtDesc = 'TASKS_CONNECTION_AVERAGE_CREATED_AT_DESC',
  TasksConnectionAverageDescriptionAsc = 'TASKS_CONNECTION_AVERAGE_DESCRIPTION_ASC',
  TasksConnectionAverageDescriptionDesc = 'TASKS_CONNECTION_AVERAGE_DESCRIPTION_DESC',
  TasksConnectionAverageIdAsc = 'TASKS_CONNECTION_AVERAGE_ID_ASC',
  TasksConnectionAverageIdDesc = 'TASKS_CONNECTION_AVERAGE_ID_DESC',
  TasksConnectionAveragePersonIdAsc = 'TASKS_CONNECTION_AVERAGE_PERSON_ID_ASC',
  TasksConnectionAveragePersonIdDesc = 'TASKS_CONNECTION_AVERAGE_PERSON_ID_DESC',
  TasksConnectionAverageProjectIdAsc = 'TASKS_CONNECTION_AVERAGE_PROJECT_ID_ASC',
  TasksConnectionAverageProjectIdDesc = 'TASKS_CONNECTION_AVERAGE_PROJECT_ID_DESC',
  TasksConnectionCountAsc = 'TASKS_CONNECTION_COUNT_ASC',
  TasksConnectionCountDesc = 'TASKS_CONNECTION_COUNT_DESC',
  TasksConnectionDistinctCountCompleteAsc = 'TASKS_CONNECTION_DISTINCT_COUNT_COMPLETE_ASC',
  TasksConnectionDistinctCountCompleteDesc = 'TASKS_CONNECTION_DISTINCT_COUNT_COMPLETE_DESC',
  TasksConnectionDistinctCountCreatedAtAsc = 'TASKS_CONNECTION_DISTINCT_COUNT_CREATED_AT_ASC',
  TasksConnectionDistinctCountCreatedAtDesc = 'TASKS_CONNECTION_DISTINCT_COUNT_CREATED_AT_DESC',
  TasksConnectionDistinctCountDescriptionAsc = 'TASKS_CONNECTION_DISTINCT_COUNT_DESCRIPTION_ASC',
  TasksConnectionDistinctCountDescriptionDesc = 'TASKS_CONNECTION_DISTINCT_COUNT_DESCRIPTION_DESC',
  TasksConnectionDistinctCountIdAsc = 'TASKS_CONNECTION_DISTINCT_COUNT_ID_ASC',
  TasksConnectionDistinctCountIdDesc = 'TASKS_CONNECTION_DISTINCT_COUNT_ID_DESC',
  TasksConnectionDistinctCountPersonIdAsc = 'TASKS_CONNECTION_DISTINCT_COUNT_PERSON_ID_ASC',
  TasksConnectionDistinctCountPersonIdDesc = 'TASKS_CONNECTION_DISTINCT_COUNT_PERSON_ID_DESC',
  TasksConnectionDistinctCountProjectIdAsc = 'TASKS_CONNECTION_DISTINCT_COUNT_PROJECT_ID_ASC',
  TasksConnectionDistinctCountProjectIdDesc = 'TASKS_CONNECTION_DISTINCT_COUNT_PROJECT_ID_DESC',
  TasksConnectionMaxCompleteAsc = 'TASKS_CONNECTION_MAX_COMPLETE_ASC',
  TasksConnectionMaxCompleteDesc = 'TASKS_CONNECTION_MAX_COMPLETE_DESC',
  TasksConnectionMaxCreatedAtAsc = 'TASKS_CONNECTION_MAX_CREATED_AT_ASC',
  TasksConnectionMaxCreatedAtDesc = 'TASKS_CONNECTION_MAX_CREATED_AT_DESC',
  TasksConnectionMaxDateCompleteAsc = 'TASKS_CONNECTION_MAX_DATE_COMPLETE_ASC',
  TasksConnectionMaxDateCompleteDesc = 'TASKS_CONNECTION_MAX_DATE_COMPLETE_DESC',
  TasksConnectionMaxDateCreatedAtAsc = 'TASKS_CONNECTION_MAX_DATE_CREATED_AT_ASC',
  TasksConnectionMaxDateCreatedAtDesc = 'TASKS_CONNECTION_MAX_DATE_CREATED_AT_DESC',
  TasksConnectionMaxDateDescriptionAsc = 'TASKS_CONNECTION_MAX_DATE_DESCRIPTION_ASC',
  TasksConnectionMaxDateDescriptionDesc = 'TASKS_CONNECTION_MAX_DATE_DESCRIPTION_DESC',
  TasksConnectionMaxDateIdAsc = 'TASKS_CONNECTION_MAX_DATE_ID_ASC',
  TasksConnectionMaxDateIdDesc = 'TASKS_CONNECTION_MAX_DATE_ID_DESC',
  TasksConnectionMaxDatePersonIdAsc = 'TASKS_CONNECTION_MAX_DATE_PERSON_ID_ASC',
  TasksConnectionMaxDatePersonIdDesc = 'TASKS_CONNECTION_MAX_DATE_PERSON_ID_DESC',
  TasksConnectionMaxDateProjectIdAsc = 'TASKS_CONNECTION_MAX_DATE_PROJECT_ID_ASC',
  TasksConnectionMaxDateProjectIdDesc = 'TASKS_CONNECTION_MAX_DATE_PROJECT_ID_DESC',
  TasksConnectionMaxDescriptionAsc = 'TASKS_CONNECTION_MAX_DESCRIPTION_ASC',
  TasksConnectionMaxDescriptionDesc = 'TASKS_CONNECTION_MAX_DESCRIPTION_DESC',
  TasksConnectionMaxIdAsc = 'TASKS_CONNECTION_MAX_ID_ASC',
  TasksConnectionMaxIdDesc = 'TASKS_CONNECTION_MAX_ID_DESC',
  TasksConnectionMaxPersonIdAsc = 'TASKS_CONNECTION_MAX_PERSON_ID_ASC',
  TasksConnectionMaxPersonIdDesc = 'TASKS_CONNECTION_MAX_PERSON_ID_DESC',
  TasksConnectionMaxProjectIdAsc = 'TASKS_CONNECTION_MAX_PROJECT_ID_ASC',
  TasksConnectionMaxProjectIdDesc = 'TASKS_CONNECTION_MAX_PROJECT_ID_DESC',
  TasksConnectionMinCompleteAsc = 'TASKS_CONNECTION_MIN_COMPLETE_ASC',
  TasksConnectionMinCompleteDesc = 'TASKS_CONNECTION_MIN_COMPLETE_DESC',
  TasksConnectionMinCreatedAtAsc = 'TASKS_CONNECTION_MIN_CREATED_AT_ASC',
  TasksConnectionMinCreatedAtDesc = 'TASKS_CONNECTION_MIN_CREATED_AT_DESC',
  TasksConnectionMinDateCompleteAsc = 'TASKS_CONNECTION_MIN_DATE_COMPLETE_ASC',
  TasksConnectionMinDateCompleteDesc = 'TASKS_CONNECTION_MIN_DATE_COMPLETE_DESC',
  TasksConnectionMinDateCreatedAtAsc = 'TASKS_CONNECTION_MIN_DATE_CREATED_AT_ASC',
  TasksConnectionMinDateCreatedAtDesc = 'TASKS_CONNECTION_MIN_DATE_CREATED_AT_DESC',
  TasksConnectionMinDateDescriptionAsc = 'TASKS_CONNECTION_MIN_DATE_DESCRIPTION_ASC',
  TasksConnectionMinDateDescriptionDesc = 'TASKS_CONNECTION_MIN_DATE_DESCRIPTION_DESC',
  TasksConnectionMinDateIdAsc = 'TASKS_CONNECTION_MIN_DATE_ID_ASC',
  TasksConnectionMinDateIdDesc = 'TASKS_CONNECTION_MIN_DATE_ID_DESC',
  TasksConnectionMinDatePersonIdAsc = 'TASKS_CONNECTION_MIN_DATE_PERSON_ID_ASC',
  TasksConnectionMinDatePersonIdDesc = 'TASKS_CONNECTION_MIN_DATE_PERSON_ID_DESC',
  TasksConnectionMinDateProjectIdAsc = 'TASKS_CONNECTION_MIN_DATE_PROJECT_ID_ASC',
  TasksConnectionMinDateProjectIdDesc = 'TASKS_CONNECTION_MIN_DATE_PROJECT_ID_DESC',
  TasksConnectionMinDescriptionAsc = 'TASKS_CONNECTION_MIN_DESCRIPTION_ASC',
  TasksConnectionMinDescriptionDesc = 'TASKS_CONNECTION_MIN_DESCRIPTION_DESC',
  TasksConnectionMinIdAsc = 'TASKS_CONNECTION_MIN_ID_ASC',
  TasksConnectionMinIdDesc = 'TASKS_CONNECTION_MIN_ID_DESC',
  TasksConnectionMinPersonIdAsc = 'TASKS_CONNECTION_MIN_PERSON_ID_ASC',
  TasksConnectionMinPersonIdDesc = 'TASKS_CONNECTION_MIN_PERSON_ID_DESC',
  TasksConnectionMinProjectIdAsc = 'TASKS_CONNECTION_MIN_PROJECT_ID_ASC',
  TasksConnectionMinProjectIdDesc = 'TASKS_CONNECTION_MIN_PROJECT_ID_DESC',
  TasksConnectionStddevPopulationCompleteAsc = 'TASKS_CONNECTION_STDDEV_POPULATION_COMPLETE_ASC',
  TasksConnectionStddevPopulationCompleteDesc = 'TASKS_CONNECTION_STDDEV_POPULATION_COMPLETE_DESC',
  TasksConnectionStddevPopulationCreatedAtAsc = 'TASKS_CONNECTION_STDDEV_POPULATION_CREATED_AT_ASC',
  TasksConnectionStddevPopulationCreatedAtDesc = 'TASKS_CONNECTION_STDDEV_POPULATION_CREATED_AT_DESC',
  TasksConnectionStddevPopulationDescriptionAsc = 'TASKS_CONNECTION_STDDEV_POPULATION_DESCRIPTION_ASC',
  TasksConnectionStddevPopulationDescriptionDesc = 'TASKS_CONNECTION_STDDEV_POPULATION_DESCRIPTION_DESC',
  TasksConnectionStddevPopulationIdAsc = 'TASKS_CONNECTION_STDDEV_POPULATION_ID_ASC',
  TasksConnectionStddevPopulationIdDesc = 'TASKS_CONNECTION_STDDEV_POPULATION_ID_DESC',
  TasksConnectionStddevPopulationPersonIdAsc = 'TASKS_CONNECTION_STDDEV_POPULATION_PERSON_ID_ASC',
  TasksConnectionStddevPopulationPersonIdDesc = 'TASKS_CONNECTION_STDDEV_POPULATION_PERSON_ID_DESC',
  TasksConnectionStddevPopulationProjectIdAsc = 'TASKS_CONNECTION_STDDEV_POPULATION_PROJECT_ID_ASC',
  TasksConnectionStddevPopulationProjectIdDesc = 'TASKS_CONNECTION_STDDEV_POPULATION_PROJECT_ID_DESC',
  TasksConnectionStddevSampleCompleteAsc = 'TASKS_CONNECTION_STDDEV_SAMPLE_COMPLETE_ASC',
  TasksConnectionStddevSampleCompleteDesc = 'TASKS_CONNECTION_STDDEV_SAMPLE_COMPLETE_DESC',
  TasksConnectionStddevSampleCreatedAtAsc = 'TASKS_CONNECTION_STDDEV_SAMPLE_CREATED_AT_ASC',
  TasksConnectionStddevSampleCreatedAtDesc = 'TASKS_CONNECTION_STDDEV_SAMPLE_CREATED_AT_DESC',
  TasksConnectionStddevSampleDescriptionAsc = 'TASKS_CONNECTION_STDDEV_SAMPLE_DESCRIPTION_ASC',
  TasksConnectionStddevSampleDescriptionDesc = 'TASKS_CONNECTION_STDDEV_SAMPLE_DESCRIPTION_DESC',
  TasksConnectionStddevSampleIdAsc = 'TASKS_CONNECTION_STDDEV_SAMPLE_ID_ASC',
  TasksConnectionStddevSampleIdDesc = 'TASKS_CONNECTION_STDDEV_SAMPLE_ID_DESC',
  TasksConnectionStddevSamplePersonIdAsc = 'TASKS_CONNECTION_STDDEV_SAMPLE_PERSON_ID_ASC',
  TasksConnectionStddevSamplePersonIdDesc = 'TASKS_CONNECTION_STDDEV_SAMPLE_PERSON_ID_DESC',
  TasksConnectionStddevSampleProjectIdAsc = 'TASKS_CONNECTION_STDDEV_SAMPLE_PROJECT_ID_ASC',
  TasksConnectionStddevSampleProjectIdDesc = 'TASKS_CONNECTION_STDDEV_SAMPLE_PROJECT_ID_DESC',
  TasksConnectionSumCompleteAsc = 'TASKS_CONNECTION_SUM_COMPLETE_ASC',
  TasksConnectionSumCompleteDesc = 'TASKS_CONNECTION_SUM_COMPLETE_DESC',
  TasksConnectionSumCreatedAtAsc = 'TASKS_CONNECTION_SUM_CREATED_AT_ASC',
  TasksConnectionSumCreatedAtDesc = 'TASKS_CONNECTION_SUM_CREATED_AT_DESC',
  TasksConnectionSumDescriptionAsc = 'TASKS_CONNECTION_SUM_DESCRIPTION_ASC',
  TasksConnectionSumDescriptionDesc = 'TASKS_CONNECTION_SUM_DESCRIPTION_DESC',
  TasksConnectionSumIdAsc = 'TASKS_CONNECTION_SUM_ID_ASC',
  TasksConnectionSumIdDesc = 'TASKS_CONNECTION_SUM_ID_DESC',
  TasksConnectionSumPersonIdAsc = 'TASKS_CONNECTION_SUM_PERSON_ID_ASC',
  TasksConnectionSumPersonIdDesc = 'TASKS_CONNECTION_SUM_PERSON_ID_DESC',
  TasksConnectionSumProjectIdAsc = 'TASKS_CONNECTION_SUM_PROJECT_ID_ASC',
  TasksConnectionSumProjectIdDesc = 'TASKS_CONNECTION_SUM_PROJECT_ID_DESC',
  TasksConnectionVariancePopulationCompleteAsc = 'TASKS_CONNECTION_VARIANCE_POPULATION_COMPLETE_ASC',
  TasksConnectionVariancePopulationCompleteDesc = 'TASKS_CONNECTION_VARIANCE_POPULATION_COMPLETE_DESC',
  TasksConnectionVariancePopulationCreatedAtAsc = 'TASKS_CONNECTION_VARIANCE_POPULATION_CREATED_AT_ASC',
  TasksConnectionVariancePopulationCreatedAtDesc = 'TASKS_CONNECTION_VARIANCE_POPULATION_CREATED_AT_DESC',
  TasksConnectionVariancePopulationDescriptionAsc = 'TASKS_CONNECTION_VARIANCE_POPULATION_DESCRIPTION_ASC',
  TasksConnectionVariancePopulationDescriptionDesc = 'TASKS_CONNECTION_VARIANCE_POPULATION_DESCRIPTION_DESC',
  TasksConnectionVariancePopulationIdAsc = 'TASKS_CONNECTION_VARIANCE_POPULATION_ID_ASC',
  TasksConnectionVariancePopulationIdDesc = 'TASKS_CONNECTION_VARIANCE_POPULATION_ID_DESC',
  TasksConnectionVariancePopulationPersonIdAsc = 'TASKS_CONNECTION_VARIANCE_POPULATION_PERSON_ID_ASC',
  TasksConnectionVariancePopulationPersonIdDesc = 'TASKS_CONNECTION_VARIANCE_POPULATION_PERSON_ID_DESC',
  TasksConnectionVariancePopulationProjectIdAsc = 'TASKS_CONNECTION_VARIANCE_POPULATION_PROJECT_ID_ASC',
  TasksConnectionVariancePopulationProjectIdDesc = 'TASKS_CONNECTION_VARIANCE_POPULATION_PROJECT_ID_DESC',
  TasksConnectionVarianceSampleCompleteAsc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_COMPLETE_ASC',
  TasksConnectionVarianceSampleCompleteDesc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_COMPLETE_DESC',
  TasksConnectionVarianceSampleCreatedAtAsc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_CREATED_AT_ASC',
  TasksConnectionVarianceSampleCreatedAtDesc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_CREATED_AT_DESC',
  TasksConnectionVarianceSampleDescriptionAsc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_DESCRIPTION_ASC',
  TasksConnectionVarianceSampleDescriptionDesc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_DESCRIPTION_DESC',
  TasksConnectionVarianceSampleIdAsc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_ID_ASC',
  TasksConnectionVarianceSampleIdDesc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_ID_DESC',
  TasksConnectionVarianceSamplePersonIdAsc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_PERSON_ID_ASC',
  TasksConnectionVarianceSamplePersonIdDesc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_PERSON_ID_DESC',
  TasksConnectionVarianceSampleProjectIdAsc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_PROJECT_ID_ASC',
  TasksConnectionVarianceSampleProjectIdDesc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_PROJECT_ID_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC'
}

export type Person = Node & {
  __typename?: 'Person';
  /** Reads and enables pagination through a set of `Category`. */
  categories: Array<Category>;
  /** Reads and enables pagination through a set of `Category`. */
  categoriesConnection: CategoriesConnection;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `Entry`. */
  entries: Array<Entry>;
  /** Reads and enables pagination through a set of `Entry`. */
  entriesConnection: EntriesConnection;
  id: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `Project`. */
  projects: Array<Project>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsConnection: ProjectsConnection;
  /** Reads and enables pagination through a set of `Task`. */
  tasks: Array<Task>;
  /** Reads and enables pagination through a set of `Task`. */
  tasksConnection: TasksConnection;
  username: Scalars['String']['output'];
};


export type PersonCategoriesArgs = {
  condition?: InputMaybe<CategoryCondition>;
  filter?: InputMaybe<CategoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CategoriesOrderBy>>;
};


export type PersonCategoriesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CategoryCondition>;
  filter?: InputMaybe<CategoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CategoriesOrderBy>>;
};


export type PersonEntriesArgs = {
  condition?: InputMaybe<EntryCondition>;
  filter?: InputMaybe<EntryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EntriesOrderBy>>;
};


export type PersonEntriesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<EntryCondition>;
  filter?: InputMaybe<EntryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EntriesOrderBy>>;
};


export type PersonProjectsArgs = {
  condition?: InputMaybe<ProjectCondition>;
  filter?: InputMaybe<ProjectFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};


export type PersonProjectsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ProjectCondition>;
  filter?: InputMaybe<ProjectFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};


export type PersonTasksArgs = {
  condition?: InputMaybe<TaskCondition>;
  filter?: InputMaybe<TaskFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};


export type PersonTasksConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TaskCondition>;
  filter?: InputMaybe<TaskFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};

export type PersonAggregates = {
  __typename?: 'PersonAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<PersonAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<PersonDistinctCountAggregates>;
  keys?: Maybe<Array<Scalars['String']['output']>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<PersonMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<PersonMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<PersonStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<PersonStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<PersonSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<PersonVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<PersonVarianceSampleAggregates>;
};

export type PersonAverageAggregates = {
  __typename?: 'PersonAverageAggregates';
  /** Mean average of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
};

/** A condition to be used against `Person` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PersonCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `username` field. */
  username?: InputMaybe<Scalars['String']['input']>;
};

export type PersonDistinctCountAggregates = {
  __typename?: 'PersonDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of id across the matching connection */
  id?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of username across the matching connection */
  username?: Maybe<Scalars['BigInt']['output']>;
};

/** A filter to be used against `Person` object types. All fields are combined with a logical ‘and.’ */
export type PersonFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PersonFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PersonFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PersonFilter>>;
  /** Filter by the object’s `username` field. */
  username?: InputMaybe<StringFilter>;
};

/** Grouping methods for `Person` for usage during aggregation. */
export enum PersonGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Username = 'USERNAME'
}

export type PersonHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
};

export type PersonHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
};

/** Conditions for `Person` aggregates. */
export type PersonHavingInput = {
  AND?: InputMaybe<Array<PersonHavingInput>>;
  OR?: InputMaybe<Array<PersonHavingInput>>;
  average?: InputMaybe<PersonHavingAverageInput>;
  distinctCount?: InputMaybe<PersonHavingDistinctCountInput>;
  max?: InputMaybe<PersonHavingMaxInput>;
  maxDate?: InputMaybe<PersonHavingMaxDateInput>;
  min?: InputMaybe<PersonHavingMinInput>;
  minDate?: InputMaybe<PersonHavingMinDateInput>;
  stddevPopulation?: InputMaybe<PersonHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<PersonHavingStddevSampleInput>;
  sum?: InputMaybe<PersonHavingSumInput>;
  variancePopulation?: InputMaybe<PersonHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<PersonHavingVarianceSampleInput>;
};

export type PersonHavingMaxDateInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
};

export type PersonHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
};

export type PersonHavingMinDateInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
};

export type PersonHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
};

export type PersonHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
};

export type PersonHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
};

export type PersonHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
};

export type PersonHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
};

export type PersonHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
};

/** An input for mutations affecting `Person` */
export type PersonInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  username: Scalars['String']['input'];
};

export type PersonMaxAggregates = {
  __typename?: 'PersonMaxAggregates';
  /** Maximum of id across the matching connection */
  id?: Maybe<Scalars['Int']['output']>;
};

export type PersonMinAggregates = {
  __typename?: 'PersonMinAggregates';
  /** Minimum of id across the matching connection */
  id?: Maybe<Scalars['Int']['output']>;
};

/** Represents an update to a `Person`. Fields that are set will be updated. */
export type PersonPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type PersonStddevPopulationAggregates = {
  __typename?: 'PersonStddevPopulationAggregates';
  /** Population standard deviation of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
};

export type PersonStddevSampleAggregates = {
  __typename?: 'PersonStddevSampleAggregates';
  /** Sample standard deviation of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
};

export type PersonSumAggregates = {
  __typename?: 'PersonSumAggregates';
  /** Sum of id across the matching connection */
  id: Scalars['BigInt']['output'];
};

export type PersonVariancePopulationAggregates = {
  __typename?: 'PersonVariancePopulationAggregates';
  /** Population variance of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
};

export type PersonVarianceSampleAggregates = {
  __typename?: 'PersonVarianceSampleAggregates';
  /** Sample variance of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
};

export type Project = Node & {
  __typename?: 'Project';
  /** Reads a single `Category` that is related to this `Project`. */
  category?: Maybe<Category>;
  categoryId: Scalars['Int']['output'];
  createdAt: Scalars['Datetime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Person` that is related to this `Project`. */
  person?: Maybe<Person>;
  personId: Scalars['Int']['output'];
  targetDays?: Maybe<Scalars['Int']['output']>;
  targetMaxTimePerWeek?: Maybe<Scalars['Int']['output']>;
  targetMinTimePerWeek?: Maybe<Scalars['Int']['output']>;
  /** Reads and enables pagination through a set of `Task`. */
  tasks: Array<Task>;
  /** Reads and enables pagination through a set of `Task`. */
  tasksConnection: TasksConnection;
};


export type ProjectTasksArgs = {
  condition?: InputMaybe<TaskCondition>;
  filter?: InputMaybe<TaskFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};


export type ProjectTasksConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TaskCondition>;
  filter?: InputMaybe<TaskFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};

export type ProjectAggregates = {
  __typename?: 'ProjectAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<ProjectAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<ProjectDistinctCountAggregates>;
  keys?: Maybe<Array<Scalars['String']['output']>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<ProjectMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<ProjectMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<ProjectStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<ProjectStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<ProjectSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<ProjectVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<ProjectVarianceSampleAggregates>;
};

export type ProjectAverageAggregates = {
  __typename?: 'ProjectAverageAggregates';
  /** Mean average of categoryId across the matching connection */
  categoryId?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of targetDays across the matching connection */
  targetDays?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of targetMaxTimePerWeek across the matching connection */
  targetMaxTimePerWeek?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of targetMinTimePerWeek across the matching connection */
  targetMinTimePerWeek?: Maybe<Scalars['BigFloat']['output']>;
};

/** A condition to be used against `Project` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ProjectCondition = {
  /** Checks for equality with the object’s `categoryId` field. */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `personId` field. */
  personId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `targetDays` field. */
  targetDays?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `targetMaxTimePerWeek` field. */
  targetMaxTimePerWeek?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `targetMinTimePerWeek` field. */
  targetMinTimePerWeek?: InputMaybe<Scalars['Int']['input']>;
};

export type ProjectDistinctCountAggregates = {
  __typename?: 'ProjectDistinctCountAggregates';
  /** Distinct count of categoryId across the matching connection */
  categoryId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of description across the matching connection */
  description?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of id across the matching connection */
  id?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of personId across the matching connection */
  personId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of targetDays across the matching connection */
  targetDays?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of targetMaxTimePerWeek across the matching connection */
  targetMaxTimePerWeek?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of targetMinTimePerWeek across the matching connection */
  targetMinTimePerWeek?: Maybe<Scalars['BigInt']['output']>;
};

/** A filter to be used against `Project` object types. All fields are combined with a logical ‘and.’ */
export type ProjectFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ProjectFilter>>;
  /** Filter by the object’s `categoryId` field. */
  categoryId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ProjectFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ProjectFilter>>;
  /** Filter by the object’s `personId` field. */
  personId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `targetDays` field. */
  targetDays?: InputMaybe<IntFilter>;
  /** Filter by the object’s `targetMaxTimePerWeek` field. */
  targetMaxTimePerWeek?: InputMaybe<IntFilter>;
  /** Filter by the object’s `targetMinTimePerWeek` field. */
  targetMinTimePerWeek?: InputMaybe<IntFilter>;
};

export type ProjectMaxAggregates = {
  __typename?: 'ProjectMaxAggregates';
  /** Maximum of categoryId across the matching connection */
  categoryId?: Maybe<Scalars['Int']['output']>;
  /** Maximum of id across the matching connection */
  id?: Maybe<Scalars['Int']['output']>;
  /** Maximum of personId across the matching connection */
  personId?: Maybe<Scalars['Int']['output']>;
  /** Maximum of targetDays across the matching connection */
  targetDays?: Maybe<Scalars['Int']['output']>;
  /** Maximum of targetMaxTimePerWeek across the matching connection */
  targetMaxTimePerWeek?: Maybe<Scalars['Int']['output']>;
  /** Maximum of targetMinTimePerWeek across the matching connection */
  targetMinTimePerWeek?: Maybe<Scalars['Int']['output']>;
};

export type ProjectMinAggregates = {
  __typename?: 'ProjectMinAggregates';
  /** Minimum of categoryId across the matching connection */
  categoryId?: Maybe<Scalars['Int']['output']>;
  /** Minimum of id across the matching connection */
  id?: Maybe<Scalars['Int']['output']>;
  /** Minimum of personId across the matching connection */
  personId?: Maybe<Scalars['Int']['output']>;
  /** Minimum of targetDays across the matching connection */
  targetDays?: Maybe<Scalars['Int']['output']>;
  /** Minimum of targetMaxTimePerWeek across the matching connection */
  targetMaxTimePerWeek?: Maybe<Scalars['Int']['output']>;
  /** Minimum of targetMinTimePerWeek across the matching connection */
  targetMinTimePerWeek?: Maybe<Scalars['Int']['output']>;
};

/** Represents an update to a `Project`. Fields that are set will be updated. */
export type ProjectPatch = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  targetDays?: InputMaybe<Scalars['Int']['input']>;
  targetMaxTimePerWeek?: InputMaybe<Scalars['Int']['input']>;
  targetMinTimePerWeek?: InputMaybe<Scalars['Int']['input']>;
};

export type ProjectStddevPopulationAggregates = {
  __typename?: 'ProjectStddevPopulationAggregates';
  /** Population standard deviation of categoryId across the matching connection */
  categoryId?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of targetDays across the matching connection */
  targetDays?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of targetMaxTimePerWeek across the matching connection */
  targetMaxTimePerWeek?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of targetMinTimePerWeek across the matching connection */
  targetMinTimePerWeek?: Maybe<Scalars['BigFloat']['output']>;
};

export type ProjectStddevSampleAggregates = {
  __typename?: 'ProjectStddevSampleAggregates';
  /** Sample standard deviation of categoryId across the matching connection */
  categoryId?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of targetDays across the matching connection */
  targetDays?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of targetMaxTimePerWeek across the matching connection */
  targetMaxTimePerWeek?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of targetMinTimePerWeek across the matching connection */
  targetMinTimePerWeek?: Maybe<Scalars['BigFloat']['output']>;
};

export type ProjectSumAggregates = {
  __typename?: 'ProjectSumAggregates';
  /** Sum of categoryId across the matching connection */
  categoryId: Scalars['BigInt']['output'];
  /** Sum of id across the matching connection */
  id: Scalars['BigInt']['output'];
  /** Sum of personId across the matching connection */
  personId: Scalars['BigInt']['output'];
  /** Sum of targetDays across the matching connection */
  targetDays: Scalars['BigInt']['output'];
  /** Sum of targetMaxTimePerWeek across the matching connection */
  targetMaxTimePerWeek: Scalars['BigInt']['output'];
  /** Sum of targetMinTimePerWeek across the matching connection */
  targetMinTimePerWeek: Scalars['BigInt']['output'];
};

export type ProjectVariancePopulationAggregates = {
  __typename?: 'ProjectVariancePopulationAggregates';
  /** Population variance of categoryId across the matching connection */
  categoryId?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of targetDays across the matching connection */
  targetDays?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of targetMaxTimePerWeek across the matching connection */
  targetMaxTimePerWeek?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of targetMinTimePerWeek across the matching connection */
  targetMinTimePerWeek?: Maybe<Scalars['BigFloat']['output']>;
};

export type ProjectVarianceSampleAggregates = {
  __typename?: 'ProjectVarianceSampleAggregates';
  /** Sample variance of categoryId across the matching connection */
  categoryId?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of targetDays across the matching connection */
  targetDays?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of targetMaxTimePerWeek across the matching connection */
  targetMaxTimePerWeek?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of targetMinTimePerWeek across the matching connection */
  targetMinTimePerWeek?: Maybe<Scalars['BigFloat']['output']>;
};

/** A connection to a list of `Project` values. */
export type ProjectsConnection = {
  __typename?: 'ProjectsConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<ProjectAggregates>;
  /** A list of edges which contains the `Project` and cursor to aid in pagination. */
  edges: Array<ProjectsEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<ProjectAggregates>>;
  /** A list of `Project` objects. */
  nodes: Array<Maybe<Project>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Project` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Project` values. */
export type ProjectsConnectionGroupedAggregatesArgs = {
  groupBy: Array<ProjectsGroupBy>;
  having?: InputMaybe<ProjectsHavingInput>;
};

/** A `Project` edge in the connection. */
export type ProjectsEdge = {
  __typename?: 'ProjectsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Project` at the end of the edge. */
  node?: Maybe<Project>;
};

/** Grouping methods for `Project` for usage during aggregation. */
export enum ProjectsGroupBy {
  CategoryId = 'CATEGORY_ID',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Description = 'DESCRIPTION',
  PersonId = 'PERSON_ID',
  TargetDays = 'TARGET_DAYS',
  TargetMaxTimePerWeek = 'TARGET_MAX_TIME_PER_WEEK',
  TargetMinTimePerWeek = 'TARGET_MIN_TIME_PER_WEEK'
}

export type ProjectsHavingAverageInput = {
  categoryId?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  targetDays?: InputMaybe<HavingIntFilter>;
  targetMaxTimePerWeek?: InputMaybe<HavingIntFilter>;
  targetMinTimePerWeek?: InputMaybe<HavingIntFilter>;
};

export type ProjectsHavingDistinctCountInput = {
  categoryId?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  targetDays?: InputMaybe<HavingIntFilter>;
  targetMaxTimePerWeek?: InputMaybe<HavingIntFilter>;
  targetMinTimePerWeek?: InputMaybe<HavingIntFilter>;
};

/** Conditions for `Project` aggregates. */
export type ProjectsHavingInput = {
  AND?: InputMaybe<Array<ProjectsHavingInput>>;
  OR?: InputMaybe<Array<ProjectsHavingInput>>;
  average?: InputMaybe<ProjectsHavingAverageInput>;
  distinctCount?: InputMaybe<ProjectsHavingDistinctCountInput>;
  max?: InputMaybe<ProjectsHavingMaxInput>;
  maxDate?: InputMaybe<ProjectsHavingMaxDateInput>;
  min?: InputMaybe<ProjectsHavingMinInput>;
  minDate?: InputMaybe<ProjectsHavingMinDateInput>;
  stddevPopulation?: InputMaybe<ProjectsHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<ProjectsHavingStddevSampleInput>;
  sum?: InputMaybe<ProjectsHavingSumInput>;
  variancePopulation?: InputMaybe<ProjectsHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<ProjectsHavingVarianceSampleInput>;
};

export type ProjectsHavingMaxDateInput = {
  categoryId?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  targetDays?: InputMaybe<HavingIntFilter>;
  targetMaxTimePerWeek?: InputMaybe<HavingIntFilter>;
  targetMinTimePerWeek?: InputMaybe<HavingIntFilter>;
};

export type ProjectsHavingMaxInput = {
  categoryId?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  targetDays?: InputMaybe<HavingIntFilter>;
  targetMaxTimePerWeek?: InputMaybe<HavingIntFilter>;
  targetMinTimePerWeek?: InputMaybe<HavingIntFilter>;
};

export type ProjectsHavingMinDateInput = {
  categoryId?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  targetDays?: InputMaybe<HavingIntFilter>;
  targetMaxTimePerWeek?: InputMaybe<HavingIntFilter>;
  targetMinTimePerWeek?: InputMaybe<HavingIntFilter>;
};

export type ProjectsHavingMinInput = {
  categoryId?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  targetDays?: InputMaybe<HavingIntFilter>;
  targetMaxTimePerWeek?: InputMaybe<HavingIntFilter>;
  targetMinTimePerWeek?: InputMaybe<HavingIntFilter>;
};

export type ProjectsHavingStddevPopulationInput = {
  categoryId?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  targetDays?: InputMaybe<HavingIntFilter>;
  targetMaxTimePerWeek?: InputMaybe<HavingIntFilter>;
  targetMinTimePerWeek?: InputMaybe<HavingIntFilter>;
};

export type ProjectsHavingStddevSampleInput = {
  categoryId?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  targetDays?: InputMaybe<HavingIntFilter>;
  targetMaxTimePerWeek?: InputMaybe<HavingIntFilter>;
  targetMinTimePerWeek?: InputMaybe<HavingIntFilter>;
};

export type ProjectsHavingSumInput = {
  categoryId?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  targetDays?: InputMaybe<HavingIntFilter>;
  targetMaxTimePerWeek?: InputMaybe<HavingIntFilter>;
  targetMinTimePerWeek?: InputMaybe<HavingIntFilter>;
};

export type ProjectsHavingVariancePopulationInput = {
  categoryId?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  targetDays?: InputMaybe<HavingIntFilter>;
  targetMaxTimePerWeek?: InputMaybe<HavingIntFilter>;
  targetMinTimePerWeek?: InputMaybe<HavingIntFilter>;
};

export type ProjectsHavingVarianceSampleInput = {
  categoryId?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  targetDays?: InputMaybe<HavingIntFilter>;
  targetMaxTimePerWeek?: InputMaybe<HavingIntFilter>;
  targetMinTimePerWeek?: InputMaybe<HavingIntFilter>;
};

/** Methods to use when ordering `Project`. */
export enum ProjectsOrderBy {
  CategoryIdAsc = 'CATEGORY_ID_ASC',
  CategoryIdDesc = 'CATEGORY_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PersonIdAsc = 'PERSON_ID_ASC',
  PersonIdDesc = 'PERSON_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TargetDaysAsc = 'TARGET_DAYS_ASC',
  TargetDaysDesc = 'TARGET_DAYS_DESC',
  TargetMaxTimePerWeekAsc = 'TARGET_MAX_TIME_PER_WEEK_ASC',
  TargetMaxTimePerWeekDesc = 'TARGET_MAX_TIME_PER_WEEK_DESC',
  TargetMinTimePerWeekAsc = 'TARGET_MIN_TIME_PER_WEEK_ASC',
  TargetMinTimePerWeekDesc = 'TARGET_MIN_TIME_PER_WEEK_DESC',
  TasksConnectionAverageCompleteAsc = 'TASKS_CONNECTION_AVERAGE_COMPLETE_ASC',
  TasksConnectionAverageCompleteDesc = 'TASKS_CONNECTION_AVERAGE_COMPLETE_DESC',
  TasksConnectionAverageCreatedAtAsc = 'TASKS_CONNECTION_AVERAGE_CREATED_AT_ASC',
  TasksConnectionAverageCreatedAtDesc = 'TASKS_CONNECTION_AVERAGE_CREATED_AT_DESC',
  TasksConnectionAverageDescriptionAsc = 'TASKS_CONNECTION_AVERAGE_DESCRIPTION_ASC',
  TasksConnectionAverageDescriptionDesc = 'TASKS_CONNECTION_AVERAGE_DESCRIPTION_DESC',
  TasksConnectionAverageIdAsc = 'TASKS_CONNECTION_AVERAGE_ID_ASC',
  TasksConnectionAverageIdDesc = 'TASKS_CONNECTION_AVERAGE_ID_DESC',
  TasksConnectionAveragePersonIdAsc = 'TASKS_CONNECTION_AVERAGE_PERSON_ID_ASC',
  TasksConnectionAveragePersonIdDesc = 'TASKS_CONNECTION_AVERAGE_PERSON_ID_DESC',
  TasksConnectionAverageProjectIdAsc = 'TASKS_CONNECTION_AVERAGE_PROJECT_ID_ASC',
  TasksConnectionAverageProjectIdDesc = 'TASKS_CONNECTION_AVERAGE_PROJECT_ID_DESC',
  TasksConnectionCountAsc = 'TASKS_CONNECTION_COUNT_ASC',
  TasksConnectionCountDesc = 'TASKS_CONNECTION_COUNT_DESC',
  TasksConnectionDistinctCountCompleteAsc = 'TASKS_CONNECTION_DISTINCT_COUNT_COMPLETE_ASC',
  TasksConnectionDistinctCountCompleteDesc = 'TASKS_CONNECTION_DISTINCT_COUNT_COMPLETE_DESC',
  TasksConnectionDistinctCountCreatedAtAsc = 'TASKS_CONNECTION_DISTINCT_COUNT_CREATED_AT_ASC',
  TasksConnectionDistinctCountCreatedAtDesc = 'TASKS_CONNECTION_DISTINCT_COUNT_CREATED_AT_DESC',
  TasksConnectionDistinctCountDescriptionAsc = 'TASKS_CONNECTION_DISTINCT_COUNT_DESCRIPTION_ASC',
  TasksConnectionDistinctCountDescriptionDesc = 'TASKS_CONNECTION_DISTINCT_COUNT_DESCRIPTION_DESC',
  TasksConnectionDistinctCountIdAsc = 'TASKS_CONNECTION_DISTINCT_COUNT_ID_ASC',
  TasksConnectionDistinctCountIdDesc = 'TASKS_CONNECTION_DISTINCT_COUNT_ID_DESC',
  TasksConnectionDistinctCountPersonIdAsc = 'TASKS_CONNECTION_DISTINCT_COUNT_PERSON_ID_ASC',
  TasksConnectionDistinctCountPersonIdDesc = 'TASKS_CONNECTION_DISTINCT_COUNT_PERSON_ID_DESC',
  TasksConnectionDistinctCountProjectIdAsc = 'TASKS_CONNECTION_DISTINCT_COUNT_PROJECT_ID_ASC',
  TasksConnectionDistinctCountProjectIdDesc = 'TASKS_CONNECTION_DISTINCT_COUNT_PROJECT_ID_DESC',
  TasksConnectionMaxCompleteAsc = 'TASKS_CONNECTION_MAX_COMPLETE_ASC',
  TasksConnectionMaxCompleteDesc = 'TASKS_CONNECTION_MAX_COMPLETE_DESC',
  TasksConnectionMaxCreatedAtAsc = 'TASKS_CONNECTION_MAX_CREATED_AT_ASC',
  TasksConnectionMaxCreatedAtDesc = 'TASKS_CONNECTION_MAX_CREATED_AT_DESC',
  TasksConnectionMaxDateCompleteAsc = 'TASKS_CONNECTION_MAX_DATE_COMPLETE_ASC',
  TasksConnectionMaxDateCompleteDesc = 'TASKS_CONNECTION_MAX_DATE_COMPLETE_DESC',
  TasksConnectionMaxDateCreatedAtAsc = 'TASKS_CONNECTION_MAX_DATE_CREATED_AT_ASC',
  TasksConnectionMaxDateCreatedAtDesc = 'TASKS_CONNECTION_MAX_DATE_CREATED_AT_DESC',
  TasksConnectionMaxDateDescriptionAsc = 'TASKS_CONNECTION_MAX_DATE_DESCRIPTION_ASC',
  TasksConnectionMaxDateDescriptionDesc = 'TASKS_CONNECTION_MAX_DATE_DESCRIPTION_DESC',
  TasksConnectionMaxDateIdAsc = 'TASKS_CONNECTION_MAX_DATE_ID_ASC',
  TasksConnectionMaxDateIdDesc = 'TASKS_CONNECTION_MAX_DATE_ID_DESC',
  TasksConnectionMaxDatePersonIdAsc = 'TASKS_CONNECTION_MAX_DATE_PERSON_ID_ASC',
  TasksConnectionMaxDatePersonIdDesc = 'TASKS_CONNECTION_MAX_DATE_PERSON_ID_DESC',
  TasksConnectionMaxDateProjectIdAsc = 'TASKS_CONNECTION_MAX_DATE_PROJECT_ID_ASC',
  TasksConnectionMaxDateProjectIdDesc = 'TASKS_CONNECTION_MAX_DATE_PROJECT_ID_DESC',
  TasksConnectionMaxDescriptionAsc = 'TASKS_CONNECTION_MAX_DESCRIPTION_ASC',
  TasksConnectionMaxDescriptionDesc = 'TASKS_CONNECTION_MAX_DESCRIPTION_DESC',
  TasksConnectionMaxIdAsc = 'TASKS_CONNECTION_MAX_ID_ASC',
  TasksConnectionMaxIdDesc = 'TASKS_CONNECTION_MAX_ID_DESC',
  TasksConnectionMaxPersonIdAsc = 'TASKS_CONNECTION_MAX_PERSON_ID_ASC',
  TasksConnectionMaxPersonIdDesc = 'TASKS_CONNECTION_MAX_PERSON_ID_DESC',
  TasksConnectionMaxProjectIdAsc = 'TASKS_CONNECTION_MAX_PROJECT_ID_ASC',
  TasksConnectionMaxProjectIdDesc = 'TASKS_CONNECTION_MAX_PROJECT_ID_DESC',
  TasksConnectionMinCompleteAsc = 'TASKS_CONNECTION_MIN_COMPLETE_ASC',
  TasksConnectionMinCompleteDesc = 'TASKS_CONNECTION_MIN_COMPLETE_DESC',
  TasksConnectionMinCreatedAtAsc = 'TASKS_CONNECTION_MIN_CREATED_AT_ASC',
  TasksConnectionMinCreatedAtDesc = 'TASKS_CONNECTION_MIN_CREATED_AT_DESC',
  TasksConnectionMinDateCompleteAsc = 'TASKS_CONNECTION_MIN_DATE_COMPLETE_ASC',
  TasksConnectionMinDateCompleteDesc = 'TASKS_CONNECTION_MIN_DATE_COMPLETE_DESC',
  TasksConnectionMinDateCreatedAtAsc = 'TASKS_CONNECTION_MIN_DATE_CREATED_AT_ASC',
  TasksConnectionMinDateCreatedAtDesc = 'TASKS_CONNECTION_MIN_DATE_CREATED_AT_DESC',
  TasksConnectionMinDateDescriptionAsc = 'TASKS_CONNECTION_MIN_DATE_DESCRIPTION_ASC',
  TasksConnectionMinDateDescriptionDesc = 'TASKS_CONNECTION_MIN_DATE_DESCRIPTION_DESC',
  TasksConnectionMinDateIdAsc = 'TASKS_CONNECTION_MIN_DATE_ID_ASC',
  TasksConnectionMinDateIdDesc = 'TASKS_CONNECTION_MIN_DATE_ID_DESC',
  TasksConnectionMinDatePersonIdAsc = 'TASKS_CONNECTION_MIN_DATE_PERSON_ID_ASC',
  TasksConnectionMinDatePersonIdDesc = 'TASKS_CONNECTION_MIN_DATE_PERSON_ID_DESC',
  TasksConnectionMinDateProjectIdAsc = 'TASKS_CONNECTION_MIN_DATE_PROJECT_ID_ASC',
  TasksConnectionMinDateProjectIdDesc = 'TASKS_CONNECTION_MIN_DATE_PROJECT_ID_DESC',
  TasksConnectionMinDescriptionAsc = 'TASKS_CONNECTION_MIN_DESCRIPTION_ASC',
  TasksConnectionMinDescriptionDesc = 'TASKS_CONNECTION_MIN_DESCRIPTION_DESC',
  TasksConnectionMinIdAsc = 'TASKS_CONNECTION_MIN_ID_ASC',
  TasksConnectionMinIdDesc = 'TASKS_CONNECTION_MIN_ID_DESC',
  TasksConnectionMinPersonIdAsc = 'TASKS_CONNECTION_MIN_PERSON_ID_ASC',
  TasksConnectionMinPersonIdDesc = 'TASKS_CONNECTION_MIN_PERSON_ID_DESC',
  TasksConnectionMinProjectIdAsc = 'TASKS_CONNECTION_MIN_PROJECT_ID_ASC',
  TasksConnectionMinProjectIdDesc = 'TASKS_CONNECTION_MIN_PROJECT_ID_DESC',
  TasksConnectionStddevPopulationCompleteAsc = 'TASKS_CONNECTION_STDDEV_POPULATION_COMPLETE_ASC',
  TasksConnectionStddevPopulationCompleteDesc = 'TASKS_CONNECTION_STDDEV_POPULATION_COMPLETE_DESC',
  TasksConnectionStddevPopulationCreatedAtAsc = 'TASKS_CONNECTION_STDDEV_POPULATION_CREATED_AT_ASC',
  TasksConnectionStddevPopulationCreatedAtDesc = 'TASKS_CONNECTION_STDDEV_POPULATION_CREATED_AT_DESC',
  TasksConnectionStddevPopulationDescriptionAsc = 'TASKS_CONNECTION_STDDEV_POPULATION_DESCRIPTION_ASC',
  TasksConnectionStddevPopulationDescriptionDesc = 'TASKS_CONNECTION_STDDEV_POPULATION_DESCRIPTION_DESC',
  TasksConnectionStddevPopulationIdAsc = 'TASKS_CONNECTION_STDDEV_POPULATION_ID_ASC',
  TasksConnectionStddevPopulationIdDesc = 'TASKS_CONNECTION_STDDEV_POPULATION_ID_DESC',
  TasksConnectionStddevPopulationPersonIdAsc = 'TASKS_CONNECTION_STDDEV_POPULATION_PERSON_ID_ASC',
  TasksConnectionStddevPopulationPersonIdDesc = 'TASKS_CONNECTION_STDDEV_POPULATION_PERSON_ID_DESC',
  TasksConnectionStddevPopulationProjectIdAsc = 'TASKS_CONNECTION_STDDEV_POPULATION_PROJECT_ID_ASC',
  TasksConnectionStddevPopulationProjectIdDesc = 'TASKS_CONNECTION_STDDEV_POPULATION_PROJECT_ID_DESC',
  TasksConnectionStddevSampleCompleteAsc = 'TASKS_CONNECTION_STDDEV_SAMPLE_COMPLETE_ASC',
  TasksConnectionStddevSampleCompleteDesc = 'TASKS_CONNECTION_STDDEV_SAMPLE_COMPLETE_DESC',
  TasksConnectionStddevSampleCreatedAtAsc = 'TASKS_CONNECTION_STDDEV_SAMPLE_CREATED_AT_ASC',
  TasksConnectionStddevSampleCreatedAtDesc = 'TASKS_CONNECTION_STDDEV_SAMPLE_CREATED_AT_DESC',
  TasksConnectionStddevSampleDescriptionAsc = 'TASKS_CONNECTION_STDDEV_SAMPLE_DESCRIPTION_ASC',
  TasksConnectionStddevSampleDescriptionDesc = 'TASKS_CONNECTION_STDDEV_SAMPLE_DESCRIPTION_DESC',
  TasksConnectionStddevSampleIdAsc = 'TASKS_CONNECTION_STDDEV_SAMPLE_ID_ASC',
  TasksConnectionStddevSampleIdDesc = 'TASKS_CONNECTION_STDDEV_SAMPLE_ID_DESC',
  TasksConnectionStddevSamplePersonIdAsc = 'TASKS_CONNECTION_STDDEV_SAMPLE_PERSON_ID_ASC',
  TasksConnectionStddevSamplePersonIdDesc = 'TASKS_CONNECTION_STDDEV_SAMPLE_PERSON_ID_DESC',
  TasksConnectionStddevSampleProjectIdAsc = 'TASKS_CONNECTION_STDDEV_SAMPLE_PROJECT_ID_ASC',
  TasksConnectionStddevSampleProjectIdDesc = 'TASKS_CONNECTION_STDDEV_SAMPLE_PROJECT_ID_DESC',
  TasksConnectionSumCompleteAsc = 'TASKS_CONNECTION_SUM_COMPLETE_ASC',
  TasksConnectionSumCompleteDesc = 'TASKS_CONNECTION_SUM_COMPLETE_DESC',
  TasksConnectionSumCreatedAtAsc = 'TASKS_CONNECTION_SUM_CREATED_AT_ASC',
  TasksConnectionSumCreatedAtDesc = 'TASKS_CONNECTION_SUM_CREATED_AT_DESC',
  TasksConnectionSumDescriptionAsc = 'TASKS_CONNECTION_SUM_DESCRIPTION_ASC',
  TasksConnectionSumDescriptionDesc = 'TASKS_CONNECTION_SUM_DESCRIPTION_DESC',
  TasksConnectionSumIdAsc = 'TASKS_CONNECTION_SUM_ID_ASC',
  TasksConnectionSumIdDesc = 'TASKS_CONNECTION_SUM_ID_DESC',
  TasksConnectionSumPersonIdAsc = 'TASKS_CONNECTION_SUM_PERSON_ID_ASC',
  TasksConnectionSumPersonIdDesc = 'TASKS_CONNECTION_SUM_PERSON_ID_DESC',
  TasksConnectionSumProjectIdAsc = 'TASKS_CONNECTION_SUM_PROJECT_ID_ASC',
  TasksConnectionSumProjectIdDesc = 'TASKS_CONNECTION_SUM_PROJECT_ID_DESC',
  TasksConnectionVariancePopulationCompleteAsc = 'TASKS_CONNECTION_VARIANCE_POPULATION_COMPLETE_ASC',
  TasksConnectionVariancePopulationCompleteDesc = 'TASKS_CONNECTION_VARIANCE_POPULATION_COMPLETE_DESC',
  TasksConnectionVariancePopulationCreatedAtAsc = 'TASKS_CONNECTION_VARIANCE_POPULATION_CREATED_AT_ASC',
  TasksConnectionVariancePopulationCreatedAtDesc = 'TASKS_CONNECTION_VARIANCE_POPULATION_CREATED_AT_DESC',
  TasksConnectionVariancePopulationDescriptionAsc = 'TASKS_CONNECTION_VARIANCE_POPULATION_DESCRIPTION_ASC',
  TasksConnectionVariancePopulationDescriptionDesc = 'TASKS_CONNECTION_VARIANCE_POPULATION_DESCRIPTION_DESC',
  TasksConnectionVariancePopulationIdAsc = 'TASKS_CONNECTION_VARIANCE_POPULATION_ID_ASC',
  TasksConnectionVariancePopulationIdDesc = 'TASKS_CONNECTION_VARIANCE_POPULATION_ID_DESC',
  TasksConnectionVariancePopulationPersonIdAsc = 'TASKS_CONNECTION_VARIANCE_POPULATION_PERSON_ID_ASC',
  TasksConnectionVariancePopulationPersonIdDesc = 'TASKS_CONNECTION_VARIANCE_POPULATION_PERSON_ID_DESC',
  TasksConnectionVariancePopulationProjectIdAsc = 'TASKS_CONNECTION_VARIANCE_POPULATION_PROJECT_ID_ASC',
  TasksConnectionVariancePopulationProjectIdDesc = 'TASKS_CONNECTION_VARIANCE_POPULATION_PROJECT_ID_DESC',
  TasksConnectionVarianceSampleCompleteAsc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_COMPLETE_ASC',
  TasksConnectionVarianceSampleCompleteDesc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_COMPLETE_DESC',
  TasksConnectionVarianceSampleCreatedAtAsc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_CREATED_AT_ASC',
  TasksConnectionVarianceSampleCreatedAtDesc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_CREATED_AT_DESC',
  TasksConnectionVarianceSampleDescriptionAsc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_DESCRIPTION_ASC',
  TasksConnectionVarianceSampleDescriptionDesc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_DESCRIPTION_DESC',
  TasksConnectionVarianceSampleIdAsc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_ID_ASC',
  TasksConnectionVarianceSampleIdDesc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_ID_DESC',
  TasksConnectionVarianceSamplePersonIdAsc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_PERSON_ID_ASC',
  TasksConnectionVarianceSamplePersonIdDesc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_PERSON_ID_DESC',
  TasksConnectionVarianceSampleProjectIdAsc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_PROJECT_ID_ASC',
  TasksConnectionVarianceSampleProjectIdDesc = 'TASKS_CONNECTION_VARIANCE_SAMPLE_PROJECT_ID_DESC'
}

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Reads a set of `Category`. */
  categories?: Maybe<Array<Category>>;
  /** Reads and enables pagination through a set of `Category`. */
  categoriesConnection?: Maybe<CategoriesConnection>;
  category?: Maybe<Category>;
  /** Reads a single `Category` using its globally unique `ID`. */
  categoryByNodeId?: Maybe<Category>;
  currentUserId?: Maybe<Scalars['Int']['output']>;
  /** Reads a set of `Entry`. */
  entries?: Maybe<Array<Entry>>;
  /** Reads and enables pagination through a set of `Entry`. */
  entriesConnection?: Maybe<EntriesConnection>;
  entry?: Maybe<Entry>;
  /** Reads a single `Entry` using its globally unique `ID`. */
  entryByNodeId?: Maybe<Entry>;
  hexToHighContrast?: Maybe<Scalars['Boolean']['output']>;
  /** Gets the person who was identified by our JWT. */
  me?: Maybe<Person>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID']['output'];
  /** Reads a set of `Person`. */
  people?: Maybe<Array<Person>>;
  /** Reads and enables pagination through a set of `Person`. */
  peopleConnection?: Maybe<PeopleConnection>;
  person?: Maybe<Person>;
  /** Reads a single `Person` using its globally unique `ID`. */
  personByNodeId?: Maybe<Person>;
  project?: Maybe<Project>;
  /** Reads a single `Project` using its globally unique `ID`. */
  projectByNodeId?: Maybe<Project>;
  /** Reads a set of `Project`. */
  projects?: Maybe<Array<Project>>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsConnection?: Maybe<ProjectsConnection>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** Reads a set of `Stat`. */
  stats?: Maybe<Array<Stat>>;
  /** Reads and enables pagination through a set of `Stat`. */
  statsConnection?: Maybe<StatsConnection>;
  task?: Maybe<Task>;
  /** Reads a single `Task` using its globally unique `ID`. */
  taskByNodeId?: Maybe<Task>;
  /** Reads a set of `Task`. */
  tasks?: Maybe<Array<Task>>;
  /** Reads and enables pagination through a set of `Task`. */
  tasksConnection?: Maybe<TasksConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCategoriesArgs = {
  condition?: InputMaybe<CategoryCondition>;
  filter?: InputMaybe<CategoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CategoriesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCategoriesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CategoryCondition>;
  filter?: InputMaybe<CategoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CategoriesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCategoryArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCategoryByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEntriesArgs = {
  condition?: InputMaybe<EntryCondition>;
  filter?: InputMaybe<EntryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EntriesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEntriesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<EntryCondition>;
  filter?: InputMaybe<EntryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EntriesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEntryArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEntryByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryHexToHighContrastArgs = {
  hexCode?: InputMaybe<Scalars['String']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPeopleArgs = {
  condition?: InputMaybe<PersonCondition>;
  filter?: InputMaybe<PersonFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PeopleOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPeopleConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PersonCondition>;
  filter?: InputMaybe<PersonFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PeopleOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPersonArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPersonByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectsArgs = {
  condition?: InputMaybe<ProjectCondition>;
  filter?: InputMaybe<ProjectFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ProjectCondition>;
  filter?: InputMaybe<ProjectFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryStatsArgs = {
  condition?: InputMaybe<StatCondition>;
  filter?: InputMaybe<StatFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StatsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryStatsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<StatCondition>;
  filter?: InputMaybe<StatFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StatsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTaskArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTaskByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTasksArgs = {
  condition?: InputMaybe<TaskCondition>;
  filter?: InputMaybe<TaskFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTasksConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TaskCondition>;
  filter?: InputMaybe<TaskFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};

/** All input for the `reorderEntries` mutation. */
export type ReorderEntriesInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  entryOrders?: InputMaybe<Array<InputMaybe<EntryOrderInput>>>;
};

/** The output of our `reorderEntries` mutation. */
export type ReorderEntriesPayload = {
  __typename?: 'ReorderEntriesPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  entries?: Maybe<Array<Maybe<Entry>>>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `restartEntry` mutation. */
export type RestartEntryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** The output of our `restartEntry` mutation. */
export type RestartEntryPayload = {
  __typename?: 'RestartEntryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  entry?: Maybe<Entry>;
  /** An edge for our `Entry`. May be used by Relay 1. */
  entryEdge?: Maybe<EntriesEdge>;
  /** Reads a single `Person` that is related to this `Entry`. */
  person?: Maybe<Person>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Task` that is related to this `Entry`. */
  task?: Maybe<Task>;
};


/** The output of our `restartEntry` mutation. */
export type RestartEntryPayloadEntryEdgeArgs = {
  orderBy?: InputMaybe<Array<EntriesOrderBy>>;
};

/** All input for the `signIn` mutation. */
export type SignInInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** The output of our `signIn` mutation. */
export type SignInPayload = {
  __typename?: 'SignInPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  jwtToken?: Maybe<Scalars['JwtToken']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `signUp` mutation. */
export type SignUpInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

/** The output of our `signUp` mutation. */
export type SignUpPayload = {
  __typename?: 'SignUpPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  jwtToken?: Maybe<Scalars['JwtToken']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `startEntry` mutation. */
export type StartEntryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** The output of our `startEntry` mutation. */
export type StartEntryPayload = {
  __typename?: 'StartEntryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  entry?: Maybe<Entry>;
  /** An edge for our `Entry`. May be used by Relay 1. */
  entryEdge?: Maybe<EntriesEdge>;
  /** Reads a single `Person` that is related to this `Entry`. */
  person?: Maybe<Person>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Task` that is related to this `Entry`. */
  task?: Maybe<Task>;
};


/** The output of our `startEntry` mutation. */
export type StartEntryPayloadEntryEdgeArgs = {
  orderBy?: InputMaybe<Array<EntriesOrderBy>>;
};

export type Stat = {
  __typename?: 'Stat';
  categoryDescription?: Maybe<Scalars['String']['output']>;
  categoryId?: Maybe<Scalars['Int']['output']>;
  entryComplete?: Maybe<Scalars['Boolean']['output']>;
  entryCreatedAt?: Maybe<Scalars['Datetime']['output']>;
  entryDate?: Maybe<Scalars['String']['output']>;
  entryDescription?: Maybe<Scalars['String']['output']>;
  entryId?: Maybe<Scalars['Int']['output']>;
  entryTimerEstimatedTime?: Maybe<Scalars['Int']['output']>;
  entryTimerTrackedTime?: Maybe<Scalars['Int']['output']>;
  entryWeekNumber?: Maybe<Scalars['String']['output']>;
  personId?: Maybe<Scalars['Int']['output']>;
  projectDescription?: Maybe<Scalars['String']['output']>;
  projectId?: Maybe<Scalars['Int']['output']>;
  taskDescription?: Maybe<Scalars['String']['output']>;
  taskId?: Maybe<Scalars['Int']['output']>;
};

export type StatAggregates = {
  __typename?: 'StatAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<StatAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<StatDistinctCountAggregates>;
  keys?: Maybe<Array<Scalars['String']['output']>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<StatMaxAggregates>;
  /** Maximum date aggregates across the matching connection (ignoring before/after/first/last/offset) */
  maxDate?: Maybe<StatMaxDateAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<StatMinAggregates>;
  /** Minimum date aggregates across the matching connection (ignoring before/after/first/last/offset) */
  minDate?: Maybe<StatMinDateAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<StatStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<StatStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<StatSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<StatVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<StatVarianceSampleAggregates>;
};

export type StatAverageAggregates = {
  __typename?: 'StatAverageAggregates';
  /** Mean average of categoryId across the matching connection */
  categoryId?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of entryId across the matching connection */
  entryId?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of entryTimerEstimatedTime across the matching connection */
  entryTimerEstimatedTime?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of entryTimerTrackedTime across the matching connection */
  entryTimerTrackedTime?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of projectId across the matching connection */
  projectId?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of taskId across the matching connection */
  taskId?: Maybe<Scalars['BigFloat']['output']>;
};

/** A condition to be used against `Stat` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type StatCondition = {
  /** Checks for equality with the object’s `categoryDescription` field. */
  categoryDescription?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `categoryId` field. */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `entryComplete` field. */
  entryComplete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `entryCreatedAt` field. */
  entryCreatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `entryDate` field. */
  entryDate?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `entryDescription` field. */
  entryDescription?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `entryId` field. */
  entryId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `entryTimerEstimatedTime` field. */
  entryTimerEstimatedTime?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `entryTimerTrackedTime` field. */
  entryTimerTrackedTime?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `entryWeekNumber` field. */
  entryWeekNumber?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `personId` field. */
  personId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `projectDescription` field. */
  projectDescription?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `taskDescription` field. */
  taskDescription?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `taskId` field. */
  taskId?: InputMaybe<Scalars['Int']['input']>;
};

export type StatDistinctCountAggregates = {
  __typename?: 'StatDistinctCountAggregates';
  /** Distinct count of categoryDescription across the matching connection */
  categoryDescription?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of categoryId across the matching connection */
  categoryId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of entryComplete across the matching connection */
  entryComplete?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of entryCreatedAt across the matching connection */
  entryCreatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of entryDate across the matching connection */
  entryDate?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of entryDescription across the matching connection */
  entryDescription?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of entryId across the matching connection */
  entryId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of entryTimerEstimatedTime across the matching connection */
  entryTimerEstimatedTime?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of entryTimerTrackedTime across the matching connection */
  entryTimerTrackedTime?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of entryWeekNumber across the matching connection */
  entryWeekNumber?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of personId across the matching connection */
  personId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of projectDescription across the matching connection */
  projectDescription?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of projectId across the matching connection */
  projectId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of taskDescription across the matching connection */
  taskDescription?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of taskId across the matching connection */
  taskId?: Maybe<Scalars['BigInt']['output']>;
};

/** A filter to be used against `Stat` object types. All fields are combined with a logical ‘and.’ */
export type StatFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<StatFilter>>;
  /** Filter by the object’s `categoryDescription` field. */
  categoryDescription?: InputMaybe<StringFilter>;
  /** Filter by the object’s `categoryId` field. */
  categoryId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `entryComplete` field. */
  entryComplete?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `entryCreatedAt` field. */
  entryCreatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `entryDate` field. */
  entryDate?: InputMaybe<StringFilter>;
  /** Filter by the object’s `entryDescription` field. */
  entryDescription?: InputMaybe<StringFilter>;
  /** Filter by the object’s `entryId` field. */
  entryId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `entryTimerEstimatedTime` field. */
  entryTimerEstimatedTime?: InputMaybe<IntFilter>;
  /** Filter by the object’s `entryTimerTrackedTime` field. */
  entryTimerTrackedTime?: InputMaybe<IntFilter>;
  /** Filter by the object’s `entryWeekNumber` field. */
  entryWeekNumber?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<StatFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<StatFilter>>;
  /** Filter by the object’s `personId` field. */
  personId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `projectDescription` field. */
  projectDescription?: InputMaybe<StringFilter>;
  /** Filter by the object’s `projectId` field. */
  projectId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `taskDescription` field. */
  taskDescription?: InputMaybe<StringFilter>;
  /** Filter by the object’s `taskId` field. */
  taskId?: InputMaybe<IntFilter>;
};

export type StatMaxAggregates = {
  __typename?: 'StatMaxAggregates';
  /** Maximum of categoryId across the matching connection */
  categoryId?: Maybe<Scalars['Int']['output']>;
  /** Maximum of entryId across the matching connection */
  entryId?: Maybe<Scalars['Int']['output']>;
  /** Maximum of entryTimerEstimatedTime across the matching connection */
  entryTimerEstimatedTime?: Maybe<Scalars['Int']['output']>;
  /** Maximum of entryTimerTrackedTime across the matching connection */
  entryTimerTrackedTime?: Maybe<Scalars['Int']['output']>;
  /** Maximum of personId across the matching connection */
  personId?: Maybe<Scalars['Int']['output']>;
  /** Maximum of projectId across the matching connection */
  projectId?: Maybe<Scalars['Int']['output']>;
  /** Maximum of taskId across the matching connection */
  taskId?: Maybe<Scalars['Int']['output']>;
};

export type StatMaxDateAggregates = {
  __typename?: 'StatMaxDateAggregates';
  /** Maximum date of entryDate across the matching connection */
  entryDate?: Maybe<Scalars['String']['output']>;
};

export type StatMinAggregates = {
  __typename?: 'StatMinAggregates';
  /** Minimum of categoryId across the matching connection */
  categoryId?: Maybe<Scalars['Int']['output']>;
  /** Minimum of entryId across the matching connection */
  entryId?: Maybe<Scalars['Int']['output']>;
  /** Minimum of entryTimerEstimatedTime across the matching connection */
  entryTimerEstimatedTime?: Maybe<Scalars['Int']['output']>;
  /** Minimum of entryTimerTrackedTime across the matching connection */
  entryTimerTrackedTime?: Maybe<Scalars['Int']['output']>;
  /** Minimum of personId across the matching connection */
  personId?: Maybe<Scalars['Int']['output']>;
  /** Minimum of projectId across the matching connection */
  projectId?: Maybe<Scalars['Int']['output']>;
  /** Minimum of taskId across the matching connection */
  taskId?: Maybe<Scalars['Int']['output']>;
};

export type StatMinDateAggregates = {
  __typename?: 'StatMinDateAggregates';
  /** Minimum date of entryDate across the matching connection */
  entryDate?: Maybe<Scalars['String']['output']>;
};

export type StatStddevPopulationAggregates = {
  __typename?: 'StatStddevPopulationAggregates';
  /** Population standard deviation of categoryId across the matching connection */
  categoryId?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of entryId across the matching connection */
  entryId?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of entryTimerEstimatedTime across the matching connection */
  entryTimerEstimatedTime?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of entryTimerTrackedTime across the matching connection */
  entryTimerTrackedTime?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of projectId across the matching connection */
  projectId?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of taskId across the matching connection */
  taskId?: Maybe<Scalars['BigFloat']['output']>;
};

export type StatStddevSampleAggregates = {
  __typename?: 'StatStddevSampleAggregates';
  /** Sample standard deviation of categoryId across the matching connection */
  categoryId?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of entryId across the matching connection */
  entryId?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of entryTimerEstimatedTime across the matching connection */
  entryTimerEstimatedTime?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of entryTimerTrackedTime across the matching connection */
  entryTimerTrackedTime?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of projectId across the matching connection */
  projectId?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of taskId across the matching connection */
  taskId?: Maybe<Scalars['BigFloat']['output']>;
};

export type StatSumAggregates = {
  __typename?: 'StatSumAggregates';
  /** Sum of categoryId across the matching connection */
  categoryId: Scalars['BigInt']['output'];
  /** Sum of entryId across the matching connection */
  entryId: Scalars['BigInt']['output'];
  /** Sum of entryTimerEstimatedTime across the matching connection */
  entryTimerEstimatedTime: Scalars['BigInt']['output'];
  /** Sum of entryTimerTrackedTime across the matching connection */
  entryTimerTrackedTime: Scalars['BigInt']['output'];
  /** Sum of personId across the matching connection */
  personId: Scalars['BigInt']['output'];
  /** Sum of projectId across the matching connection */
  projectId: Scalars['BigInt']['output'];
  /** Sum of taskId across the matching connection */
  taskId: Scalars['BigInt']['output'];
};

export type StatVariancePopulationAggregates = {
  __typename?: 'StatVariancePopulationAggregates';
  /** Population variance of categoryId across the matching connection */
  categoryId?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of entryId across the matching connection */
  entryId?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of entryTimerEstimatedTime across the matching connection */
  entryTimerEstimatedTime?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of entryTimerTrackedTime across the matching connection */
  entryTimerTrackedTime?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of projectId across the matching connection */
  projectId?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of taskId across the matching connection */
  taskId?: Maybe<Scalars['BigFloat']['output']>;
};

export type StatVarianceSampleAggregates = {
  __typename?: 'StatVarianceSampleAggregates';
  /** Sample variance of categoryId across the matching connection */
  categoryId?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of entryId across the matching connection */
  entryId?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of entryTimerEstimatedTime across the matching connection */
  entryTimerEstimatedTime?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of entryTimerTrackedTime across the matching connection */
  entryTimerTrackedTime?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of projectId across the matching connection */
  projectId?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of taskId across the matching connection */
  taskId?: Maybe<Scalars['BigFloat']['output']>;
};

/** A connection to a list of `Stat` values. */
export type StatsConnection = {
  __typename?: 'StatsConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<StatAggregates>;
  /** A list of edges which contains the `Stat` and cursor to aid in pagination. */
  edges: Array<StatsEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<StatAggregates>>;
  /** A list of `Stat` objects. */
  nodes: Array<Maybe<Stat>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Stat` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Stat` values. */
export type StatsConnectionGroupedAggregatesArgs = {
  groupBy: Array<StatsGroupBy>;
  having?: InputMaybe<StatsHavingInput>;
};

/** A `Stat` edge in the connection. */
export type StatsEdge = {
  __typename?: 'StatsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Stat` at the end of the edge. */
  node?: Maybe<Stat>;
};

/** Grouping methods for `Stat` for usage during aggregation. */
export enum StatsGroupBy {
  CategoryDescription = 'CATEGORY_DESCRIPTION',
  CategoryId = 'CATEGORY_ID',
  EntryComplete = 'ENTRY_COMPLETE',
  EntryCreatedAt = 'ENTRY_CREATED_AT',
  EntryCreatedAtTruncatedToDay = 'ENTRY_CREATED_AT_TRUNCATED_TO_DAY',
  EntryCreatedAtTruncatedToHour = 'ENTRY_CREATED_AT_TRUNCATED_TO_HOUR',
  EntryDate = 'ENTRY_DATE',
  EntryDateMonth = 'ENTRY_DATE_MONTH',
  EntryDescription = 'ENTRY_DESCRIPTION',
  EntryId = 'ENTRY_ID',
  EntryTimerEstimatedTime = 'ENTRY_TIMER_ESTIMATED_TIME',
  EntryTimerTrackedTime = 'ENTRY_TIMER_TRACKED_TIME',
  EntryWeekNumber = 'ENTRY_WEEK_NUMBER',
  PersonId = 'PERSON_ID',
  ProjectDescription = 'PROJECT_DESCRIPTION',
  ProjectId = 'PROJECT_ID',
  TaskDescription = 'TASK_DESCRIPTION',
  TaskId = 'TASK_ID'
}

export type StatsHavingAverageInput = {
  categoryId?: InputMaybe<HavingIntFilter>;
  entryCreatedAt?: InputMaybe<HavingDatetimeFilter>;
  entryId?: InputMaybe<HavingIntFilter>;
  entryTimerEstimatedTime?: InputMaybe<HavingIntFilter>;
  entryTimerTrackedTime?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  projectId?: InputMaybe<HavingIntFilter>;
  taskId?: InputMaybe<HavingIntFilter>;
};

export type StatsHavingDistinctCountInput = {
  categoryId?: InputMaybe<HavingIntFilter>;
  entryCreatedAt?: InputMaybe<HavingDatetimeFilter>;
  entryId?: InputMaybe<HavingIntFilter>;
  entryTimerEstimatedTime?: InputMaybe<HavingIntFilter>;
  entryTimerTrackedTime?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  projectId?: InputMaybe<HavingIntFilter>;
  taskId?: InputMaybe<HavingIntFilter>;
};

/** Conditions for `Stat` aggregates. */
export type StatsHavingInput = {
  AND?: InputMaybe<Array<StatsHavingInput>>;
  OR?: InputMaybe<Array<StatsHavingInput>>;
  average?: InputMaybe<StatsHavingAverageInput>;
  distinctCount?: InputMaybe<StatsHavingDistinctCountInput>;
  max?: InputMaybe<StatsHavingMaxInput>;
  maxDate?: InputMaybe<StatsHavingMaxDateInput>;
  min?: InputMaybe<StatsHavingMinInput>;
  minDate?: InputMaybe<StatsHavingMinDateInput>;
  stddevPopulation?: InputMaybe<StatsHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<StatsHavingStddevSampleInput>;
  sum?: InputMaybe<StatsHavingSumInput>;
  variancePopulation?: InputMaybe<StatsHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<StatsHavingVarianceSampleInput>;
};

export type StatsHavingMaxDateInput = {
  categoryId?: InputMaybe<HavingIntFilter>;
  entryCreatedAt?: InputMaybe<HavingDatetimeFilter>;
  entryId?: InputMaybe<HavingIntFilter>;
  entryTimerEstimatedTime?: InputMaybe<HavingIntFilter>;
  entryTimerTrackedTime?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  projectId?: InputMaybe<HavingIntFilter>;
  taskId?: InputMaybe<HavingIntFilter>;
};

export type StatsHavingMaxInput = {
  categoryId?: InputMaybe<HavingIntFilter>;
  entryCreatedAt?: InputMaybe<HavingDatetimeFilter>;
  entryId?: InputMaybe<HavingIntFilter>;
  entryTimerEstimatedTime?: InputMaybe<HavingIntFilter>;
  entryTimerTrackedTime?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  projectId?: InputMaybe<HavingIntFilter>;
  taskId?: InputMaybe<HavingIntFilter>;
};

export type StatsHavingMinDateInput = {
  categoryId?: InputMaybe<HavingIntFilter>;
  entryCreatedAt?: InputMaybe<HavingDatetimeFilter>;
  entryId?: InputMaybe<HavingIntFilter>;
  entryTimerEstimatedTime?: InputMaybe<HavingIntFilter>;
  entryTimerTrackedTime?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  projectId?: InputMaybe<HavingIntFilter>;
  taskId?: InputMaybe<HavingIntFilter>;
};

export type StatsHavingMinInput = {
  categoryId?: InputMaybe<HavingIntFilter>;
  entryCreatedAt?: InputMaybe<HavingDatetimeFilter>;
  entryId?: InputMaybe<HavingIntFilter>;
  entryTimerEstimatedTime?: InputMaybe<HavingIntFilter>;
  entryTimerTrackedTime?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  projectId?: InputMaybe<HavingIntFilter>;
  taskId?: InputMaybe<HavingIntFilter>;
};

export type StatsHavingStddevPopulationInput = {
  categoryId?: InputMaybe<HavingIntFilter>;
  entryCreatedAt?: InputMaybe<HavingDatetimeFilter>;
  entryId?: InputMaybe<HavingIntFilter>;
  entryTimerEstimatedTime?: InputMaybe<HavingIntFilter>;
  entryTimerTrackedTime?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  projectId?: InputMaybe<HavingIntFilter>;
  taskId?: InputMaybe<HavingIntFilter>;
};

export type StatsHavingStddevSampleInput = {
  categoryId?: InputMaybe<HavingIntFilter>;
  entryCreatedAt?: InputMaybe<HavingDatetimeFilter>;
  entryId?: InputMaybe<HavingIntFilter>;
  entryTimerEstimatedTime?: InputMaybe<HavingIntFilter>;
  entryTimerTrackedTime?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  projectId?: InputMaybe<HavingIntFilter>;
  taskId?: InputMaybe<HavingIntFilter>;
};

export type StatsHavingSumInput = {
  categoryId?: InputMaybe<HavingIntFilter>;
  entryCreatedAt?: InputMaybe<HavingDatetimeFilter>;
  entryId?: InputMaybe<HavingIntFilter>;
  entryTimerEstimatedTime?: InputMaybe<HavingIntFilter>;
  entryTimerTrackedTime?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  projectId?: InputMaybe<HavingIntFilter>;
  taskId?: InputMaybe<HavingIntFilter>;
};

export type StatsHavingVariancePopulationInput = {
  categoryId?: InputMaybe<HavingIntFilter>;
  entryCreatedAt?: InputMaybe<HavingDatetimeFilter>;
  entryId?: InputMaybe<HavingIntFilter>;
  entryTimerEstimatedTime?: InputMaybe<HavingIntFilter>;
  entryTimerTrackedTime?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  projectId?: InputMaybe<HavingIntFilter>;
  taskId?: InputMaybe<HavingIntFilter>;
};

export type StatsHavingVarianceSampleInput = {
  categoryId?: InputMaybe<HavingIntFilter>;
  entryCreatedAt?: InputMaybe<HavingDatetimeFilter>;
  entryId?: InputMaybe<HavingIntFilter>;
  entryTimerEstimatedTime?: InputMaybe<HavingIntFilter>;
  entryTimerTrackedTime?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  projectId?: InputMaybe<HavingIntFilter>;
  taskId?: InputMaybe<HavingIntFilter>;
};

/** Methods to use when ordering `Stat`. */
export enum StatsOrderBy {
  CategoryDescriptionAsc = 'CATEGORY_DESCRIPTION_ASC',
  CategoryDescriptionDesc = 'CATEGORY_DESCRIPTION_DESC',
  CategoryIdAsc = 'CATEGORY_ID_ASC',
  CategoryIdDesc = 'CATEGORY_ID_DESC',
  EntryCompleteAsc = 'ENTRY_COMPLETE_ASC',
  EntryCompleteDesc = 'ENTRY_COMPLETE_DESC',
  EntryCreatedAtAsc = 'ENTRY_CREATED_AT_ASC',
  EntryCreatedAtDesc = 'ENTRY_CREATED_AT_DESC',
  EntryDateAsc = 'ENTRY_DATE_ASC',
  EntryDateDesc = 'ENTRY_DATE_DESC',
  EntryDescriptionAsc = 'ENTRY_DESCRIPTION_ASC',
  EntryDescriptionDesc = 'ENTRY_DESCRIPTION_DESC',
  EntryIdAsc = 'ENTRY_ID_ASC',
  EntryIdDesc = 'ENTRY_ID_DESC',
  EntryTimerEstimatedTimeAsc = 'ENTRY_TIMER_ESTIMATED_TIME_ASC',
  EntryTimerEstimatedTimeDesc = 'ENTRY_TIMER_ESTIMATED_TIME_DESC',
  EntryTimerTrackedTimeAsc = 'ENTRY_TIMER_TRACKED_TIME_ASC',
  EntryTimerTrackedTimeDesc = 'ENTRY_TIMER_TRACKED_TIME_DESC',
  EntryWeekNumberAsc = 'ENTRY_WEEK_NUMBER_ASC',
  EntryWeekNumberDesc = 'ENTRY_WEEK_NUMBER_DESC',
  Natural = 'NATURAL',
  PersonIdAsc = 'PERSON_ID_ASC',
  PersonIdDesc = 'PERSON_ID_DESC',
  ProjectDescriptionAsc = 'PROJECT_DESCRIPTION_ASC',
  ProjectDescriptionDesc = 'PROJECT_DESCRIPTION_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  TaskDescriptionAsc = 'TASK_DESCRIPTION_ASC',
  TaskDescriptionDesc = 'TASK_DESCRIPTION_DESC',
  TaskIdAsc = 'TASK_ID_ASC',
  TaskIdDesc = 'TASK_ID_DESC'
}

/** All input for the `stopEntry` mutation. */
export type StopEntryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** The output of our `stopEntry` mutation. */
export type StopEntryPayload = {
  __typename?: 'StopEntryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  entry?: Maybe<Entry>;
  /** An edge for our `Entry`. May be used by Relay 1. */
  entryEdge?: Maybe<EntriesEdge>;
  /** Reads a single `Person` that is related to this `Entry`. */
  person?: Maybe<Person>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Task` that is related to this `Entry`. */
  task?: Maybe<Task>;
};


/** The output of our `stopEntry` mutation. */
export type StopEntryPayloadEntryEdgeArgs = {
  orderBy?: InputMaybe<Array<EntriesOrderBy>>;
};

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: InputMaybe<Scalars['String']['input']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['String']['input']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Contains the specified string (case-sensitive). */
  includes?: InputMaybe<Scalars['String']['input']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['String']['input']>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: InputMaybe<Scalars['String']['input']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: InputMaybe<Scalars['String']['input']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: InputMaybe<Scalars['String']['input']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: InputMaybe<Scalars['String']['input']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: InputMaybe<Scalars['String']['input']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: InputMaybe<Scalars['String']['input']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
};

export type Task = Node & {
  __typename?: 'Task';
  complete: Scalars['Boolean']['output'];
  createdAt: Scalars['Datetime']['output'];
  description: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Entry`. */
  entries: Array<Entry>;
  /** Reads and enables pagination through a set of `Entry`. */
  entriesConnection: EntriesConnection;
  id: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Person` that is related to this `Task`. */
  person?: Maybe<Person>;
  personId: Scalars['Int']['output'];
  /** Reads a single `Project` that is related to this `Task`. */
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['Int']['output']>;
};


export type TaskEntriesArgs = {
  condition?: InputMaybe<EntryCondition>;
  filter?: InputMaybe<EntryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EntriesOrderBy>>;
};


export type TaskEntriesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<EntryCondition>;
  filter?: InputMaybe<EntryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EntriesOrderBy>>;
};

export type TaskAggregates = {
  __typename?: 'TaskAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<TaskAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<TaskDistinctCountAggregates>;
  keys?: Maybe<Array<Scalars['String']['output']>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<TaskMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<TaskMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<TaskStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<TaskStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<TaskSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<TaskVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<TaskVarianceSampleAggregates>;
};

export type TaskAverageAggregates = {
  __typename?: 'TaskAverageAggregates';
  /** Mean average of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of projectId across the matching connection */
  projectId?: Maybe<Scalars['BigFloat']['output']>;
};

/** A condition to be used against `Task` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TaskCondition = {
  /** Checks for equality with the object’s `complete` field. */
  complete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `personId` field. */
  personId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: InputMaybe<Scalars['Int']['input']>;
};

export type TaskDistinctCountAggregates = {
  __typename?: 'TaskDistinctCountAggregates';
  /** Distinct count of complete across the matching connection */
  complete?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of description across the matching connection */
  description?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of id across the matching connection */
  id?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of personId across the matching connection */
  personId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of projectId across the matching connection */
  projectId?: Maybe<Scalars['BigInt']['output']>;
};

/** A filter to be used against `Task` object types. All fields are combined with a logical ‘and.’ */
export type TaskFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TaskFilter>>;
  /** Filter by the object’s `complete` field. */
  complete?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<TaskFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TaskFilter>>;
  /** Filter by the object’s `personId` field. */
  personId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `projectId` field. */
  projectId?: InputMaybe<IntFilter>;
};

export type TaskMaxAggregates = {
  __typename?: 'TaskMaxAggregates';
  /** Maximum of id across the matching connection */
  id?: Maybe<Scalars['Int']['output']>;
  /** Maximum of personId across the matching connection */
  personId?: Maybe<Scalars['Int']['output']>;
  /** Maximum of projectId across the matching connection */
  projectId?: Maybe<Scalars['Int']['output']>;
};

export type TaskMinAggregates = {
  __typename?: 'TaskMinAggregates';
  /** Minimum of id across the matching connection */
  id?: Maybe<Scalars['Int']['output']>;
  /** Minimum of personId across the matching connection */
  personId?: Maybe<Scalars['Int']['output']>;
  /** Minimum of projectId across the matching connection */
  projectId?: Maybe<Scalars['Int']['output']>;
};

/** Represents an update to a `Task`. Fields that are set will be updated. */
export type TaskPatch = {
  complete?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  personId?: InputMaybe<Scalars['Int']['input']>;
  projectId?: InputMaybe<Scalars['Int']['input']>;
};

export type TaskStddevPopulationAggregates = {
  __typename?: 'TaskStddevPopulationAggregates';
  /** Population standard deviation of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of projectId across the matching connection */
  projectId?: Maybe<Scalars['BigFloat']['output']>;
};

export type TaskStddevSampleAggregates = {
  __typename?: 'TaskStddevSampleAggregates';
  /** Sample standard deviation of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of projectId across the matching connection */
  projectId?: Maybe<Scalars['BigFloat']['output']>;
};

export type TaskSumAggregates = {
  __typename?: 'TaskSumAggregates';
  /** Sum of id across the matching connection */
  id: Scalars['BigInt']['output'];
  /** Sum of personId across the matching connection */
  personId: Scalars['BigInt']['output'];
  /** Sum of projectId across the matching connection */
  projectId: Scalars['BigInt']['output'];
};

export type TaskVariancePopulationAggregates = {
  __typename?: 'TaskVariancePopulationAggregates';
  /** Population variance of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of projectId across the matching connection */
  projectId?: Maybe<Scalars['BigFloat']['output']>;
};

export type TaskVarianceSampleAggregates = {
  __typename?: 'TaskVarianceSampleAggregates';
  /** Sample variance of id across the matching connection */
  id?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of personId across the matching connection */
  personId?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of projectId across the matching connection */
  projectId?: Maybe<Scalars['BigFloat']['output']>;
};

/** A connection to a list of `Task` values. */
export type TasksConnection = {
  __typename?: 'TasksConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<TaskAggregates>;
  /** A list of edges which contains the `Task` and cursor to aid in pagination. */
  edges: Array<TasksEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<TaskAggregates>>;
  /** A list of `Task` objects. */
  nodes: Array<Maybe<Task>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Task` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Task` values. */
export type TasksConnectionGroupedAggregatesArgs = {
  groupBy: Array<TasksGroupBy>;
  having?: InputMaybe<TasksHavingInput>;
};

/** A `Task` edge in the connection. */
export type TasksEdge = {
  __typename?: 'TasksEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Task` at the end of the edge. */
  node?: Maybe<Task>;
};

/** Grouping methods for `Task` for usage during aggregation. */
export enum TasksGroupBy {
  Complete = 'COMPLETE',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Description = 'DESCRIPTION',
  PersonId = 'PERSON_ID',
  ProjectId = 'PROJECT_ID'
}

export type TasksHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  projectId?: InputMaybe<HavingIntFilter>;
};

export type TasksHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  projectId?: InputMaybe<HavingIntFilter>;
};

/** Conditions for `Task` aggregates. */
export type TasksHavingInput = {
  AND?: InputMaybe<Array<TasksHavingInput>>;
  OR?: InputMaybe<Array<TasksHavingInput>>;
  average?: InputMaybe<TasksHavingAverageInput>;
  distinctCount?: InputMaybe<TasksHavingDistinctCountInput>;
  max?: InputMaybe<TasksHavingMaxInput>;
  maxDate?: InputMaybe<TasksHavingMaxDateInput>;
  min?: InputMaybe<TasksHavingMinInput>;
  minDate?: InputMaybe<TasksHavingMinDateInput>;
  stddevPopulation?: InputMaybe<TasksHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<TasksHavingStddevSampleInput>;
  sum?: InputMaybe<TasksHavingSumInput>;
  variancePopulation?: InputMaybe<TasksHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<TasksHavingVarianceSampleInput>;
};

export type TasksHavingMaxDateInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  projectId?: InputMaybe<HavingIntFilter>;
};

export type TasksHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  projectId?: InputMaybe<HavingIntFilter>;
};

export type TasksHavingMinDateInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  projectId?: InputMaybe<HavingIntFilter>;
};

export type TasksHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  projectId?: InputMaybe<HavingIntFilter>;
};

export type TasksHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  projectId?: InputMaybe<HavingIntFilter>;
};

export type TasksHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  projectId?: InputMaybe<HavingIntFilter>;
};

export type TasksHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  projectId?: InputMaybe<HavingIntFilter>;
};

export type TasksHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  projectId?: InputMaybe<HavingIntFilter>;
};

export type TasksHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  id?: InputMaybe<HavingIntFilter>;
  personId?: InputMaybe<HavingIntFilter>;
  projectId?: InputMaybe<HavingIntFilter>;
};

/** Methods to use when ordering `Task`. */
export enum TasksOrderBy {
  CompleteAsc = 'COMPLETE_ASC',
  CompleteDesc = 'COMPLETE_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  EntriesConnectionAverageCompleteAsc = 'ENTRIES_CONNECTION_AVERAGE_COMPLETE_ASC',
  EntriesConnectionAverageCompleteDesc = 'ENTRIES_CONNECTION_AVERAGE_COMPLETE_DESC',
  EntriesConnectionAverageCreatedAtAsc = 'ENTRIES_CONNECTION_AVERAGE_CREATED_AT_ASC',
  EntriesConnectionAverageCreatedAtDesc = 'ENTRIES_CONNECTION_AVERAGE_CREATED_AT_DESC',
  EntriesConnectionAverageDateAsc = 'ENTRIES_CONNECTION_AVERAGE_DATE_ASC',
  EntriesConnectionAverageDateDesc = 'ENTRIES_CONNECTION_AVERAGE_DATE_DESC',
  EntriesConnectionAverageDescriptionAsc = 'ENTRIES_CONNECTION_AVERAGE_DESCRIPTION_ASC',
  EntriesConnectionAverageDescriptionDesc = 'ENTRIES_CONNECTION_AVERAGE_DESCRIPTION_DESC',
  EntriesConnectionAverageIdAsc = 'ENTRIES_CONNECTION_AVERAGE_ID_ASC',
  EntriesConnectionAverageIdDesc = 'ENTRIES_CONNECTION_AVERAGE_ID_DESC',
  EntriesConnectionAverageListOrderAsc = 'ENTRIES_CONNECTION_AVERAGE_LIST_ORDER_ASC',
  EntriesConnectionAverageListOrderDesc = 'ENTRIES_CONNECTION_AVERAGE_LIST_ORDER_DESC',
  EntriesConnectionAveragePersonIdAsc = 'ENTRIES_CONNECTION_AVERAGE_PERSON_ID_ASC',
  EntriesConnectionAveragePersonIdDesc = 'ENTRIES_CONNECTION_AVERAGE_PERSON_ID_DESC',
  EntriesConnectionAverageTaskIdAsc = 'ENTRIES_CONNECTION_AVERAGE_TASK_ID_ASC',
  EntriesConnectionAverageTaskIdDesc = 'ENTRIES_CONNECTION_AVERAGE_TASK_ID_DESC',
  EntriesConnectionAverageTimerActiveAsc = 'ENTRIES_CONNECTION_AVERAGE_TIMER_ACTIVE_ASC',
  EntriesConnectionAverageTimerActiveDesc = 'ENTRIES_CONNECTION_AVERAGE_TIMER_ACTIVE_DESC',
  EntriesConnectionAverageTimerEstimatedTimeAsc = 'ENTRIES_CONNECTION_AVERAGE_TIMER_ESTIMATED_TIME_ASC',
  EntriesConnectionAverageTimerEstimatedTimeDesc = 'ENTRIES_CONNECTION_AVERAGE_TIMER_ESTIMATED_TIME_DESC',
  EntriesConnectionAverageTimerStartedAtAsc = 'ENTRIES_CONNECTION_AVERAGE_TIMER_STARTED_AT_ASC',
  EntriesConnectionAverageTimerStartedAtDesc = 'ENTRIES_CONNECTION_AVERAGE_TIMER_STARTED_AT_DESC',
  EntriesConnectionAverageTimerTrackedTimeAsc = 'ENTRIES_CONNECTION_AVERAGE_TIMER_TRACKED_TIME_ASC',
  EntriesConnectionAverageTimerTrackedTimeDesc = 'ENTRIES_CONNECTION_AVERAGE_TIMER_TRACKED_TIME_DESC',
  EntriesConnectionCountAsc = 'ENTRIES_CONNECTION_COUNT_ASC',
  EntriesConnectionCountDesc = 'ENTRIES_CONNECTION_COUNT_DESC',
  EntriesConnectionDistinctCountCompleteAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_COMPLETE_ASC',
  EntriesConnectionDistinctCountCompleteDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_COMPLETE_DESC',
  EntriesConnectionDistinctCountCreatedAtAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_CREATED_AT_ASC',
  EntriesConnectionDistinctCountCreatedAtDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_CREATED_AT_DESC',
  EntriesConnectionDistinctCountDateAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_DATE_ASC',
  EntriesConnectionDistinctCountDateDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_DATE_DESC',
  EntriesConnectionDistinctCountDescriptionAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_DESCRIPTION_ASC',
  EntriesConnectionDistinctCountDescriptionDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_DESCRIPTION_DESC',
  EntriesConnectionDistinctCountIdAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_ID_ASC',
  EntriesConnectionDistinctCountIdDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_ID_DESC',
  EntriesConnectionDistinctCountListOrderAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_LIST_ORDER_ASC',
  EntriesConnectionDistinctCountListOrderDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_LIST_ORDER_DESC',
  EntriesConnectionDistinctCountPersonIdAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_PERSON_ID_ASC',
  EntriesConnectionDistinctCountPersonIdDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_PERSON_ID_DESC',
  EntriesConnectionDistinctCountTaskIdAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_TASK_ID_ASC',
  EntriesConnectionDistinctCountTaskIdDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_TASK_ID_DESC',
  EntriesConnectionDistinctCountTimerActiveAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_TIMER_ACTIVE_ASC',
  EntriesConnectionDistinctCountTimerActiveDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_TIMER_ACTIVE_DESC',
  EntriesConnectionDistinctCountTimerEstimatedTimeAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_TIMER_ESTIMATED_TIME_ASC',
  EntriesConnectionDistinctCountTimerEstimatedTimeDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_TIMER_ESTIMATED_TIME_DESC',
  EntriesConnectionDistinctCountTimerStartedAtAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_TIMER_STARTED_AT_ASC',
  EntriesConnectionDistinctCountTimerStartedAtDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_TIMER_STARTED_AT_DESC',
  EntriesConnectionDistinctCountTimerTrackedTimeAsc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_TIMER_TRACKED_TIME_ASC',
  EntriesConnectionDistinctCountTimerTrackedTimeDesc = 'ENTRIES_CONNECTION_DISTINCT_COUNT_TIMER_TRACKED_TIME_DESC',
  EntriesConnectionMaxCompleteAsc = 'ENTRIES_CONNECTION_MAX_COMPLETE_ASC',
  EntriesConnectionMaxCompleteDesc = 'ENTRIES_CONNECTION_MAX_COMPLETE_DESC',
  EntriesConnectionMaxCreatedAtAsc = 'ENTRIES_CONNECTION_MAX_CREATED_AT_ASC',
  EntriesConnectionMaxCreatedAtDesc = 'ENTRIES_CONNECTION_MAX_CREATED_AT_DESC',
  EntriesConnectionMaxDateAsc = 'ENTRIES_CONNECTION_MAX_DATE_ASC',
  EntriesConnectionMaxDateCompleteAsc = 'ENTRIES_CONNECTION_MAX_DATE_COMPLETE_ASC',
  EntriesConnectionMaxDateCompleteDesc = 'ENTRIES_CONNECTION_MAX_DATE_COMPLETE_DESC',
  EntriesConnectionMaxDateCreatedAtAsc = 'ENTRIES_CONNECTION_MAX_DATE_CREATED_AT_ASC',
  EntriesConnectionMaxDateCreatedAtDesc = 'ENTRIES_CONNECTION_MAX_DATE_CREATED_AT_DESC',
  EntriesConnectionMaxDateDateAsc = 'ENTRIES_CONNECTION_MAX_DATE_DATE_ASC',
  EntriesConnectionMaxDateDateDesc = 'ENTRIES_CONNECTION_MAX_DATE_DATE_DESC',
  EntriesConnectionMaxDateDesc = 'ENTRIES_CONNECTION_MAX_DATE_DESC',
  EntriesConnectionMaxDateDescriptionAsc = 'ENTRIES_CONNECTION_MAX_DATE_DESCRIPTION_ASC',
  EntriesConnectionMaxDateDescriptionDesc = 'ENTRIES_CONNECTION_MAX_DATE_DESCRIPTION_DESC',
  EntriesConnectionMaxDateIdAsc = 'ENTRIES_CONNECTION_MAX_DATE_ID_ASC',
  EntriesConnectionMaxDateIdDesc = 'ENTRIES_CONNECTION_MAX_DATE_ID_DESC',
  EntriesConnectionMaxDateListOrderAsc = 'ENTRIES_CONNECTION_MAX_DATE_LIST_ORDER_ASC',
  EntriesConnectionMaxDateListOrderDesc = 'ENTRIES_CONNECTION_MAX_DATE_LIST_ORDER_DESC',
  EntriesConnectionMaxDatePersonIdAsc = 'ENTRIES_CONNECTION_MAX_DATE_PERSON_ID_ASC',
  EntriesConnectionMaxDatePersonIdDesc = 'ENTRIES_CONNECTION_MAX_DATE_PERSON_ID_DESC',
  EntriesConnectionMaxDateTaskIdAsc = 'ENTRIES_CONNECTION_MAX_DATE_TASK_ID_ASC',
  EntriesConnectionMaxDateTaskIdDesc = 'ENTRIES_CONNECTION_MAX_DATE_TASK_ID_DESC',
  EntriesConnectionMaxDateTimerActiveAsc = 'ENTRIES_CONNECTION_MAX_DATE_TIMER_ACTIVE_ASC',
  EntriesConnectionMaxDateTimerActiveDesc = 'ENTRIES_CONNECTION_MAX_DATE_TIMER_ACTIVE_DESC',
  EntriesConnectionMaxDateTimerEstimatedTimeAsc = 'ENTRIES_CONNECTION_MAX_DATE_TIMER_ESTIMATED_TIME_ASC',
  EntriesConnectionMaxDateTimerEstimatedTimeDesc = 'ENTRIES_CONNECTION_MAX_DATE_TIMER_ESTIMATED_TIME_DESC',
  EntriesConnectionMaxDateTimerStartedAtAsc = 'ENTRIES_CONNECTION_MAX_DATE_TIMER_STARTED_AT_ASC',
  EntriesConnectionMaxDateTimerStartedAtDesc = 'ENTRIES_CONNECTION_MAX_DATE_TIMER_STARTED_AT_DESC',
  EntriesConnectionMaxDateTimerTrackedTimeAsc = 'ENTRIES_CONNECTION_MAX_DATE_TIMER_TRACKED_TIME_ASC',
  EntriesConnectionMaxDateTimerTrackedTimeDesc = 'ENTRIES_CONNECTION_MAX_DATE_TIMER_TRACKED_TIME_DESC',
  EntriesConnectionMaxDescriptionAsc = 'ENTRIES_CONNECTION_MAX_DESCRIPTION_ASC',
  EntriesConnectionMaxDescriptionDesc = 'ENTRIES_CONNECTION_MAX_DESCRIPTION_DESC',
  EntriesConnectionMaxIdAsc = 'ENTRIES_CONNECTION_MAX_ID_ASC',
  EntriesConnectionMaxIdDesc = 'ENTRIES_CONNECTION_MAX_ID_DESC',
  EntriesConnectionMaxListOrderAsc = 'ENTRIES_CONNECTION_MAX_LIST_ORDER_ASC',
  EntriesConnectionMaxListOrderDesc = 'ENTRIES_CONNECTION_MAX_LIST_ORDER_DESC',
  EntriesConnectionMaxPersonIdAsc = 'ENTRIES_CONNECTION_MAX_PERSON_ID_ASC',
  EntriesConnectionMaxPersonIdDesc = 'ENTRIES_CONNECTION_MAX_PERSON_ID_DESC',
  EntriesConnectionMaxTaskIdAsc = 'ENTRIES_CONNECTION_MAX_TASK_ID_ASC',
  EntriesConnectionMaxTaskIdDesc = 'ENTRIES_CONNECTION_MAX_TASK_ID_DESC',
  EntriesConnectionMaxTimerActiveAsc = 'ENTRIES_CONNECTION_MAX_TIMER_ACTIVE_ASC',
  EntriesConnectionMaxTimerActiveDesc = 'ENTRIES_CONNECTION_MAX_TIMER_ACTIVE_DESC',
  EntriesConnectionMaxTimerEstimatedTimeAsc = 'ENTRIES_CONNECTION_MAX_TIMER_ESTIMATED_TIME_ASC',
  EntriesConnectionMaxTimerEstimatedTimeDesc = 'ENTRIES_CONNECTION_MAX_TIMER_ESTIMATED_TIME_DESC',
  EntriesConnectionMaxTimerStartedAtAsc = 'ENTRIES_CONNECTION_MAX_TIMER_STARTED_AT_ASC',
  EntriesConnectionMaxTimerStartedAtDesc = 'ENTRIES_CONNECTION_MAX_TIMER_STARTED_AT_DESC',
  EntriesConnectionMaxTimerTrackedTimeAsc = 'ENTRIES_CONNECTION_MAX_TIMER_TRACKED_TIME_ASC',
  EntriesConnectionMaxTimerTrackedTimeDesc = 'ENTRIES_CONNECTION_MAX_TIMER_TRACKED_TIME_DESC',
  EntriesConnectionMinCompleteAsc = 'ENTRIES_CONNECTION_MIN_COMPLETE_ASC',
  EntriesConnectionMinCompleteDesc = 'ENTRIES_CONNECTION_MIN_COMPLETE_DESC',
  EntriesConnectionMinCreatedAtAsc = 'ENTRIES_CONNECTION_MIN_CREATED_AT_ASC',
  EntriesConnectionMinCreatedAtDesc = 'ENTRIES_CONNECTION_MIN_CREATED_AT_DESC',
  EntriesConnectionMinDateAsc = 'ENTRIES_CONNECTION_MIN_DATE_ASC',
  EntriesConnectionMinDateCompleteAsc = 'ENTRIES_CONNECTION_MIN_DATE_COMPLETE_ASC',
  EntriesConnectionMinDateCompleteDesc = 'ENTRIES_CONNECTION_MIN_DATE_COMPLETE_DESC',
  EntriesConnectionMinDateCreatedAtAsc = 'ENTRIES_CONNECTION_MIN_DATE_CREATED_AT_ASC',
  EntriesConnectionMinDateCreatedAtDesc = 'ENTRIES_CONNECTION_MIN_DATE_CREATED_AT_DESC',
  EntriesConnectionMinDateDateAsc = 'ENTRIES_CONNECTION_MIN_DATE_DATE_ASC',
  EntriesConnectionMinDateDateDesc = 'ENTRIES_CONNECTION_MIN_DATE_DATE_DESC',
  EntriesConnectionMinDateDesc = 'ENTRIES_CONNECTION_MIN_DATE_DESC',
  EntriesConnectionMinDateDescriptionAsc = 'ENTRIES_CONNECTION_MIN_DATE_DESCRIPTION_ASC',
  EntriesConnectionMinDateDescriptionDesc = 'ENTRIES_CONNECTION_MIN_DATE_DESCRIPTION_DESC',
  EntriesConnectionMinDateIdAsc = 'ENTRIES_CONNECTION_MIN_DATE_ID_ASC',
  EntriesConnectionMinDateIdDesc = 'ENTRIES_CONNECTION_MIN_DATE_ID_DESC',
  EntriesConnectionMinDateListOrderAsc = 'ENTRIES_CONNECTION_MIN_DATE_LIST_ORDER_ASC',
  EntriesConnectionMinDateListOrderDesc = 'ENTRIES_CONNECTION_MIN_DATE_LIST_ORDER_DESC',
  EntriesConnectionMinDatePersonIdAsc = 'ENTRIES_CONNECTION_MIN_DATE_PERSON_ID_ASC',
  EntriesConnectionMinDatePersonIdDesc = 'ENTRIES_CONNECTION_MIN_DATE_PERSON_ID_DESC',
  EntriesConnectionMinDateTaskIdAsc = 'ENTRIES_CONNECTION_MIN_DATE_TASK_ID_ASC',
  EntriesConnectionMinDateTaskIdDesc = 'ENTRIES_CONNECTION_MIN_DATE_TASK_ID_DESC',
  EntriesConnectionMinDateTimerActiveAsc = 'ENTRIES_CONNECTION_MIN_DATE_TIMER_ACTIVE_ASC',
  EntriesConnectionMinDateTimerActiveDesc = 'ENTRIES_CONNECTION_MIN_DATE_TIMER_ACTIVE_DESC',
  EntriesConnectionMinDateTimerEstimatedTimeAsc = 'ENTRIES_CONNECTION_MIN_DATE_TIMER_ESTIMATED_TIME_ASC',
  EntriesConnectionMinDateTimerEstimatedTimeDesc = 'ENTRIES_CONNECTION_MIN_DATE_TIMER_ESTIMATED_TIME_DESC',
  EntriesConnectionMinDateTimerStartedAtAsc = 'ENTRIES_CONNECTION_MIN_DATE_TIMER_STARTED_AT_ASC',
  EntriesConnectionMinDateTimerStartedAtDesc = 'ENTRIES_CONNECTION_MIN_DATE_TIMER_STARTED_AT_DESC',
  EntriesConnectionMinDateTimerTrackedTimeAsc = 'ENTRIES_CONNECTION_MIN_DATE_TIMER_TRACKED_TIME_ASC',
  EntriesConnectionMinDateTimerTrackedTimeDesc = 'ENTRIES_CONNECTION_MIN_DATE_TIMER_TRACKED_TIME_DESC',
  EntriesConnectionMinDescriptionAsc = 'ENTRIES_CONNECTION_MIN_DESCRIPTION_ASC',
  EntriesConnectionMinDescriptionDesc = 'ENTRIES_CONNECTION_MIN_DESCRIPTION_DESC',
  EntriesConnectionMinIdAsc = 'ENTRIES_CONNECTION_MIN_ID_ASC',
  EntriesConnectionMinIdDesc = 'ENTRIES_CONNECTION_MIN_ID_DESC',
  EntriesConnectionMinListOrderAsc = 'ENTRIES_CONNECTION_MIN_LIST_ORDER_ASC',
  EntriesConnectionMinListOrderDesc = 'ENTRIES_CONNECTION_MIN_LIST_ORDER_DESC',
  EntriesConnectionMinPersonIdAsc = 'ENTRIES_CONNECTION_MIN_PERSON_ID_ASC',
  EntriesConnectionMinPersonIdDesc = 'ENTRIES_CONNECTION_MIN_PERSON_ID_DESC',
  EntriesConnectionMinTaskIdAsc = 'ENTRIES_CONNECTION_MIN_TASK_ID_ASC',
  EntriesConnectionMinTaskIdDesc = 'ENTRIES_CONNECTION_MIN_TASK_ID_DESC',
  EntriesConnectionMinTimerActiveAsc = 'ENTRIES_CONNECTION_MIN_TIMER_ACTIVE_ASC',
  EntriesConnectionMinTimerActiveDesc = 'ENTRIES_CONNECTION_MIN_TIMER_ACTIVE_DESC',
  EntriesConnectionMinTimerEstimatedTimeAsc = 'ENTRIES_CONNECTION_MIN_TIMER_ESTIMATED_TIME_ASC',
  EntriesConnectionMinTimerEstimatedTimeDesc = 'ENTRIES_CONNECTION_MIN_TIMER_ESTIMATED_TIME_DESC',
  EntriesConnectionMinTimerStartedAtAsc = 'ENTRIES_CONNECTION_MIN_TIMER_STARTED_AT_ASC',
  EntriesConnectionMinTimerStartedAtDesc = 'ENTRIES_CONNECTION_MIN_TIMER_STARTED_AT_DESC',
  EntriesConnectionMinTimerTrackedTimeAsc = 'ENTRIES_CONNECTION_MIN_TIMER_TRACKED_TIME_ASC',
  EntriesConnectionMinTimerTrackedTimeDesc = 'ENTRIES_CONNECTION_MIN_TIMER_TRACKED_TIME_DESC',
  EntriesConnectionStddevPopulationCompleteAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_COMPLETE_ASC',
  EntriesConnectionStddevPopulationCompleteDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_COMPLETE_DESC',
  EntriesConnectionStddevPopulationCreatedAtAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_CREATED_AT_ASC',
  EntriesConnectionStddevPopulationCreatedAtDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_CREATED_AT_DESC',
  EntriesConnectionStddevPopulationDateAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_DATE_ASC',
  EntriesConnectionStddevPopulationDateDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_DATE_DESC',
  EntriesConnectionStddevPopulationDescriptionAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_DESCRIPTION_ASC',
  EntriesConnectionStddevPopulationDescriptionDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_DESCRIPTION_DESC',
  EntriesConnectionStddevPopulationIdAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_ID_ASC',
  EntriesConnectionStddevPopulationIdDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_ID_DESC',
  EntriesConnectionStddevPopulationListOrderAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_LIST_ORDER_ASC',
  EntriesConnectionStddevPopulationListOrderDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_LIST_ORDER_DESC',
  EntriesConnectionStddevPopulationPersonIdAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_PERSON_ID_ASC',
  EntriesConnectionStddevPopulationPersonIdDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_PERSON_ID_DESC',
  EntriesConnectionStddevPopulationTaskIdAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_TASK_ID_ASC',
  EntriesConnectionStddevPopulationTaskIdDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_TASK_ID_DESC',
  EntriesConnectionStddevPopulationTimerActiveAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_TIMER_ACTIVE_ASC',
  EntriesConnectionStddevPopulationTimerActiveDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_TIMER_ACTIVE_DESC',
  EntriesConnectionStddevPopulationTimerEstimatedTimeAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_TIMER_ESTIMATED_TIME_ASC',
  EntriesConnectionStddevPopulationTimerEstimatedTimeDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_TIMER_ESTIMATED_TIME_DESC',
  EntriesConnectionStddevPopulationTimerStartedAtAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_TIMER_STARTED_AT_ASC',
  EntriesConnectionStddevPopulationTimerStartedAtDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_TIMER_STARTED_AT_DESC',
  EntriesConnectionStddevPopulationTimerTrackedTimeAsc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_TIMER_TRACKED_TIME_ASC',
  EntriesConnectionStddevPopulationTimerTrackedTimeDesc = 'ENTRIES_CONNECTION_STDDEV_POPULATION_TIMER_TRACKED_TIME_DESC',
  EntriesConnectionStddevSampleCompleteAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_COMPLETE_ASC',
  EntriesConnectionStddevSampleCompleteDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_COMPLETE_DESC',
  EntriesConnectionStddevSampleCreatedAtAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_CREATED_AT_ASC',
  EntriesConnectionStddevSampleCreatedAtDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_CREATED_AT_DESC',
  EntriesConnectionStddevSampleDateAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_DATE_ASC',
  EntriesConnectionStddevSampleDateDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_DATE_DESC',
  EntriesConnectionStddevSampleDescriptionAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_DESCRIPTION_ASC',
  EntriesConnectionStddevSampleDescriptionDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_DESCRIPTION_DESC',
  EntriesConnectionStddevSampleIdAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_ID_ASC',
  EntriesConnectionStddevSampleIdDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_ID_DESC',
  EntriesConnectionStddevSampleListOrderAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_LIST_ORDER_ASC',
  EntriesConnectionStddevSampleListOrderDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_LIST_ORDER_DESC',
  EntriesConnectionStddevSamplePersonIdAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_PERSON_ID_ASC',
  EntriesConnectionStddevSamplePersonIdDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_PERSON_ID_DESC',
  EntriesConnectionStddevSampleTaskIdAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_TASK_ID_ASC',
  EntriesConnectionStddevSampleTaskIdDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_TASK_ID_DESC',
  EntriesConnectionStddevSampleTimerActiveAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_TIMER_ACTIVE_ASC',
  EntriesConnectionStddevSampleTimerActiveDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_TIMER_ACTIVE_DESC',
  EntriesConnectionStddevSampleTimerEstimatedTimeAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_TIMER_ESTIMATED_TIME_ASC',
  EntriesConnectionStddevSampleTimerEstimatedTimeDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_TIMER_ESTIMATED_TIME_DESC',
  EntriesConnectionStddevSampleTimerStartedAtAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_TIMER_STARTED_AT_ASC',
  EntriesConnectionStddevSampleTimerStartedAtDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_TIMER_STARTED_AT_DESC',
  EntriesConnectionStddevSampleTimerTrackedTimeAsc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_TIMER_TRACKED_TIME_ASC',
  EntriesConnectionStddevSampleTimerTrackedTimeDesc = 'ENTRIES_CONNECTION_STDDEV_SAMPLE_TIMER_TRACKED_TIME_DESC',
  EntriesConnectionSumCompleteAsc = 'ENTRIES_CONNECTION_SUM_COMPLETE_ASC',
  EntriesConnectionSumCompleteDesc = 'ENTRIES_CONNECTION_SUM_COMPLETE_DESC',
  EntriesConnectionSumCreatedAtAsc = 'ENTRIES_CONNECTION_SUM_CREATED_AT_ASC',
  EntriesConnectionSumCreatedAtDesc = 'ENTRIES_CONNECTION_SUM_CREATED_AT_DESC',
  EntriesConnectionSumDateAsc = 'ENTRIES_CONNECTION_SUM_DATE_ASC',
  EntriesConnectionSumDateDesc = 'ENTRIES_CONNECTION_SUM_DATE_DESC',
  EntriesConnectionSumDescriptionAsc = 'ENTRIES_CONNECTION_SUM_DESCRIPTION_ASC',
  EntriesConnectionSumDescriptionDesc = 'ENTRIES_CONNECTION_SUM_DESCRIPTION_DESC',
  EntriesConnectionSumIdAsc = 'ENTRIES_CONNECTION_SUM_ID_ASC',
  EntriesConnectionSumIdDesc = 'ENTRIES_CONNECTION_SUM_ID_DESC',
  EntriesConnectionSumListOrderAsc = 'ENTRIES_CONNECTION_SUM_LIST_ORDER_ASC',
  EntriesConnectionSumListOrderDesc = 'ENTRIES_CONNECTION_SUM_LIST_ORDER_DESC',
  EntriesConnectionSumPersonIdAsc = 'ENTRIES_CONNECTION_SUM_PERSON_ID_ASC',
  EntriesConnectionSumPersonIdDesc = 'ENTRIES_CONNECTION_SUM_PERSON_ID_DESC',
  EntriesConnectionSumTaskIdAsc = 'ENTRIES_CONNECTION_SUM_TASK_ID_ASC',
  EntriesConnectionSumTaskIdDesc = 'ENTRIES_CONNECTION_SUM_TASK_ID_DESC',
  EntriesConnectionSumTimerActiveAsc = 'ENTRIES_CONNECTION_SUM_TIMER_ACTIVE_ASC',
  EntriesConnectionSumTimerActiveDesc = 'ENTRIES_CONNECTION_SUM_TIMER_ACTIVE_DESC',
  EntriesConnectionSumTimerEstimatedTimeAsc = 'ENTRIES_CONNECTION_SUM_TIMER_ESTIMATED_TIME_ASC',
  EntriesConnectionSumTimerEstimatedTimeDesc = 'ENTRIES_CONNECTION_SUM_TIMER_ESTIMATED_TIME_DESC',
  EntriesConnectionSumTimerStartedAtAsc = 'ENTRIES_CONNECTION_SUM_TIMER_STARTED_AT_ASC',
  EntriesConnectionSumTimerStartedAtDesc = 'ENTRIES_CONNECTION_SUM_TIMER_STARTED_AT_DESC',
  EntriesConnectionSumTimerTrackedTimeAsc = 'ENTRIES_CONNECTION_SUM_TIMER_TRACKED_TIME_ASC',
  EntriesConnectionSumTimerTrackedTimeDesc = 'ENTRIES_CONNECTION_SUM_TIMER_TRACKED_TIME_DESC',
  EntriesConnectionVariancePopulationCompleteAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_COMPLETE_ASC',
  EntriesConnectionVariancePopulationCompleteDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_COMPLETE_DESC',
  EntriesConnectionVariancePopulationCreatedAtAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_CREATED_AT_ASC',
  EntriesConnectionVariancePopulationCreatedAtDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_CREATED_AT_DESC',
  EntriesConnectionVariancePopulationDateAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_DATE_ASC',
  EntriesConnectionVariancePopulationDateDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_DATE_DESC',
  EntriesConnectionVariancePopulationDescriptionAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_DESCRIPTION_ASC',
  EntriesConnectionVariancePopulationDescriptionDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_DESCRIPTION_DESC',
  EntriesConnectionVariancePopulationIdAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_ID_ASC',
  EntriesConnectionVariancePopulationIdDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_ID_DESC',
  EntriesConnectionVariancePopulationListOrderAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_LIST_ORDER_ASC',
  EntriesConnectionVariancePopulationListOrderDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_LIST_ORDER_DESC',
  EntriesConnectionVariancePopulationPersonIdAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_PERSON_ID_ASC',
  EntriesConnectionVariancePopulationPersonIdDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_PERSON_ID_DESC',
  EntriesConnectionVariancePopulationTaskIdAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_TASK_ID_ASC',
  EntriesConnectionVariancePopulationTaskIdDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_TASK_ID_DESC',
  EntriesConnectionVariancePopulationTimerActiveAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_TIMER_ACTIVE_ASC',
  EntriesConnectionVariancePopulationTimerActiveDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_TIMER_ACTIVE_DESC',
  EntriesConnectionVariancePopulationTimerEstimatedTimeAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_TIMER_ESTIMATED_TIME_ASC',
  EntriesConnectionVariancePopulationTimerEstimatedTimeDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_TIMER_ESTIMATED_TIME_DESC',
  EntriesConnectionVariancePopulationTimerStartedAtAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_TIMER_STARTED_AT_ASC',
  EntriesConnectionVariancePopulationTimerStartedAtDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_TIMER_STARTED_AT_DESC',
  EntriesConnectionVariancePopulationTimerTrackedTimeAsc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_TIMER_TRACKED_TIME_ASC',
  EntriesConnectionVariancePopulationTimerTrackedTimeDesc = 'ENTRIES_CONNECTION_VARIANCE_POPULATION_TIMER_TRACKED_TIME_DESC',
  EntriesConnectionVarianceSampleCompleteAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_COMPLETE_ASC',
  EntriesConnectionVarianceSampleCompleteDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_COMPLETE_DESC',
  EntriesConnectionVarianceSampleCreatedAtAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_CREATED_AT_ASC',
  EntriesConnectionVarianceSampleCreatedAtDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_CREATED_AT_DESC',
  EntriesConnectionVarianceSampleDateAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_DATE_ASC',
  EntriesConnectionVarianceSampleDateDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_DATE_DESC',
  EntriesConnectionVarianceSampleDescriptionAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_DESCRIPTION_ASC',
  EntriesConnectionVarianceSampleDescriptionDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_DESCRIPTION_DESC',
  EntriesConnectionVarianceSampleIdAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_ID_ASC',
  EntriesConnectionVarianceSampleIdDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_ID_DESC',
  EntriesConnectionVarianceSampleListOrderAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_LIST_ORDER_ASC',
  EntriesConnectionVarianceSampleListOrderDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_LIST_ORDER_DESC',
  EntriesConnectionVarianceSamplePersonIdAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_PERSON_ID_ASC',
  EntriesConnectionVarianceSamplePersonIdDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_PERSON_ID_DESC',
  EntriesConnectionVarianceSampleTaskIdAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_TASK_ID_ASC',
  EntriesConnectionVarianceSampleTaskIdDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_TASK_ID_DESC',
  EntriesConnectionVarianceSampleTimerActiveAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_TIMER_ACTIVE_ASC',
  EntriesConnectionVarianceSampleTimerActiveDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_TIMER_ACTIVE_DESC',
  EntriesConnectionVarianceSampleTimerEstimatedTimeAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_TIMER_ESTIMATED_TIME_ASC',
  EntriesConnectionVarianceSampleTimerEstimatedTimeDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_TIMER_ESTIMATED_TIME_DESC',
  EntriesConnectionVarianceSampleTimerStartedAtAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_TIMER_STARTED_AT_ASC',
  EntriesConnectionVarianceSampleTimerStartedAtDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_TIMER_STARTED_AT_DESC',
  EntriesConnectionVarianceSampleTimerTrackedTimeAsc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_TIMER_TRACKED_TIME_ASC',
  EntriesConnectionVarianceSampleTimerTrackedTimeDesc = 'ENTRIES_CONNECTION_VARIANCE_SAMPLE_TIMER_TRACKED_TIME_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PersonIdAsc = 'PERSON_ID_ASC',
  PersonIdDesc = 'PERSON_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC'
}

/** All input for the `updateCategoryByNodeId` mutation. */
export type UpdateCategoryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Category` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Category` being updated. */
  patch: CategoryPatch;
};

/** All input for the `updateCategory` mutation. */
export type UpdateCategoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Category` being updated. */
  patch: CategoryPatch;
};

/** The output of our update `Category` mutation. */
export type UpdateCategoryPayload = {
  __typename?: 'UpdateCategoryPayload';
  /** The `Category` that was updated by this mutation. */
  category?: Maybe<Category>;
  /** An edge for our `Category`. May be used by Relay 1. */
  categoryEdge?: Maybe<CategoriesEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Person` that is related to this `Category`. */
  person?: Maybe<Person>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Category` mutation. */
export type UpdateCategoryPayloadCategoryEdgeArgs = {
  orderBy?: InputMaybe<Array<CategoriesOrderBy>>;
};

/** All input for the `updateEntryByNodeId` mutation. */
export type UpdateEntryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Entry` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Entry` being updated. */
  patch: EntryPatch;
};

/** All input for the `updateEntry` mutation. */
export type UpdateEntryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Entry` being updated. */
  patch: EntryPatch;
};

/** The output of our update `Entry` mutation. */
export type UpdateEntryPayload = {
  __typename?: 'UpdateEntryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Entry` that was updated by this mutation. */
  entry?: Maybe<Entry>;
  /** An edge for our `Entry`. May be used by Relay 1. */
  entryEdge?: Maybe<EntriesEdge>;
  /** Reads a single `Person` that is related to this `Entry`. */
  person?: Maybe<Person>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Task` that is related to this `Entry`. */
  task?: Maybe<Task>;
};


/** The output of our update `Entry` mutation. */
export type UpdateEntryPayloadEntryEdgeArgs = {
  orderBy?: InputMaybe<Array<EntriesOrderBy>>;
};

/** All input for the `updatePersonByNodeId` mutation. */
export type UpdatePersonByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Person` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Person` being updated. */
  patch: PersonPatch;
};

/** All input for the `updatePerson` mutation. */
export type UpdatePersonInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Person` being updated. */
  patch: PersonPatch;
};

/** The output of our update `Person` mutation. */
export type UpdatePersonPayload = {
  __typename?: 'UpdatePersonPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Person` that was updated by this mutation. */
  person?: Maybe<Person>;
  /** An edge for our `Person`. May be used by Relay 1. */
  personEdge?: Maybe<PeopleEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Person` mutation. */
export type UpdatePersonPayloadPersonEdgeArgs = {
  orderBy?: InputMaybe<Array<PeopleOrderBy>>;
};

/** All input for the `updateProjectByNodeId` mutation. */
export type UpdateProjectByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Project` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Project` being updated. */
  patch: ProjectPatch;
};

/** All input for the `updateProject` mutation. */
export type UpdateProjectInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Project` being updated. */
  patch: ProjectPatch;
};

/** The output of our update `Project` mutation. */
export type UpdateProjectPayload = {
  __typename?: 'UpdateProjectPayload';
  /** Reads a single `Category` that is related to this `Project`. */
  category?: Maybe<Category>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Person` that is related to this `Project`. */
  person?: Maybe<Person>;
  /** The `Project` that was updated by this mutation. */
  project?: Maybe<Project>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Project` mutation. */
export type UpdateProjectPayloadProjectEdgeArgs = {
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};

/** All input for the `updateTaskByNodeId` mutation. */
export type UpdateTaskByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Task` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Task` being updated. */
  patch: TaskPatch;
};

/** All input for the `updateTask` mutation. */
export type UpdateTaskInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Task` being updated. */
  patch: TaskPatch;
};

/** The output of our update `Task` mutation. */
export type UpdateTaskPayload = {
  __typename?: 'UpdateTaskPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Person` that is related to this `Task`. */
  person?: Maybe<Person>;
  /** Reads a single `Project` that is related to this `Task`. */
  project?: Maybe<Project>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Task` that was updated by this mutation. */
  task?: Maybe<Task>;
  /** An edge for our `Task`. May be used by Relay 1. */
  taskEdge?: Maybe<TasksEdge>;
};


/** The output of our update `Task` mutation. */
export type UpdateTaskPayloadTaskEdgeArgs = {
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};

export type FilteredEntriesQueryVariables = Exact<{
  datesIn: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type FilteredEntriesQuery = { __typename?: 'Query', entries?: Array<{ __typename?: 'Entry', id: number, description?: string | null, complete: boolean, date: string, task?: { __typename?: 'Task', id: number, description: string, project?: { __typename?: 'Project', id: number, description: string, category?: { __typename?: 'Category', id: number, color?: string | null, colorContrast?: boolean | null, description: string } | null } | null } | null }> | null };


export const FilteredEntriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"filteredEntries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"datesIn"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"date"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"datesIn"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"colorContrast"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<FilteredEntriesQuery, FilteredEntriesQueryVariables>;