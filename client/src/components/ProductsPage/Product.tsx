import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Ratings } from "../ui/ratings"

const Product = React.memo(({ product }) => {
  const img = import.meta.env.VITE_BACKEND_URL + `/images/${product.imageUrl}`
  return (
    <Card className="overflow-hidden relative flex flex-col h-fit">
      <img className="object-cover h-[250px]" src={img} alt={product.name} />
      <p className="absolute border-primary-foreground border top-3 right-3 bg-primary text-primary-foreground py-1 px-3 font-medium rounded-md">
        {product.category}
      </p>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p>Цена: {product.price}р.</p>
        <p>Цвет: {product.color}</p>
      </CardContent>
      <CardFooter>
        <Ratings rating={product.rating} />
      </CardFooter>
    </Card>
  )
})

export default Product
