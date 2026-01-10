import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { resend } from "@/lib/resend";

const waitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = waitlistSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid email address",
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;

    // Add contact to Resend Audience
    // Note: You need to create an Audience in Resend dashboard first
    // and set RESEND_AUDIENCE_ID in your environment variables (optional)
    if (!resend) {
      return NextResponse.json(
        {
          error:
            "Resend is not configured. Please set RESEND_API_KEY in your environment variables.",
        },
        { status: 503 }
      );
    }

    try {
      // Check if audience ID is set
      const audienceId = process.env.RESEND_AUDIENCE_ID;

      if (!audienceId) {
        return NextResponse.json(
          {
            error:
              "RESEND_AUDIENCE_ID is not configured. Please set it in your environment variables.",
            message:
              "To use the waitlist feature, you need to create an Audience in Resend dashboard and set RESEND_AUDIENCE_ID.",
          },
          { status: 503 }
        );
      }

      // Add to specific audience
      await resend.contacts.create({
        email,
        audienceId,
      });

      return NextResponse.json(
        {
          success: true,
          message: "Successfully added to waitlist",
          email,
        },
        { status: 200 }
      );
    } catch (resendError: unknown) {
      // Handle duplicate email error
      const errorMessage =
        resendError instanceof Error
          ? resendError.message
          : String(resendError);
      const errorStatus = (resendError as { status?: number })?.status;

      if (errorMessage.includes("already exists") || errorStatus === 422) {
        return NextResponse.json(
          {
            error: "This email is already on the waitlist",
            email,
          },
          { status: 409 }
        );
      }

      // Log the error for debugging
      console.error("Resend API error:", resendError);

      return NextResponse.json(
        {
          error: "Failed to add email to waitlist. Please try again later.",
          details:
            process.env.NODE_ENV === "development" ? errorMessage : undefined,
        },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error("Waitlist API error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        error: "Invalid request",
        details:
          process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 400 }
    );
  }
}

// Optional: GET endpoint to check if email exists
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Email parameter is required" },
      { status: 400 }
    );
  }

  try {
    // Note: Resend doesn't have a direct "check if exists" API
    // This is a placeholder - you might want to implement your own check
    // or use a database to track waitlist signups

    return NextResponse.json(
      {
        exists: false,
        message: "Email check not implemented. Use POST to add email.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to check email" },
      { status: 500 }
    );
  }
}
