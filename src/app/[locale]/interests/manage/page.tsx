import type { Metadata } from "next";
import { WithdrawInterestForm } from "@/components/withdraw-interest-form";
export const metadata: Metadata = { title: "Withdraw your interest", robots: { index: false, follow: false } };
export default function ManageInterestPage() {
  return <div className="mx-auto w-full max-w-xl space-y-5 rounded-3xl border border-border bg-surface p-5 sm:p-7"><h1 className="text-3xl font-semibold">Withdraw your interest</h1><p className="text-base leading-7 text-muted">Enter the code saved when you submitted your interest. We will remove that request&apos;s contact details.</p><WithdrawInterestForm /><p className="text-sm leading-6 text-muted">Lost your code? Email <a href="mailto:hello@symaxx.com" className="text-primary underline">hello@symaxx.com</a> to request removal. Your code and contact details never need to go in a web address.</p></div>;
}
