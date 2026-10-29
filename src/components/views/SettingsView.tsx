import React, { useState } from 'react';

export const SettingsView: React.FC = () => {
  const [aiEngineVer, setAiEngineVer] = useState('v2.4-sejong-tuned');
  const [autoComplianceCheck, setAutoComplianceCheck] = useState(true);
  const [syncInterval, setSyncInterval] = useState('15');
  const [notifyDeadlines, setNotifyDeadlines] = useState(true);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto w-full flex flex-col gap-6">
      {/* Header */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shadow-sm">
            <span className="material-symbols-outlined text-[22px]">settings</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[20px] font-bold text-on-surface">시스템 환경 설정</h1>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-tertiary-fixed text-on-tertiary-fixed">
                운영자 모드
              </span>
            </div>
            <p className="text-[12px] text-secondary">
              세종 EduCare AI 엔진 버전, 행정망 동기화 간격 및 보안 감사 설정
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="h-10 px-5 rounded-xl bg-primary text-white text-[13px] font-bold hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">check</span>
          <span>설정 저장</span>
        </button>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. AI Engine Configuration */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/30 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-outline-variant/30">
            <span className="material-symbols-outlined text-primary text-[20px]">psychology</span>
            <h2 className="text-[16px] font-bold text-on-surface">AI 행정 엔진 파라미터</h2>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[13px] font-semibold text-on-surface block mb-1">
                적용 모델 및 지침 데이터셋
              </label>
              <select
                value={aiEngineVer}
                onChange={(e) => setAiEngineVer(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-[13px] text-on-surface border border-outline-variant/30 focus:outline-none"
              >
                <option value="v2.4-sejong-tuned">
                  Sejong-EduCare-AI v2.4 (2024-2025 유보통합 최신지침 반영)
                </option>
                <option value="v2.3-stable">Sejong-EduCare-AI v2.3 (기본 안정판)</option>
              </select>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoComplianceCheck}
                  onChange={(e) => setAutoComplianceCheck(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary"
                />
                <div>
                  <span className="text-[13px] font-semibold text-on-surface block">
                    공문서 초안 작성 시 법령 위반 사전 스크리닝
                  </span>
                  <span className="text-[11px] text-secondary">
                    유아교육법, 학교보건법, 개인정보보호법 실시간 감지
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* 2. K-EduNet & Administrative Sync */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/30 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-outline-variant/30">
            <span className="material-symbols-outlined text-primary text-[20px]">sync</span>
            <h2 className="text-[16px] font-bold text-on-surface">행정망 및 일정 동기화</h2>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[13px] font-semibold text-on-surface block mb-1">
                K-EduNet 실시간 백엔드 폴링 주기
              </label>
              <select
                value={syncInterval}
                onChange={(e) => setSyncInterval(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-[13px] text-on-surface border border-outline-variant/30 focus:outline-none"
              >
                <option value="5">5분 간격 (고속 동기화)</option>
                <option value="15">15분 간격 (권장 표준)</option>
                <option value="30">30분 간격 (절전 모드)</option>
              </select>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyDeadlines}
                  onChange={(e) => setNotifyDeadlines(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary"
                />
                <div>
                  <span className="text-[13px] font-semibold text-on-surface block">
                    마감 D-1 임박 행정 자동 브라우저 푸시 알림
                  </span>
                  <span className="text-[11px] text-secondary">
                    보조금 정산 및 공문 제출 마감 24시간 전 경고 팝업
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* 3. Account & Institution Info */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/30 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-outline-variant/30">
            <span className="material-symbols-outlined text-primary text-[20px]">admin_panel_settings</span>
            <h2 className="text-[16px] font-bold text-on-surface">접속 공직자 프로필</h2>
          </div>

          <div className="space-y-2 text-[13px]">
            <div className="flex justify-between py-1.5 border-b border-outline-variant/20">
              <span className="text-secondary">공직자 성명</span>
              <strong className="text-on-surface">김세종 주무관</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-outline-variant/20">
              <span className="text-secondary">소속 부서</span>
              <strong className="text-on-surface">세종특별자치시교육청 유보통합추진단</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-outline-variant/20">
              <span className="text-secondary">행정망 공무원 계정</span>
              <strong className="text-on-surface font-mono">sj_admin04@korea.kr</strong>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-secondary">GPKI 인증서 유효기간</span>
              <strong className="text-tertiary">2025-10-31까지 유효</strong>
            </div>
          </div>
        </div>

        {/* 4. Security & Audit Logs */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/30 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-outline-variant/30">
            <span className="material-symbols-outlined text-primary text-[20px]">security</span>
            <h2 className="text-[16px] font-bold text-on-surface">보안 및 감사 로그</h2>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-2 text-[12px]">
            <div className="flex items-center justify-between text-secondary">
              <span>최근 로그인 일시</span>
              <span className="font-mono text-on-surface">2024-11-20 09:28:14</span>
            </div>
            <div className="flex items-center justify-between text-secondary">
              <span>접속 IP 주소</span>
              <span className="font-mono text-on-surface">10.142.88.204 (행정내부망)</span>
            </div>
            <div className="flex items-center justify-between text-secondary">
              <span>보안키패드 암호화 통신</span>
              <span className="text-tertiary font-bold">정상 가동 (AES-256)</span>
            </div>
          </div>
        </div>
      </div>

      {savedToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-inverse-surface text-inverse-on-surface shadow-2xl">
            <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">
              check_circle
            </span>
            <span className="text-[13px] font-medium">시스템 환경설정이 성공적으로 저장되었습니다.</span>
          </div>
        </div>
      )}
    </div>
  );
};
