// src/app/editor/Tiptap.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Mention from "@tiptap/extension-mention";
import { useState, useEffect } from "react";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import { createPopper } from "@popperjs/core";

// Define types for Mention suggestion items
interface MentionItem {
  id: string;
  label: string;
}

// Text Search Plugin
const SearchPlugin = (searchTerm: string) => {
  return new Plugin<{
    searchTerm: string;
    decorations: DecorationSet;
  }>({
    key: new PluginKey("search"),
    state: {
      init() {
        return { searchTerm, decorations: DecorationSet.empty };
      },
      apply(tr, oldState) {
        if (!searchTerm) {
          return { ...oldState, decorations: DecorationSet.empty };
        }
        const decorations: Decoration[] = [];
        tr.doc.descendants((node, pos) => {
          if (node.isText) {
            const text = node.text?.toLowerCase() || "";
            const term = searchTerm.toLowerCase();
            let index = text.indexOf(term);
            while (index !== -1) {
              decorations.push(
                Decoration.inline(pos + index, pos + index + term.length, {
                  class: "highlight",
                })
              );
              index = text.indexOf(term, index + 1);
            }
          }
        });
        return {
          searchTerm,
          decorations: DecorationSet.create(tr.doc, decorations),
        };
      },
    },
    props: {
      decorations(state) {
        const pluginState = this.getState(state);
        return pluginState ? pluginState.decorations : DecorationSet.empty;
      },
    },
  });
};
// Mention Suggestion for $-triggered search
const mentionSuggestion = {
  char: "$",
  items: ({ query }: { query: string }): MentionItem[] => {
    const suggestions: MentionItem[] = [
      { id: "price", label: "price" },
      { id: "discount", label: "discount" },
      { id: "total", label: "total" },
      { id: "tax", label: "tax" },
    ];
    return suggestions.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    );
  },
  render: () => {
    let component: HTMLDivElement | null = null;
    let popup: ReturnType<typeof createPopper> | null = null;
    let selectedIndex = 0;

    return {
      onStart: (props: unknown) => {
        component = document.createElement("div");
        component.className =
          "bg-white border rounded shadow-lg max-h-60 overflow-auto z-[1000]";
        document.body.appendChild(component);

        popup = createPopper(props.clientRect(), component, {
          placement: "bottom-start",
          modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
        });

        renderSuggestions(props);
      },
      onUpdate(props: any) {
        renderSuggestions(props);
        if (popup) popup.update();
      },
      onKeyDown(props: any) {
        if (props.event.key === "ArrowUp") {
          selectedIndex =
            (selectedIndex - 1 + props.items.length) % props.items.length;
          updateSelection();
          return true;
        }
        if (props.event.key === "ArrowDown") {
          selectedIndex = (selectedIndex + 1) % props.items.length;
          updateSelection();
          return true;
        }
        if (props.event.key === "Enter") {
          const item = props.items[selectedIndex];
          if (item) {
            props.command({ id: item.id, label: item.label });
          }
          return true;
        }
        return false;
      },
      onExit() {
        if (popup) popup.destroy();
        if (component) component.remove();
        component = null;
        popup = null;
      },
    };

    function renderSuggestions(props: unknown) {
      if (!component) return;
      component.innerHTML = props.items.length
        ? props.items
            .map(
              (item: MentionItem, index: number) =>
                `<div class="px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  index === selectedIndex ? "bg-gray-200" : ""
                }" data-id="${item.id}">${item.label}</div>`
            )
            .join("")
        : `<div class="px-4 py-2 text-gray-500">No results</div>`;
      addEventListeners(props);
    }

    function updateSelection() {
      if (!component) return;
      Array.from(component.children).forEach((child, index) => {
        child.classList.toggle("bg-gray-200", index === selectedIndex);
        child.classList.toggle("hover:bg-gray-100", index !== selectedIndex);
      });
    }

    function addEventListeners(props: any) {
      if (!component) return;
      Array.from(component.children).forEach((child, index) => {
        child.onclick = () => {
          selectedIndex = index;
          const item = props.items[selectedIndex];
          if (item) {
            props.command({ id: item.id, label: item.label });
          }
        };
      });
    }
  },
};

export default function Tiptap() {
  const [searchTerm, setSearchTerm] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      SearchPlugin(searchTerm),
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion: mentionSuggestion,
      }),
    ],
    content:
      "<p>Type $ to search objects (e.g., $price, $discount) or use the text search above.</p>",
    editorProps: {
      attributes: {
        class: "prose max-w-none p-4 border rounded focus:outline-none",
      },
    },
  });

  // Update editor extensions when searchTerm changes
  useEffect(() => {
    if (editor) {
      editor.setOptions({
        extensions: [
          StarterKit,
          SearchPlugin(searchTerm),
          Mention.configure({
            HTMLAttributes: {
              class: "mention",
            },
            suggestion: mentionSuggestion,
          }),
        ],
      });
    }
  }, [searchTerm, editor]);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search text..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button
          onClick={() => setSearchTerm("")}
          className="bg-gray-200 px-3 py-1 rounded"
        >
          Clear
        </button>
      </div>
      <EditorContent editor={editor} />
      <style jsx global>{`
        .highlight {
          background-color: #ffeb3b;
        }
        .mention {
          color: #2563eb;
          background-color: #e0f2fe;
          padding: 2px 4px;
          border-radius: 4px;
        }
        .prose {
          min-height: 200px;
        }
      `}</style>
    </div>
  );
}
