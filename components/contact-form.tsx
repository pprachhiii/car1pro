"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="bg-card border rounded-xl p-8 shadow-sm">
      <h2 className="text-2xl font-semibold mb-2">Send Us a Message</h2>
      <p className="text-muted-foreground mb-6">
        Fill out the form below and we’ll get back to you shortly.
      </p>

      {isSubmitted && (
        <div className="mb-6 rounded-lg bg-green-100 px-4 py-3 text-green-700">
          Thank you! Your message has been sent.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-md border px-4 py-3 text-sm focus:ring-2 focus:ring-primary"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-md border px-4 py-3 text-sm focus:ring-2 focus:ring-primary"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-md border px-4 py-3 text-sm focus:ring-2 focus:ring-primary"
        />

        <select
          name="service"
          required
          value={formData.service}
          onChange={handleChange}
          className="w-full rounded-md border px-4 py-3 text-sm focus:ring-2 focus:ring-primary"
        >
          <option value="">Select a Service</option>
          <option value="mechanical">Mechanical</option>
          <option value="electrical">Electrical</option>
          <option value="plumbing">Plumbing</option>
          <option value="elv">ELV Systems</option>
          <option value="maintenance">Maintenance</option>
        </select>

        <textarea
          name="message"
          rows={5}
          placeholder="Tell us about your project..."
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-md border px-4 py-3 text-sm focus:ring-2 focus:ring-primary"
        />

        <Button type="submit" className="w-full gap-2">
          <Send size={18} />
          Send Message
        </Button>
      </form>
    </div>
  );
}
