import React, { useState } from 'react';
import { ResourceDocument } from '../../types';
import { RESOURCE_DOCS } from '../../data/mockData';

export const ResourcesView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [targetOrgFilter, setTargetOrgFilter] = useState<'전체' | '공통' | '유치원' | '어린이집'>('전체');
  const [search, setSearch] = useState('');
  const [previewDoc, setPreviewDoc] = useState<ResourceDocument | null>(null);

  const categories = ['전체', '규정·지침', '공문서식', '회계·정산', '보건·안전', '교육과정'];

  const filteredDocs = RESOURCE_DOCS.filter((d) => {
    if (selectedCategory !== '전체' && d.category !== selectedCategory) return false;
    if (targetOrgFilter !== '전체' && d.targetOrg !== targetOrgFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return d.title.toLowerCase().includes(q) || d.aiSummary.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="p-6 max-w-[1600px] mx-auto w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shadow-sm">
            <span className="material-symbols-outlined text-[22px]">folder_managed</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[20px] font-bold text-on-surface">자료·서식 관리 센터</h1>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary-fixed text-primary">
                공식 서식 아카이브
              </span>
            </div>
            <p className="text-[12px] text-secondary">
              세종특별자치시교육청 유보통합 표준 규정, 법정 비치서식, 회계 정산 매뉴얼 일체
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert('신규 자료 등록은 교육청 총괄관리자 승인 후 업로드 가능합니다.')}
          className="h-10 px-4 rounded-xl bg-primary text-white text-[13px] font-bold hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">upload_file</span>
          <span>서식 자료 등록</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-[13px] font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-container-low text-secondary hover:bg-surface-container'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="서식명 또는 키워드 검색..."
              className="w-64 h-9 pl-9 pr-3 rounded-lg bg-surface-container-low text-[13px] text-on-surface border border-outline-variant/30 focus:outline-none focus:bg-surface-container-lowest"
            />
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] px-2 py-0.5 rounded font-bold bg-primary-fixed text-primary">
                  {doc.category}
                </span>
                <span className="text-[11px] font-semibold text-secondary uppercase px-2 py-0.5 rounded bg-surface-container-low border border-outline-variant/30">
                  {doc.fileFormat} · {doc.fileSize}
                </span>
              </div>

              <h3 className="text-[15px] font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                {doc.title}
              </h3>

              {/* AI Summary Card */}
              <div className="mt-3 p-3 rounded-xl bg-tertiary-fixed/15 border border-tertiary/20 text-[12px] text-on-surface-variant leading-relaxed">
                <div className="flex items-center gap-1 font-bold text-tertiary text-[11px] mb-1">
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                  AI 핵심 요약
                </div>
                {doc.aiSummary}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-[11px] text-secondary">
              <div className="flex items-center gap-3">
                <span>등록일: {doc.uploadDate}</span>
                <span>다운로드: {doc.downloads}회</span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(doc)}
                className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-primary hover:text-white transition-all text-on-surface text-[12px] font-bold flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                <span>서식 열람</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-outline-variant/40 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-primary-fixed text-primary">
                  {previewDoc.category}
                </span>
                <span className="text-[12px] text-secondary">
                  {previewDoc.fileFormat} ({previewDoc.fileSize})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="w-8 h-8 rounded-lg text-secondary hover:bg-surface-container flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="my-4 space-y-3">
              <h3 className="text-[18px] font-bold text-on-surface leading-snug">
                {previewDoc.title}
              </h3>
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-[13px] leading-relaxed">
                <strong className="text-tertiary block mb-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                  문서 핵심 요약
                </strong>
                {previewDoc.aiSummary}
              </div>

              <div className="text-[12px] text-secondary space-y-1">
                <div>• 제공 기관: 세종특별자치시교육청 유보통합추진단</div>
                <div>• 최종 승인일: {previewDoc.uploadDate}</div>
                <div>• 규정 준수 적합성 검증 완료 필</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant/30">
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 rounded-xl bg-surface-container text-on-surface text-[13px] font-semibold hover:bg-surface-container-high transition-colors"
              >
                닫기
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`[${previewDoc.title}] 파일이 안전하게 다운로드되었습니다.`);
                  setPreviewDoc(null);
                }}
                className="px-4 py-2 rounded-xl bg-primary text-white text-[13px] font-bold hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>서식 파일 다운로드</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
