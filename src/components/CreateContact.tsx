import { useForm } from "react-hook-form";
import { useAddContactMutation } from "@/store/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import type { Contact } from "@/@types";
export const CreateContact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm<Contact>();
    const [addContact, { isLoading }] = useAddContactMutation();
    const navigate = useNavigate();
    const onSubmit = async (data: Contact) => {
        try {
            await addContact(data).unwrap();
            navigate("/dashboard");
        } catch (error) {
            console.error("Failed to add contact:", error);
        }
    };
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid flex border-red-500">
          <label className="block mb-1 font-medium">Name</label>
          <Input
            {...register("name", { required: "Name is required" })}
            placeholder="Enter name"
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <Input
            {...register("phone", { required: "Phone is required" })}
            placeholder="Enter phone number"
          />
          {errors.phone && (
            <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Create"}
          </Button>

          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
        {/* <Button type="submit">Create Contact</Button> */}
      </form>
    );
}