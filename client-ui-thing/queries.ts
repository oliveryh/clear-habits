import { graphql } from "@/gql/gql"

export function useCategories() {
  return useAsyncQuery(
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
}
