"use client";
import RotatedText from "@/components/decorators/RotatedText";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { addNewProductAction } from "../actions";

const AddNewProductForm = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const {toast}= useToast()
  const queryClient = useQueryClient();
  const { mutate: addProduct, isPending } = useMutation({
      mutationKey: ["addProduct"],
      mutationFn: async () =>
        addNewProductAction({ name, image:imageUrl,price}),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey:["getAllProducts"]})
        toast(
          {
            title:"Product Added",
            description:"Your product has been successfully added",
          }
        );
        setName("");
        setImageUrl("");
        setPrice("")
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
    <>
      <p className="text-3xl tracking-tighter my-5 font-medium text-center">
        Add <RotatedText>New</RotatedText> Product
      </p>
      <form onSubmit={(e)=>{
        e.preventDefault()
        addProduct()
      }}>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">New Merch</CardTitle>
            <CardDescription>
              Add a new product to your store. Select only one image
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="OnlyStudents Special"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2 mt-4">
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                type="text"
                id="price"
                placeholder="12"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <CldUploadWidget
              signatureEndpoint={"/api/sign-image"}
              onSuccess={(result, { widget }) => {
                setImageUrl(
                  (result.info as CloudinaryUploadWidgetInfo).secure_url
                );
                widget.close()
              }}
            >
              {({ open }) => {
                return (
                  <Button
                    variant={"outline"}
                    type="button"
                    className="w-full mt-4"
                    onClick={() => open()}
                  >
                    Upload an image
                  </Button>
                );
              }}
            </CldUploadWidget>
            {imageUrl && (
              <div className="flex mt-2 justify-center relative w-full h-96">
                <Image
                  fill
                  src={imageUrl}
                  alt="Upload-Image"
                  className="object-contain rounded-md"
                />
              </div>
            )}

          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isPending} >
              {
                isPending ? "Adding product...":"Add a Product"
              }
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default AddNewProductForm;
