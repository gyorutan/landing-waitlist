import { readFileSync } from "fs";
import { join } from "path";
import type { ComponentType, SVGProps } from "react";

/**
 * 아이콘 라이브러리 유틸리티
 *
 * 중요: 템플릿의 package.json에 모든 아이콘 라이브러리가 포함되어 있어야 합니다.
 * 사용자가 선택한 라이브러리는 components.json의 iconLibrary 값으로 설정됩니다.
 *
 * 지원하는 라이브러리:
 * - lucide-react
 * - @tabler/icons-react
 * - lucide-react (기본값)
 * - @phosphor-icons/react 또는 phosphor-react
 *
 * 사용 예시:
 * ```tsx
 * // 직접 import (권장 - 더 명확하고 타입 안전)
 * import { MailIcon } from "@hugeicons/core-free-icons"
 *
 * // 또는 유틸리티 함수 사용 (동적 라이브러리 전환 시)
 * const MailIcon = getIconSync("mail")
 * ```
 */

// components.json에서 아이콘 라이브러리 설정 읽기
function getIconLibrary() {
  try {
    const configPath = join(process.cwd(), "components.json");
    const config = JSON.parse(readFileSync(configPath, "utf-8"));
    return config.iconLibrary || "lucide";
  } catch {
    return "lucide";
  }
}

// Icon library import mappings
const iconLibraryImports: Record<string, { import: string; from: string }> = {
  lucide: {
    import: "lucide-react",
    from: 'from "lucide-react"',
  },
  "tabler-icons": {
    import: "@tabler/icons-react",
    from: 'from "@tabler/icons-react"',
  },
  hugeicons: {
    import: "@hugeicons/react",
    from: 'from "@hugeicons/react"',
  },
  "phosphor-icons": {
    import: "phosphor-react",
    from: 'from "phosphor-react"',
  },
};

// Get selected icon library from config
const selectedIconLibrary = getIconLibrary();
const selectedIconImport =
  iconLibraryImports[selectedIconLibrary] || iconLibraryImports.lucide;
const iconLibrary = selectedIconLibrary;

// 아이콘 라이브러리별 타입 정의
export type IconProps = SVGProps<SVGSVGElement> & {
  className?: string;
  size?: number | string;
};

// 아이콘 이름 매핑 (다른 라이브러리 간 호환성)
const iconNameMap: Record<string, Record<string, string>> = {
  hugeicons: {
    // 기본 매핑 (이름이 동일한 경우)
    mail: "mail",
    check: "check",
    arrowRight: "arrow-right-01",
    star: "star",
    user: "user",
    lock: "lock",
    shield: "shield-check",
    zap: "flash",
    heart: "heart",
    search: "search",
    menu: "menu-01",
    close: "close",
    chevronDown: "chevron-down",
    chevronUp: "chevron-up",
    chevronLeft: "chevron-left",
    chevronRight: "chevron-right",
  },
  lucide: {
    mail: "Mail",
    check: "Check",
    arrowRight: "ArrowRight",
    star: "Star",
    user: "User",
    lock: "Lock",
    shield: "Shield",
    zap: "Zap",
    heart: "Heart",
    search: "Search",
    menu: "Menu",
    close: "X",
    chevronDown: "ChevronDown",
    chevronUp: "ChevronUp",
    chevronLeft: "ChevronLeft",
    chevronRight: "ChevronRight",
  },
  "tabler-icons": {
    mail: "Mail",
    check: "Check",
    arrowRight: "ArrowRight",
    star: "Star",
    user: "User",
    lock: "Lock",
    shield: "Shield",
    zap: "Bolt",
    heart: "Heart",
    search: "Search",
    menu: "Menu2",
    close: "X",
    chevronDown: "ChevronDown",
    chevronUp: "ChevronUp",
    chevronLeft: "ChevronLeft",
    chevronRight: "ChevronRight",
  },
  "phosphor-icons": {
    mail: "Envelope",
    check: "Check",
    arrowRight: "ArrowRight",
    star: "Star",
    user: "User",
    lock: "Lock",
    shield: "Shield",
    zap: "Lightning",
    heart: "Heart",
    search: "MagnifyingGlass",
    menu: "List",
    close: "X",
    chevronDown: "CaretDown",
    chevronUp: "CaretUp",
    chevronLeft: "CaretLeft",
    chevronRight: "CaretRight",
  },
};

/**
 * 아이콘을 동적으로 가져오는 함수
 * components.json의 iconLibrary 설정에 따라 적절한 라이브러리에서 아이콘을 가져옵니다.
 */
export async function getIcon(
  iconName: string
): Promise<ComponentType<IconProps> | null> {
  const mappedName =
    iconNameMap[iconLibrary]?.[iconName] ||
    iconNameMap.hugeicons[iconName] ||
    iconName;

  try {
    switch (iconLibrary) {
      case "hugeicons": {
        // Hugeicons는 @hugeicons/core-free-icons에서 아이콘을 import해야 함
        // 동적 import는 어려우므로 null 반환 (직접 import 사용 권장)
        console.warn(
          "Hugeicons dynamic import is not supported. Please import icons directly from @hugeicons/core-free-icons"
        );
        return null;
      }

      case "lucide": {
        const lucideIcons = await import("lucide-react");
        const IconComponent = (
          lucideIcons as unknown as Record<
            string,
            ComponentType<IconProps> | undefined
          >
        )[mappedName];
        if (!IconComponent) {
          console.warn(`Icon "${mappedName}" not found in Lucide`);
          return null;
        }
        return IconComponent;
      }

      case "tabler-icons": {
        const tablerIcons = await import("@tabler/icons-react");
        const IconComponent = (
          tablerIcons as unknown as Record<
            string,
            ComponentType<IconProps> | undefined
          >
        )[mappedName];
        if (!IconComponent) {
          console.warn(`Icon "${mappedName}" not found in Tabler Icons`);
          return null;
        }
        return IconComponent;
      }

      case "phosphor-icons": {
        // @phosphor-icons/react 또는 phosphor-react 시도
        try {
          const phosphorIcons = await import("@phosphor-icons/react");
          const IconComponent = (
            phosphorIcons as unknown as Record<
              string,
              ComponentType<IconProps> | undefined
            >
          )[mappedName];
          if (IconComponent) {
            return IconComponent;
          }
        } catch {
          // fallback to phosphor-react
        }
        try {
          const phosphorReact = await import("phosphor-react");
          const IconComponent = (
            phosphorReact as unknown as Record<
              string,
              ComponentType<IconProps> | undefined
            >
          )[mappedName];
          if (IconComponent) {
            return IconComponent;
          }
        } catch {
          console.warn(`Icon "${mappedName}" not found in Phosphor Icons`);
        }
        return null;
      }

      default:
        // 기본값으로 Lucide 사용
        const lucideIcons = await import("lucide-react");
        const IconComponent = (
          lucideIcons as unknown as Record<
            string,
            ComponentType<IconProps> | undefined
          >
        )[mappedName];
        return IconComponent || null;
    }
  } catch (error) {
    console.error(
      `Failed to load icon "${iconName}" from ${iconLibrary}:`,
      error
    );
    return null;
  }
}

/**
 * 동기적으로 아이콘을 가져오는 함수 (클라이언트 컴포넌트용)
 * 주의: 이 함수는 클라이언트 컴포넌트에서만 사용해야 합니다.
 * 설치되지 않은 라이브러리는 자동으로 Hugeicons로 fallback됩니다.
 */
export function getIconSync(iconName: string): ComponentType<IconProps> | null {
  const mappedName =
    iconNameMap[iconLibrary]?.[iconName] ||
    iconNameMap.hugeicons[iconName] ||
    iconName;

  // 먼저 설정된 라이브러리 시도
  try {
    switch (iconLibrary) {
      case "hugeicons": {
        // Hugeicons는 @hugeicons/core-free-icons에서 직접 import하는 방식 사용
        // 여기서는 HugeiconsIcon 래퍼를 사용
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { HugeiconsIcon } = require("@hugeicons/react") as {
          HugeiconsIcon: ComponentType<IconProps>;
        };
        return HugeiconsIcon;
      }

      case "lucide": {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const lucideIcons = require("lucide-react") as Record<
          string,
          ComponentType<IconProps> | undefined
        >;
        const IconComponent = lucideIcons[mappedName];
        if (IconComponent) return IconComponent;
        throw new Error("Icon not found");
      }

      case "tabler-icons": {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const tablerIcons = require("@tabler/icons-react") as Record<
          string,
          ComponentType<IconProps> | undefined
        >;
        const IconComponent = tablerIcons[mappedName];
        if (IconComponent) return IconComponent;
        throw new Error("Icon not found");
      }

      case "phosphor-icons": {
        // @phosphor-icons/react 또는 phosphor-react 시도
        try {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          const phosphorIcons = require("@phosphor-icons/react") as Record<
            string,
            ComponentType<IconProps> | undefined
          >;
          const IconComponent = phosphorIcons[mappedName];
          if (IconComponent) return IconComponent;
        } catch {
          // fallback to phosphor-react
        }
        try {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          const phosphorReact = require("phosphor-react") as Record<
            string,
            ComponentType<IconProps> | undefined
          >;
          const IconComponent = phosphorReact[mappedName];
          if (IconComponent) return IconComponent;
        } catch {
          // Icon not found
        }
        throw new Error("Icon not found");
      }
    }
  } catch {
    // 설정된 라이브러리가 설치되지 않았거나 아이콘을 찾을 수 없는 경우
    // Hugeicons로 fallback
    console.warn(
      `Icon library "${iconLibrary}" not available or icon "${iconName}" not found. Falling back to Hugeicons.`
    );
  }

  // Fallback: Hugeicons 사용 (항상 설치되어 있음)
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { HugeiconsIcon } = require("@hugeicons/react") as {
      HugeiconsIcon: ComponentType<IconProps>;
    };
    return HugeiconsIcon;
  } catch (error) {
    console.error("Failed to load Hugeicons fallback:", error);
    return null;
  }
}

/**
 * 현재 설정된 아이콘 라이브러리 반환
 */
export function getCurrentIconLibrary(): string {
  return iconLibrary;
}
