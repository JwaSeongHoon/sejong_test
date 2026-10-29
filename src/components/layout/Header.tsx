import React, { useState } from 'react';
import { NavPath } from '../../types';
import { INSTITUTIONS, SEJONG_LOGO_URL } from '../../data/mockData';

interface HeaderProps {
  currentPath: NavPath;
  onNavigate: (path: NavPath) => void;
  selectedInstitutionId: string;
  onSelectInstitution: (id: string) => void;
  onOpenCommandPalette: () => void;
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  selectedInstitutionId,
  onSelectInstitution,
  onOpenCommandPalette,
  onOpenNotifications,
}) => {
  const [showInstMenu, setShowInstMenu] = useState(false);

  const getPageTitle = (path: NavPath) => {
    switch (path) {
      case 'dashboard':
        return '행정 총괄 콘솔';
      case 'calendar':
        return '통합 업무달력';
      case 'ai-docs':
        return 'AI 문서 작성';
      case 'ai-chat':
        return 'AI 행정지원 챗봇';
      case 'resources':
        return '자료·서식 관리';
      case 'analytics':
        return '업무현황 분석';
      case 'users':
        return '사용자·기관 관리';
      case 'settings':
        return '시스템 설정';
      default:
        return '행정 포털';
    }
  };

  const currentInstitution =
    INSTITUTIONS.find((i) => i.id === selectedInstitutionId)?.name || '세종가온유치원 외 51개원';

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/30 z-40 flex items-center justify-between px-6">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-3">
        <img
          alt="SEJONG EduCare AI Logo"
          className="h-8 w-auto object-contain hidden sm:block"
          src={SEJONG_LOGO_URL}
        />
        <div className="flex items-center gap-2 text-[13px] text-secondary">
          <span className="text-on-surface font-semibold hover:text-primary cursor-pointer transition-colors" onClick={() => onNavigate('dashboard')}>
            세종 EduCare AI
          </span>
          <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
          <span className="text-primary font-bold">{getPageTitle(currentPath)}</span>
        </div>
      </div>

      {/* Right: Controls & Utilities */}
      <div className="flex items-center gap-3">
        {/* Global Search Bar (⌘K) */}
        <div
          onClick={onOpenCommandPalette}
          className="relative hidden xl:flex items-center cursor-pointer group"
        >
          <span className="material-symbols-outlined absolute left-3 text-outline text-[18px] group-hover:text-primary transition-colors">
            search
          </span>
          <input
            readOnly
            className="w-72 h-9 pl-9 pr-14 rounded-lg bg-surface-container-low text-[13px] text-on-surface placeholder:text-outline cursor-pointer focus:outline-none group-hover:bg-surface-container transition-all"
            placeholder="업무, 공문서, 행정서식 또는 AI 지침 검색..."
            type="text"
          />
          <span className="absolute right-2.5 px-1.5 py-0.5 rounded text-[10px] bg-surface-container text-secondary font-semibold border border-outline-variant/40">
            ⌘K
          </span>
        </div>

        {/* AI Service Live Status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-fixed opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
          </span>
          <span className="text-[11px] text-tertiary font-bold tracking-tight">
            AI 어시스턴트 정상 가동 중
          </span>
        </div>

        {/* Institution Scope Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowInstMenu(!showInstMenu)}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">account_balance</span>
            <span className="text-[13px] font-medium text-on-surface truncate max-w-[150px]">
              {selectedInstitutionId === 'all' ? '전체 기관 (52개소)' : currentInstitution}
            </span>
            <span className="material-symbols-outlined text-[16px] text-outline">arrow_drop_down</span>
          </button>

          {showInstMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/40 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1.5 border-b border-outline-variant/30 text-[11px] font-bold text-secondary">
                관할 기관 선택 (필터링)
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelectInstitution('all');
                  setShowInstMenu(false);
                }}
                className={`w-full text-left px-3 py-2 text-[13px] hover:bg-surface-container flex items-center justify-between ${
                  selectedInstitutionId === 'all' ? 'text-primary font-bold bg-primary-fixed/20' : 'text-on-surface'
                }`}
              >
                <span>전체 기관 (유치원 28 / 어린이집 24)</span>
                {selectedInstitutionId === 'all' && (
                  <span className="material-symbols-outlined text-[16px]">check</span>
                )}
              </button>
              {INSTITUTIONS.map((inst) => (
                <button
                  key={inst.id}
                  type="button"
                  onClick={() => {
                    onSelectInstitution(inst.id);
                    setShowInstMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-[13px] hover:bg-surface-container flex items-center justify-between ${
                    selectedInstitutionId === inst.id ? 'text-primary font-bold bg-primary-fixed/20' : 'text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-container text-secondary">
                      {inst.type}
                    </span>
                    <span className="truncate">{inst.name}</span>
                  </div>
                  {selectedInstitutionId === inst.id && (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Icon Button */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
          type="button"
          title="알림 센터 (3건)"
        >
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-error text-on-error text-[10px] font-bold">
            3
          </span>
        </button>

        {/* User Profile */}
        <div
          onClick={() => onNavigate('settings')}
          className="flex items-center gap-2 pl-2 border-l border-outline-variant/40 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-[14px] shadow-sm group-hover:ring-2 group-hover:ring-primary/40 transition-all">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
          <div className="hidden 2xl:flex flex-col">
            <span className="text-[13px] font-bold text-on-surface leading-none group-hover:text-primary transition-colors">
              김세종
            </span>
            <span className="text-[11px] text-secondary mt-0.5">교육청 관리자</span>
          </div>
        </div>
      </div>
    </header>
  );
};
