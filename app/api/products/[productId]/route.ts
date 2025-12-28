import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/products/[productId]">
) {
  try {
    const { productId } = await ctx.params;

    if (!productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await db.product.findUnique({
      where: { id: productId },
    });

    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.log("ERROR GET PRODUCT ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<"/api/products/[productId]">
) {
  try {
    const { productId } = await ctx.params;
    const { isAuthenticated } = await auth();
    const body = await request.json();

    if (!isAuthenticated) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }
    const {
      title,
      description,
      price,
      category,
      imageUrl,
      isFeatured,
      isArchived,
    } = body;

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }
    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }
    if (!category) {
      return new NextResponse("Category is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Image Url is required", { status: 400 });
    }

    const currentProduct = await db.product.findFirst({
      where: { id: productId },
    });

    if (!currentProduct) {
      return new NextResponse("Product not found!", { status: 404 });
    }

    const product = await db.product.update({
      where: {
        id: productId,
      },
      data: {
        title,
        price,
        description,
        isFeatured,
        isArchived,
        category,
        imageUrl,
      },
    });

    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.log("ERROR PATCH PRODUCTS ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  ctx: RouteContext<"/api/products/[productId]">
) {
  try {
    const { isAuthenticated } = await auth();
    const { productId } = await ctx.params;

    if (!isAuthenticated) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const currentProduct = await db.product.findFirst({
      where: { id: productId },
    });

    if (!currentProduct) {
      return new NextResponse("Product not found!", { status: 404 });
    }

    const product = await db.product.deleteMany({
      where: { id: productId },
    });

    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.log("ERROR DELETE PRODUCTS ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
