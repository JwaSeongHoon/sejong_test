import React from 'react';
import { INSTITUTIONS } from '../../data/mockData';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="p-6 max-w-[1600px] mx-auto w-full flex flex-col gap-6">
      {/* Header */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shadow-sm">
            <span className="material-symbols-outlined text-[22px]">query_stats</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[20px] font-bold text-on-surface">업무현황 분석 및 성과 지표</h1>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-tertiary-fixed text-on-tertiary-fixed">
                실시간 통계
              </span>
            </div>
            <p className="text-[12px] text-secondary">
              세종특별자치시 관내 52개 시범운영 기관의 행정 통합 진척도, 예산 집행률, AI 활용도 심층 분석
            </p>
          </div>
        </div>

        <div className="text-[12px] text-secondary tabular-nums">
          데이터 갱신: 2024년 11월 20일 09:30 기준
        </div>
      </div>

      {/* Top 4 KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30">
          <span className="text-[12px] font-semibold text-secondary">유보통합 서식 표준화율</span>
          <div className="text-[28px] font-bold text-primary mt-2 tabular-nums">89.4%</div>
          <div className="mt-2 text-[11px] text-tertiary font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            전월 대비 +12.3%p 상승
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30">
          <span className="text-[12px] font-semibold text-secondary">친환경 무상급식 지원 집행률</span>
          <div className="text-[28px] font-bold text-on-surface mt-2 tabular-nums">96.8%</div>
          <div className="mt-2 text-[11px] text-secondary font-medium">
            예산 148억 원 중 143.2억 집행 완료
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30">
          <span className="text-[12px] font-semibold text-secondary">교원 1인당 유아 비율 균등화</span>
          <div className="text-[28px] font-bold text-tertiary mt-2 tabular-nums">1 : 11.2</div>
          <div className="mt-2 text-[11px] text-tertiary font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            유치원 1:12.4 / 어린이집 1:10.1 격차 축소
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30">
          <span className="text-[12px] font-semibold text-secondary">AI 행정문서 누적 생성 건수</span>
          <div className="text-[28px] font-bold text-on-surface mt-2 tabular-nums">4,820건</div>
          <div className="mt-2 text-[11px] text-primary font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">bolt</span>
            교원당 월평균 18시간 행정 절감
          </div>
        </div>
      </div>

      {/* Charts & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Progress by District / Area in Sejong (8 cols) */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/30 space-y-6">
          <div>
            <h2 className="text-[16px] font-bold text-on-surface">기관 유형별 행정 서식 통합 달성률 비교</h2>
            <p className="text-[12px] text-secondary">공립유치원, 사립유치원, 국공립어린이집, 민간어린이집 이행률</p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-[13px] mb-1 font-semibold">
                <span className="text-on-surface">공립유치원 (24개원)</span>
                <span className="text-primary tabular-nums">94.8%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-surface-container overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '94.8%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-[13px] mb-1 font-semibold">
                <span className="text-on-surface">사립유치원 (4개원)</span>
                <span className="text-primary tabular-nums">86.2%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-surface-container overflow-hidden">
                <div className="h-full bg-primary-container rounded-full" style={{ width: '86.2%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-[13px] mb-1 font-semibold">
                <span className="text-on-surface">국공립어린이집 (16개소)</span>
                <span className="text-tertiary tabular-nums">91.4%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-surface-container overflow-hidden">
                <div className="h-full bg-tertiary rounded-full" style={{ width: '91.4%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-[13px] mb-1 font-semibold">
                <span className="text-on-surface">민간·가정어린이집 (8개소)</span>
                <span className="text-secondary tabular-nums">81.0%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-surface-container overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: '81.0%' }}></div>
              </div>
            </div>
          </div>

          {/* Detailed table of pilot institutions */}
          <div className="pt-4 border-t border-outline-variant/30">
            <h3 className="text-[14px] font-bold text-on-surface mb-3">선도 시범기관별 상세 이행 현황</h3>
            <div className="overflow-x-auto rounded-xl border border-outline-variant/30">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-surface-container-low text-secondary text-[12px] font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">기관명</th>
                    <th className="py-2.5 px-3">구분</th>
                    <th className="py-2.5 px-3">원아 수</th>
                    <th className="py-2.5 px-3">교직원 수</th>
                    <th className="py-2.5 px-3">통합 상태</th>
                    <th className="py-2.5 px-3 text-right">달성률</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {INSTITUTIONS.map((inst) => (
                    <tr key={inst.id} className="hover:bg-surface-container-low/40">
                      <td className="py-2.5 px-3 font-semibold text-on-surface">{inst.name}</td>
                      <td className="py-2.5 px-3 text-secondary text-[12px]">{inst.type}</td>
                      <td className="py-2.5 px-3 tabular-nums">{inst.childrenCount}명</td>
                      <td className="py-2.5 px-3 tabular-nums">{inst.staffCount}명</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-fixed text-primary">
                          {inst.integrationStatus}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-primary tabular-nums">
                        {inst.completionRate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: AI Automation Impact (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/30 space-y-4">
            <h2 className="text-[16px] font-bold text-on-surface">AI 문서 자동화 유형별 통계</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-secondary">가정통신문 (42%)</span>
                <span className="font-bold text-on-surface tabular-nums">2,024건</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-secondary">학부모 안내문 (28%)</span>
                <span className="font-bold text-on-surface tabular-nums">1,350건</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-secondary">행정 공문 초안 (18%)</span>
                <span className="font-bold text-on-surface tabular-nums">868건</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-secondary">업무보고서 및 기안서 (12%)</span>
                <span className="font-bold text-on-surface tabular-nums">578건</span>
              </div>
            </div>
          </div>

          <div className="bg-tertiary-fixed/20 p-5 rounded-2xl border border-tertiary/25 space-y-2">
            <span className="text-[12px] font-bold text-tertiary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              교육부 2025 유보통합 평가 우수 지자체
            </span>
            <p className="text-[13px] text-on-surface leading-relaxed">
              세종특별자치시교육청은 전국 최초로 행정 통합 인텔리전스 시스템을 구축하여 교육부 유보통합
              선도 지자체 평가에서 A등급(최우수)을 획득하였습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
