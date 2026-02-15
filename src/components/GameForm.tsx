'use client';

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GameRecord } from "@/types";

interface GameFormProps {
    initialValues?: GameRecord;
    onSubmit: (data: Omit<GameRecord, "id">) => void;
    onCancel: () => void;
    isEdit?: boolean;
    onDelete?: () => void;
}

export function GameForm({ initialValues, onSubmit, onCancel, isEdit, onDelete }: GameFormProps) {
    const { register, handleSubmit, reset } = useForm<GameRecord>();

    useEffect(() => {
        if (initialValues) {
            reset(initialValues);
        } else {
            reset({
                date: new Date().toISOString().split('T')[0],
                homeTeam: "",
                visitorTeam: "",
                homeScore: "",
                visitorScore: "",
                league: "",
                stadium: "",
                memo: ""
            });
        }
    }, [initialValues, reset]);

    const submitHandler = (data: GameRecord) => {
        onSubmit(data);
    };

    return (
        <div className="flex flex-col h-full">
            <form id="gameForm" onSubmit={handleSubmit(submitHandler)} className="p-4 space-y-4 flex-grow">
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="観戦日 *"
                        type="date"
                        required
                        {...register("date", { required: true })}
                    />
                    <Input
                        label="開始時刻"
                        type="time"
                        {...register("startTime")}
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">リーグ / 大会名</label>
                    <input
                        list="leagueOptions"
                        placeholder="例: セ・リーグ，都市対抗"
                        className="w-full bg-gray-50 border border-gray-300 rounded p-2 text-base text-black outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
                        {...register("league")}
                    />
                    <datalist id="leagueOptions">
                        <option value="セ・リーグ" />
                        <option value="パ・リーグ" />
                        <option value="交流戦" />
                        <option value="クライマックスシリーズ" />
                        <option value="日本シリーズ" />
                        <option value="オープン戦" />
                        <option value="MLB" />
                        <option value="高校野球" />
                    </datalist>
                </div>

                <Input
                    label="球場名"
                    placeholder="例: 東京ドーム"
                    {...register("stadium")}
                />

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <div className="w-2/5 text-center">
                            <label className="block text-xs font-bold text-gray-500 mb-1">ホーム（後攻）</label>
                            <input
                                type="text"
                                required
                                placeholder="チーム名"
                                className="w-full text-center border border-gray-300 rounded p-1 mb-2 outline-none focus:border-blue-500 text-base text-black placeholder-gray-400"
                                {...register("homeTeam", { required: true })}
                            />
                            <input
                                type="number"
                                placeholder="0"
                                className="w-16 text-center text-xl font-bold border border-gray-300 rounded p-1 outline-none focus:border-blue-500 mx-auto block placeholder-gray-300 bg-white text-black"
                                {...register("homeScore")}
                            />
                        </div>
                        <div className="text-gray-400 font-bold px-2">VS</div>
                        <div className="w-2/5 text-center">
                            <label className="block text-xs font-bold text-gray-500 mb-1">ビジター（先攻）</label>
                            <input
                                type="text"
                                required
                                placeholder="チーム名"
                                className="w-full text-center border border-gray-300 rounded p-1 mb-2 outline-none focus:border-blue-500 text-base text-black placeholder-gray-400"
                                {...register("visitorTeam", { required: true })}
                            />
                            <input
                                type="number"
                                placeholder="0"
                                className="w-16 text-center text-xl font-bold border border-gray-300 rounded p-1 outline-none focus:border-blue-500 mx-auto block placeholder-gray-300 bg-white text-black"
                                {...register("visitorScore")}
                            />
                        </div>
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-1">※贔屓チーム名と完全一致で勝敗判定します</p>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">メモ</label>
                    <textarea
                        rows={3}
                        placeholder="感想や印象的なプレーなど..."
                        className="w-full bg-gray-50 border border-gray-300 rounded p-2 text-base text-black outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
                        {...register("memo")}
                    ></textarea>
                </div>

                <div className="h-4"></div>
            </form>

            <div className="p-4 border-t sticky bottom-0 bg-white flex justify-end space-x-3 z-10">
                {isEdit && onDelete && (
                    <Button
                        type="button"
                        variant="danger"
                        onClick={onDelete}
                    >
                        削除
                    </Button>
                )}
                <Button type="submit" form="gameForm" className="flex-1 sm:flex-none">保存</Button>
            </div>
        </div>
    );
}
