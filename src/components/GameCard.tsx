import { GameRecord } from "@/types";

interface GameCardProps {
    game: GameRecord;
    favoriteTeam?: string;
    onClick?: () => void;
}

export function GameCard({ game, favoriteTeam, onClick }: GameCardProps) {
    // スコア計算
    const homeScoreVal = parseInt(game.homeScore);
    const visitorScoreVal = parseInt(game.visitorScore);

    // 勝敗判定
    let result = "";
    let resultColor = "";

    const hasScore = !isNaN(homeScoreVal) && !isNaN(visitorScoreVal);

    if (favoriteTeam && hasScore) {
        let myScore = -1, oppScore = -1;
        if (game.homeTeam === favoriteTeam) {
            myScore = homeScoreVal; oppScore = visitorScoreVal;
        } else if (game.visitorTeam === favoriteTeam) {
            myScore = visitorScoreVal; oppScore = homeScoreVal;
        }

        if (myScore !== -1) {
            if (myScore > oppScore) { result = "Win"; resultColor = "bg-red-100 text-red-600"; }
            else if (myScore < oppScore) { result = "Lose"; resultColor = "bg-blue-100 text-blue-600"; }
            else { result = "Draw"; resultColor = "bg-gray-100 text-gray-600"; }
        }
    }

    const getScoreColor = (score: string, oppScore: string) => {
        if (!score || !oppScore) return "text-gray-800";
        const s = parseInt(score);
        const o = parseInt(oppScore);
        if (isNaN(s) || isNaN(o)) return "text-gray-800";
        return s > o ? "text-red-600" : "text-gray-800";
    };

    const dateObj = new Date(game.date);
    const dateStr = game.date.replace(/-/g, '/');
    const dayStr = ['日', '月', '火', '水', '木', '金', '土'][dateObj.getDay() || 0] || '日';

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-lg shadow hover:shadow-md transition p-4 cursor-pointer relative overflow-hidden group mb-4"
        >
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-baseline">
                    <span className="text-lg font-bold mr-1 text-gray-800">{dateStr}</span>
                    <span className="text-xs text-gray-500 mr-2">({dayStr})</span>
                    <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full font-medium">{game.league || 'その他'}</span>
                    {result && (
                        <span className={`text-xs px-2 py-0.5 rounded font-bold ml-2 ${resultColor}`}>{result}</span>
                    )}
                </div>
                <div className="text-xs text-gray-400">
                    {game.stadium || ''}
                </div>
            </div>

            <div className="flex items-center justify-center py-2 relative">
                <div className="flex-1 text-right pr-4">
                    <div className="font-bold text-gray-800 truncate">{game.homeTeam}</div>
                </div>
                <div className="flex items-center space-x-3 bg-gray-50 px-3 py-1 rounded">
                    <span className={`text-2xl font-bold ${getScoreColor(game.homeScore, game.visitorScore)}`}>{game.homeScore || '-'}</span>
                    <span className="text-gray-300">-</span>
                    <span className={`text-2xl font-bold ${getScoreColor(game.visitorScore, game.homeScore)}`}>{game.visitorScore || '-'}</span>
                </div>
                <div className="flex-1 text-left pl-4">
                    <div className="font-bold text-gray-800 truncate">{game.visitorTeam}</div>
                </div>
            </div>

            {game.memo && (
                <div className="mt-2 text-xs text-gray-500 truncate border-t pt-2 border-gray-100">
                    <i className="far fa-comment-dots mr-1"></i>{game.memo}
                </div>
            )}
        </div>
    );
}
