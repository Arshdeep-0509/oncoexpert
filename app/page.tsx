import { redirect } from "next/navigation";
import { pages } from "@/content/pages";

// No home page yet: the site opens on the Breast Cancer page.
export default function Home() {
  redirect(pages["breast-cancer-treatment-bangalore"].path);
}
