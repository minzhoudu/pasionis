import { ReactNode } from "react";

type AdminLayoutProps = {
    children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
    return <div className="select-text">{children}</div>;
}
