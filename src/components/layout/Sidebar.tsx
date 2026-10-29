import React from 'react';
import { NavPath } from '../../types';
import { SEJONG_LOGO_URL } from '../../data/mockData';

interface SidebarProps {
  currentPath: NavPath;
  onNavigate: (path: NavPath) => void;
  onLogout: () => void;
  pendingCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  onLogout,
  pendingCount = 3,
}) => {
  const navItems: { path: NavPath; icon: string; label: string; badge?: string }[] = [
    { path: 'dashboard', icon: 'dashboard', label: '대시보드' },
    { path: 'calendar', icon: 'calendar_month', label: '통합 업무달력', badge: '12' },
    { path: 'ai-docs', icon: 'auto_awesome', label: 'AI 문서 작성', badge: '신규' },
    { path: 'ai-chat', icon: 'smart_toy', label: 'AI 행정지원 챗봇' },
    { path: 'resources', icon: 'folder_managed', label: '자료·서식 관리' },
    { path: 'analytics', icon: 'query_stats', label: '업무현황 분석' },
    { path: 'users', icon: 'corporate_fare', label: '사용자·기관 관리' },
    { path: 'settings', icon: 'settings', label: '시스템 설정' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-outline-variant/40 z-50 flex flex-col justify-between select-none">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div
          className="h-16 px-4 flex items-center gap-2.5 bg-surface-container-lowest cursor-pointer hover:bg-surface-container-low/40 transition-colors"
          onClick={() => onNavigate('dashboard')}
        >
          <img
            alt="SEJONG EduCare AI Logo"
            className="h-8 w-auto object-contain"
            src={SEJONG_LOGO_URL}
          />
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-[18px] text-primary tracking-tight leading-none truncate">
              EduCare AI
            </span>
            <span className="text-[11px] text-secondary leading-tight tracking-normal truncate mt-0.5">
              세종특별자치시교육청
            </span>
          </div>
        </div>

        {/* System Version Tag */}
        <div className="px-4 py-1">
          <div className="px-3 py-1.5 rounded-lg bg-surface-container-low flex items-center justify-between">
            <span className="text-[11px] text-secondary font-medium truncate">
              유보통합 행정지원 포털
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-tertiary-fixed text-on-tertiary-fixed">
              v2.4 운영중
            </span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex flex-col gap-1 px-3 py-2 mt-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => onNavigate(item.path)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-left w-full ${
                  isActive
                    ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface text-[14px]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isActive ? 'text-white' : item.icon === 'auto_awesome' ? 'text-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-[14px] truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badge === '신규'
                        ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                        : 'bg-surface-container text-secondary'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User & Organization Footer Card */}
      <div className="p-3 mx-3 mb-4 rounded-xl bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] border border-outline-variant/30">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="material-symbols-outlined text-primary text-[16px]">domain</span>
          <span className="text-[11px] font-semibold text-secondary truncate">
            유보통합추진단 관리센터
          </span>
        </div>
        <div className="text-[12px] text-on-surface font-bold truncate mb-1">
          세종특별자치시교육청
        </div>
        <div className="flex items-center justify-between pt-2 mt-1 border-t border-outline-variant/30 bg-surface-container-lowest/80 rounded-lg p-2">
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] font-semibold text-on-surface truncate">
              김세종 주무관
            </span>
            <span className="text-[11px] text-secondary truncate">
              교육청 총괄관리자
            </span>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center justify-center w-7 h-7 rounded-lg text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors"
            title="인증 포털로 이동 (로그아웃)"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
