"use client";
import { IoCopy } from "react-icons/io5";

export function ContractActions({ text }: { text: string }) {
  const copyText = () => {
    navigator.clipboard.writeText && navigator.clipboard.writeText(text);
  };
  return (
    <div className="flex items-center shrink-0 text-gray-300">
      <div className="">{text}</div>
      <button onClick={copyText} className="inline-block px-1 py-1">
        <IoCopy />
      </button>
    </div>
  );
}
