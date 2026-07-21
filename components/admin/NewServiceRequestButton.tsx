"use client";

export default function NewServiceRequestButton() {
  return (
    <button
      className="rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-500"
      onClick={() => alert("Service Request modal coming next")}
    >
      + New Service Request
    </button>
  );
}