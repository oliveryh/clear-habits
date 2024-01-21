import { graphql } from "@/gql/gql"
import type { Entry } from "@/gql/graphql"

const startEntry = (entry: Entry) => {
  const startEntryMutation = graphql(`
    mutation startEntry($id: Int!) {
      Entry: startEntry(input: { id: $id }) {
        entry {
          id
          description
          complete
          date
          timerActive
          timerTrackedTime
          timerStartedAt
          timerEstimatedTime
        }
      }
    }
  `)

  const { mutate } = useMutation(startEntryMutation, {
    variables: {
      id: entry.id,
    },
  })
  mutate()
}

const stopEntry = (entry: Entry) => {
  const stopEntryMutation = graphql(`
    mutation stopEntry($id: Int!) {
      Entry: stopEntry(input: { id: $id }) {
        entry {
          id
          description
          complete
          date
          timerActive
          timerTrackedTime
          timerStartedAt
          timerEstimatedTime
        }
      }
    }
  `)

  const { mutate } = useMutation(stopEntryMutation, {
    variables: {
      id: entry.id,
    },
  })
  mutate()
}

export { startEntry, stopEntry }
