import { Order } from '~/modules/user-side/order/types';


export default async function (): Promise<Order[] | undefined> {

  const token = useAuthToken();

  if (token.length === 0) {
    navigateTo('/account');
    return;
  }

  const { data: userOrderList, refresh } = await useCustomFetch(
    '/order/GetUserOrders/',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );


  console.log(userOrderList.value)

  return userOrderList.value as Order[];
}
