"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-[#F5C518] text-[#1A1A1A] font-bold text-xs uppercase tracking-wider px-4 py-2 rounded"
    >
      Imprimir / Salvar PDF
    </button>
  );
}
