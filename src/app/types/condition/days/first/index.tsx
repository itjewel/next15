function fetchProducts() {
  return [
    {
      data: {
        items: [
          {
            type: "category_offer",
            data: {
              backgroundColor: "#ffecb3",
              categories: [
                {
                  description: "Boost immunity system",
                  discount: 77,
                  id: 2,
                  image: "/product-stage/2727-fruits.png",
                  name: "Seasonal Fruits & Veggies",
                },
                {
                  description: "Special import",
                  discount: 20,
                  id: 3,
                  image: "/product-stage/c1c6-hotBeverage.png",
                  name: "Hot Beverage Corner",
                },
                {
                  description: "For Steam inhalation",
                  discount: 10,
                  id: 4,
                  image: "/product-stage/8dd4-pharmaceutical.png",
                  name: "Pharma & Immunity Needs",
                },
              ],
              id: 1,
            },
          },
          {
            type: "titleless_banner_offer",
            data: {
              backgroundColor: "#cbf5f3",
              id: 456,
              promotions: [
                {
                  bannerImage:
                    "/product-stage/07a7-b022ef40bbde09587efbc31ba4881f3c21c8a39e.png",
                  id: 101,
                  promotionType: "category",
                },
                {
                  bannerImage:
                    "/product-stage/0de8-d3aa6be9cddb134ad4e9b4692fb8a35d2d501b11.png",
                  id: 102,
                  promotionType: "product",
                },
                {
                  bannerImage:
                    "/product-stage/9e7e-food-deal-offer-video-ad-design-template-7860739098a2ec5f0e4bbd802c6b9308-screen.jpg",
                  id: 103,
                  promotionType: "product_tag",
                },
              ],
            },
          },
          {
            type: "categories",
            data: {
              backgroundColor: "#FFFFFF",
              categories: [
                {
                  backgroundColor: "#FFFFFF",
                  id: 301,
                  image: "/product-stage/a5bf-electronicsImage.png",
                  name: "Electronics",
                },
                {
                  backgroundColor: "#FFFFFF",
                  id: 302,
                  image: "/product-stage/54a6-fashion.png",
                  name: "Fashion",
                },
                {
                  backgroundColor: "#FFFFFF",
                  id: 303,
                  image: "/product-stage/a031-homeAndKitchen.png",
                  name: "Home & Kitchen",
                },
                {
                  backgroundColor: "#FFFFFF",
                  id: 304,
                  image: "/product-stage/da9d-Groceries.png",
                  name: "Groceries",
                },
              ],
              id: 4,
            },
          },
        ],
        itemsPerPage: 5,
        pageNumber: 1,
        totalItems: 0,
        totalPages: 0,
      },
      message: "Success",
      status: true,
    },
  ];
}

// type GenerateType<T> = T extends (
//   ...arg: unknown[]
// ) => [{ data: { items: infer R } }]
//   ? R
//   : never;

type Propse<T> = T extends () => infer R ? R : never;
type PropsType = Propse<typeof fetchProducts>;
const result: PropsType = fetchProducts();

// type Items = ReturnType<typeof fetchProducts>[0]["data"]["items"];
