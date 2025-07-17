async function getProducts() {
  async function getData() {
    const res = await fetch('https://fakestoreapi.com/products');

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  }

  // Chama a função getData e retorna seu resultado
  return await getData();
}

export default async function Home() {
  const products = await getProducts();
  console.log(products);

  return (
    <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          Prod 1
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          Prod 2
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          Prod 3
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          Prod 4
        </div>
      </div>
    </div>
  );
}