"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface SettingsFormData {
    favoriteTeam: string;
}

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTeam: string;
    onSave: (team: string) => void;
}

export function SettingsModal({ isOpen, onClose, initialTeam, onSave }: SettingsModalProps) {
    const { register, handleSubmit, reset } = useForm<SettingsFormData>();

    useEffect(() => {
        if (isOpen) {
            reset({ favoriteTeam: initialTeam });
        }
    }, [isOpen, initialTeam, reset]);

    const onSubmit = (data: SettingsFormData) => {
        onSave(data.favoriteTeam);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="設定">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">あなたの応援チーム</label>
                    <input
                        type="text"
                        placeholder="例: タイガース"
                        className="w-full bg-gray-50 border border-gray-300 rounded p-2 outline-none focus:border-blue-500"
                        {...register("favoriteTeam")}
                    />
                    <p className="text-xs text-gray-500 mt-1">※記録時のチーム名と完全に一致させてください．</p>
                </div>

                <div className="flex justify-end space-x-3">
                    <Button type="button" variant="secondary" onClick={onClose} className="px-4 py-2 border-0">キャンセル</Button>
                    <Button type="submit" className="px-4 py-2 font-bold">保存する</Button>
                </div>
            </form>
        </Modal>
    );
}
