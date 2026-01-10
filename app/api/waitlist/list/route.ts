import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function GET(request: NextRequest) {
  try {
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const sortBy = searchParams.get("sortBy") || "created_at";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    if (!resend) {
      return NextResponse.json(
        {
          error:
            "Resend is not configured. Please set RESEND_API_KEY in your environment variables.",
          data: [],
          pagination: {
            page: 1,
            limit: 50,
            total: 0,
            totalPages: 0,
          },
        },
        { status: 503 }
      );
    }

    if (!audienceId) {
      return NextResponse.json(
        {
          error: "RESEND_AUDIENCE_ID is not configured",
          data: [],
          pagination: {
            page: 1,
            limit: 50,
            total: 0,
            totalPages: 0,
          },
        },
        { status: 200 }
      );
    }

    // Get contacts from Resend
    const contacts = await resend.contacts.list({
      audienceId,
    });

    interface ResendContact {
      email?: string;
      created_at?: string;
      id?: string;
      [key: string]: unknown;
    }

    let emails: ResendContact[] = (contacts.data?.data as unknown as ResendContact[]) || [];

    // Filter by search
    if (search) {
      emails = emails.filter((contact) =>
        contact.email?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    emails.sort((a, b) => {
      const aValue = String(a[sortBy] || "");
      const bValue = String(b[sortBy] || "");

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Paginate
    const total = emails.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedEmails = emails.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginatedEmails.map((contact) => ({
        email: contact.email || "",
        createdAt: contact.created_at || new Date().toISOString(),
        id: contact.id || "",
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error: unknown) {
    console.error("List API error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch emails",
        data: [],
        pagination: {
          page: 1,
          limit: 50,
          total: 0,
          totalPages: 0,
        },
      },
      { status: 500 }
    );
  }
}
