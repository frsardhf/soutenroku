"use client";

import { useEffect } from "react";
import manifest from "./generated-weapon-assets.json";

export default function WeaponAssetHydrator() {
  useEffect(() => {
    const aliases = manifest.aliases as Record<string, string>;
    const weapons = manifest.weapons as Record<string, { path: string }>;

    const apply = () => {
      document.querySelectorAll<HTMLElement>(".weapon").forEach((card) => {
        const label = card.querySelector("strong")?.textContent?.trim();
        const art = card.querySelector<HTMLElement>(".weapon-art");
        const canonical = label ? aliases[label] : undefined;
        const image = canonical ? weapons[canonical]?.path : undefined;
        if (!art) return;
        if (image) {
          art.style.backgroundImage = `url("${image}")`;
          art.dataset.asset = "weapon";
        } else {
          art.style.removeProperty("background-image");
          delete art.dataset.asset;
        }
      });
    };

    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
