import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import CarrinhoClient from "./CarrinhoClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Carrinho · Starteq Tocantins",
  description: "Seu carrinho — finalize o pedido e a loja confirma.",
};

export default function CarrinhoPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <CarrinhoClient />
      </main>
      <Footer />
    </>
  );
}
