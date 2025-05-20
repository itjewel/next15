"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Mention from "@tiptap/extension-mention";
import { SuggestionProps } from "@tiptap/suggestion";

// Define a simple suggestion item shape
type MentionItem = { id: string; label: string };

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  mentionList: MentionItem[]; // Pass mention list from outside
};

const TiptapEditorWithDollarComponent: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  mentionList,
}) => {
  // Define the mention extension inside the component to access mentionList prop
  const CustomDollarMention = Mention.configure({
    HTMLAttributes: { class: "mention" },
    suggestion: {
      char: "$",
      items: ({ query }: { query: string }): MentionItem[] => {
        return mentionList
          .filter((item) => {
            return item.label.toLowerCase().startsWith(query.toLowerCase());
          })
          .map((item) => ({ id: item.id, label: item.label }));
      },
      render: () => {
        let component: HTMLDivElement | null = null;
        let selectedIndex = 0;
        let latestProps: SuggestionProps<MentionItem> | null = null;

        function updatePopup(props: SuggestionProps<MentionItem>) {
          if (!component) return;
          latestProps = props;

          component.innerHTML = "";

          props.items.forEach((item, index) => {
            const div = document.createElement("div");
            div.innerText = item.label;

            Object.assign(div.style, {
              cursor: "pointer",
              padding: "4px 8px",
              marginBottom: "2px",
              borderRadius: "3px",
              background: index === selectedIndex ? "#f3f4f6" : "transparent",
            });

            div.onmouseenter = () => {
              selectedIndex = index;
              updatePopup(props);
            };

            // ✅ Fix applied here
            div.onmousedown = (e) => {
              e.preventDefault(); // prevent focus loss
              props.command(item);
            };

            component?.appendChild(div);
          });

          const rect = props.clientRect?.();
          if (rect) {
            component.style.display = "block";
            component.style.top = `${rect.bottom + window.scrollY}px`;
            component.style.left = `${rect.left + window.scrollX}px`;
          } else {
            component.style.display = "none"; // hide if rect isn't available
          }
        }

        return {
          onStart: (props: SuggestionProps<MentionItem>) => {
            component = document.createElement("div");
            component.className = "mention-popup";
            Object.assign(component.style, {
              position: "absolute",
              background: "white",
              border: "1px solid #ccc",
              padding: "4px",
              zIndex: "99999",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "4px",
              fontSize: "14px",
              maxHeight: "200px",

              overflowY: "auto",
            });

            selectedIndex = 0;
            latestProps = props;
            updatePopup(props);
            document.body.appendChild(component);
          },

          onUpdate: (props: SuggestionProps<MentionItem>) => {
            selectedIndex = 0; // reset selection on update or keep? up to your UX
            latestProps = props;
            updatePopup(props);
          },

          onKeyDown: ({ event }: { event: KeyboardEvent }) => {
            if (!component || !latestProps) return false;

            if (event.key === "ArrowDown") {
              selectedIndex = (selectedIndex + 1) % latestProps.items.length;
              updatePopup(latestProps);
              return true;
            }

            if (event.key === "ArrowUp") {
              selectedIndex =
                (selectedIndex - 1 + latestProps.items.length) %
                latestProps.items.length;
              updatePopup(latestProps);
              return true;
            }

            if (event.key === "Enter") {
              latestProps.command(latestProps.items[selectedIndex]);
              return true;
            }

            if (event.key === "Escape") {
              component.remove();
              component = null;
              return true;
            }

            return false;
          },

          onExit: () => {
            component?.remove();
            component = null;
            latestProps = null;
          },
        };
      },
    },
  });

  const editor = useEditor({
    extensions: [StarterKit, CustomDollarMention],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose border rounded p-2 bg-white",
        style: "height: 200px; overflow-y: auto;",
      },
    },
  });

  return (
    <div className="message-template">
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          background: "white",
          position: "relative",
        }}
      >
        <EditorContent editor={editor} />
      </div>
      <div className="flex gap-2 mt-2 flex-wrap max-h-20 overflow-y-auto">
        {mentionList.map((item) => (
          <button
            key={item.id}
            type="button"
            className="text-sm px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
            onClick={() => {
              if (!editor) return;

              editor
                .chain()
                .focus()
                .insertContent({
                  type: "mention",
                  attrs: {
                    id: item.id,
                    label: item.label,
                  },
                })
                .run();
            }}
          >
            ${item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TiptapEditorWithDollarComponent;
