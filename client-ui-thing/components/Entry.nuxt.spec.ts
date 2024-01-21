import Entry from "@/components/Entry.vue"
import { renderSuspended } from "@nuxt/test-utils/runtime"
import { screen } from "@testing-library/vue"
import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"

const mockEntry = {
  id: "123",
  description: "Entry Description",
  task: {
    description: "Task Description",
    project: {
      description: "Project Description",
      category: {
        description: "Category Description",
        color: "#ff0000",
        colorContrast: true,
      },
    },
  },
}

describe("Entry", () => {
  describe("when the entry is viewed by default", () => {
    it("displays the entry description", async () => {
      await renderSuspended(Entry, {
        props: {
          entry: mockEntry,
        },
      })
      expect(screen.getByText("Entry Description")).toBeInTheDocument()
    })
    it("displays the task description", async () => {
      await renderSuspended(Entry, {
        props: {
          entry: mockEntry,
        },
      })
      expect(screen.getByText("Task Description")).toBeInTheDocument()
    })
    it("displays the project description in upper case", async () => {
      await renderSuspended(Entry, {
        props: {
          entry: mockEntry,
        },
      })
      expect(screen.getByText("PROJECT DESCRIPTION")).toBeInTheDocument()
    })
    it("displays the project description using the category color", async () => {
      await renderSuspended(Entry, {
        props: {
          entry: mockEntry,
        },
      })
      const projectDescription = screen.getByText("PROJECT DESCRIPTION")
      expect(projectDescription).toHaveStyle({
        backgroundColor: "#ff0000",
      })
    })
  })
})
