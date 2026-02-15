interface HeaderProps {
    years: string[];
    selectedYear: string;
    onYearChange: (year: string) => void;
    onSettingsClick: () => void;
}

export function Header({ years, selectedYear, onYearChange, onSettingsClick }: HeaderProps) {
    return (
        <header className="bg-blue-900 text-white p-4 sticky top-0 z-10 shadow-md">
            <div className="max-w-md mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    <i className="fas fa-baseball-ball mr-2"></i>観戦記録
                </h1>
                <div className="flex items-center space-x-2">
                    <select
                        value={selectedYear}
                        onChange={(e) => onYearChange(e.target.value)}
                        className="bg-blue-800 text-white border border-blue-700 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        {years.map(year => (
                            <option key={year} value={year}>
                                {year === "all" ? "全期間（通算）" : `${year}年`}
                            </option>
                        ))}
                    </select>
                    <button onClick={onSettingsClick} className="text-white hover:text-blue-200 p-1">
                        <i className="fas fa-cog"></i>
                    </button>
                </div>
            </div>
        </header>
    );
}
