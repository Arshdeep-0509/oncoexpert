import { redirect } from "next/navigation";

// Only the Robotic Surgery page is being rebuilt for now.
export default function Home() {
  redirect("/robotic-surgery/");
}
