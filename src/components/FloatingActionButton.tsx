interface FabProps {
    onClick: () => void;
}

export function FloatingActionButton({ onClick }: FabProps) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center text-2xl transition transform active:scale-95 z-20"
        >
            <i className="fas fa-plus"></i>
        </button>
    );
}
