import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      description,
      price,
      category,
      imageUrl,
      isFeatured,
      isArchived,
    } = await request.json();
    const { isAuthenticated } = await auth();

    if (!isAuthenticated) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

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

    const product = await db.product.create({
      data: {
        title,
        category,
        description,
        price,
        imageUrl,
        isArchived,
        isFeatured,
      },
    });

    return new NextResponse(JSON.stringify(product), { status: 201 });
  } catch (error) {
    console.log("ERROR POST PRODUCTS ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const products = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.log("ERROR GET PRODUCTS ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
