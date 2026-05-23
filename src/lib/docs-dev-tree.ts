import type { Root, Node } from "fumadocs-core/page-tree";

/**
 * Appends a dev-only "Kitchen Sink" entry to the docs page tree.
 */
export function withDevTree(tree: Root): Root {
  if (process.env.NODE_ENV !== "development") return tree;

  const devNodes: Node[] = [
    {
      type: "separator",
      name: "Local Dev",
    },
    {
      type: "page",
      name: "Kitchen Sink",
      url: "/docs/_scratch/kitchen-sink",
      description: "Local-only authoring reference",
    },
  ];

  return {
    ...tree,
    children: [...tree.children, ...devNodes],
  };
}
