import { notFound } from "next/navigation";
import { SERVICE_ORDERS, SERVICE_STATUS_LABEL } from "@/lib/admin-mock";
import { EtiquetaPrint } from "./EtiquetaPrint";

type Params = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return SERVICE_ORDERS.map((o) => ({ id: o.id }));
}

export const metadata = {
  title: "Etiqueta · OS",
  robots: { index: false, follow: false },
};

export default async function EtiquetaPage({ params }: Params) {
  const { id } = await params;
  const os = SERVICE_ORDERS.find((o) => o.id === id);
  if (!os) notFound();

  return <EtiquetaPrint os={os} statusLabel={SERVICE_STATUS_LABEL[os.status]} />;
}
