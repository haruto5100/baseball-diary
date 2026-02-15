'use client';

import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { GameCard } from "@/components/GameCard";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { GameForm } from "@/components/GameForm";
import { SettingsModal } from "@/components/SettingsModal";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import useLocalStorage from "@/hooks/useLocalStorage";
import { initialGames } from "@/lib/mockData";
import { GameRecord } from "@/types";

interface AppSettings {
  favoriteTeam: string;
}

export default function Home() {
  const [games, setGames] = useLocalStorage<GameRecord[]>("baseball-diary-games", initialGames);
  const [settings, setSettings] = useLocalStorage<AppSettings>("baseball-diary-settings", { favoriteTeam: "" });

  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());

  // Modal States
  const [modalMode, setModalMode] = useState<"new" | "edit" | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingGameId, setEditingGameId] = useState<string | null>(null);

  // Extract available years
  const availableYears = useMemo(() => {
    if (!games) return ["all", new Date().getFullYear().toString()];
    const years = new Set(games.map(g => g.date.split("-")[0]));
    const sortedYears = Array.from(years).sort((a, b) => b.localeCompare(a));
    const currentYear = new Date().getFullYear().toString();
    if (!sortedYears.includes(currentYear)) {
      if (sortedYears.length === 0 || sortedYears[0] < currentYear) {
        sortedYears.unshift(currentYear);
      } else {
        if (!sortedYears.includes(currentYear)) sortedYears.push(currentYear);
        sortedYears.sort((a, b) => b.localeCompare(a));
      }
    }
    return ["all", ...sortedYears];
  }, [games]);

  // Filter games
  const filteredGames = useMemo(() => {
    if (!games) return [];
    let filtered = games;
    if (selectedYear !== "all") {
      filtered = games.filter(g => g.date.startsWith(selectedYear));
    }

    return filtered.sort((a, b) => {
      const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
      if (dateDiff !== 0) return dateDiff;
      if (b.startTime && a.startTime) return b.startTime.localeCompare(a.startTime);
      return 0;
    });
  }, [games, selectedYear]);

  // Statistics
  const stats = useMemo(() => {
    let win = 0, loss = 0, draw = 0;
    const fav = settings.favoriteTeam;
    let hasFavTeamGames = false;

    if (fav) {
      filteredGames.forEach(g => {
        const h = parseInt(g.homeScore);
        const v = parseInt(g.visitorScore);
        const hasScore = !isNaN(h) && !isNaN(v);

        if (hasScore) {
          if (g.homeTeam === fav) {
            hasFavTeamGames = true;
            if (h > v) win++; else if (h < v) loss++; else draw++;
          } else if (g.visitorTeam === fav) {
            hasFavTeamGames = true;
            if (v > h) win++; else if (v < h) loss++; else draw++;
          }
        }
      });
    }

    const totalDecided = win + loss;
    let rate = "-";
    if (totalDecided > 0) {
      rate = (win / totalDecided).toFixed(3).substring(1);
    } else if (hasFavTeamGames) {
      rate = ".000";
    }

    return {
      totalGames: filteredGames.length,
      win, loss, draw, rate,
      hasFavTeamGames
    };
  }, [filteredGames, settings.favoriteTeam]);

  // Handlers
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  const handleSaveSettings = (team: string) => {
    setSettings({ favoriteTeam: team });
  };

  const openNewGameModal = () => {
    setModalMode("new");
    setEditingGameId(null);
  };

  const openEditGameModal = (id: string) => {
    setModalMode("edit");
    setEditingGameId(id);
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingGameId(null);
  };

  const handleSaveGame = (data: any) => {
    if (modalMode === "new") {
      const newGame: GameRecord = {
        ...data,
        id: Date.now().toString(),
      };
      setGames([newGame, ...games]);

      const year = newGame.date.split("-")[0];
      if (year !== selectedYear && selectedYear !== "all") {
        setSelectedYear(year);
      }
    } else if (modalMode === "edit" && editingGameId) {
      const updatedGames = games.map(g =>
        g.id === editingGameId ? { ...g, ...data } : g
      );
      setGames(updatedGames);

      const year = data.date.split("-")[0];
      if (year !== selectedYear && selectedYear !== "all") {
        setSelectedYear(year);
      }
    }
    closeModal();
  };

  const handleDeleteRequest = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (editingGameId) {
      setGames(currentGames => currentGames.filter(g => g.id !== editingGameId));
    }
    setIsDeleteModalOpen(false);
    closeModal();
  };

  const editingGame = useMemo(() => {
    if (modalMode === "edit" && editingGameId) {
      return games.find(g => g.id === editingGameId);
    }
    return undefined;
  }, [modalMode, editingGameId, games]);

  return (
    <>
      <Header
        years={availableYears}
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
        onSettingsClick={() => setIsSettingsOpen(true)}
      />

      <main className="max-w-md mx-auto p-4 pb-24">
        {/* Fav Team Display */}
        {settings.favoriteTeam && (
          <div className="mb-2 text-xs text-gray-500 font-bold text-right">
            応援チーム: <span className="text-blue-800">{settings.favoriteTeam}</span>
          </div>
        )}

        {/* Stats */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="grid grid-cols-3 gap-2 text-center divide-x divide-gray-100">
            <div>
              <p className="text-xs text-gray-500 mb-1">観戦数</p>
              <p className="text-xl font-bold">{stats.totalGames}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">勝-負-分</p>
              <p className="text-xl font-bold">
                {settings.favoriteTeam ? `${stats.win}-${stats.loss}-${stats.draw}` : '-'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">勝率</p>
              <p className={`text-xl font-bold ${stats.rate !== '-' ? 'text-red-600' : ''}`}>
                {stats.rate}
              </p>
            </div>
          </div>
        </div>

        {/* Game List */}
        <div className="space-y-4">
          {filteredGames.length > 0 ? (
            filteredGames.map(game => (
              <GameCard
                key={game.id}
                game={game}
                favoriteTeam={settings.favoriteTeam}
                onClick={() => openEditGameModal(game.id)}
              />
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              記録がありません．<br />右下のボタンから追加してください．
            </div>
          )}
        </div>
      </main>

      <FloatingActionButton onClick={openNewGameModal} />

      <Modal
        isOpen={!!modalMode}
        onClose={closeModal}
        title={modalMode === "new" ? "新規記録" : "記録の編集"}
      >
        <GameForm
          initialValues={editingGame}
          onSubmit={handleSaveGame}
          onCancel={closeModal}
          isEdit={modalMode === "edit"}
          onDelete={modalMode === "edit" ? handleDeleteRequest : undefined}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="削除の確認"
      >
        <div className="p-6">
          <p className="mb-6 text-gray-700">本当にこの記録を削除しますか？<br />この操作は取り消せません。</p>
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)} className="border-0">キャンセル</Button>
            <Button variant="danger" onClick={handleConfirmDelete}>削除する</Button>
          </div>
        </div>
      </Modal>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        initialTeam={settings.favoriteTeam}
        onSave={handleSaveSettings}
      />
    </>
  );
}
