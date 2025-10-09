import { getOrders } from '@/data/order';
import { isValidCPF } from '@/helpers/cpf';

import CpfForm from './components/cpf-form';
import OrderList from './components/order-list';

interface OrdersPageProps {
  searchParams: Promise<{ cpf: string }>;
}

const ordersPage = async ({ searchParams }: OrdersPageProps) => {
  const { cpf } = await searchParams;
  if (!cpf) {
    return <CpfForm />;
  }
  if (!isValidCPF(cpf)) {
    return <CpfForm />;
  }
  const orders = await getOrders(cpf);
  return (
    <>
      <OrderList orders={orders} />
    </>
  );
};

export default ordersPage;
