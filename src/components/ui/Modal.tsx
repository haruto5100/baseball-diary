"use client";

import { useEffect, useState, ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    const [show, setShow] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setMounted(true);
            requestAnimationFrame(() => setShow(true));
            document.body.style.overflow = "hidden";
        } else {
            setShow(false);
            const timer = setTimeout(() => {
                setMounted(false);
                document.body.style.overflow = "unset";
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0">
            <div
                className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"}`}
                onClick={onClose}
                aria-hidden="true"
            />
            <div
                className={`relative z-50 w-full max-w-md bg-white rounded-t-2xl sm:rounded-lg shadow-xl transition-all duration-300 transform 
          ${show ? "translate-y-0 opacity-100 scale-100" : "translate-y-full sm:translate-y-8 opacity-0 scale-95"}
          max-h-[90vh] flex flex-col`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10 rounded-t-2xl sm:rounded-t-lg">
                    <h2 id="modal-title" className="text-lg font-bold text-gray-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 p-2"
                        aria-label="Close"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
}
