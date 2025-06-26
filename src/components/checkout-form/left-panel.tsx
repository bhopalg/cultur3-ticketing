import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/components/checkout-form/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Required from "@/components/checkout-form/required";
import { Input } from "@/components/ui/input";

export default function LeftPanel({ form }: { form: UseFormReturn<FormData> }) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Member Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    First Name <Required />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="first name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Last Name <Required />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="last name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email Address
                  <Required />{" "}
                </FormLabel>
                <FormControl>
                  <Input placeholder="email..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instagramHandle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Instagram Handle
                  <Required />
                </FormLabel>
                <FormControl>
                  <Input placeholder="instagram handle..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
