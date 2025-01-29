"use server";

import prisma from "@/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

type PostArgs = {
  text: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  isPublic: boolean;
};
type ProductArgs = {
  name: string;
  image: string;
  price: string;
};

export async function createPostAction({
  isPublic,
  mediaUrl,
  mediaType,
  text,
}: PostArgs) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  if (!user || !isAdmin) {
    throw new Error("Unauthorized");
  }

  const newPost = await prisma.post.create({
    data: {
      text,
      mediaUrl,
      mediaType,
      isPublic,
      userId: user.id,
    },
  });

  return { success: true, post: newPost };
}

export async function getAllProductsAction() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  if (!user || !isAdmin) {
    throw new Error("Unauthorised");
  }
  const products = await prisma.product.findMany();

  return products;
}

export async function addNewProductAction({ name, image, price }: ProductArgs) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  if (!user || !isAdmin) {
    throw new Error("Unauthorized");
  }

  if (!name || !price || !image) {
    throw new Error("Please provide all required fields");
  }

  const priceInNum = Math.round(parseFloat(price) * 100);

  if (isNaN(priceInNum)) {
    throw new Error("Price must be a number");
  }

  const newProduct = await prisma.product.create({
    data: {
      name,
      image,
      price: priceInNum,
    },
  });

  return { success: true, post: newProduct };
}

export async function toggleProductArchieveAction(productId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  if (!user || !isAdmin) {
    throw new Error("Unauthorized");
  }
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    throw new Error("Product not found");
  }

  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: {
      isArchived: !product.isArchived,
    },
  });
  return {
    success:true,product:updatedProduct
  }
}
