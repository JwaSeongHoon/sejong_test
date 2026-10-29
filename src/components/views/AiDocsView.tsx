import React, { useState } from 'react';
import { DocType, GeneratedDocument } from '../../types';
import { INSTITUTIONS, SAMPLE_GENERATED_DOC } from '../../data/mockData';

interface AiDocsViewProps {
  initialTopic?: string;
  initialDocType?: DocType;
}

export const AiDocsView: React.FC<AiDocsViewProps> = ({
  initialTopic,
  initialDocType = '가정통신문',
}) => {
  const [docType, setDocType] = useState<DocType>(initialDocType);
  const [selectedInstId, setSelectedInstId] = useState('inst-1');
  const [targetAge, setTargetAge] = useState<'0_2' | '3_5' | 'all'>('all');
  const [docTitle, setDocTitle] = useState(
    initialTopic || '겨울철 유행성 감염병 예방 및 건강한 원원 생활을 위한 안내'
  );
  const [targetRecipient, setTargetRecipient] = useState('세종가온유치원 전체 원아 학부모님 귀하');
  const [mainContent, setMainContent] = useState(
    `1. 주요 유행 감염병(인플루엔자 독감 및 노로바이러스) 증상 안내
2. 손 씻기 및 기침 예절 등 가정 내 위생 수칙
3. 감염 시 등원 인정 결석 서류(의사 진단서/소견서) 제출 절차`
  );
  const [period, setPeriod] = useState('2024년 11월 20일 ~ 동절기 유행 종료 시까지');
  const [issuerName, setIssuerName] = useState('세종가온유치원장');
  const [tone, setTone] = useState<'formal' | 'friendly' | 'concise'>('friendly');
  const [filterPrivacy, setFilterPrivacy] = useState(true);

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [document, setDocument] = useState<GeneratedDocument>(SAMPLE_GENERATED_DOC);
  const [isEditing, setIsEditing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const docTypesList: { type: DocType; icon: string }[] = [
    { type: '가정통신문', icon: 'family_restroom' },
    { type: '학부모 안내문', icon: 'campaign' },
    { type: '공문 초안', icon: 'mark_email_unread' },
    { type: '업무보고서', icon: 'assignment' },
    { type: '체험학습 계획서', icon: 'tour' },
    { type: '맞춤형 기안서', icon: 'draw' },
  ];

  // Preset filler
  const handleInsertSample = (presetType: DocType) => {
    setDocType(presetType);
    if (presetType === '가정통신문') {
      setDocTitle('겨울철 유행성 감염병 예방 및 건강한 원원 생활을 위한 안내');
      setTargetRecipient('세종가온유치원 전체 원아 학부모님 귀하');
      setMainContent(
        `1. 주요 유행 감염병(인플루엔자 독감 및 노로바이러스) 증상 안내\n2. 손 씻기 및 기침 예절 등 가정 내 위생 수칙\n3. 감염 시 등원 인정 결석 서류(의사 진단서/소견서) 제출 절차`
      );
      setPeriod('2024년 11월 20일 ~ 동절기 종료 시까지');
    } else if (presetType === '학부모 안내문') {
      setDocTitle('2025학년도 세종형 유보통합 방과후 과정 및 돌봄교실 수요조사');
      setTargetRecipient('만 3~5세 원아 학부모님');
      setMainContent(
        `1. 2025년 3월부터 운영되는 아침돌봄(07:30~09:00) 및 저녁돌봄(18:00~20:00) 안내\n2. 특성화 방과후 놀이프로그램(음악, 체육, 유아 창의과학) 희망 조사\n3. 신청서 제출 기한: 2024년 11월 29일(금) 17:00까지`
      );
      setPeriod('2024년 11월 21일 ~ 11월 29일');
    } else if (presetType === '공문 초안') {
      setDocTitle('2024학년도 4분기 유·보 공통 무상급식 식품비 집행 정산서 제출');
      setTargetRecipient('세종특별자치시교육감 (유보통합추진단장)');
      setMainContent(
        `1. 관련: 세종특별자치시교육청 유보통합추진단-10492(2024.10.15.)호\n2. 위 호와 관련하여 2024년 4분기 무상급식 및 친환경 농산물 지원금 정산서를 붙임과 같이 제출합니다.\n3. 붙임: 1) 4분기 급식 정산서 1부. 2) 지출 증빙 영수증 사본 1부. 끝.`
      );
      setPeriod('2024년 11월 22일(금) 18:00限');
    } else if (presetType === '체험학습 계획서') {
      setDocTitle('2024학년도 2학기 세종 국립어린이박물관 문화예술 체험학습 운영 계획');
      setTargetRecipient('원장 및 교직원 공람');
      setMainContent(
        `1. 목적: 유보통합 연계 유아의 오감발달 및 지역사회 문화시설 탐방\n2. 일시: 2024년 12월 4일(수) 09:30 ~ 14:30\n3. 장소: 국립어린이박물관(세종시 세종동)\n4. 인솔 교원 및 안전요원 배치 계획 수립`
      );
      setPeriod('2024년 12월 4일(수)');
    } else {
      setDocTitle('2024 세종 유보통합 시범운영 기관 협의회 결과 보고');
      setTargetRecipient('유보통합추진단 행정협의회');
      setMainContent(
        `1. 회의 일시 및 장소: 2024년 11월 18일 세종시교육청 대회의실\n2. 주요 논의 사항: 에듀파인 회계 전환에 따른 행정인력 지원 방안\n3. 건의 사항 및 향후 일정 정리`
      );
      setPeriod('2024년 11월 18일');
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const currentInst = INSTITUTIONS.find((i) => i.id === selectedInstId) || INSTITUTIONS[0];

      const newDoc: GeneratedDocument = {
        docType: docType,
        docNumber: `${currentInst.code}-2024-${docType === '가정통신문' ? '가통' : '공문'}-${Math.floor(
          100 + Math.random() * 900
        )}`,
        publicType: docType === '공문 초안' ? '공개(대외공문)' : '공개(학부모 배부용)',
        title: docTitle,
        subtitle: `【${docType} 제${Math.floor(50 + Math.random() * 50)}호】`,
        greeting:
          tone === 'friendly'
            ? `학부모님 안녕하십니까? 쌀쌀해진 날씨 속에서 댁내 평안과 건강을 기원합니다. 본원에서는 영유아의 건강하고 안전한 원원 생활을 위해 『${docTitle}』 관련 주요 사항을 아래와 같이 안내드리오니 학부모님의 적극적인 협조를 부탁드립니다.`
            : tone === 'formal'
            ? `귀 기관의 무궁한 발전을 기원합니다. 세종특별자치시교육청 유보통합 추진 기본계획 및 관련 법령에 의거하여 『${docTitle}』을 다음과 같이 시행 및 보고하오니 업무에 참고하시기 바랍니다.`
            : `안내드립니다. 2024학년도 세종 유보통합 표준 운영 규정에 의거하여 『${docTitle}』 핵심 지침을 신속히 공지하오니 협조 바랍니다.`,
        sections: [
          {
            number: '1',
            title: '주요 안내 목적 및 추진 배경',
            items: mainContent.split('\n').filter((l) => l.trim().length > 0),
          },
          {
            number: '2',
            title: '시행 기간 및 세부 기준',
            items: [
              `적용 시기: ${period}`,
              `수신 대상: ${targetRecipient}`,
              '비상 연락망 및 담당 부서 협조 체계 가동',
            ],
            highlightBox: {
              type: 'warning',
              title: '필수 준수 사항',
              desc: '관련 기한 내 서류 제출 및 건강 이상 징후 발생 시 즉시 원무실로 연락 바랍니다.',
            },
          },
          {
            number: '3',
            title: '가정 및 원내 협조 요청사항',
            items: [
              '올바른 개인위생 관리 및 일상생활 지도 철저',
              '공지사항 및 교육청 알림톡 실시간 확인 요망',
              '문의 사항 발생 시 하단 연락처로 즉시 유선 연락',
            ],
          },
        ],
        date: '2024년 11월 20일',
        issuerInstitution: `세종특별자치시교육청 유보통합지원과 / ${currentInst.name}`,
        issuerTitle: `${currentInst.name}장`,
        stampText: `${currentInst.name.slice(0, 4)}\n원장인`,
        contactDepartment: `원무행정실 (${currentInst.phone})`,
        contactTel: currentInst.phone,
        complianceNotes:
          '세종특별자치시교육청 유보통합 표준 규정(유아교육법 제21조 및 영유아보육법 제34조) 준수 검증 완료',
      };

      setDocument(newDoc);
      showToast('✨ AI 행정문서 초안이 생성되었습니다.');
    }, 1200);
  };

  const handleCopy = () => {
    const textToCopy = `
${document.title}
${document.subtitle || ''}

${document.greeting}

${document.sections
  .map(
    (s) => `
${s.number}. ${s.title}
${s.items.map((it) => `  - ${it}`).join('\n')}
`
  )
  .join('\n')}

시행일자: ${document.date}
발신: ${document.issuerTitle}
문의: ${document.contactDepartment}
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    showToast('클립보드에 문서 전문이 복사되었습니다.');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadDocx = () => {
    const blob = new Blob([JSON.stringify(document, null, 2)], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${document.title.replace(/\s+/g, '_')}.txt`;
    a.click();
    showToast('문서 데이터가 다운로드되었습니다.');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Utility Context & Breadcrumbs */}
      <div className="px-6 py-4 bg-surface-container-lowest/80 backdrop-blur-sm border-b border-outline-variant/30">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[12px] text-secondary">
              <span>세종 EduCare AI</span>
              <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
              <span>AI 문서 작성</span>
              <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
              <span className="text-primary font-bold">신규 생성</span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <h1 className="text-[22px] font-bold text-on-surface tracking-tight">
                AI 행정문서 및 안내문 생성
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-semibold">
                표준 서식 준수 엔진 v2.4
              </span>
            </div>
            <p className="text-[13px] text-on-surface-variant max-w-3xl">
              작성 목적과 필수 정보를 입력하면 세종특별자치시교육청 행정 규정에 부합하는 공문서 및
              가정통신문 초안을 AI가 실시간으로 구조화하여 작성합니다.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low text-secondary text-[12px]">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span>공문서 표준 데이터베이스 연동됨</span>
            </div>
            <button
              type="button"
              onClick={() => handleInsertSample('가정통신문')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors text-[12px] font-semibold border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-[18px]">history</span>
              <span>최근 서식 불러오기</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Canvas: Two-Column Split (50% : 50%) */}
      <div className="px-6 py-6 max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* LEFT COLUMN: Input Form Parameters */}
          <section className="flex flex-col gap-5 bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30">
            {/* Header & Reset Area */}
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary font-bold">
                  <span className="material-symbols-outlined text-[20px]">edit_note</span>
                </span>
                <div>
                  <h2 className="text-[16px] font-bold text-on-surface">문서 파라미터 입력</h2>
                  <span className="text-[11px] text-secondary">교육청 표준 가이드라인에 맞춘 필드 구성</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleInsertSample('학부모 안내문')}
                className="flex items-center gap-1 text-primary hover:text-primary-container text-[12px] font-semibold transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">folder_open</span>
                <span>임시저장 불러오기</span>
              </button>
            </div>

            {/* 1. Document Type Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-on-surface flex items-center justify-between">
                <span>
                  문서 유형 선택 <span className="text-error">*</span>
                </span>
                <span className="text-[11px] text-outline">세종시 유보통합 공통 서식</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {docTypesList.map((dt) => {
                  const isSelected = docType === dt.type;
                  return (
                    <button
                      key={dt.type}
                      type="button"
                      onClick={() => handleInsertSample(dt.type)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all border ${
                        isSelected
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-surface-container-low text-on-surface border-transparent hover:bg-surface-container'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-[18px] ${
                          isSelected ? 'text-white' : 'text-secondary'
                        }`}
                      >
                        {dt.icon}
                      </span>
                      <span className="truncate">{dt.type}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Institution & Age Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-on-surface">
                  소속 기관명 <span className="text-error">*</span>
                </label>
                <select
                  value={selectedInstId}
                  onChange={(e) => {
                    setSelectedInstId(e.target.value);
                    const inst = INSTITUTIONS.find((i) => i.id === e.target.value);
                    if (inst) setIssuerName(`${inst.name}장`);
                  }}
                  className="h-10 px-3 rounded-lg bg-surface-container-low text-[13px] text-on-surface font-medium border border-outline-variant/30 focus:border-primary focus:outline-none"
                >
                  {INSTITUTIONS.map((inst) => (
                    <option key={inst.id} value={inst.id}>
                      {inst.name} ({inst.type})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-on-surface">대상 연령 구분</label>
                <div className="grid grid-cols-3 gap-1 p-1 bg-surface-container-low rounded-lg border border-outline-variant/30 text-[12px]">
                  <button
                    type="button"
                    onClick={() => setTargetAge('0_2')}
                    className={`py-1.5 text-center rounded-md font-semibold transition-all ${
                      targetAge === '0_2' ? 'bg-surface-container-lowest text-primary shadow-xs' : 'text-secondary'
                    }`}
                  >
                    만 0~2세
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetAge('3_5')}
                    className={`py-1.5 text-center rounded-md font-semibold transition-all ${
                      targetAge === '3_5' ? 'bg-surface-container-lowest text-primary shadow-xs' : 'text-secondary'
                    }`}
                  >
                    만 3~5세
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetAge('all')}
                    className={`py-1.5 text-center rounded-md font-semibold transition-all ${
                      targetAge === 'all' ? 'bg-surface-container-lowest text-primary shadow-xs' : 'text-secondary'
                    }`}
                  >
                    공통 전체
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Title & Target Recipient */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-semibold text-on-surface" htmlFor="doc-title-input">
                  문서 제목 <span className="text-error">*</span>
                </label>
                <input
                  id="doc-title-input"
                  type="text"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  placeholder="예: 겨울철 감염병 예방 및 등원 기준 안내"
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-[13px] text-on-surface border border-outline-variant/30 focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-semibold text-on-surface" htmlFor="doc-target-input">
                  수신 대상 <span className="text-error">*</span>
                </label>
                <input
                  id="doc-target-input"
                  type="text"
                  value={targetRecipient}
                  onChange={(e) => setTargetRecipient(e.target.value)}
                  placeholder="예: 가온유치원 전체 원아 학부모님 귀하"
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-[13px] text-on-surface border border-outline-variant/30 focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* 4. Main Points / Content */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-semibold text-on-surface" htmlFor="doc-content-input">
                  주요 포함 내용 (개조식 항목) <span className="text-error">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => handleInsertSample(docType)}
                  className="text-[11px] text-primary hover:underline font-semibold"
                >
                  교육청 권장 서식 자동채우기
                </button>
              </div>
              <textarea
                id="doc-content-input"
                rows={4}
                value={mainContent}
                onChange={(e) => setMainContent(e.target.value)}
                placeholder="문서에 포함할 핵심 사항을 입력하세요."
                className="w-full p-3 rounded-lg bg-surface-container-low text-[13px] text-on-surface border border-outline-variant/30 focus:border-primary focus:outline-none leading-relaxed"
              ></textarea>
            </div>

            {/* 5. Period & Issuer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-semibold text-on-surface">시행 기간 및 적용 시기</label>
                <input
                  type="text"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-[13px] text-on-surface border border-outline-variant/30 focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-semibold text-on-surface">발신 명의</label>
                <input
                  type="text"
                  value={issuerName}
                  onChange={(e) => setIssuerName(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-[13px] text-on-surface border border-outline-variant/30 focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* 6. Tone / Tone and Manner */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-on-surface flex items-center justify-between">
                <span>문체 및 어조 (Tone) 설정</span>
                <span className="text-[11px] text-tertiary flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span> AI 감성 튜닝
                </span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTone('friendly')}
                  className={`p-2.5 rounded-xl text-center border text-[12px] font-semibold transition-all ${
                    tone === 'friendly'
                      ? 'bg-primary-fixed/60 border-primary text-primary shadow-xs font-bold'
                      : 'bg-surface-container-low border-transparent text-secondary hover:bg-surface-container'
                  }`}
                >
                  따뜻한 소통체 (해요체)
                </button>
                <button
                  type="button"
                  onClick={() => setTone('formal')}
                  className={`p-2.5 rounded-xl text-center border text-[12px] font-semibold transition-all ${
                    tone === 'formal'
                      ? 'bg-primary-fixed/60 border-primary text-primary shadow-xs font-bold'
                      : 'bg-surface-container-low border-transparent text-secondary hover:bg-surface-container'
                  }`}
                >
                  공문서 격식체 (하십시오체)
                </button>
                <button
                  type="button"
                  onClick={() => setTone('concise')}
                  className={`p-2.5 rounded-xl text-center border text-[12px] font-semibold transition-all ${
                    tone === 'concise'
                      ? 'bg-primary-fixed/60 border-primary text-primary shadow-xs font-bold'
                      : 'bg-surface-container-low border-transparent text-secondary hover:bg-surface-container'
                  }`}
                >
                  간결한 공지형 (알림체)
                </button>
              </div>
            </div>

            {/* Advanced AI & Regulations */}
            <div className="p-3 rounded-xl bg-surface-container-low/70 border border-outline-variant/30 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="material-symbols-outlined text-primary text-[18px]">tune</span>
                <span className="text-[11px] text-on-surface font-semibold">참조 규정 매핑:</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-[11px] text-secondary font-medium">
                  학교보건법 제8조
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-[11px] text-secondary font-medium">
                  유아교육법 제21조
                </span>
              </div>
              <label className="flex items-center gap-1.5 cursor-pointer text-secondary text-[11px] hover:text-on-surface">
                <input
                  type="checkbox"
                  checked={filterPrivacy}
                  onChange={(e) => setFilterPrivacy(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-primary focus:ring-0 accent-primary"
                />
                <span>개인정보보호 및 취약용어 사전 필터링</span>
              </label>
            </div>

            {/* Action Buttons Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-outline-variant/30">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleInsertSample('가정통신문')}
                  className="h-10 px-4 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors text-[13px] font-semibold flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">restart_alt</span>
                  <span>초기화</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast('임시저장되었습니다.')}
                  className="h-10 px-4 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors text-[13px] font-semibold flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">save</span>
                  <span>임시저장</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full sm:w-auto h-11 px-6 rounded-xl bg-primary-container text-on-primary font-bold text-[14px] shadow-md hover:bg-primary transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
              >
                {isGenerating ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>AI 규정 대조 및 초안 작성 중...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px] text-tertiary-fixed group-hover:rotate-12 transition-transform">
                      auto_awesome
                    </span>
                    <span>AI 문서 초안 생성</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </section>

          {/* RIGHT COLUMN: AI Generated Preview & Live Inspection */}
          <section className="flex flex-col gap-4">
            {/* Live Toolbar */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Generation Status */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[12px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                  <span>✨ AI 생성 완료 (표준 초안)</span>
                </span>
                <span className="text-[11px] text-outline">최종 서식 검증: 방금 전</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container border border-outline-variant/30 text-[12px] font-semibold transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary">content_copy</span>
                  <span>복사</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-[12px] font-semibold transition-colors ${
                    isEditing
                      ? 'bg-primary text-white border-primary'
                      : 'bg-surface-container-low text-on-surface border-outline-variant/30 hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  <span>{isEditing ? '편집 완료' : '내용 직접 수정'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadDocx}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container border border-outline-variant/30 text-[12px] font-semibold transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">description</span>
                  <span>텍스트/HWP</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container border border-outline-variant/30 text-[12px] font-semibold transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-error">picture_as_pdf</span>
                  <span>PDF / 인쇄</span>
                </button>
              </div>
            </div>

            {/* Official Document Sheet Container */}
            <div
              id="document-preview-sheet"
              className="bg-surface-container-lowest rounded-2xl shadow-md border border-outline-variant/30 p-8 sm:p-12 relative overflow-hidden transition-all print-page"
            >
              {/* Official Letterhead Header */}
              <div className="flex flex-col items-center text-center pb-6 border-b border-outline-variant/40">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-on-primary">
                    <span className="material-symbols-outlined text-[14px]">school</span>
                  </span>
                  <span className="text-[12px] font-bold text-primary tracking-wider uppercase">
                    {document.issuerInstitution}
                  </span>
                </div>

                {/* Reference Banner */}
                <div className="inline-block px-3 py-1 rounded bg-surface-container-low text-secondary text-[11px] font-medium mb-3">
                  문서번호: {document.docNumber} | 공개구분: {document.publicType}
                </div>

                {/* Title */}
                <h2 className="text-[20px] sm:text-[22px] font-bold text-on-surface text-center max-w-xl leading-snug">
                  {document.subtitle && <span className="block text-[16px] text-primary mb-1">{document.subtitle}</span>}
                  {document.title}
                </h2>
              </div>

              {/* Greeting */}
              <div className="py-5">
                <p className="text-[14px] text-on-surface leading-relaxed text-justify indent-2">
                  {document.greeting}
                </p>
              </div>

              {/* Structured Sections */}
              <div className="space-y-5 my-2">
                {document.sections.map((sec) => (
                  <div
                    key={sec.number}
                    className="p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/20 flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-primary-container text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                        {sec.number}
                      </span>
                      <h3 className="text-[15px] font-bold text-on-surface">{sec.title}</h3>
                    </div>
                    <ul className="list-disc list-inside space-y-1.5 pl-2 text-[13px] text-on-surface-variant">
                      {sec.items.map((item, i) => (
                        <li key={i} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                    {sec.highlightBox && (
                      <div className="mt-2 p-3 rounded-lg bg-surface-container-lowest border border-error/30 flex items-start gap-2">
                        <span className="material-symbols-outlined text-error text-[18px] shrink-0 mt-0.5">
                          front_hand
                        </span>
                        <div>
                          <span className="text-[12px] font-bold text-error block">
                            {sec.highlightBox.title}
                          </span>
                          <span className="text-[12px] text-on-surface">
                            {sec.highlightBox.desc}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Sign-off & Red Official Stamp */}
              <div className="pt-8 pb-4 flex flex-col items-center justify-center gap-3">
                <span className="text-[15px] font-bold text-on-surface tabular-nums">
                  {document.date}
                </span>

                <div className="flex items-center gap-4 relative">
                  <span className="text-[20px] font-bold text-on-surface tracking-widest pl-4">
                    {document.issuerTitle}
                  </span>

                  {/* Red Official Stamp / Seal */}
                  <div className="w-14 h-14 rounded-full border-2 border-error flex items-center justify-center text-error font-extrabold text-[11px] leading-tight text-center rotate-[-6deg] shadow-xs select-none">
                    <span className="whitespace-pre-line">{document.stampText}</span>
                  </div>
                </div>

                <span className="text-[11px] text-secondary mt-1">문의처: {document.contactDepartment}</span>
              </div>
            </div>

            {/* AI Assistant Compliance Box */}
            <div className="p-4 rounded-xl bg-tertiary-fixed/25 border border-tertiary/25 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[13px] font-bold text-on-surface">
                  세종형 유보통합 표준 규정 검증 통과
                </span>
                <p className="text-[12px] text-on-surface-variant leading-relaxed">
                  {document.complianceNotes}
                </p>
              </div>
            </div>

            {/* Disclaimer Banner */}
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-2.5 text-[11px] text-secondary">
              <span className="material-symbols-outlined text-outline text-[18px] shrink-0 mt-0.5">
                warning
              </span>
              <p className="leading-relaxed">
                <strong className="text-on-surface font-semibold">주의사항:</strong> 본 문서는 SEJONG
                EduCare AI가 생성한 표준 초안입니다. 관련 법령, 학사 일정 및 유치원 운영위원회 심의 결과에
                따라 세부 일정 및 지원 항목을 재확인한 후 결재 상신하시기 바랍니다.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-inverse-surface text-inverse-on-surface shadow-2xl border border-white/10">
            <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">
              check_circle
            </span>
            <span className="text-[13px] font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};
