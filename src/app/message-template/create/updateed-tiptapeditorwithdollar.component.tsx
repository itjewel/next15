"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Mention from "@tiptap/extension-mention";
import { SuggestionProps } from "@tiptap/suggestion";
import { RemoveMentionWhenSpaceRemoved } from "./RemoveMentionOnBackspace";

// Define a simple suggestion item shape
type MentionItem = { id: string; label: string };

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  mentionList: MentionItem[]; // Pass mention list from outside
};

const insertMention = (
  editor: any,
  item: MentionItem,
  shouldAddSpaceBefore: (editor: any) => boolean
) => {
  if (!editor) return;

  const content = [
    ...(shouldAddSpaceBefore(editor) ? [{ type: "text", text: " " }] : []),
    {
      type: "mention",
      attrs: {
        id: item.id,
        label: item.label,
      },
    },
    { type: "text", text: " " },
  ];

  editor.chain().focus().insertContent(content).run();
};

const mentionButtonStyles =
  "text-sm px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500";

const TiptapEditorWithDollarComponent: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  mentionList,
}) => {
  const CustomDollarMention = Mention.configure({
    HTMLAttributes: { class: "mention" },
    suggestion: {
      char: "$",
      items: ({ query }: { query: string }): MentionItem[] => {
        return mentionList.filter((item) =>
          item.label.toLowerCase().startsWith(query.toLowerCase())
        );
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
            div.innerText = `$${item.label}`; // Show $ in suggestion popup

            Object.assign(div.style, {
              cursor: "pointer",
              padding: "4px 8px",
              marginBottom: "2px",
              borderRadius: "3px",
              background: index === selectedIndex ? "#f3f4f6" : "transparent",
            });

            div.onmousedown = (e) => {
              e.preventDefault();
              props.command({
                id: item.id,
                label: item.label,
              });
            };

            component?.appendChild(div);
          });

          const rect = props.clientRect?.();
          if (rect) {
            component.style.display = "block";
            component.style.top = `${rect.bottom + window.scrollY}px`;
            component.style.left = `${rect.left + window.scrollX}px`;
          } else {
            component.style.display = "none";
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
            selectedIndex = 0;
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
              latestProps.command({
                id: latestProps.items[selectedIndex].id,
                label: latestProps.items[selectedIndex].label,
              });
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
    // Include $ in the rendered mention
    renderLabel: ({ node }) => {
      return `$${node.attrs.label || ""}`;
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      CustomDollarMention,
      RemoveMentionWhenSpaceRemoved,
    ],
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

  // Helper to determine if a space is needed before the mention
  const shouldAddSpaceBefore = (editor: any) => {
    if (!editor) return false;
    const { selection } = editor.state;
    const pos = selection.$from.pos;
    if (pos === 0) return false; // No space at document start
    const nodeBefore = editor?.state?.doc?.nodeAt(pos - 1);
    if (nodeBefore?.type.name === "mention") return false; // No space after another mention
    const textBefore = editor.state.doc.textBetween(pos - 1, pos);
    if (textBefore === " ") return false; // No space if already a space
    return true;
  };

  const renderMentionButtons = () =>
    mentionList.map((item) => (
      <button
        key={item.id}
        type="button"
        className={mentionButtonStyles}
        onClick={() => insertMention(editor, item, shouldAddSpaceBefore)}
        aria-label={`Insert mention for ${item.label}`}
      >
        ${item.label}
      </button>
    ));

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
        {renderMentionButtons()}
      </div>
    </div>
  );
};

export default TiptapEditorWithDollarComponent;
