"use client";
import { useState, useRef, useEffect } from "react";
import IconRenderer from "../IconRenderer/page";
import TertiaryButton from "../Buttons/TertiaryButton";
import { TCategoryTree } from "./types/TCategoryTree";
import { TCascadeSelectProps } from "./types/TCascadeSelectProps";
import { useAppSelector } from "@/lib/utils/reduxHooks";
import { buildCategoryTree } from "./utils/buildCategoryTree";
import { TCategory } from "./types/TCategory";

function getDescendants(categories: TCategory, id: number): number[] {
  const children = categories.filter((c) => c.parentId === id);
  let ids: number[] = children.map((c) => c.id);
  for (const child of children) {
    ids = ids.concat(getDescendants(categories, child.id));
  }
  return ids;
}

function DropdownNode({
  node,
  onSelect,
  depth = 0,
  excludedIds,
}: {
  node: TCategoryTree;
  onSelect: (node: TCategoryTree) => void;
  depth?: number;
  excludedIds: number[];
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = node.children.length > 0;

  if (excludedIds.includes(node.id!)) {
    return null;
  }

  return (
    <div>
      <div
        className={`flex items-center justify-between px-3 cursor-pointer hover:bg-yellow_400 ${
          hasChildren ? "py-1" : "py-[7px]"
        }`}
        style={{ paddingLeft: depth * 16 + 12 }}
        onClick={() => onSelect(node)}
      >
        <span>{node.name}</span>
        {hasChildren && (
          <span
            className="ml-2 text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded((prev) => !prev);
            }}
          >
            <TertiaryButton className="hover:bg-yellow_200 p-1">
              <IconRenderer
                name="Arrow"
                size={20}
                className={`transition-transform duration-300 ${
                  expanded ? "rotate-180" : "rotate-0"
                }`}
              />
            </TertiaryButton>
          </span>
        )}
      </div>

      {expanded && (
        <div className="animate-slide-down">
          {node.children
            .filter((child) => !excludedIds.includes(child.id!))
            .map((child) => (
              <DropdownNode
                key={child.id}
                node={child}
                onSelect={onSelect}
                depth={depth + 1}
                excludedIds={excludedIds}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default function CascadeSelect({
  defaultValue,
  value,
  onChange,
  excludeId = null,
}: TCascadeSelectProps & { excludeId?: number | null }) {
  const rawCategory = useAppSelector((state) => state.rawCategory.rawCategory);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [selectedName, setSelectedName] = useState<string | null>(
    value ? defaultValue : null
  );

  useEffect(() => {
    function handleOutside(e: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, []);

  const categoryTree = buildCategoryTree(rawCategory);

  const excludedIds = excludeId
    ? [excludeId, ...getDescendants(rawCategory, excludeId)]
    : [];

  return (
    <div ref={ref} className="relative inline-block w-full">
      {/* Select field */}
      <div
        className="border border-black/25 rounded-md px-3 py-2 bg-white cursor-pointer flex justify-between items-center font-nunito"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={value ? "text-black" : "text-black/50"}>
          {selectedName ?? "No Parent"}
        </span>
        <IconRenderer
          name="Arrow"
          size={20}
          className={`ml-2 transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {/* Dropdown */}
      <div
        className={`absolute mt-1 bg-white border border-black/25 rounded-md shadow-lg z-50 w-full max-h-64 overflow-y-auto
          transition-all duration-300 origin-top
          ${
            open
              ? "opacity-100 scale-y-100"
              : "opacity-0 scale-y-80 pointer-events-none"
          }
        `}
      >
        {/* No Parent option */}
        <div
          className="px-3 py-2 cursor-pointer hover:bg-yellow_400"
          onClick={() => {
            setSelectedName(null);
            onChange(null);
            setOpen(false);
          }}
        >
          No Parent
        </div>

        {categoryTree
          .filter((node) => !excludedIds.includes(node.id!))
          .map((node) => (
            <DropdownNode
              key={node.id}
              node={node}
              onSelect={(item) => {
                setSelectedName(item.name);
                onChange(item.id);
                setOpen(false);
              }}
              excludedIds={excludedIds}
            />
          ))}
      </div>
    </div>
  );
}
