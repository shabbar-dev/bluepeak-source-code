import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  product: z.string().min(1, "Please select a product interest"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export function Contact() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      product: "",
      message: ""
    }
  });

  function onSubmit(values: z.infer<typeof contactSchema>) {
    toast.success("Inquiry Submitted Successfully", {
      description: "Our trade team will contact you within 24 hours."
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      {/* Abstract Map Background (CSS representation) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
             backgroundSize: '20px 20px'
           }} 
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-xl shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Initiate <span className="text-primary">Dialogue</span></h2>
            <p className="text-white/60">Request a quote or discuss wholesale partnerships.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="bg-background/50 border-white/10 focus:border-primary/50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Corporate Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@company.com" className="bg-background/50 border-white/10 focus:border-primary/50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Product Interest</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background/50 border-white/10 focus:border-primary/50">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="agriculture">Agriculture & Foods</SelectItem>
                        <SelectItem value="leather">Leather Goods</SelectItem>
                        <SelectItem value="textiles">Textiles & Garments</SelectItem>
                        <SelectItem value="chemicals">Chemicals & Solvents</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Project Requirements</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please detail your volume, destination, and specifications..." 
                        className="bg-background/50 border-white/10 focus:border-primary/50 min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                Submit Inquiry
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
