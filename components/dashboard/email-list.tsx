"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilterBar } from "./filter-bar";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Mail,
} from "lucide-react";

interface Email {
  email: string;
  createdAt: string;
  id: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function EmailList() {
  const [emails, setEmails] = React.useState<Email[]>([]);
  const [pagination, setPagination] = React.useState<Pagination>({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState<"email" | "createdAt">(
    "createdAt"
  );
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");
  const [resendNotConfigured, setResendNotConfigured] = React.useState(false);

  const fetchEmails = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        sortBy: sortBy === "createdAt" ? "created_at" : "email",
        sortOrder,
        ...(search && { search }),
      });

      const response = await fetch(`/api/waitlist/list?${params}`);
      const data = await response.json();

      if (!response.ok && data.error) {
        // Handle Resend not configured error gracefully
        if (data.error.includes("Resend is not configured") || data.error.includes("RESEND_AUDIENCE_ID is not configured")) {
          setResendNotConfigured(true);
          setEmails([]);
          setPagination({ page: 1, limit: 50, total: 0, totalPages: 0 });
          return;
        }
        throw new Error(data.error);
      }

      setResendNotConfigured(false);
      if (data.data) {
        setEmails(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch emails:", error);
      setEmails([]);
      setPagination({ page: 1, limit: 50, total: 0, totalPages: 0 });
    } finally {
      setIsLoading(false);
    }
  }, [pagination.page, pagination.limit, sortBy, sortOrder, search]);

  React.useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  const handleSort = (column: "email" | "createdAt") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getInitials = (email: string) => {
    const name = email.split("@")[0];
    return name.substring(0, 2).toUpperCase();
  };

  const getEmailDomain = (email: string) => {
    return email.split("@")[1];
  };

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="border-b border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl sm:text-2xl">
              Waitlist Emails
            </CardTitle>
            <CardDescription className="mt-1">
              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  <span className="font-semibold text-foreground">
                    {pagination.total.toLocaleString()}
                  </span>{" "}
                  total signups
                </>
              )}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filter Bar */}
          <FilterBar
            onSearchChange={(value) => {
              setSearch(value);
              setPagination((prev) => ({ ...prev, page: 1 }));
            }}
          />

          {/* Email List */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative">
                <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Loading emails...
              </p>
            </div>
          ) : emails.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="size-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <Mail className="size-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-1">
                {resendNotConfigured ? "Resend Not Configured" : "No emails found"}
              </h3>
              <p className="text-sm text-muted-foreground text-center max-w-sm">
                {resendNotConfigured
                  ? "To use the waitlist feature, please configure Resend by setting RESEND_API_KEY and RESEND_AUDIENCE_ID in your environment variables."
                  : search
                    ? "Try adjusting your search or filters to find what you're looking for."
                    : "Start collecting emails by sharing your waitlist link."}
              </p>
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="rounded-lg border border-border/50 overflow-hidden bg-card/50">
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full min-w-[600px]">
                    <thead className="bg-muted/30 border-b border-border/50">
                      <tr>
                        <th className="px-3 sm:px-4 py-3 sm:py-4 text-left">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1.5 sm:gap-2 h-auto p-0 font-semibold text-xs sm:text-sm text-muted-foreground hover:text-foreground"
                            onClick={() => handleSort("email")}
                          >
                            Email
                            {sortBy === "email" ? (
                              sortOrder === "asc" ? (
                                <ArrowUp className="size-3 sm:size-4 text-primary" />
                              ) : (
                                <ArrowDown className="size-3 sm:size-4 text-primary" />
                              )
                            ) : (
                              <ArrowUpDown className="size-3 sm:size-4" />
                            )}
                          </Button>
                        </th>
                        <th className="px-3 sm:px-4 py-3 sm:py-4 text-left">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1.5 sm:gap-2 h-auto p-0 font-semibold text-xs sm:text-sm text-muted-foreground hover:text-foreground"
                            onClick={() => handleSort("createdAt")}
                          >
                            Date Joined
                            {sortBy === "createdAt" ? (
                              sortOrder === "asc" ? (
                                <ArrowUp className="size-3 sm:size-4 text-primary" />
                              ) : (
                                <ArrowDown className="size-3 sm:size-4 text-primary" />
                              )
                            ) : (
                              <ArrowUpDown className="size-3 sm:size-4" />
                            )}
                          </Button>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {emails.map((email, index) => (
                        <tr
                          key={email.id}
                          className="group hover:bg-muted/30 transition-colors"
                          style={{
                            animationDelay: `${index * 0.05}s`,
                          }}
                        >
                          <td className="px-3 sm:px-4 py-3 sm:py-4">
                            <div className="flex items-center gap-3">
                              <div className="size-8 sm:size-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xs sm:text-sm font-semibold text-primary flex-shrink-0">
                                {getInitials(email.email)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs sm:text-sm font-medium text-foreground break-words">
                                  {email.email}
                                </div>
                                <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                                  {getEmailDomain(email.email)}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 sm:px-4 py-3 sm:py-4">
                            <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                              {formatDate(email.createdAt)}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 pt-4 border-t border-border/50">
                  <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
                    Showing{" "}
                    <span className="font-medium text-foreground">
                      {(pagination.page - 1) * pagination.limit + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium text-foreground">
                      {Math.min(
                        pagination.page * pagination.limit,
                        pagination.total
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-foreground">
                      {pagination.total.toLocaleString()}
                    </span>{" "}
                    emails
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPagination((prev) => ({
                          ...prev,
                          page: prev.page - 1,
                        }))
                      }
                      disabled={pagination.page === 1}
                      className="h-8 sm:h-9 text-xs sm:text-sm border-border/50 hover:bg-muted disabled:opacity-50"
                    >
                      <ChevronLeft className="size-3 sm:size-4" />
                      <span className="hidden sm:inline">Previous</span>
                      <span className="sm:hidden">Prev</span>
                    </Button>
                    <div className="text-xs sm:text-sm text-muted-foreground px-3 py-1.5 bg-muted/30 rounded-md font-medium">
                      Page {pagination.page} of {pagination.totalPages}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPagination((prev) => ({
                          ...prev,
                          page: prev.page + 1,
                        }))
                      }
                      disabled={pagination.page >= pagination.totalPages}
                      className="h-8 sm:h-9 text-xs sm:text-sm border-border/50 hover:bg-muted disabled:opacity-50"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <span className="sm:hidden">Next</span>
                      <ChevronRight className="size-3 sm:size-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
