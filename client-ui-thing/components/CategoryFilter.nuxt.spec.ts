import CategoryFilter from "@/components/CategoryFilter.vue"
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

describe("CategoryFilter", () => {
  beforeEach(async () => {
    vi.mock("@/queries.ts", () => ({
      useCategories: () => ({
        data: {
          value: {
            categories: mockCategories,
          },
        },
        loading: false,
      }),
    }))
    await renderSuspended(CategoryFilter)
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })
  describe("when the filter is loaded without a selection", () => {
    it("asks the user to select a category", async () => {
      expect(screen.getByText("Select a category...")).toBeInTheDocument()
    })
  })
  describe("when the dropdown has been opened", () => {
    beforeEach(async () => {
      const dropdownButton = screen.getByText("Select a category...")
      expect(dropdownButton).toBeInTheDocument()
      dropdownButton.click()
    })
    it("displays the categories in a dropdown", async () => {
      const firstDropdownItem = screen.getByText("Category Description")
      const secondDropdownItem = screen.getByText("Category Description 2")
      expect(firstDropdownItem).toBeInTheDocument()
      expect(secondDropdownItem).toBeInTheDocument()
      expect(firstDropdownItem.compareDocumentPosition(secondDropdownItem)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING
      )
    })
    it("sorts dropdown items by description", async () => {
      const firstDropdownItem = screen.getByText("Category Description")
      const secondDropdownItem = screen.getByText("Category Description 2")
      expect(firstDropdownItem.compareDocumentPosition(secondDropdownItem)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING
      )
    })
    it("displays the selected category in the dropdown", async () => {
      const firstDropdownItem = screen.getByText("Category Description")
      expect(firstDropdownItem).toBeInTheDocument()
      firstDropdownItem.click()
      waitFor(() => {
        expect(screen.getByText("Category Description")).toBeInTheDocument()
        expect(screen.queryByText("Category Description 2")).not.toBeInTheDocument()
      })
    })
  })
  describe("when a category has been selected", () => {
    beforeEach(async () => {
      const dropdownButton = screen.getByText("Select a category...")
      expect(dropdownButton).toBeInTheDocument()
      await fireEvent.click(dropdownButton)
      const firstDropdownItem = screen.getByText("Category Description")
      expect(firstDropdownItem).toBeInTheDocument()
      await fireEvent.click(firstDropdownItem)
    })
    it("clears the selection if the x button is clicked", async () => {
      expect(screen.getByRole("combobox").textContent).toContain("Category Description")
      const clearButton = screen.getByRole("clear")
      await fireEvent.click(clearButton)
      expect(screen.getByRole("combobox").textContent).toContain("Select a category...")
    })
  })
})
