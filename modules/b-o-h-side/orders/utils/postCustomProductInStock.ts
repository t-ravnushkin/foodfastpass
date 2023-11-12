export default async function (productId: number, category : string, name : string, onComplete: () => void) {
    const token = useAuthToken();
  
    if (token.length === 0) {
      navigateTo('/boh/auth');
      return;
    }
  
    const { data } = await useCustomFetch(
      '/boh/CustomProductInStock/',
      {
        method: 'POST',
        body: {
          pk: Number(productId),
          nameGroup : category,
          nameCustom : name
        },
        headers: {
          Authorization: `Bearer ${ token }`,
        },
      },
    );
  
    onComplete();
  }