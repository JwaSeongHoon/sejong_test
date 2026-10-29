import React, { useState, useEffect } from 'react';
import { NavPath } from '../../types';
import { INSTITUTIONS, RESOURCE_DOCS } from '../../data/mockData';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: NavPath) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickNavs: { path: NavPath; label: string; icon: string; category: string }[] = [
    { path: 'dashboard', label: '대시보드 메인', icon: 'dashboard', category: '메뉴 바로가기' },
    { path: 'calendar', label: '통합 업무달력 (일정 관리)', icon: 'calendar_month', category: '메뉴 바로가기' },
    { path: 'ai-docs', label: 'AI 공문서 및 안내문 작성', icon: 'auto_awesome', category: '메뉴 바로가기' },
    { path: 'ai-chat', label: 'AI 행정지원 스마트 챗봇', icon: 'smart_toy', category: '메뉴 바로가기' },
    { path: 'resources', label: '자료·서식 보관함', icon: 'folder_managed', category: '메뉴 바로가기' },
    { path: 'analytics', label: '업무현황 통계 분석', icon: 'query_stats', category: '메뉴 바로가기' },
    { path: 'users', label: '사용자 및 52개 기관 관리', icon: 'corporate_fare', category: '메뉴 바로가기' },
  ];

  const matchedInstitutions = INSTITUTIONS.filter((i) =>
    i.name.toLowerCase().includes(query.toLowerCase())
  );

  const matchedResources = RESOURCE_DOCS.filter((r) =>
    r.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-20 p-4 animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full shadow-2xl border border-outline-variant/40 overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[70vh]"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-outline-variant/30 bg-surface-container-lowest">
          <span className="material-symbols-outlined text-primary text-[22px]">search</span>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="이동할 메뉴, 공문 서식, 규정 지침 또는 기관명을 검색하세요..."
            className="flex-1 bg-transparent text-[14px] text-on-surface placeholder:text-outline focus:outline-none"
          />
          <kbd className="px-2 py-0.5 rounded bg-surface-container text-secondary text-[10px] font-mono border border-outline-variant/40">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto space-y-4 text-[13px]">
          {/* Quick Navigations */}
          <div>
            <div className="px-3 py-1 text-[11px] font-bold text-secondary">주요 메뉴 바로가기</div>
            <div className="space-y-1">
              {quickNavs
                .filter((nav) => nav.label.toLowerCase().includes(query.toLowerCase()))
                .map((nav) => (
                  <button
                    key={nav.path}
                    type="button"
                    onClick={() => {
                      onNavigate(nav.path);
                      onClose();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-surface-container flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[18px] text-primary group-hover:scale-110 transition-transform">
                        {nav.icon}
                      </span>
                      <span className="font-semibold text-on-surface">{nav.label}</span>
                    </div>
                    <span className="text-[11px] text-outline">이동</span>
                  </button>
                ))}
            </div>
          </div>

          {/* Matched Resources */}
          {matchedResources.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-bold text-secondary">
                자료 및 서식 ({matchedResources.length})
              </div>
              <div className="space-y-1">
                {matchedResources.map((res) => (
                  <button
                    key={res.id}
                    type="button"
                    onClick={() => {
                      onNavigate('resources');
                      onClose();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-surface-container flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-primary-fixed text-primary font-bold">
                        {res.fileFormat}
                      </span>
                      <span className="text-on-surface font-medium truncate">{res.title}</span>
                    </div>
                    <span className="text-[11px] text-secondary shrink-0">{res.category}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Institutions */}
          {matchedInstitutions.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-bold text-secondary">
                관내 기관 ({matchedInstitutions.length})
              </div>
              <div className="space-y-1">
                {matchedInstitutions.slice(0, 5).map((inst) => (
                  <button
                    key={inst.id}
                    type="button"
                    onClick={() => {
                      onNavigate('users');
                      onClose();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-surface-container flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface-container text-secondary">
                        {inst.type}
                      </span>
                      <span className="font-semibold text-on-surface">{inst.name}</span>
                    </div>
                    <span className="text-[11px] text-primary font-bold">{inst.completionRate}% 달성</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
