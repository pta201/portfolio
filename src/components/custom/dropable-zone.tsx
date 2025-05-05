import { useDroppable } from "@dnd-kit/react";

function DroppableZone({
  id,
  children,
}: {
  readonly id: string;
  readonly children: React.ReactNode;
}) {
  const { ref } = useDroppable({
    id,
  });

  return <div ref={ref}>{children}</div>;
}
export default DroppableZone;
