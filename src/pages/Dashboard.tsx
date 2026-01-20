import { AppSidebar } from "@/components/app-sidebar";
import ContactListSkeleton from "@/components/ContactListSkeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useGetContactsQuery } from "@/store/services";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { data, isError, isLoading, isSuccess, error } = useGetContactsQuery();
  const navigate = useNavigate();
  console.log("Data", data);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-8 sticky shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex justify-end">
            <Button onClick={() => navigate("/dashboard/contact/new")}>
              <Plus className="mr-2 h-4 w-4" />
              Create Contact
            </Button>
          </div>

          {isLoading && <ContactListSkeleton />}
          {isError && <p>Error loading contacts</p>}
          {isSuccess && (
            <div className="space-y-4">
              {data.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => navigate(`/dashboard/contact/${contact.id}`)}
                  className="rounded-lg border border-border bg-background p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <h3 className="text-base font-semibold text-foreground">
                    {contact.name}
                  </h3>

                  <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <p>{contact.email}</p>
                    <p>{contact.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
