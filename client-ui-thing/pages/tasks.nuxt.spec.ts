import CategoryFilter from "@/components/CategoryFilter.vue"
import tasks from "@/pages/tasks.vue"
import { renderSuspended } from "@nuxt/test-utils/runtime"
import { fireEvent, screen, waitFor } from "@testing-library/vue"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

const mockCategories = [
  {
    id: "456",
    description: "Category Description 2",
    color: "#00ff00",
    colorContrast: true,
  },
  {
    id: "123",
    description: "Category Description",
    color: "#ff0000",
    colorContrast: true,
  },
]

describe("tasks page", () => {
  beforeEach(async () => {
    vi.mock("@/queries.ts", () => ({
      useCategories: () => computed(() => mockCategories),
      useFilteredEntries: () => {
        return { entries: computed(() => []), refetch: vi.fn() }
      },
      useRecentTasks: () => computed(() => []),
      useProjects: () => computed(() => []),
    }))
    await renderSuspended(tasks)
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it("has a button to quickly add a task", async () => {
    expect(screen.getByText("Quick Add")).toBeInTheDocument()
  })
  it("opens a modal when the quick add button is clicked", async () => {
    const modalDescription = "Select from your most frequently added tasks."
    expect(screen.queryByText(modalDescription)).not.toBeInTheDocument()
    const quickAddButton = screen.getByText("Quick Add")
    expect(quickAddButton).toBeInTheDocument()
    quickAddButton.click()
    await waitFor(() => {
      expect(screen.getByText(modalDescription)).toBeInTheDocument()
    })
  })
})
