import React, { useState } from 'react';
import { InstitutionCategory } from '../../types';
import { SEJONG_LOGO_URL } from '../../data/mockData';

interface LoginViewProps {
  onLoginSuccess: (role: InstitutionCategory, id: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [orgTab, setOrgTab] = useState<InstitutionCategory>('main');
  const [adminId, setAdminId] = useState('sj_admin04@korea.kr');
  const [password, setPassword] = useState('password1234!');
  const [showPassword, setShowPassword] = useState(false);
  const [saveId, setSaveId] = useState(true);
  const [longSession, setLongSession] = useState(false);
  const [isGpkiAuthenticating, setIsGpkiAuthenticating] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleOrgTabChange = (category: InstitutionCategory) => {
    setOrgTab(category);
    if (category === 'main') {
      setAdminId('sj_admin04@korea.kr');
    } else if (category === 'kinder') {
      setAdminId('gaon_k01@sje.go.kr');
    } else {
      setAdminId('saebom_c01@childcare.kr');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId) {
      setLoginError('아이디를 입력해주세요.');
      return;
    }
    setLoginError(null);
    onLoginSuccess(orgTab, adminId);
  };

  const handleGpkiLogin = () => {
    setIsGpkiAuthenticating(true);
    setTimeout(() => {
      setIsGpkiAuthenticating(false);
      onLoginSuccess(orgTab, 'gpki_certified_user');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden bg-surface-container-lowest">
        {/* LEFT COLUMN: Government Authentication Portal (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-surface-container-lowest">
          <div>
            {/* Top Meta & System Identity */}
            <div className="flex items-center justify-between pb-6 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <img
                  alt="SEJONG EduCare AI Logo"
                  className="h-10 w-auto object-contain"
                  src={SEJONG_LOGO_URL}
                />
              </div>
              <div className="flex items-center gap-2 bg-surface-container px-3 py-1 rounded-full text-secondary">
                <span className="inline-block w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                <span className="text-[12px] font-semibold tracking-tight text-on-surface-variant">
                  K-EduNet 보증 체계 가동 중
                </span>
              </div>
            </div>

            {/* Portal Title */}
            <div className="mt-6 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="bg-primary text-on-primary text-[11px] font-bold px-2 py-0.5 rounded">
                  행정망 보안 포털
                </span>
                <h1 className="text-[24px] text-on-surface font-bold tracking-tight">
                  세종 유보통합 AI 행정지원 플랫폼
                </h1>
              </div>
              <p className="text-[13px] text-on-surface-variant leading-relaxed">
                세종특별자치시교육청 소속 유치원·어린이집 교직원 및 행정담당자 전용 업무 시스템
              </p>
            </div>

            {/* Institutional Selector Tab Row */}
            <div className="mt-6">
              <label className="block text-[12px] font-semibold text-on-surface-variant mb-2">
                소속 기관 구분
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-surface-container-low rounded-xl border border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => handleOrgTabChange('main')}
                  className={`py-2 px-3 text-center rounded-lg text-[13px] transition-all ${
                    orgTab === 'main'
                      ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  교육청 본청/지원청
                </button>
                <button
                  type="button"
                  onClick={() => handleOrgTabChange('kinder')}
                  className={`py-2 px-3 text-center rounded-lg text-[13px] transition-all ${
                    orgTab === 'kinder'
                      ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  공·사립 유치원
                </button>
                <button
                  type="button"
                  onClick={() => handleOrgTabChange('childcare')}
                  className={`py-2 px-3 text-center rounded-lg text-[13px] transition-all ${
                    orgTab === 'childcare'
                      ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  어린이집 (국공립/민간)
                </button>
              </div>
            </div>

            {/* Authentication Form Module */}
            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              {loginError && (
                <div className="p-3 rounded-lg bg-error-container text-on-error-container text-[13px] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span>{loginError}</span>
                </div>
              )}

              {/* ID / Email Input */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[13px] text-on-surface font-semibold" htmlFor="admin-id">
                    공직자 / 기관 계정 ID
                  </label>
                  <span className="text-[11px] text-secondary">
                    korea.kr 또는 공인 기관코드
                  </span>
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline text-[20px] pointer-events-none">
                    badge
                  </span>
                  <input
                    id="admin-id"
                    type="text"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    placeholder="example@korea.kr 또는 기관ID 입력"
                    className="w-full h-11 pl-10 pr-3 bg-surface-container-lowest rounded-lg border border-outline-variant/60 text-on-surface text-[14px] focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[13px] text-on-surface font-semibold" htmlFor="admin-pw">
                    비밀번호
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('행정망 관리부서(044-860-0000)로 유선 문의 바랍니다.');
                    }}
                    className="text-[11px] text-primary hover:underline"
                  >
                    비밀번호 초기화 요청
                  </a>
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline text-[20px] pointer-events-none">
                    lock
                  </span>
                  <input
                    id="admin-pw"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="행정망 보안 비밀번호"
                    className="w-full h-11 pl-10 pr-11 bg-surface-container-lowest rounded-lg border border-outline-variant/60 text-on-surface text-[14px] focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 p-1 rounded text-outline hover:text-on-surface focus:outline-none transition-colors"
                    title={showPassword ? '비밀번호 숨김' : '비밀번호 표시'}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Control Checks */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-4">
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={saveId}
                      onChange={(e) => setSaveId(e.target.checked)}
                      className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary cursor-pointer"
                    />
                    <span className="text-[12px] text-on-surface-variant font-medium">기관 ID 저장</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={longSession}
                      onChange={(e) => setLongSession(e.target.checked)}
                      className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary cursor-pointer"
                    />
                    <span className="text-[12px] text-on-surface-variant font-medium">
                      보안 세션 유지 (8시간)
                    </span>
                  </label>
                </div>
                <span className="text-[11px] text-tertiary flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[16px]">security</span> 보안키패드 보호
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="submit"
                  className="w-full h-11 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-[15px] font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
                >
                  <span>업무 포털 로그인</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>

                <button
                  type="button"
                  onClick={handleGpkiLogin}
                  disabled={isGpkiAuthenticating}
                  className="w-full h-11 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary text-[14px] font-bold flex items-center justify-center gap-2 border border-outline-variant/40 shadow-sm transition-all active:scale-[0.99]"
                >
                  {isGpkiAuthenticating ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                      <span>GPKI 전자서명 인증 확인 중...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px] text-primary">
                        verified_user
                      </span>
                      <span>GPKI / 행정전자서명 간편인증 로그인</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Auxiliary Help Bar */}
          <div className="pt-8 border-t border-outline-variant/30 mt-6 flex flex-wrap items-center justify-between text-[12px] text-secondary gap-2">
            <div className="flex items-center gap-3">
              <span className="hover:underline cursor-pointer">원격지원 (AnySupport)</span>
              <span>·</span>
              <span className="hover:underline cursor-pointer">보안프로그램 점검</span>
              <span>·</span>
              <span className="hover:underline cursor-pointer">이용약관 및 보안서약</span>
            </div>
            <div className="flex items-center gap-1 font-semibold text-on-surface">
              <span className="material-symbols-outlined text-[16px] text-primary">headset_mic</span>
              <span>행정콜센터: 1588-0000</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Institutional Promotional & Feature Banner (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#163a63] via-[#004ac6] to-[#002b80] p-6 sm:p-10 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Ambient Lighting Circles */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-tertiary-fixed/15 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[12px] font-semibold w-fit">
              <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">
                auto_awesome
              </span>
              <span>2024-2025 세종형 유보통합 특화 모델</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-[26px] sm:text-[30px] font-bold leading-tight">
                유아 교육·보육의<br />
                새로운 행정 기준,<br />
                <span className="text-tertiary-fixed">지능형으로 통합</span>됩니다.
              </h2>
              <p className="text-[14px] text-white/80 leading-relaxed">
                유치원과 어린이집의 이원화된 학사·회계·인사 서식을 단일 시스템에서 AI가 자동 검증하고 보조합니다.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px] text-tertiary-fixed">
                    edit_document
                  </span>
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-white">AI 행정문서 3초 자동 초안 생성</h3>
                  <p className="text-[12px] text-white/75 mt-0.5">
                    가정통신문, 공문, 기안서 등 표준 서식을 준수하여 즉시 생성
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px] text-tertiary-fixed">
                    hub
                  </span>
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-white">세종시 52개 시범 기관 실시간 연계</h3>
                  <p className="text-[12px] text-white/75 mt-0.5">
                    유치원 28개원 및 어린이집 24개소 행정망 실시간 동기화
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px] text-tertiary-fixed">
                    chat_spark
                  </span>
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-white">2025 유보통합 표준지침 AI Q&A</h3>
                  <p className="text-[12px] text-white/75 mt-0.5">
                    재정 지원, 보육료 정산, 교원 자격 등 맞춤형 법령 답변
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="relative z-10 pt-8 mt-6 border-t border-white/15">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-[20px] font-bold text-white tabular-nums">52개소</div>
                <div className="text-[11px] text-white/70 mt-0.5">시범운영 기관</div>
              </div>
              <div className="border-x border-white/20">
                <div className="text-[20px] font-bold text-tertiary-fixed tabular-nums">99.8%</div>
                <div className="text-[11px] text-white/70 mt-0.5">행정망 가동률</div>
              </div>
              <div>
                <div className="text-[20px] font-bold text-white tabular-nums">4,820건</div>
                <div className="text-[11px] text-white/70 mt-0.5">당월 AI 처리문서</div>
              </div>
            </div>
            <div className="text-center text-[11px] text-white/50 mt-4">
              세종특별자치시교육청 유보통합추진단
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
