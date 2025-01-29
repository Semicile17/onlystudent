"use client"
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { IndianRupeeIcon } from "lucide-react";
import ZoomedImage from "./ZoomedImage";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleProductArchieveAction } from "@/app/secret-dashboard/actions";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@prisma/client";

const ProductCard = ({
  product,
  adminView = false,
}: {
  product: Product;
  adminView?: boolean;
}) => {
  const {toast} = useToast();
  const queryClient = useQueryClient();
     const { mutate: toggleArchive, isPending } = useMutation({
        mutationKey: ["toggleArchive"],
        mutationFn: async () =>
          toggleProductArchieveAction(product.id),
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey:["getAllProducts"]});
          toast(
            {
              title:"Success",
              description:`Product ${product.isArchived?"unarchived":"archived"}`,
            }
          );
        },
        onError: (error) => {
          toast({
            title:"Error",
            description:error.message,
            variant:"destructive"
          })
        },
      });
  return (
    <Card className="flex flex-col">
      <CardHeader className="px-2 flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{product.name}</CardTitle>
        <div>
          <IndianRupeeIcon className="inline h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{product.price}</span>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 gap-10">
        <ZoomedImage imgSrc={product.image} />
        <div className="flex justify-center mt-auto">
          {!adminView && (
            <Link
              href={`/merch/${product.id}`}
              className={cn("w-full", buttonVariants())}
            >
              Buy
            </Link>
          )}
					{adminView && (
						<Button
							className='w-full'
							variant={"outline"}
              onClick={()=>{toggleArchive()}}
              disabled={isPending}
							
						>
							{
                product.isArchived ? "UnArchive":"Archive"
              }
						</Button>
					)}
        </div>
      </CardContent>
      <div className="px-2 py-1 ">
        {adminView && (
          <span
            className={`text-sm font-medium ${
              product.isArchived ? "text-red-500" : "text-green-500"
            }`}
          >
            {product.isArchived ? "Archived" : "Live"}
          </span>
        )}
        {!adminView && (
          <span className={`text-sm font-medium text-green-500`}>in stock</span>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
