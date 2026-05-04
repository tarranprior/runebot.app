import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
};

export function Container({ children, className, fullWidth }: ContainerProps) {
  return (
    <div className={cn(fullWidth ? "w-full px-6" : "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}