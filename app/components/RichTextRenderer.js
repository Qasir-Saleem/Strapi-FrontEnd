"use client";

import React from "react";

// sirf simple leaf (text + bold/italic/underline/code) handle karega
function renderLeaf(leaf, key) {
  let children = leaf.text || "";

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.code) {
    children = (
      <code className="px-1 py-0.5 rounded bg-gray-100 text-sm">
        {children}
      </code>
    );
  }

  return <React.Fragment key={key}>{children}</React.Fragment>;
}

// children array ko smart tareeke se render karega
function renderChildren(children) {
  if (!Array.isArray(children)) return null;

  return children.map((child, i) => {
    // agar child ke paas type + children hain → ye ek nested node hai (jaise link)
    if (child.type && child.children) {
      return renderNode(child, `nested-${i}`);
    }

    // warna ye simple text leaf hai
    return renderLeaf(child, `leaf-${i}`);
  });
}

function renderNode(node, key) {
  // LINK node (paragraph ke andar bhi aa sakta hai)
  if (node.type === "link") {
    return (
      <a
        key={key}
        href={node.url}
        target={node.openInNewTab ? "_blank" : "_self"}
        rel="noreferrer"
        className="text-black underline hover:text-[#d5af34]"
      >
        {renderChildren(node.children)}
      </a>
    );
  }

  switch (node.type) {
    case "heading": {
      const Tag = `h${node.level || 2}`;
      return (
        <Tag
          key={key}
          className="mb-4 text-lg"
        >
          {renderChildren(node.children)}
        </Tag>
      );
    }

    case "list": {
      const isOrdered = node.format === "ordered";

      const Wrapper = isOrdered ? "ol" : "ul";
      const listClass = isOrdered
        ? "mb-4 list-decimal pl-6 space-y-1"
        : "mb-4 list-disc pl-6 space-y-1";

      return (
        <Wrapper key={key} className={listClass}>
          {(node.children || []).map((li, liIndex) => (
            <li key={`li-${liIndex}`}>{renderChildren(li.children)}</li>
          ))}
        </Wrapper>
      );
    }

    case "paragraph":
    default:
      return (
        <p
          key={key}
          className="mb-4 text-base md:text-lg leading-[29px]"
        >
          {renderChildren(node.children)}
        </p>
      );
  }
}

export default function RichTextRenderer({ content }) {
  if (!Array.isArray(content)) return null;
  return <div>{content.map((node, i) => renderNode(node, i))}</div>;
}
