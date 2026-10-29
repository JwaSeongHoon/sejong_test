import React, { useState } from 'react';
import { AdminTask, TaskCategory } from '../../types';
import { INSTITUTIONS } from '../../data/mockData';

interface CalendarViewProps {
  events: AdminTask[];
  onOpenNewTaskModal: (initialDate?: string) => void;
  onToggleTaskComplete: (taskId: string) => void;
  onAiAssistClick: (task: AdminTask) => void;
  selectedInstitutionId: string;
  onSelectInstitution: (id: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onOpenNewTaskModal,
  onToggleTaskComplete,
  onAiAssistClick,
  selectedInstitutionId,
  onSelectInstitution,
}) => {
  const [currentYear, setCurrentYear] = useState(2024);
  const [currentMonth, setCurrentMonth] = useState(11); // 1-indexed (November)
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'list'>('month');
  const [selectedDate, setSelectedDate] = useState<string>('2024-11-20');
  const [hideCompleted, setHideCompleted] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<TaskCategory[]>([
    'education_office',
    'institution_unique',
    'deadline',
    'training',
  ]);
  const [activeTaskModal, setActiveTaskModal] = useState<AdminTask | null>(null);

  // Toggle category filters
  const toggleCategory = (cat: TaskCategory) => {
    if (selectedCategories.includes(cat)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter((c) => c !== cat));
      }
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleGoToday = () => {
    setCurrentYear(2024);
    setCurrentMonth(11);
    setSelectedDate('2024-11-20');
  };

  // Filter events
  const filteredEvents = events.filter((ev) => {
    if (selectedInstitutionId !== 'all' && ev.institutionId !== selectedInstitutionId) {
      return false;
    }
    if (!selectedCategories.includes(ev.category)) {
      return false;
    }
    if (hideCompleted && ev.status === 'completed') {
      return false;
    }
    return true;
  });

  // Events for selected date
  const selectedDateEvents = filteredEvents.filter((ev) => ev.dueDate === selectedDate);

  // Month grid calculation for November 2024
  // Nov 1 2024 is Friday (5)
  // Total days in Nov 2024 is 30
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfWeek = (year: number, month: number) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const totalDays = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfWeek(currentYear, currentMonth);

  // Previous month padding days
  const prevMonthTotalDays = getDaysInMonth(currentYear, currentMonth === 1 ? 12 : currentMonth - 1);
  const prevDays = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    prevDays.push({
      day: prevMonthTotalDays - i,
      isCurrentMonth: false,
      dateString: `${currentMonth === 1 ? currentYear - 1 : currentYear}-${String(
        currentMonth === 1 ? 12 : currentMonth - 1
      ).padStart(2, '0')}-${String(prevMonthTotalDays - i).padStart(2, '0')}`,
    });
  }

  // Current month days
  const currentDays = [];
  for (let d = 1; d <= totalDays; d++) {
    currentDays.push({
      day: d,
      isCurrentMonth: true,
      dateString: `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
      isToday: currentYear === 2024 && currentMonth === 11 && d === 20,
    });
  }

  // Next month padding days to fill 35 or 42 cells
  const remainingCells = (7 - ((prevDays.length + currentDays.length) % 7)) % 7;
  const nextDays = [];
  for (let i = 1; i <= remainingCells; i++) {
    nextDays.push({
      day: i,
      isCurrentMonth: false,
      dateString: `${currentMonth === 12 ? currentYear + 1 : currentYear}-${String(
        currentMonth === 12 ? 1 : currentMonth + 1
      ).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
    });
  }

  const allCalendarCells = [...prevDays, ...currentDays, ...nextDays];

  const getEventBadgeStyle = (category: TaskCategory) => {
    switch (category) {
      case 'education_office':
        return 'bg-primary-fixed text-primary border-primary/20';
      case 'deadline':
        return 'bg-error-container text-error border-error/30';
      case 'training':
        return 'bg-tertiary-fixed text-on-tertiary-fixed border-tertiary/20';
      case 'institution_unique':
      default:
        return 'bg-secondary-fixed text-on-secondary-fixed border-secondary/20';
    }
  };

  return (
    <div className="px-6 py-6 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Date Heading & Controls */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined text-[22px]">calendar_month</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[22px] font-bold text-on-surface tracking-tight">통합 업무달력</h1>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-tertiary-fixed text-on-tertiary-fixed">
                  유보통합 표준일정표
                </span>
              </div>
              <p className="text-[12px] text-secondary">
                세종특별자치시 관내 국공립 유치원 및 어린이집 공통 행정일정 관리
              </p>
            </div>
          </div>

          {/* Month Navigation */}
          <div className="flex items-center gap-1.5 ml-0 sm:ml-4 bg-surface-container-lowest p-1 rounded-xl shadow-sm border border-outline-variant/30">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
              title="이전달"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <span className="text-[16px] font-bold text-on-surface px-2 select-none tracking-tight tabular-nums">
              {currentYear}년 {currentMonth}월
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
              title="다음달"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
            <button
              type="button"
              onClick={handleGoToday}
              className="ml-1 px-3 py-1 rounded-lg bg-surface-container text-primary text-[12px] font-bold hover:bg-primary-fixed transition-colors"
            >
              오늘
            </button>
          </div>
        </div>

        {/* Right Controls: View Switchers + Add Button */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* View Mode Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-surface-container border border-outline-variant/30">
            <button
              type="button"
              onClick={() => setViewMode('month')}
              className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all ${
                viewMode === 'month'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              월간
            </button>
            <button
              type="button"
              onClick={() => setViewMode('week')}
              className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all ${
                viewMode === 'week'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              주간
            </button>
            <button
              type="button"
              onClick={() => setViewMode('day')}
              className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all ${
                viewMode === 'day'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              일간
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all ${
                viewMode === 'list'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              목록형
            </button>
          </div>

          {/* Add Task Button */}
          <button
            type="button"
            onClick={() => onOpenNewTaskModal(selectedDate)}
            className="flex items-center gap-2 h-10 px-4 rounded-xl bg-primary text-on-primary text-[13px] font-semibold shadow-md hover:bg-primary-container active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>새 업무 등록</span>
          </button>
        </div>
      </div>

      {/* 2. Multi-Filter & Institutional Scope Control Bar */}
      <div className="p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
        {/* Left Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Institution Selector */}
          <div className="flex items-center gap-2">
            <label className="text-[12px] font-semibold text-secondary whitespace-nowrap flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">account_balance</span>
              관할기관
            </label>
            <div className="relative">
              <select
                value={selectedInstitutionId}
                onChange={(e) => onSelectInstitution(e.target.value)}
                className="h-9 pl-3 pr-8 rounded-lg bg-surface-container-low text-on-surface text-[13px] font-medium focus:outline-none focus:bg-surface-container-lowest cursor-pointer border border-outline-variant/30 appearance-none shadow-xs"
              >
                <option value="all">전체 기관 (유치원 28개원 / 어린이집 24개소)</option>
                {INSTITUTIONS.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.name} ({inst.type})
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-2 top-2 text-[18px] text-outline pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          <div className="hidden xl:block w-px h-5 bg-outline-variant/40"></div>

          {/* Category Toggle Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => toggleCategory('education_office')}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all border ${
                selectedCategories.includes('education_office')
                  ? 'bg-primary-fixed text-primary border-primary/30 shadow-xs'
                  : 'bg-surface-container-low text-outline border-transparent opacity-60'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span>교육청 공통 (18)</span>
            </button>

            <button
              type="button"
              onClick={() => toggleCategory('institution_unique')}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all border ${
                selectedCategories.includes('institution_unique')
                  ? 'bg-secondary-fixed text-on-secondary-fixed border-secondary/30 shadow-xs'
                  : 'bg-surface-container-low text-outline border-transparent opacity-60'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span>기관별 고유 (24)</span>
            </button>

            <button
              type="button"
              onClick={() => toggleCategory('deadline')}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all border ${
                selectedCategories.includes('deadline')
                  ? 'bg-error-container text-on-error-container border-error/30 shadow-xs'
                  : 'bg-surface-container-low text-outline border-transparent opacity-60'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
              <span>제출 마감 (6)</span>
            </button>

            <button
              type="button"
              onClick={() => toggleCategory('training')}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all border ${
                selectedCategories.includes('training')
                  ? 'bg-tertiary-fixed text-on-tertiary-fixed border-tertiary/30 shadow-xs'
                  : 'bg-surface-container-low text-outline border-transparent opacity-60'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span>행사·직무연수 (9)</span>
            </button>
          </div>
        </div>

        {/* Right Toggle */}
        <div className="flex items-center gap-4 justify-between xl:justify-end">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hideCompleted}
              onChange={(e) => setHideCompleted(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary cursor-pointer"
            />
            <span className="text-[12px] text-secondary font-medium">완료된 업무 숨기기</span>
          </label>
          <div className="flex items-center gap-1.5 text-[11px] text-tertiary font-semibold bg-tertiary-fixed/30 px-2.5 py-1 rounded-full">
            <span className="material-symbols-outlined text-[14px]">cloud_sync</span>
            <span>K-EduNet 실시간 동기화</span>
          </div>
        </div>
      </div>

      {/* 3. Main Calendar Body with Two Columns (Calendar Grid + Selected Day Inspector) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Calendar Grid (8 cols) */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
          {viewMode === 'month' && (
            <div>
              {/* Day of Week Header */}
              <div className="grid grid-cols-7 text-center py-2.5 bg-surface-container-low text-[12px] font-bold text-secondary border-b border-outline-variant/30">
                <span className="text-error">일</span>
                <span>월</span>
                <span>화</span>
                <span>수</span>
                <span>목</span>
                <span>금</span>
                <span className="text-primary">토</span>
              </div>

              {/* Day Cells Matrix */}
              <div className="grid grid-cols-7 divide-x divide-y divide-outline-variant/20">
                {allCalendarCells.map((cell, idx) => {
                  const dayEvents = filteredEvents.filter((ev) => ev.dueDate === cell.dateString);
                  const isSelected = selectedDate === cell.dateString;

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedDate(cell.dateString)}
                      className={`min-h-[110px] p-2 flex flex-col justify-between transition-all cursor-pointer group ${
                        !cell.isCurrentMonth
                          ? 'bg-surface-container-low/30 text-outline'
                          : isSelected
                          ? 'bg-primary-fixed/15 ring-2 ring-primary/40 ring-inset'
                          : 'bg-surface-container-lowest hover:bg-surface-container-low/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[13px] font-bold w-6 h-6 rounded-full flex items-center justify-center tabular-nums ${
                            cell.isToday
                              ? 'bg-primary text-white font-extrabold shadow-sm'
                              : cell.isCurrentMonth
                              ? 'text-on-surface'
                              : 'text-outline'
                          }`}
                        >
                          {cell.day}
                        </span>
                        {dayEvents.length > 0 && (
                          <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-surface-container text-secondary">
                            {dayEvents.length}건
                          </span>
                        )}
                      </div>

                      {/* Event Chips Preview (Max 2 shown) */}
                      <div className="space-y-1 mt-1 flex-1">
                        {dayEvents.slice(0, 2).map((ev) => (
                          <div
                            key={ev.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTaskModal(ev);
                            }}
                            className={`px-1.5 py-1 rounded text-[11px] font-semibold border truncate cursor-pointer hover:shadow-xs transition-shadow flex items-center gap-1 ${getEventBadgeStyle(
                              ev.category
                            )}`}
                            title={ev.title}
                          >
                            <span className="truncate">{ev.title}</span>
                          </div>
                        ))}

                        {dayEvents.length > 2 && (
                          <div className="text-[10px] text-secondary font-semibold pl-1">
                            +{dayEvents.length - 2}건 더보기
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {viewMode === 'list' && (
            <div className="p-4 divide-y divide-outline-variant/30">
              <div className="pb-3 text-[14px] font-bold text-on-surface">
                {currentYear}년 {currentMonth}월 전체 일정 목록 ({filteredEvents.length}건)
              </div>
              {filteredEvents.map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => setActiveTaskModal(ev)}
                  className="py-3 flex items-center justify-between hover:bg-surface-container-low/50 px-2 rounded-lg cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-bold text-primary tabular-nums w-24">
                      {ev.dueDate} ({ev.time || '종일'})
                    </span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${getEventBadgeStyle(
                        ev.category
                      )}`}
                    >
                      {ev.institutionName}
                    </span>
                    <span className="text-[13px] font-bold text-on-surface">{ev.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-secondary">{ev.assignee}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded font-bold bg-surface-container text-on-surface">
                      {ev.dDay}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(viewMode === 'week' || viewMode === 'day') && (
            <div className="p-6 text-center text-secondary py-16">
              <span className="material-symbols-outlined text-[36px] text-primary mb-2">view_week</span>
              <p className="text-[14px] font-semibold text-on-surface">
                {viewMode === 'week' ? '주간' : '일간'} 상세 타임라인 뷰
              </p>
              <p className="text-[12px] mt-1">
                선택일자({selectedDate})를 기준으로 시간대별 행정 일정 조회가 가능합니다.
              </p>
              <div className="mt-6 max-w-lg mx-auto space-y-2 text-left">
                {selectedDateEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[12px] font-bold text-primary">{ev.time || '10:00'}</div>
                      <div className="text-[13px] font-bold text-on-surface">{ev.title}</div>
                      <div className="text-[11px] text-secondary">{ev.institutionName}</div>
                    </div>
                    <button
                      onClick={() => setActiveTaskModal(ev)}
                      className="px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-[11px] font-semibold"
                    >
                      상세
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Selected Date Inspector Sidebar (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30">
            {/* Inspector Header */}
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <div>
                <span className="text-[11px] font-bold text-primary uppercase">일정 상세 현황</span>
                <h3 className="text-[17px] font-bold text-on-surface mt-0.5">{selectedDate}</h3>
              </div>
              <button
                type="button"
                onClick={() => onOpenNewTaskModal(selectedDate)}
                className="px-2.5 py-1.5 rounded-lg bg-primary-fixed hover:bg-primary-fixed-dim text-primary text-[12px] font-bold flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>일정 추가</span>
              </button>
            </div>

            {/* List of events for selected day */}
            <div className="mt-4 space-y-3">
              {selectedDateEvents.length === 0 ? (
                <div className="text-center py-10 text-secondary">
                  <span className="material-symbols-outlined text-[32px] text-outline mb-1">
                    event_busy
                  </span>
                  <p className="text-[13px] font-semibold">선택한 날짜에 등록된 일정이 없습니다.</p>
                  <p className="text-[11px] mt-0.5">상단의 [일정 추가] 버튼으로 새 업무를 등록하세요.</p>
                </div>
              ) : (
                selectedDateEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3.5 rounded-xl bg-surface-container-low/70 border border-outline-variant/30 flex flex-col gap-2 hover:bg-surface-container-low transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getEventBadgeStyle(
                          ev.category
                        )}`}
                      >
                        {ev.institutionName}
                      </span>
                      <span className="text-[11px] font-bold text-primary tabular-nums">
                        {ev.time || '종일'}
                      </span>
                    </div>

                    <div className="text-[14px] font-bold text-on-surface">{ev.title}</div>
                    <p className="text-[12px] text-on-surface-variant leading-relaxed">
                      {ev.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20 text-[11px] text-secondary">
                      <span>담당자: {ev.assignee}</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onToggleTaskComplete(ev.id)}
                          className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                            ev.status === 'completed'
                              ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                              : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                          }`}
                        >
                          {ev.status === 'completed' ? '✓ 완료됨' : '완료 처리'}
                        </button>
                        {ev.aiSuggestedAction && (
                          <button
                            type="button"
                            onClick={() => onAiAssistClick(ev)}
                            className="px-2 py-1 rounded bg-primary text-white text-[11px] font-semibold hover:bg-primary-container transition-colors flex items-center gap-0.5"
                          >
                            <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
                            <span>AI 처리</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Checklist / Integration Progress Tip */}
          <div className="p-4 rounded-2xl bg-tertiary-fixed/20 border border-tertiary/20 flex items-start gap-3">
            <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">
              lightbulb
            </span>
            <div className="text-[12px] leading-relaxed text-on-surface">
              <strong className="text-tertiary font-bold block mb-0.5">유보통합 마감일자 알림 팁</strong>
              교육청 무상급식 및 처우개선비는 매월 20일~22일 사이에 일괄 마감됩니다. 사전 검증 기능을 활용하여 서류 누락을 방지하세요.
            </div>
          </div>
        </div>
      </div>

      {/* Task Detail Modal */}
      {activeTaskModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-outline-variant/40 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${getEventBadgeStyle(
                    activeTaskModal.category
                  )}`}
                >
                  {activeTaskModal.institutionName}
                </span>
                <span className="text-[12px] font-bold text-error">{activeTaskModal.dDay}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTaskModal(null)}
                className="w-8 h-8 rounded-lg text-secondary hover:bg-surface-container flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="my-4 space-y-3">
              <h3 className="text-[18px] font-bold text-on-surface leading-snug">
                {activeTaskModal.title}
              </h3>
              <p className="text-[13px] text-on-surface-variant leading-relaxed bg-surface-container-low p-3 rounded-xl border border-outline-variant/30">
                {activeTaskModal.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-[12px] bg-surface-container-lowest p-2 rounded-lg">
                <div>
                  <span className="text-secondary">마감일시:</span>{' '}
                  <strong className="text-on-surface tabular-nums">
                    {activeTaskModal.dueDate} {activeTaskModal.time}
                  </strong>
                </div>
                <div>
                  <span className="text-secondary">담당자:</span>{' '}
                  <strong className="text-on-surface">{activeTaskModal.assignee}</strong>
                </div>
              </div>

              {activeTaskModal.aiSuggestedAction && (
                <div className="p-3 rounded-xl bg-tertiary-fixed/20 border border-tertiary/20 flex items-start gap-2 text-[12px]">
                  <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">
                    auto_awesome
                  </span>
                  <div>
                    <span className="font-bold text-tertiary block">AI 분석 및 추천</span>
                    <span className="text-on-surface">{activeTaskModal.aiSuggestedAction}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-outline-variant/30">
              <button
                type="button"
                onClick={() => {
                  onToggleTaskComplete(activeTaskModal.id);
                  setActiveTaskModal(null);
                }}
                className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-[13px] font-bold text-on-surface transition-colors"
              >
                {activeTaskModal.status === 'completed' ? '미완료로 변경' : '업무 완료 처리'}
              </button>

              <div className="flex items-center gap-2">
                {activeTaskModal.aiSuggestedAction && (
                  <button
                    type="button"
                    onClick={() => {
                      onAiAssistClick(activeTaskModal);
                      setActiveTaskModal(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-primary text-white text-[13px] font-bold hover:bg-primary-container shadow-sm transition-all flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                    <span>AI 공문서 작성</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
