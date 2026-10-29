import React from 'react';
import { NavPath } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: NavPath) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      title: '겨울철 감염병 예방 관리 가정통신문 승인 마감 임박',
      desc: '금일 17:00까지 세종가온유치원 배부용 가정통신문 최종 결재가 필요합니다.',
      time: '15분 전',
      isUrgent: true,
      targetPath: 'ai-docs' as NavPath,
    },
    {
      id: 'notif-2',
      title: '4분기 유·보 친환경 무상급식 정산 서류 제출 요청',
      desc: '세종새봄어린이집 외 11개소의 분기별 식품비 정산서가 등록되었습니다.',
      time: '1시간 전',
      isUrgent: true,
      targetPath: 'dashboard' as NavPath,
    },
    {
      id: 'notif-3',
      title: '2025 유보통합 추진단 제6차 정례 협의회 결과 안내',
      desc: '회의록 및 2025학년도 시범운영 기관 실사 지침이 자료실에 게시되었습니다.',
      time: '2시간 전',
      isUrgent: false,
      targetPath: 'resources' as NavPath,
    },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-surface-container-lowest h-full shadow-2xl border-l border-outline-variant/40 flex flex-col justify-between p-6 animate-in slide-in-from-right duration-200"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">notifications</span>
              <h2 className="text-[17px] font-bold text-on-surface">알림 센터</h2>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-error text-white">
                3건
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-secondary hover:bg-surface-container flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* List */}
          <div className="my-4 space-y-3">
            {notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onNavigate(item.targetPath);
                  onClose();
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer hover:shadow-xs flex flex-col gap-1.5 ${
                  item.isUrgent
                    ? 'bg-error-container/20 border-error/30'
                    : 'bg-surface-container-low border-outline-variant/30 hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      item.isUrgent ? 'bg-error text-white' : 'bg-primary-fixed text-primary'
                    }`}
                  >
                    {item.isUrgent ? '긴급 행정' : '일반 알림'}
                  </span>
                  <span className="text-[11px] text-secondary">{item.time}</span>
                </div>
                <h4 className="text-[13px] font-bold text-on-surface">{item.title}</h4>
                <p className="text-[12px] text-on-surface-variant leading-relaxed">{item.desc}</p>
                <div className="text-[11px] text-primary font-semibold flex items-center gap-0.5 mt-1">
                  <span>해당 업무로 이동</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between text-[12px]">
          <span className="text-secondary">모든 알림 읽음 처리 완료</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
