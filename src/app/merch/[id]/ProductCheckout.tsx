"use client"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import ZoomedImage from "@/components/ZoomedImage";
import { Product } from "@prisma/client";
import { SelectValue } from "@radix-ui/react-select";
import { useState } from "react"
const ProductCheckout = ({product}:{product:Product}) => {
    const [selectedEdition,setSelectedEdition] = useState<string|null>(null);

  return (
    <div className="flex flex-col md:flex-row gap-5">
        <ZoomedImage imgSrc={product.image}/>
        <div className="w-full">
            <h1 className="text-2xl md:text-4xl font-bold">
                {product.name}
            </h1>
            <p className="text-muted-foreground text-base"> 
                {product.price}
            </p>
            <Label className="mt-5 inline-block">Edition</Label>
            <Select onValueChange={setSelectedEdition}>
                <SelectTrigger>
                    <SelectValue placeholder="Select"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="latest">2025</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                    <SelectItem value="oldest">2015</SelectItem>
                </SelectContent>
            </Select>
            <Button className="mt-5 text-white px-5 py-2 rounded-md"
            size={"sm"}
            onClick={()=>alert("Bought! "+selectedEdition)}>
            Buy
            </Button>
        </div>

      
    </div>
  )
}

export default ProductCheckout

