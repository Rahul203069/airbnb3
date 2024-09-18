import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { email } = await req.json();

    // Validate that email exists
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Find the user by email
    const user = await prisma.users.findFirst({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find listings by user ID
    const listings = await prisma.listing.findMany({
      where: { userid: user.id },
    });

    // Update questions with new creation date
    await prisma.question.updateMany({
      data: { createdat: new Date() },
    });

    // Find questions related to listings
    const questions = await prisma.question.findMany({
      where: {
        listingId: {
          in: listings.map((item) => item.id),
        },
      },
      include: { user: true },
      orderBy: {
        createdat: "desc",
      },
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error in POST /api/answers:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  } finally {
    // Close the Prisma Client connection
    await prisma.$disconnect();
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Parse the request body
    const { id, questions, email } = await req.json();

    // Validate the inputs
    if (!email || !id || !questions) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Find the user by email
    const user = await prisma.users.findFirst({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find listings by user ID
    const listings = await prisma.listing.findMany({
      where: { userid: user.id },
    });

    // Update the question
    const updatedQuestion = await prisma.question.update({
      where: { id },
      data: { answer: questions, answered: true },
    });

    console.log(updatedQuestion);

    // Fetch updated questions related to listings
    const updatedQuestions = await prisma.question.findMany({
      where: {
        listingId: {
          in: listings.map((item) => item.id),
        },
      },
    });

    console.log(updatedQuestions);

    return NextResponse.json(updatedQuestions);
  } catch (error) {
    console.error("Error in PUT /api/answers:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  } finally {
    // Close the Prisma Client connection
    await prisma.$disconnect();
  }
}
