import { redirect } from "next/navigation";

import { DEFAULT_LOCALE, getInternalLocalePath } from "@/lib/site";

export default function RootPage() {
  redirect(getInternalLocalePath(DEFAULT_LOCALE));
}
