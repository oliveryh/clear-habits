import Entry from "@/components/Entry.vue"
import * as mutations from "@/mutations"
import { renderSuspended } from "@nuxt/test-utils/runtime"
import { screen } from "@testing-library/vue"
import { mount } from "@vue/test-utils"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

const mockEntry = {
  id: "123",
  description: "Entry Description",
  timerActive: false,
  timerTrackedTime: 90,
  timerEstimatedTime: 120,
  timerStartedAt: null,
  complete: false,
  listOrder: 1,
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
    beforeEach(() => {
      vi.mock("@/mutations.ts", () => ({
        startEntry: vi.fn(),
        stopEntry: vi.fn(),
        completeEntry: vi.fn(),
        restartEntry: vi.fn(),
      }))
    })
    afterEach(() => {
      vi.restoreAllMocks()
    })

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
      expect(screen.getByText("Project Description")).toBeInTheDocument()
    })
    it("displays the project description using the category color", async () => {
      await renderSuspended(Entry, {
        props: {
          entry: mockEntry,
        },
      })
      const projectDescription = screen.getByText("Project Description")
      expect(projectDescription).toHaveStyle({
        backgroundColor: "#ff0000",
      })
    })
  })
  describe("when the entry is not in progress", () => {
    const mockEntryNotInProgress = {
      ...mockEntry,
      timerActive: false,
      timerStartedAt: null,
    }

    it("displays a play icon", async () => {
      await renderSuspended(Entry, {
        props: {
          entry: mockEntryNotInProgress,
        },
      })
      expect(screen.getByTestId("play-icon")).toBeInTheDocument()
    })
    it("displays the entry duration without seconds displayed", async () => {
      await renderSuspended(Entry, {
        props: {
          entry: mockEntryNotInProgress,
        },
      })
      expect(screen.getByText("1m · 2m")).toBeInTheDocument()
    })
    it("starts the timer when the timer button is clicked", async () => {
      mount(Entry, {
        props: {
          entry: mockEntryNotInProgress,
        },
      })
      const buttonText = screen.getByText("1m · 2m")
      const button = buttonText.closest("button")
      button?.click()
      expect(mutations.startEntry).toHaveBeenCalled()
    })
  })
  describe("when the entry is in progress", () => {
    const mockEntryInProgress = {
      ...mockEntry,
      timerActive: true,
      timerStartedAt: new Date(Date.now() - 30 * 60 * 1000), // Set to now - 30 minutes
    }

    it("displays a pause icon", async () => {
      await renderSuspended(Entry, {
        props: {
          entry: mockEntryInProgress,
        },
      })
      expect(screen.getByTestId("pause-icon")).toBeInTheDocument()
    })
    it("displays the entry duration with seconds and estimated time showing", async () => {
      await renderSuspended(Entry, {
        props: {
          entry: mockEntryInProgress,
        },
      })
      expect(screen.getByText("31m 30s · 2m")).toBeInTheDocument()
    })
    it("starts stops timer when the timer button is clicked", async () => {
      mount(Entry, {
        props: {
          entry: mockEntryInProgress,
        },
      })
      const buttonText = screen.getByText("31m 30s · 2m")
      const button = buttonText.closest("button")
      button?.click()
      expect(mutations.stopEntry).toHaveBeenCalled()
    })
  })
  describe("when the entry is incomplete", () => {
    const mockEntryIncomplete = {
      ...mockEntry,
      complete: false,
    }

    it("displays a check icon", async () => {
      await renderSuspended(Entry, {
        props: {
          entry: mockEntryIncomplete,
        },
      })
      expect(screen.getByTestId("check-icon")).toBeInTheDocument()
    })
    it("completes the entry when the check button is clicked", async () => {
      mount(Entry, {
        props: {
          entry: mockEntryIncomplete,
        },
      })
      const buttonText = screen.getByTestId("check-icon")
      const button = buttonText.closest("button")
      button?.click()
      expect(mutations.completeEntry).toHaveBeenCalled()
    })
  })
  describe("when the entry is complete", () => {
    const mockEntryComplete = {
      ...mockEntry,
      complete: true,
    }

    it("displays a undo icon", async () => {
      await renderSuspended(Entry, {
        props: {
          entry: mockEntryComplete,
        },
      })
      expect(screen.getByTestId("undo-2-icon")).toBeInTheDocument()
    })
    it("restarts the entry when the undo button is clicked", async () => {
      mount(Entry, {
        props: {
          entry: mockEntryComplete,
        },
      })
      const buttonText = screen.getByTestId("undo-2-icon")
      const button = buttonText.closest("button")
      button?.click()
      expect(mutations.restartEntry).toHaveBeenCalled()
    })
  })
})
