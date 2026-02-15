export type GameId = string; // timestamp string (e.g., "1707960000000")

export interface GameRecord {
  id: GameId;
  date: string;          // YYYY-MM-DD
  startTime?: string;    // HH:mm
  league?: string;       // リーグ・大会名 (例: "セ・リーグ", "高校野球")
  stadium?: string;      // 球場名
  
  // チーム情報
  homeTeam: string;      // ホームチーム（後攻・左側表示）
  visitorTeam: string;   // ビジターチーム（先攻・右側表示）
  
  // スコア (試合前や中止の場合は空文字許容のため string 推奨，計算時はnumber変換)
  homeScore: string;     
  visitorScore: string;
  
  memo?: string;         // 自由記述メモ
}
