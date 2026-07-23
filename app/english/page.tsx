import { permanentRedirect } from "next/navigation";

export default function LegacyEnglishRoute() {
  permanentRedirect("/en");
}
