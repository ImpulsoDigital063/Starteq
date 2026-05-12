import { Header } from "@/components/Header";
import { OSListClient } from "./OSListClient";
import { SERVICE_ORDERS } from "@/lib/admin-mock";
import { requireSession } from "@/lib/admin-auth";


export const metadata = {
  title: "Ordens de Serviço · Starteq",
};

export default function OSListPage() {
  return <OSListClient initialOrders={SERVICE_ORDERS} />;
}
