import React, { useState } from 'react';
import { AdminTask, TaskCategory, TaskPriority } from '../../types';
import { INSTITUTIONS } from '../../data/mockData';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (newTask: AdminTask) => void;
  initialDate?: string;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({
  isOpen,
  onClose,
  onAddTask,
  initialDate,
}) => {
  const [title, setTitle] = useState('');
  const [institutionId, setInstitutionId] = useState('inst-1');
  const [category, setCategory] = useState<TaskCategory>('deadline');
  const [priority, setPriority] = useState<TaskPriority>('urgent');
  const [dueDate, setDueDate] = useState(initialDate || '2024-11-22');
  const [time, setTime] = useState('17:00');
  const [assignee, setAssignee] = useState('김세종 주무관');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const inst = INSTITUTIONS.find((i) => i.id === institutionId) || INSTITUTIONS[0];

    const newTask: AdminTask = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      institutionId: inst.id,
      institutionName: inst.name,
      category,
      priority,
      status: 'pending',
      assignee,
      dueDate,
      time,
      dDay: '신규',
      description: description.trim() || '행정 등록 업무',
      aiSuggestedAction: 'AI 표준 서식 검토 가능',
      complianceChecked: true,
    };

    onAddTask(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-outline-variant/40 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">add_task</span>
            </span>
            <h3 className="text-[17px] font-bold text-on-surface">새 유보통합 행정 업무 등록</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-secondary hover:bg-surface-container flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="my-4 space-y-3.5 text-[13px]">
          <div>
            <label className="font-semibold text-on-surface block mb-1">
              업무명 (제목) <span className="text-error">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 4분기 친환경 무상급식 보조금 정산 제출"
              className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant/30 focus:border-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-on-surface block mb-1">관할 기관</label>
              <select
                value={institutionId}
                onChange={(e) => setInstitutionId(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant/30 focus:border-primary focus:outline-none"
              >
                {INSTITUTIONS.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-on-surface block mb-1">업무 분류</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant/30 focus:border-primary focus:outline-none"
              >
                <option value="education_office">교육청 공통</option>
                <option value="deadline">제출 마감</option>
                <option value="training">행사·직무연수</option>
                <option value="institution_unique">기관별 고유</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-on-surface block mb-1">마감 일자</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant/30 focus:border-primary focus:outline-none tabular-nums"
              />
            </div>

            <div>
              <label className="font-semibold text-on-surface block mb-1">마감 시간</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant/30 focus:border-primary focus:outline-none tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-on-surface block mb-1">담당자</label>
              <input
                type="text"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant/30 focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-on-surface block mb-1">우선순위</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant/30 focus:border-primary focus:outline-none"
              >
                <option value="urgent">긴급 (Urgent)</option>
                <option value="high">높음 (High)</option>
                <option value="normal">보통 (Normal)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-on-surface block mb-1">상세 내용 및 비고</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="세부 행정 지침이나 유의사항을 입력하세요."
              className="w-full p-2.5 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant/30 focus:border-primary focus:outline-none"
            ></textarea>
          </div>

          <div className="pt-3 border-t border-outline-variant/30 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-surface-container text-on-surface text-[13px] font-semibold hover:bg-surface-container-high transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary text-white text-[13px] font-bold hover:bg-primary-container transition-all shadow-sm"
            >
              업무 등록 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
