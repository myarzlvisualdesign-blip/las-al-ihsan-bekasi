"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { loginSchema } from "@/lib/validation/admin";

type LoginValues = {
  email: string;
  password: string;
};

export function AdminLoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@alihsan.local",
      password: "Admin123!",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        toast.error(result.error || "Login gagal.");
        return;
      }

      toast.success("Login berhasil.");
      router.replace("/admin");
      router.refresh();
    });
  });

  return (
    <form className="grid gap-5" onSubmit={onSubmit}>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-semibold text-[#182433]">
          Email admin
        </label>
        <input
          id="email"
          type="email"
          className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm text-[#182433] outline-none transition focus:border-[#22364d] focus:bg-white"
          {...form.register("email")}
        />
        {form.formState.errors.email ? (
          <p className="text-sm text-[#b33b2e]">
            {form.formState.errors.email.message}
          </p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <label
          htmlFor="password"
          className="text-sm font-semibold text-[#182433]"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm text-[#182433] outline-none transition focus:border-[#22364d] focus:bg-white"
          {...form.register("password")}
        />
        {form.formState.errors.password ? (
          <p className="text-sm text-[#b33b2e]">
            {form.formState.errors.password.message}
          </p>
        ) : null}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-[#29415e] bg-[#22364d] px-5 text-sm font-semibold text-white transition hover:bg-[#29415c] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Memproses..." : "Masuk ke admin"}
      </button>
    </form>
  );
}
