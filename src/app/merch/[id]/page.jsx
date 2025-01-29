import BaseLayout from "@/components/BaseLayout";
import UnderlineText from "@/components/decorators/UnderlineText";
import ProductCard from "@/components/ProductCard";
import ProductCheckout from "./ProductCheckout";
import prisma from "@/db/prisma";
import { notFound } from "next/navigation";


const Page = async ({ params }) => {
  const id = params.id;
  const currentProduct = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  if (!currentProduct || currentProduct.isArchived) return notFound();

  const products = await prisma.product.findMany(
    {
      where:{
        isArchived:false,
        id:{not:id}
      }
    }
  )

  return (
    <BaseLayout renderRightPanel={false}>
      <div className="px-3 md:px-7 my-20">
        <ProductCheckout product={currentProduct} />
        <h1 className="text-3xl text-center mt-20 mb-10 font-bold tracking-tight">
          More product from{" "}
          <UnderlineText className="decoration-wavy underline-offset-8">
            OnlyStudents
          </UnderlineText>
        </h1>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Page;
