import React, { useState } from 'react';
import { Institution } from '../../types';
import { INSTITUTIONS } from '../../data/mockData';

export const UsersView: React.FC = () => {
  const [institutions, setInstitutions] = useState<Institution[]>(INSTITUTIONS);
  const [typeFilter, setTypeFilter] = useState<string>('전체');
  const [search, setSearch] = useState('');
  const [selectedInst, setSelectedInst] = useState<Institution | null>(null);

  const filteredInsts = institutions.filter((i) => {
    if (typeFilter !== '전체' && i.type !== typeFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        i.name.toLowerCase().includes(q) ||
        i.director.toLowerCase().includes(q) ||
        i.address.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="p-6 max-w-[1600px] mx-auto w-full flex flex-col gap-6">
      {/* Header */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shadow-sm">
            <span className="material-symbols-outlined text-[22px]">corporate_fare</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[20px] font-bold text-on-surface">사용자·기관 관리</h1>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary-fixed text-primary">
                세종시 관내 52개 기관
              </span>
            </div>
            <p className="text-[12px] text-secondary">
              공·사립 유치원 및 국공립·민간 어린이집 교직원 계정 및 권한 관리
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert('신규 기관 등록을 위한 행정망 연계 절차가 시작됩니다.')}
          className="h-10 px-4 rounded-xl bg-primary text-white text-[13px] font-bold hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add_business</span>
          <span>기관 신규 등록</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['전체', '공립유치원', '국공립어린이집', '민간어린이집', '사립유치원'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-[13px] font-semibold transition-all whitespace-nowrap ${
                typeFilter === t
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-container-low text-secondary hover:bg-surface-container'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="기관명, 원장명, 주소 검색..."
            className="w-64 h-9 pl-9 pr-3 rounded-lg bg-surface-container-low text-[13px] text-on-surface border border-outline-variant/30 focus:outline-none focus:bg-surface-container-lowest"
          />
        </div>
      </div>

      {/* Institutions Table */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-surface-container-low text-secondary text-[12px] font-semibold border-b border-outline-variant/30">
              <tr>
                <th className="py-3 px-4">기관코드</th>
                <th className="py-3 px-4">기관명</th>
                <th className="py-3 px-4">유형</th>
                <th className="py-3 px-4">원장/대표자</th>
                <th className="py-3 px-4">연락처</th>
                <th className="py-3 px-4">학급/원아 수</th>
                <th className="py-3 px-4">통합 단계</th>
                <th className="py-3 px-4">서식 이행률</th>
                <th className="py-3 px-4 text-right">상세</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredInsts.map((inst) => (
                <tr key={inst.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-[12px] text-secondary">{inst.code}</td>
                  <td className="py-3 px-4 font-bold text-on-surface">{inst.name}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-container text-secondary">
                      {inst.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-on-surface">{inst.director}</td>
                  <td className="py-3 px-4 text-secondary tabular-nums">{inst.phone}</td>
                  <td className="py-3 px-4 tabular-nums">
                    {inst.classesCount}학급 / {inst.childrenCount}명
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-primary-fixed text-primary">
                      {inst.integrationStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-surface-container overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${inst.completionRate}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-primary tabular-nums text-[12px]">
                        {inst.completionRate}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedInst(inst)}
                      className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-[11px] font-semibold text-on-surface"
                    >
                      정보 조회
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Institution Detail Modal */}
      {selectedInst && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-outline-variant/40 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-primary-fixed text-primary">
                  {selectedInst.type}
                </span>
                <span className="text-[12px] font-mono text-secondary">{selectedInst.code}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInst(null)}
                className="w-8 h-8 rounded-lg text-secondary hover:bg-surface-container flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="my-4 space-y-4">
              <div>
                <h3 className="text-[20px] font-bold text-on-surface">{selectedInst.name}</h3>
                <p className="text-[13px] text-secondary mt-0.5">{selectedInst.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-[13px]">
                <div>
                  <span className="text-secondary block text-[11px]">원장/대표자</span>
                  <strong className="text-on-surface">{selectedInst.director}</strong>
                </div>
                <div>
                  <span className="text-secondary block text-[11px]">대표 전화</span>
                  <strong className="text-on-surface tabular-nums">{selectedInst.phone}</strong>
                </div>
                <div>
                  <span className="text-secondary block text-[11px]">인가 원아 수</span>
                  <strong className="text-on-surface tabular-nums">{selectedInst.childrenCount}명</strong>
                </div>
                <div>
                  <span className="text-secondary block text-[11px]">배치 교직원</span>
                  <strong className="text-on-surface tabular-nums">{selectedInst.staffCount}명</strong>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-secondary font-medium">유보통합 행정 이행률</span>
                  <span className="font-bold text-primary">{selectedInst.completionRate}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-surface-container overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${selectedInst.completionRate}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant/30">
              <button
                type="button"
                onClick={() => setSelectedInst(null)}
                className="px-4 py-2 rounded-xl bg-surface-container text-on-surface text-[13px] font-semibold hover:bg-surface-container-high transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
