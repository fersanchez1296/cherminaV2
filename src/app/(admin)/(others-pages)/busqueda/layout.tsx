// app/tickets/[status]/layout.tsx

export interface LayoutProps {
  children?: React.ReactNode;
  modal?: React.ReactNode;
  params?: Promise<any>; // o el tipo SegmentParams si lo tienes declarado
}

export default function Layout({ children, modal }: LayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
