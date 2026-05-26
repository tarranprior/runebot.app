import type { Root, Node } from "fumadocs-core/page-tree";

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
    {
      type: "page",
      name: "Exception Catalogue",
      url: "/docs/_scratch/exception-catalogue-v1.0.7-dev",
      description: "Local-only exception reference",
    },
  ];

  return {
    ...tree,
    children: [...tree.children, ...devNodes],
  };
}
