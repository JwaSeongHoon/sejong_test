import React, { useState } from 'react';
import { AdminTask, NavPath } from '../../types';
import { ANNOUNCEMENTS, INSTITUTIONS } from '../../data/mockData';

interface DashboardViewProps {
  tasks: AdminTask[];
  onNavigate: (path: NavPath) => void;
  onOpenNewTaskModal: () => void;
  onToggleTaskComplete: (taskId: string) => void;
  onAiAssistClick: (task: AdminTask) => void;
  selectedInstitutionId: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  tasks,
  onNavigate,
  onOpenNewTaskModal,
  onToggleTaskComplete,
  onAiAssistClick,
  selectedInstitutionId,
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(2); // Wednesday (Today)
  const [taskFilter, setTaskFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const weekDays = [
    { name: '월', date: '18', fullDate: '2024-11-18', count: 2 },
    { name: '화', date: '19', fullDate: '2024-11-19', count: 3 },
    { name: '수', date: '20', fullDate: '2024-11-20', count: 5, isToday: true },
    { name: '목', date: '21', fullDate: '2024-11-21', count: 4 },
    { name: '금', date: '22', fullDate: '2024-11-22', count: 6 },
  ];

  const filteredTasks = tasks.filter((t) => {
    if (selectedInstitutionId !== 'all' && t.institutionId !== selectedInstitutionId) {
      return false;
    }
    if (taskFilter === 'pending' && t.status !== 'pending') return false;
    if (taskFilter === 'in_progress' && t.status !== 'in_progress') return false;
    if (taskFilter === 'completed' && t.status !== 'completed') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        t.institutionName.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getCategoryBadge = (category: AdminTask['category']) => {
    switch (category) {
      case 'education_office':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary-fixed/80 text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            교육청 공통
          </span>
        );
      case 'deadline':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-error-container text-on-error-container">
            <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
            제출 마감
          </span>
        );
      case 'training':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-tertiary-fixed text-on-tertiary-fixed">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
            행사·직무연수
          </span>
        );
      case 'institution_unique':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-secondary-fixed/80 text-on-secondary-fixed">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            기관별 고유
          </span>
        );
    }
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto w-full flex flex-col gap-6">
      {/* 1. Top Institutional Welcome Banner & Quick Action Center */}
      <section className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm border border-outline-variant/30">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary/5 pointer-events-none blur-3xl"></div>
        <div className="absolute right-40 -bottom-20 w-60 h-60 rounded-full bg-tertiary/5 pointer-events-none blur-2xl"></div>

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div className="flex flex-col gap-1 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px] font-semibold">
                <span className="material-symbols-outlined text-[14px]">verified</span> 세종특별자치시교육청 총괄행정
              </span>
              <span className="text-[12px] text-secondary">기준일시: 2024년 11월 20일 (수) 09:30</span>
            </div>

            <h1 className="text-[26px] sm:text-[30px] font-bold text-on-surface tracking-tight mt-1">
              반갑습니다, 김세종 주무관님!
            </h1>
            <p className="text-[15px] text-on-surface-variant leading-relaxed">
              오늘의 주요 행정 일정 <span className="font-bold text-primary">8건</span>과 마감 임박 업무{' '}
              <span className="font-bold text-error">3건</span>이 대기 중입니다. AI 보조 도구로 신속히 처리를 완료하세요.
            </p>
          </div>

          {/* Quick Actions Cluster */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2 xl:pt-0">
            <button
              onClick={onOpenNewTaskModal}
              type="button"
              className="h-10 px-4 rounded-xl bg-primary text-on-primary text-[13px] font-semibold flex items-center gap-2 hover:bg-primary-container shadow-sm transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">add_task</span>
              <span>새 업무 등록</span>
            </button>

            <button
              onClick={() => onNavigate('ai-docs')}
              type="button"
              className="h-10 px-4 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed text-[13px] font-semibold flex items-center gap-2 hover:bg-tertiary-fixed-dim shadow-sm transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              <span>AI 문서 작성</span>
            </button>

            <button
              onClick={() => onNavigate('ai-chat')}
              type="button"
              className="h-10 px-4 rounded-xl bg-surface-container text-on-surface text-[13px] font-semibold flex items-center gap-2 hover:bg-surface-container-high border border-outline-variant/30 transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">smart_toy</span>
              <span>AI 챗봇 질문</span>
            </button>

            <button
              onClick={() => onNavigate('resources')}
              type="button"
              className="h-10 px-3.5 rounded-xl bg-surface-container text-on-surface-variant text-[13px] font-medium flex items-center gap-2 hover:bg-surface-container-high border border-outline-variant/30 transition-all"
              title="자료·서식 보관함 바로가기"
            >
              <span className="material-symbols-outlined text-[18px]">folder_managed</span>
              <span>자료 서식</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Key Metrics KPI Bento Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: 오늘의 업무 */}
        <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-5 shadow-sm border border-outline-variant/30 flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-secondary">오늘의 배정 업무</span>
            <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">assignment</span>
            </div>
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-[30px] font-bold text-on-surface tabular-nums">
              8<span className="text-[16px] font-normal ml-0.5">건</span>
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-semibold">
              +2건 전일대비
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 bg-surface-container-low/70 rounded-lg px-2.5 py-1.5 text-[12px] text-on-surface-variant">
            <span>
              진행 중 <strong className="text-primary font-bold">5건</strong>
            </span>
            <span className="text-outline">/</span>
            <span>
              접수 대기 <strong className="text-secondary font-bold">3건</strong>
            </span>
          </div>
        </div>

        {/* KPI 2: 마감 임박 */}
        <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-5 shadow-sm border border-outline-variant/30 flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-error">마감 임박 행정</span>
            <div className="w-9 h-9 rounded-xl bg-error-container flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-[20px]">notification_important</span>
            </div>
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-[30px] font-bold text-error tabular-nums">
              3<span className="text-[16px] font-normal ml-0.5 text-on-surface">건</span>
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-[11px] font-bold">
              확인 필요
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 bg-error-container/30 rounded-lg px-2.5 py-1.5 text-[12px] text-on-surface-variant">
            <span className="text-error font-bold">D-1 (24시간 내) 1건</span>
            <span className="text-outline">·</span>
            <span>D-2 잔여 2건</span>
          </div>
        </div>

        {/* KPI 3: 완료 업무 */}
        <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-5 shadow-sm border border-outline-variant/30 flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-secondary">이번 달 결재 완료</span>
            <div className="w-9 h-9 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-[20px]">task_alt</span>
            </div>
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-[30px] font-bold text-on-surface tabular-nums">
              96<span className="text-[16px] font-normal ml-0.5">건</span>
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-bold">
              달성률 91.4%
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 bg-surface-container-low/70 rounded-lg px-2.5 py-1.5 text-[12px] text-on-surface-variant">
            <span>목표 105건 대비</span>
            <span className="text-tertiary font-bold">잔여 9건 처리 예정</span>
          </div>
        </div>

        {/* KPI 4: AI 자동화 문서 절감 시간 */}
        <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-5 shadow-sm border border-outline-variant/30 flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-primary">AI 행정 절감 시간</span>
            <div className="w-9 h-9 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">bolt</span>
            </div>
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-[30px] font-bold text-primary tabular-nums">
              142<span className="text-[16px] font-normal ml-0.5 text-on-surface">시간</span>
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-fixed text-primary text-[11px] font-bold">
              +38% 효율향상
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 bg-surface-container-low/70 rounded-lg px-2.5 py-1.5 text-[12px] text-on-surface-variant">
            <span>생성 문서 412건</span>
            <span className="text-primary font-bold">교원 행정부담 경감</span>
          </div>
        </div>
      </section>

      {/* 3. Middle Section: Two Columns (Left 8 cols, Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Weekly Schedule & Main Administrative Processing Table (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* A. Weekly Schedule & Timeline Bar */}
          <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">calendar_month</span>
                <h2 className="text-[16px] font-bold text-on-surface">이번 주 통합 업무 일정 & 타임라인</h2>
              </div>
              <button
                onClick={() => onNavigate('calendar')}
                className="text-[12px] text-primary hover:underline font-semibold flex items-center gap-0.5"
              >
                <span>전체 일정표 보기</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>

            {/* Day Selector Pills */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {weekDays.map((d, idx) => (
                <button
                  key={d.name}
                  type="button"
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`p-3 rounded-xl text-center transition-all border flex flex-col items-center gap-0.5 ${
                    selectedDayIndex === idx
                      ? 'bg-primary-container text-white border-primary shadow-sm font-bold'
                      : d.isToday
                      ? 'bg-primary-fixed/30 border-primary/40 text-on-surface font-semibold'
                      : 'bg-surface-container-low border-transparent text-secondary hover:bg-surface-container'
                  }`}
                >
                  <span className="text-[12px] opacity-80">{d.name}요일</span>
                  <span className="text-[18px] font-bold tabular-nums">{d.date}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full mt-0.5 ${
                      selectedDayIndex === idx
                        ? 'bg-white/20 text-white'
                        : d.isToday
                        ? 'bg-primary text-white font-semibold'
                        : 'bg-surface-container text-secondary'
                    }`}
                  >
                    {d.isToday ? '오늘' : `${d.count}건`}
                  </span>
                </button>
              ))}
            </div>

            {/* Timeline for Selected Day */}
            <div className="space-y-2.5 pt-1">
              <div className="p-3.5 rounded-xl bg-surface-container-low/70 border border-outline-variant/30 flex items-start justify-between gap-3 hover:bg-surface-container-low transition-colors">
                <div className="flex items-start gap-3">
                  <span className="px-2 py-1 rounded bg-error-container text-error font-bold text-[12px] tabular-nums shrink-0 mt-0.5">
                    17:00 마감
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-on-surface">
                        겨울철 유행성 감염병 예방 및 방역수칙 가정통신문 일괄 배포 승인
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-semibold">
                        세종가온유치원
                      </span>
                    </div>
                    <p className="text-[12px] text-on-surface-variant mt-1">
                      인플루엔자 및 노로바이러스 유행 대응 등원 중지 기준 및 출석 인정 결석 서류 규정 안내문
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('ai-docs')}
                  className="px-3 py-1.5 rounded-lg bg-primary text-white text-[12px] font-semibold shrink-0 hover:bg-primary-container transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                  <span>초안 확인</span>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-low/70 border border-outline-variant/30 flex items-start justify-between gap-3 hover:bg-surface-container-low transition-colors">
                <div className="flex items-start gap-3">
                  <span className="px-2 py-1 rounded bg-surface-container text-secondary font-bold text-[12px] tabular-nums shrink-0 mt-0.5">
                    14:00 일정
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-on-surface">
                        2025학년도 1학기 유보통합 시범운영 기관 현장 실사 일정 수립
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold">
                        새봄어린이집 등 8개소
                      </span>
                    </div>
                    <p className="text-[12px] text-on-surface-variant mt-1">
                      교육청-시청 공동 실사단 파견 계획 및 유아·보육 시설 안전 기준 체크리스트 사전 배포
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('calendar')}
                  className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-[12px] font-semibold shrink-0 transition-colors"
                >
                  상세 조회
                </button>
              </div>
            </div>
          </section>

          {/* B. Administrative Tasks Processing Table */}
          <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-[16px] font-bold text-on-surface">최근 행정 업무 처리 목록</h2>
                <p className="text-[12px] text-secondary">
                  교육청-유치원-어린이집 통합 업무 진행 상태 및 AI 검증 내역
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1 p-1 bg-surface-container-low rounded-xl border border-outline-variant/30 text-[12px]">
                <button
                  type="button"
                  onClick={() => setTaskFilter('all')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    taskFilter === 'all'
                      ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  전체 ({tasks.length})
                </button>
                <button
                  type="button"
                  onClick={() => setTaskFilter('in_progress')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    taskFilter === 'in_progress'
                      ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  진행 중 ({tasks.filter((t) => t.status === 'in_progress').length})
                </button>
                <button
                  type="button"
                  onClick={() => setTaskFilter('pending')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    taskFilter === 'pending'
                      ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  접수 대기 ({tasks.filter((t) => t.status === 'pending').length})
                </button>
                <button
                  type="button"
                  onClick={() => setTaskFilter('completed')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    taskFilter === 'completed'
                      ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  완료 ({tasks.filter((t) => t.status === 'completed').length})
                </button>
              </div>
            </div>

            {/* Search Input inside table */}
            <div className="mb-3">
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="업무명, 기관명, 내용 검색..."
                  className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-container-low text-[13px] text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/30"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-outline-variant/40">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-secondary text-[12px] font-semibold border-b border-outline-variant/40">
                    <th className="py-2.5 px-3 w-10 text-center">선택</th>
                    <th className="py-2.5 px-3">분류</th>
                    <th className="py-2.5 px-3">업무명 및 주요 내용</th>
                    <th className="py-2.5 px-3">관할 기관</th>
                    <th className="py-2.5 px-3">담당자</th>
                    <th className="py-2.5 px-3">기한</th>
                    <th className="py-2.5 px-3">상태</th>
                    <th className="py-2.5 px-3 text-right">AI 액션</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 text-[13px]">
                  {filteredTasks.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-secondary">
                        조건에 해당하는 업무 항목이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    filteredTasks.map((task) => (
                      <tr
                        key={task.id}
                        className={`hover:bg-surface-container-low/50 transition-colors ${
                          task.status === 'completed' ? 'opacity-60 bg-surface-container-low/20' : ''
                        }`}
                      >
                        <td className="py-3 px-3 text-center">
                          <input
                            type="checkbox"
                            checked={task.status === 'completed'}
                            onChange={() => onToggleTaskComplete(task.id)}
                            className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary cursor-pointer"
                          />
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">{getCategoryBadge(task.category)}</td>
                        <td className="py-3 px-3 max-w-xs">
                          <div
                            className={`font-semibold text-on-surface truncate ${
                              task.status === 'completed' ? 'line-through text-secondary' : ''
                            }`}
                          >
                            {task.title}
                          </div>
                          <div className="text-[11px] text-secondary truncate mt-0.5">
                            {task.description}
                          </div>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap text-on-surface font-medium">
                          {task.institutionName}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap text-secondary text-[12px]">
                          {task.assignee}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              task.dDay === 'D-Day' || task.dDay === 'D-1'
                                ? 'bg-error-container text-error'
                                : task.dDay === '완료'
                                ? 'bg-surface-container text-secondary'
                                : 'bg-surface-container text-on-surface'
                            }`}
                          >
                            {task.dDay}
                          </span>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          {task.status === 'completed' ? (
                            <span className="inline-flex items-center gap-1 text-tertiary font-bold text-[12px]">
                              <span className="material-symbols-outlined text-[16px]">check_circle</span>
                              완료
                            </span>
                          ) : task.status === 'in_progress' ? (
                            <span className="inline-flex items-center gap-1 text-primary font-bold text-[12px]">
                              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                              진행중
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-secondary text-[12px]">
                              <span className="w-2 h-2 rounded-full bg-outline"></span>
                              대기
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right whitespace-nowrap">
                          {task.aiSuggestedAction ? (
                            <button
                              type="button"
                              onClick={() => onAiAssistClick(task)}
                              className="px-2.5 py-1 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-semibold hover:bg-tertiary-fixed-dim transition-colors inline-flex items-center gap-1 shadow-xs"
                            >
                              <span className="material-symbols-outlined text-[13px]">auto_awesome</span>
                              <span>AI 초안</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => onToggleTaskComplete(task.id)}
                              className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-[11px] font-semibold transition-colors"
                            >
                              처리 완료
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Institution Progress, AI Recommendations, Notices (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* A. Institution Completion Progress */}
          <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">corporate_fare</span>
                <h2 className="text-[16px] font-bold text-on-surface">기관별 행정 완료율 현황</h2>
              </div>
              <button
                onClick={() => onNavigate('users')}
                className="text-[12px] text-primary hover:underline font-semibold"
              >
                52개원 전체보기
              </button>
            </div>
            <p className="text-[12px] text-secondary mb-4">
              2024년 2학기 유보통합 시범운영 행정서식 이행 현황
            </p>

            <div className="space-y-3.5">
              {INSTITUTIONS.slice(0, 5).map((inst) => (
                <div key={inst.id} className="space-y-1">
                  <div className="flex items-center justify-between text-[13px]">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-on-surface">{inst.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface-container text-secondary">
                        {inst.type}
                      </span>
                    </div>
                    <span className="font-bold text-primary tabular-nums">{inst.completionRate}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        inst.completionRate >= 90
                          ? 'bg-tertiary'
                          : inst.completionRate >= 80
                          ? 'bg-primary'
                          : 'bg-secondary'
                      }`}
                      style={{ width: `${inst.completionRate}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* B. AI Smart Recommendations Widget */}
          <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              </span>
              <h2 className="text-[16px] font-bold text-on-surface">AI 업무지원 스마트 위젯</h2>
            </div>
            <p className="text-[12px] text-secondary mb-4">
              행정 규칙 기반 자동 사전 검토 및 추천 기안서
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-tertiary-fixed/20 border border-tertiary/20 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-tertiary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    보조금 정산 검토 완료
                  </span>
                  <span className="text-[10px] text-secondary">10분 전 분석</span>
                </div>
                <div className="text-[13px] font-bold text-on-surface">
                  4분기 급간식비 정산서류 일치율 100%
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  관내 12개 유치원·어린이집 보조금 지출 영수증과 인원수가 완벽히 매칭되었습니다.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('ai-docs')}
                  className="mt-1 w-full py-1.5 rounded-lg bg-primary text-white text-[12px] font-semibold hover:bg-primary-container transition-colors flex items-center justify-center gap-1"
                >
                  <span>승인 결재문서 초안 확인</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-primary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">psychology</span>
                    규정 해석 AI 제안
                  </span>
                  <span className="text-[10px] text-secondary">자주 묻는 질문</span>
                </div>
                <div className="text-[13px] font-bold text-on-surface">
                  어린이집 보조교사 수당 지급 기준
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  2025 유보통합 추진지침 제14조에 따른 처우개선비 연계 산출 가이드가 준비되어 있습니다.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('ai-chat')}
                  className="mt-1 w-full py-1.5 rounded-lg bg-surface-container-highest hover:bg-surface-container text-on-surface text-[12px] font-semibold transition-colors flex items-center justify-center gap-1"
                >
                  <span>AI 챗봇으로 규정 문답하기</span>
                  <span className="material-symbols-outlined text-[14px]">chat</span>
                </button>
              </div>
            </div>
          </section>

          {/* C. Official Notices & Operation Announcements */}
          <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">campaign</span>
                <h2 className="text-[16px] font-bold text-on-surface">교육청 주요 공지 및 운영 알림</h2>
              </div>
              <button
                onClick={() => onNavigate('resources')}
                className="text-[12px] text-primary hover:underline font-semibold"
              >
                더보기
              </button>
            </div>

            <div className="space-y-3">
              {ANNOUNCEMENTS.map((ann) => (
                <div
                  key={ann.id}
                  className="p-3 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low transition-colors cursor-pointer border border-outline-variant/20 flex flex-col gap-1"
                  onClick={() => onNavigate('resources')}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        ann.isUrgent
                          ? 'bg-error-container text-error'
                          : 'bg-primary-fixed text-primary'
                      }`}
                    >
                      {ann.badge}
                    </span>
                    <span className="text-[11px] text-secondary tabular-nums">{ann.date}</span>
                  </div>
                  <h3 className="text-[13px] font-semibold text-on-surface line-clamp-1 mt-0.5">
                    {ann.title}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-secondary mt-1">
                    <span>{ann.institution}</span>
                    <span className="font-bold text-primary">{ann.dDay}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
