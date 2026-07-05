import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ProdutoEditClient } from "../ProdutoEditClient";

export default function ProdutoNovoPage() {
  return (
    <>
      <Link href="/admin/produtos" className="inline-flex items-center gap-1 text-xs text-starteq-muted hover:text-starteq-gold mb-4 font-space font-bold uppercase tracking-wider">
        <Icon name="arrow-right" size={12} className="rotate-180" /> Voltar pra lista
      </Link>

      <header className="mb-6">
        <div className="text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-1">
          Cadastro
        </div>
        <h1 className="font-space text-2xl lg:text-3xl font-black text-starteq-bone">Novo produto</h1>
        <p className="text-starteq-muted mt-1 text-sm">Após criar, fica disponível no site + na API que sua IA consome.</p>
      </header>

      <ProdutoEditClient mode="new" />
    </>
  );
}
