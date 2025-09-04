"use client";
import TertiaryButton from "@/components/Buttons/TertiaryButton";
import InputBox from "@/components/FormElements/InputBox";
import IconRenderer from "@/components/IconRenderer/page";
import React, { useEffect, useRef, useState } from "react";

const AddTags = ({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [showTagInput, setShowTagInput] = useState(false);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const tagWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        tagWrapperRef.current &&
        !tagWrapperRef.current.contains(e.target as Node)
      ) {
        setShowTagInput(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!tagInputRef.current) return;

    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = tagInputRef.current.value.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags((prev) => [...prev, newTag]);
      }
      tagInputRef.current.value = "";
    }

    if (e.key === "Backspace" && tagInputRef.current.value === "") {
      setTags((prev) => prev.slice(0, -1));
    }
  };

  return (
    <div className="flex gap-3 items-center flex-wrap" ref={tagWrapperRef}>
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-black/8 px-2 py-1 rounded-md text-black/75"
        >
          #{tag}
        </span>
      ))}

      {showTagInput ? (
        <InputBox
          type="text"
          name="tags"
          borderLess
          placeholder="Type and press Enter"
          className="bg-black/8 px-2 py-1 w-fit"
          ref={tagInputRef}
          onKeyDown={handleAddTag}
          autoFocus
        />
      ) : (
        <TertiaryButton
          type="button"
          className="flex gap-2 items-center bg-black/8 p-1 rounded-md text-black/75"
          onClick={() => setShowTagInput(true)}
        >
          <IconRenderer name="Plus" />
          {tags.length === 0 && <span className="mr-1">Add Tags</span>}
        </TertiaryButton>
      )}
    </div>
  );
};

export default AddTags;
