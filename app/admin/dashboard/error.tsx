"use client";

type DashbordErrorPageProps = {
    error: {
        message: string;
    };
};

export default function DashboardErrorPage({ error }: DashbordErrorPageProps) {
    return (
        <div className="text-center">
            <h1 className="text-2xl text-red-700">Došlo je do greške</h1>
            <p className="mt-5">
                Pokušajte ponovo da učitate stranicu, ako se greška ponavlja,
                prijavite problem.
            </p>
        </div>
    );
}
