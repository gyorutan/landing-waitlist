import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function GET() {
  try {
    if (!resend) {
      return NextResponse.json(
        {
          error: "Resend is not configured. Please set RESEND_API_KEY in your environment variables.",
          stats: {
            total: 0,
            today: 0,
            thisWeek: 0,
            thisMonth: 0,
          },
        },
        { status: 503 }
      );
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!audienceId) {
      return NextResponse.json(
        {
          error: "RESEND_AUDIENCE_ID is not configured",
          stats: {
            total: 0,
            today: 0,
            thisWeek: 0,
            thisMonth: 0,
          },
        },
        { status: 200 }
      );
    }

    // Get contacts from Resend
    const contacts = await resend.contacts.list({
      audienceId,
    });

    const now = new Date();
    const todayStart = new Date(now.setHours(0, 0, 0, 0));
    const weekStart = new Date(now.setDate(now.getDate() - 7));
    const monthStart = new Date(now.setMonth(now.getMonth() - 1));

    interface ResendContact {
      created_at?: string;
      [key: string]: unknown;
    }

    const contactList = (contacts.data?.data as unknown as ResendContact[]) || [];
    const total = contactList.length;

    // Filter contacts by date (if created_at is available)
    // Note: Resend API may not provide created_at, so we'll use total as fallback
    const today =
      contactList.filter((contact) => {
        if (!contact.created_at) return false;
        return new Date(contact.created_at) >= todayStart;
      }).length || 0;

    const thisWeek =
      contactList.filter((contact) => {
        if (!contact.created_at) return false;
        return new Date(contact.created_at) >= weekStart;
      }).length || 0;

    const thisMonth =
      contactList.filter((contact) => {
        if (!contact.created_at) return false;
        return new Date(contact.created_at) >= monthStart;
      }).length || 0;

    return NextResponse.json({
      stats: {
        total,
        today,
        thisWeek,
        thisMonth,
      },
    });
  } catch (error: unknown) {
    console.error("Stats API error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch stats",
        stats: {
          total: 0,
          today: 0,
          thisWeek: 0,
          thisMonth: 0,
        },
      },
      { status: 500 }
    );
  }
}
