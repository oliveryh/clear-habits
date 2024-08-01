import json
from fasthtml.common import *

alpine_scripts = (
    Script(
        src="https://cdn.jsdelivr.net/npm/@alpinejs/focus@3.x.x/dist/cdn.min.js",
    ),
    Script(
        src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js",
    ),
)


def get_dynamic_dropdown(category_values):
    x_data = """{{
        allOptions: {},
        options: [],
        isOpen: false,
        openedWithKeyboard: false,
        selectedOption: null,
        setSelectedOption(option) {{
            this.selectedOption = option
            this.isOpen = false
            this.openedWithKeyboard = false
            this.$refs.hiddenTextField.value = option.value

            this.$refs.searchField.value = ''
            this.options = this.allOptions
        }},
        getFilteredOptions(query) {{
            this.options = this.allOptions.filter((option) =>
                option.label.toLowerCase().includes(query.toLowerCase())
            )
            if (this.options.length === 0) {{
                this.$refs.noResultsMessage.classList.remove('hidden')
            }} else {{
                this.$refs.noResultsMessage.classList.add('hidden')
            }}
        }},
        handleKeydownOnOptions(event) {{
            console.log(event.keyCode)
            // if the user presses backspace or the alpha-numeric keys, focus on the search field
            if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode === 8) {{
                this.$refs.searchField.focus()
            }}
            // If the user presses enter and is focused in the search field, select the first option
            if (event.keyCode === 13 && document.activeElement === this.$refs.searchField) {{
                this.setSelectedOption(this.options[0])
            }}
        }},
    }}
    """
    x_data = x_data.format(json.dumps(category_values))
    dropdown = Div(
        Div(
            Button(
                Span(
                    x_text="selectedOption ? selectedOption.label : 'Please Select'",
                    cls="text-sm font-normal",
                ),
                **{
                    "x-on:click": "isOpen = ! isOpen",
                    "x-on:keydown.down.prevent": "openedWithKeyboard = true",
                    "x-on:keydown.enter.prevent": "openedWithKeyboard = true",
                    "x-bind:aria.expanded": "isOpen || openedWithKeyboard",
                    "x-bind:aria.label": "selectedOption ? selectedOption.value : 'Please Select'",
                },
                cls="inline-flex w-full items-center justify-between gap-2 border rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium tracking-wide text-slate-700 transition hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:focus-visible:outline-blue-600",
            ),
            Input(
                id="state",
                name="state",
                autocomplete="off",
                x_ref="hiddenTextField",
                hidden="",
            ),
            Div(
                Div(
                    Div(
                        I(data_lucide="search", cls="mx-4"),
                        Input(
                            type="text",
                            cls="w-full pr-4 text-sm text-slate-700 focus:outline-none focus-visible:border-blue-700 disabled:cursor-not-allowed disabled:opacity-75 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:focus-visible:border-blue-600",
                            name="searchField",
                            aria_label="Search",
                            x_ref="searchField",
                            placeholder="Search",
                            autocomplete="off",
                            **{
                                "x-on:input": "getFilteredOptions($el.value)",
                            },
                        ),
                        cls="flex flex-row mt-4",
                    ),
                    cls="relative",
                ),
                Ul(
                    Li(
                        Span("No matches found"),
                        cls="hidden p-4",
                        x_ref="noResultsMessage",
                    ),
                    Template(
                        Li(
                            Div(
                                Span(
                                    x_text="item.label",
                                    **{
                                        "x-bind:class": "selectedOption == item ? 'font-bold' : null",
                                    },
                                ),
                                cls="flex items-center gap-2",
                            ),
                            **{
                                "x-on:click": "setSelectedOption(item)",
                                "x-on:keydown.enter": "setSelectedOption(item)",
                                "x-bind:id": "'option-' + index",
                                "x-bind:key": "item.value",
                                "tabindex": "0",
                            },
                            cls="mx-4 my-2",
                        ),
                        role="option",
                        x_for="(item, index) in options",
                        **{
                            "x-bind:key": "item.value",
                        },
                    ),
                    cls="flex max-h-44 flex-col overflow-y-auto py-2",
                ),
                id="statesList",
                cls="absolute left-0 top-11 z-10 w-full overflow-hidden rounded-xl border border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-800",
                role="listbox",
                aria_label="states list",
                x_transition="",
                x_trap="openedWithKeyboard",
                x_show="isOpen || openedWithKeyboard",
                **{
                    "x-on:click.outside": "isOpen = false, openedWithKeyboard = false",
                    "x-on:keydown.down.prevent": "$focus.wrap().next()",
                    "x-on:keydown.up.prevent": "$focus.wrap().previous()",
                },
            ),
            cls="relative",
        ),
        x_data=x_data,
        x_init="options = allOptions",
        cls="flex w-full flex-col gap-1",
        **{
            "x-on:keydown": "handleKeydownOnOptions($event)",
            "x-on:keydown.esc.window": "isOpen = false, openedWithKeyboard = false",
        },
    )
    return Div(dropdown, cls="grid grid-cols-1 gap-4 max-w-lg mx-auto mb-4")
