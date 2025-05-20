import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";

export const RemoveMentionWhenSpaceRemoved = Extension.create({
  name: "removeMentionWhenSpaceRemoved",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("removeMentionWhenSpaceRemoved"),
        props: {
          handleKeyDown(view, event) {
            if (event.key !== "Backspace") return false;

            const { state, dispatch } = view;
            const { $from } = state?.selection;

            // Exit early if $from or $from.pos is undefined
            if (!$from || $from.pos == null) return false;

            const pos = $from.pos;

            // Ensure pos - 2 is non-negative to avoid invalid position
            if (pos < 2) return false;

            const nodeBefore = state?.doc?.nodeAt(pos - 2); // mention
            const charBefore = state?.doc?.textBetween(pos - 1, pos); // last char
            const charAfter = state?.doc?.textBetween(pos, pos + 1); // next char

            // Case: |<mention>␣|
            if (charBefore === " " && nodeBefore?.type.name === "mention") {
              const mentionNodeSize = nodeBefore?.nodeSize;
              const from = pos - mentionNodeSize - 1; // mention + space
              const to = pos;
              dispatch(state.tr.delete(from, to));
              return true;
            }

            return false;
          },
        },
      }),
    ];
  },
});
