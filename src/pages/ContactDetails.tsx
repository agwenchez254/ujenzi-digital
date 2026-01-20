import ContactListSkeleton from "@/components/ContactListSkeleton";
import { useGetContactByIdQuery } from "@/store/services";
import { useParams } from "react-router-dom";

const ContactDetails = () => {
  const { id } = useParams();
  const { data, isError, isLoading, isSuccess, error } = useGetContactByIdQuery(
    id!,
  );
  console.log("Contact Detail", data);

  isLoading && <ContactListSkeleton />;
  isError && <p>Error loading contact</p>;

  return (
    <div>
      {isSuccess && (
        <div className="rounded-lg border border-border bg-background p-4 shadow-sm">
          <h3 className="text-base font-semibold text-foreground">
            {data?.name}
          </h3>
          <p className="text-sm text-muted-foreground">Email: {data?.email}</p>
          <p className="text-sm text-muted-foreground">Phone: {data?.phone}</p>
        </div>
      )}
    </div>
  );
};

export default ContactDetails;
