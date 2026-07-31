import type { ContainerProps } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Container — Max-width wrapper with responsive horizontal padding.
 *
 * @example
 * <Container>
 *   <p>Content here</p>
 * </Container>
 *
 * @example
 * <Container as="section" fluid className="bg-white">
 *   <p>Full width section</p>
 * </Container>
 */
export function Container({
  children,
  className,
  fluid = false,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "w-full mx-auto px-4 sm:px-6 lg:px-8",
        !fluid && "max-w-[1280px]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
