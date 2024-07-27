import { graphql } from "@/gql/gql"

export function useCategories() {
  const { result } = useQuery(
    graphql(`
      query categories {
        categories {
          id
          description
          color
          colorContrast
        }
      }
    `)
  )
  return computed(() => result.value?.categories ?? [])
}

export function useFilteredEntries({ datesIn }) {
  const { result } = useQuery(
    graphql(`
      query filteredEntries($datesIn: [String!]!) {
        entries(filter: { date: { in: $datesIn } }) {
          id
          description
          complete
          date
          timerActive
          timerTrackedTime
          timerStartedAt
          timerEstimatedTime
          listOrder
          task {
            id
            description
            project {
              id
              description
              category {
                id
                color
                colorContrast
                description
              }
            }
          }
        }
      }
    `),
    {
      datesIn,
    }
  )
  return computed(() => result.value?.entries ?? [])
}
