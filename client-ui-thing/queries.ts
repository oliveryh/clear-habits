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

export function useProjects() {
  const { result } = useQuery(
    graphql(`
      query projects {
        projects {
          id
          description
          category {
            id
            color
            colorContrast
          }
        }
      }
    `)
  )
  return computed(() => result.value?.projects ?? [])
}

export function useFilteredEntries({ datesIn }) {
  const { result, refetch } = useQuery(
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
  const entries = computed(() => result.value?.entries ?? [])
  return { entries, refetch }
}

export function useRecentTasks() {
  const { result } = useQuery(
    graphql(`
      query recentTasks {
        recentTasks {
          projectId
          description
          latestMaxEntryTimerEstimatedTime
        }
      }
    `)
  )
  return computed(() => result.value?.recentTasks ?? [])
}
