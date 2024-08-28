import { CgSpinnerTwoAlt } from "react-icons/cg";

export default function MainLoadingPage() {
    return (
        <div className="flex h-screen w-full animate-spin flex-col items-center justify-center">
            <CgSpinnerTwoAlt size={60} />
        </div>
    );
}
