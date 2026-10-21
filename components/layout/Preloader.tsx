/*
 * Intro preloader. Sequence (seconds from first paint):
 *   0.0  the gradient ring draws itself (two halves from the top)
 *   0.3  the three swooshes + dots are "drawn" by a clockwise brush sweep
 *   1.2  the ribbon and hands grow out of the centre
 *   1.4  ONCO·XPERT rises letter by letter
 *   2.0  rules extend, "Comprehensive Cancer Centre" fades up
 *   2.4  COMPASSION • EXPERTISE • EXCELLENCE settles in
 *   3.3  the badge eases forward and the page is revealed
 * It is all CSS (keyframes `pl-*` in globals.css) so it plays from first paint and always
 * finishes, even without JS; JS only locks scrolling and removes it afterwards.
 *
 * The mark is the real logo artwork (brand/oncoxpert-mark.png, cropped from the round logo).
 */
import { PreloaderOverlay } from "@/components/layout/preloader/PreloaderOverlay";
import { PreloaderBadge } from "@/components/layout/preloader/PreloaderBadge";

export function Preloader() {
  return (
    <PreloaderOverlay>
      <PreloaderBadge />
    </PreloaderOverlay>
  );
}
